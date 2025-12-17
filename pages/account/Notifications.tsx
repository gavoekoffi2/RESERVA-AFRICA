import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Notifications: React.FC = () => {
  const location = useLocation();
  const { user, systemNotifications, markAllNotificationsRead } = useApp();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: `url("${user?.avatar}")`}}></div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                <p className="text-xs text-gray-500">Voyageur</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/account/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/profile')}`}><span className="material-symbols-outlined text-[20px]">person</span> Mon Profil</Link>
              <Link to="/account/bookings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/bookings')}`}><span className="material-symbols-outlined text-[20px]">confirmation_number</span> Réservations</Link>
              <Link to="/account/messages" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/messages')}`}><span className="material-symbols-outlined text-[20px]">chat</span> Messages</Link>
              <Link to="/account/notifications" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/notifications')}`}><span className="material-symbols-outlined text-[20px]">notifications</span> Notifications</Link>
              <Link to="/account/security" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/security')}`}><span className="material-symbols-outlined text-[20px]">lock</span> Sécurité</Link>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Notifications</h2>
              <button 
                onClick={markAllNotificationsRead} 
                className="text-sm text-primary font-bold hover:underline bg-primary/10 px-4 py-2 rounded-lg"
              >
                Tout marquer comme lu
              </button>
          </div>
          
          <div className="bg-white dark:bg-[#1a202c] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
             {systemNotifications.length === 0 ? (
                 <div className="p-20 text-center text-gray-400">Aucune notification pour le moment.</div>
             ) : (
                 systemNotifications.map((notif) => (
                    <div key={notif.id} className={`p-6 border-b border-gray-100 dark:border-gray-800 transition-colors flex gap-5 ${notif.read ? 'opacity-60 grayscale-[0.5]' : 'bg-primary/5'}`}>
                        <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.type === 'booking' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                            <span className="material-symbols-outlined text-2xl">{notif.type === 'booking' ? 'confirmation_number' : 'notifications'}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-gray-900 dark:text-white font-black text-lg">{notif.title}</p>
                                {!notif.read && <div className="size-2.5 rounded-full bg-primary shadow-sm shadow-primary/50"></div>}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                            <p className="text-[10px] font-black uppercase text-gray-400 mt-3 tracking-widest">{notif.date}</p>
                        </div>
                    </div>
                 ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;