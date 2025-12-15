import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const GuestMessages: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200")'}}></div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">Jean Dupont</h1>
                <p className="text-xs text-gray-500">Voyageur</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/account/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/profile')}`}>
                 <span className="material-symbols-outlined text-[20px]">person</span> Mon Profil
              </Link>
              <Link to="/account/bookings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/bookings')}`}>
                 <span className="material-symbols-outlined text-[20px]">confirmation_number</span> Mes Réservations
              </Link>
              <Link to="/account/favorites" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/favorites')}`}>
                 <span className="material-symbols-outlined text-[20px]">favorite</span> Mes Favoris
              </Link>
              <Link to="/account/messages" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/messages')}`}>
                 <span className="material-symbols-outlined text-[20px]">chat</span> Messages
              </Link>
              <Link to="/account/notifications" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/notifications')}`}>
                 <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
              </Link>
              <Link to="/account/security" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/security')}`}>
                 <span className="material-symbols-outlined text-[20px]">lock</span> Sécurité
              </Link>
            </nav>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="lg:col-span-9 h-[600px] flex bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
             {/* List */}
             <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-[#1e293b]">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">Boîte de réception</h2>
                </div>
                <div className="overflow-y-auto flex-1">
                    <div className="p-4 bg-primary/5 border-l-4 border-primary cursor-pointer">
                        <div className="flex justify-between mb-1">
                             <h4 className="font-bold text-sm text-gray-900 dark:text-white">Terrou-Bi Resort</h4>
                             <span className="text-[10px] text-gray-500">10:30</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate font-medium">Votre réservation est confirmée pour...</p>
                    </div>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex justify-between mb-1">
                             <h4 className="font-bold text-sm text-gray-900 dark:text-white">Villa Prestige</h4>
                             <span className="text-[10px] text-gray-500">Hier</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Merci pour votre message. Oui le...</p>
                    </div>
                </div>
             </div>

             {/* Chat */}
             <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#101622]">
                <div className="p-4 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80")'}}></div>
                       <div>
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Terrou-Bi Resort</h3>
                          <p className="text-[10px] text-green-600 font-bold">En ligne</p>
                       </div>
                   </div>
                   <Link to="/search/stays/1" className="text-xs font-bold text-primary hover:underline">Voir l'annonce</Link>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <div className="flex justify-center">
                        <span className="text-[10px] text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">Aujourd'hui</span>
                    </div>
                    {/* User Message */}
                    <div className="flex gap-3 flex-row-reverse">
                        <div className="bg-primary text-white p-3 rounded-l-xl rounded-br-xl shadow-sm max-w-[80%]">
                            <p className="text-sm">Bonjour, je voudrais savoir si le petit-déjeuner est inclus ?</p>
                        </div>
                    </div>
                    {/* Partner Message */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80")'}}></div>
                        <div className="bg-white dark:bg-[#1e293b] p-3 rounded-r-xl rounded-bl-xl shadow-sm max-w-[80%]">
                            <p className="text-sm text-gray-800 dark:text-gray-200">Bonjour Jean ! Oui, tout à fait. Le petit-déjeuner continental est inclus dans votre réservation. Au plaisir de vous accueillir !</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><span className="material-symbols-outlined">add_photo_alternate</span></button>
                        <input className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-primary" placeholder="Écrivez votre message..." />
                        <button className="p-2 bg-primary text-white rounded-full hover:bg-[#d65a1f] transition-colors shadow-md">
                            <span className="material-symbols-outlined text-[20px] ml-0.5 mt-0.5">send</span>
                        </button>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default GuestMessages;