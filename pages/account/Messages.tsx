import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const GuestMessages: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const contactIdParam = searchParams.get('contactId');
  
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';
  const { user, messages, sendMessage, allUsers, markMessagesRead } = useApp();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const conversations = useMemo(() => {
      if (!user) return [];
      const conversationMap = new Map();
      
      // Also ensure the contactIdParam user is in the list even if no messages yet
      if (contactIdParam && contactIdParam !== user.id) {
          const targetContact = allUsers.find(u => u.id === contactIdParam);
          if (targetContact) {
              conversationMap.set(contactIdParam, { 
                userId: contactIdParam, 
                lastMessage: { text: "Nouvelle discussion", timestamp: new Date().toISOString() }, 
                unreadCount: 0 
              });
          }
      }

      messages.forEach(msg => {
          if (msg.senderId === user.id || msg.receiverId === user.id) {
              const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
              if (!conversationMap.has(otherUserId)) {
                  conversationMap.set(otherUserId, { userId: otherUserId, lastMessage: msg, unreadCount: 0 });
              } else {
                  const conv = conversationMap.get(otherUserId);
                  if (msg.timestamp && conv.lastMessage.timestamp && new Date(msg.timestamp) > new Date(conv.lastMessage.timestamp)) {
                      conv.lastMessage = msg;
                  }
              }
              if (msg.receiverId === user.id && !msg.read) {
                  const conv = conversationMap.get(otherUserId);
                  if (conv) conv.unreadCount++;
              }
          }
      });
      return Array.from(conversationMap.values()).map(c => ({ ...c, contact: allUsers.find(u => u.id === c.userId) }))
          .sort((a, b) => {
              if (!a.lastMessage.timestamp) return 1;
              if (!b.lastMessage.timestamp) return -1;
              return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
          });
  }, [messages, user, allUsers, contactIdParam]);

  useEffect(() => {
      if (contactIdParam) {
          setActiveChatId(contactIdParam);
      } else if (!activeChatId && conversations.length > 0) {
          setActiveChatId(conversations[0].userId);
      }
  }, [contactIdParam, conversations, activeChatId]);

  useEffect(() => {
      if (activeChatId) markMessagesRead(activeChatId);
  }, [activeChatId, messages.length, markMessagesRead]);

  const activeMessages = useMemo(() => {
      if (!activeChatId || !user) return [];
      return messages.filter(m => (m.senderId === user.id && m.receiverId === activeChatId) || (m.senderId === activeChatId && m.receiverId === user.id))
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages, activeChatId, user]);

  const activeContact = allUsers.find(u => u.id === activeChatId);

  const handleSend = () => {
      if (activeChatId && inputText.trim() && user) {
          sendMessage(user.id, activeChatId, inputText);
          setInputText('');
      }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: `url("${user?.avatar}")`}}></div>
              <div><h1 className="font-bold text-gray-900 dark:text-white">{user?.name}</h1><p className="text-xs text-gray-500">Voyageur</p></div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/account/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/profile')}`}><span className="material-symbols-outlined text-[20px]">person</span> Mon Profil</Link>
              <Link to="/account/bookings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/bookings')}`}><span className="material-symbols-outlined text-[20px]">confirmation_number</span> Réservations</Link>
              <Link to="/account/messages" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/messages')}`}><span className="material-symbols-outlined text-[20px]">chat</span> Messages</Link>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-9 h-[650px] flex bg-white dark:bg-[#1a202c] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
             <div className="w-1/3 border-r border-gray-100 dark:border-gray-800 flex flex-col bg-gray-50/50 dark:bg-gray-800/20">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800"><h2 className="font-black text-xl text-gray-900 dark:text-white">Messages</h2></div>
                <div className="overflow-y-auto flex-1 no-scrollbar">
                    {conversations.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">Aucune discussion</div>}
                    {conversations.map(conv => (
                        <div key={conv.userId} onClick={() => setActiveChatId(conv.userId)} className={`p-5 border-b border-gray-50 dark:border-gray-800/50 cursor-pointer transition-all relative ${activeChatId === conv.userId ? 'bg-white dark:bg-[#1e293b] shadow-inner' : 'hover:bg-white/50 dark:hover:bg-white/5'}`}>
                            <div className="flex justify-between mb-1">
                                <h4 className={`font-bold text-sm ${conv.unreadCount > 0 ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{conv.contact?.name || 'Utilisateur'}</h4>
                                <span className="text-[10px] font-bold text-gray-400">{conv.lastMessage.timestamp ? new Date(conv.lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                            </div>
                            <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-black text-black dark:text-white' : 'text-gray-500'}`}>{conv.lastMessage.text}</p>
                            {conv.unreadCount > 0 && <div className="absolute right-4 bottom-5 size-2.5 bg-primary rounded-full ring-4 ring-white dark:ring-gray-800"></div>}
                        </div>
                    ))}
                </div>
             </div>
             <div className="flex-1 flex flex-col bg-white dark:bg-[#101622]">
                {activeContact ? (
                    <>
                        <div className="p-5 bg-white dark:bg-[#1e293b] border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-primary/20" style={{backgroundImage: `url("${activeContact.avatar}")`}}></div>
                                <div><h3 className="font-black text-sm text-gray-900 dark:text-white">{activeContact.name}</h3><p className="text-[10px] text-green-600 font-black uppercase tracking-widest">En ligne</p></div>
                            </div>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar bg-gray-50/30 dark:bg-transparent">
                            {activeMessages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 opacity-50">
                                    <span className="material-symbols-outlined text-4xl">waving_hand</span>
                                    <p className="font-bold">Dites bonjour à {activeContact.name} !</p>
                                </div>
                            )}
                            {activeMessages.map(msg => (
                                <div key={msg.id} className={`flex gap-3 ${msg.senderId === user?.id ? 'flex-row-reverse' : ''}`}>
                                    <div className={`p-4 rounded-3xl shadow-sm max-w-[80%] ${msg.senderId === user?.id ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-[#1e293b] dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-800'}`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <p className={`text-[9px] mt-1 font-bold uppercase tracking-wider ${msg.senderId === user?.id ? 'text-white/60' : 'text-gray-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-white dark:bg-[#1e293b] border-t border-gray-100 dark:border-gray-800">
                            <div className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800 p-2 pl-6 rounded-full border border-gray-100 dark:border-gray-700">
                                <input value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white font-medium" placeholder="Répondre..." />
                                <button onClick={handleSend} className="size-11 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20"><span className="material-symbols-outlined text-[20px] ml-1">send</span></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4"><span className="material-symbols-outlined text-6xl opacity-20">forum</span><p className="font-bold">Sélectionnez une discussion pour commencer</p></div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default GuestMessages;