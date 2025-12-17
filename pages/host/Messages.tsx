import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const Messages: React.FC = () => {
  const { user, messages, sendMessage, allUsers } = useApp();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  // Group messages logic (Shared logic essentially, but specific to Host view context)
  const conversations = useMemo(() => {
      if (!user) return [];
      const conversationMap = new Map();

      messages.forEach(msg => {
          if (msg.senderId === user.id || msg.receiverId === user.id) {
              const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
              if (!conversationMap.has(otherUserId)) {
                  conversationMap.set(otherUserId, {
                      userId: otherUserId,
                      lastMessage: msg,
                      unreadCount: 0
                  });
              } else {
                  const conv = conversationMap.get(otherUserId);
                  if (new Date(msg.timestamp) > new Date(conv.lastMessage.timestamp)) {
                      conv.lastMessage = msg;
                  }
              }
              if (msg.receiverId === user.id && !msg.read) {
                  conversationMap.get(otherUserId).unreadCount++;
              }
          }
      });

      return Array.from(conversationMap.values()).map(c => {
          const contact = allUsers.find(u => u.id === c.userId);
          return { ...c, contact };
      }).sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
  }, [messages, user, allUsers]);

  if (!activeChatId && conversations.length > 0) {
      setActiveChatId(conversations[0].userId);
  }

  const activeMessages = useMemo(() => {
      if (!activeChatId || !user) return [];
      return messages.filter(m => 
          (m.senderId === user.id && m.receiverId === activeChatId) ||
          (m.senderId === activeChatId && m.receiverId === user.id)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages, activeChatId, user]);

  const activeContact = allUsers.find(u => u.id === activeChatId);

  const handleSend = () => {
      if (activeChatId && inputText.trim() && user) {
          sendMessage(user.id, activeChatId, inputText);
          setInputText('');
      }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar List */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Rechercher une conversation..." />
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.length === 0 && (
              <div className="p-4 text-center text-gray-500">Aucun message pour le moment.</div>
          )}
          {conversations.map(conv => (
              <div 
                key={conv.userId}
                onClick={() => setActiveChatId(conv.userId)}
                className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${activeChatId === conv.userId ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between mb-1">
                  <span className={`font-bold text-sm ${conv.unreadCount > 0 ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{conv.contact?.name || 'Voyageur'}</span>
                  <span className="text-xs text-gray-500">{new Date(conv.lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500'}`}>{conv.lastMessage.text}</p>
              </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#101622]">
        {activeContact ? (
            <>
                <div className="p-4 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-300 bg-cover bg-center" style={{backgroundImage: `url("${activeContact.avatar}")`}}></div>
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white">{activeContact.name}</h2>
                            <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-green-600"></span> En ligne
                            </p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {activeMessages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.senderId === user?.id ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full shrink-0 ${msg.senderId === user?.id ? 'bg-primary' : 'bg-gray-300'} bg-cover bg-center`} style={{backgroundImage: `url("${msg.senderId === user?.id ? user.avatar : activeContact.avatar}")`}}></div>
                            <div className={`p-3 rounded-2xl shadow-sm max-w-[70%] ${msg.senderId === user?.id ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-[#1e293b] rounded-tl-none'}`}>
                                <p className={`text-sm ${msg.senderId === user?.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2 items-center">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">add_circle</span></button>
                        <input 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all" 
                            placeholder="Écrivez votre message..." 
                        />
                        <button onClick={handleSend} className="p-3 bg-primary text-white rounded-xl shadow-lg hover:bg-[#d65a1f] transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">Sélectionnez une conversation</div>
        )}
      </div>
    </div>
  );
};

export default Messages;