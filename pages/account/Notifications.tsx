import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Notifications: React.FC = () => {
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

        {/* Content */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
              <button className="text-sm text-primary font-bold hover:underline">Tout marquer comme lu</button>
          </div>
          
          <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
             
             {/* Notif 1 */}
             <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-primary/5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex gap-4 cursor-pointer">
                 <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                     <span className="material-symbols-outlined">confirmation_number</span>
                 </div>
                 <div className="flex-1">
                     <p className="text-gray-900 dark:text-white font-medium">Réservation confirmée</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Votre séjour à <span className="font-bold">Villa Sunset</span> a été confirmé par l'hôte. Bon voyage !</p>
                     <p className="text-xs text-gray-400 mt-2">Il y a 2 heures</p>
                 </div>
                 <div className="size-2 rounded-full bg-primary mt-2"></div>
             </div>

             {/* Notif 2 */}
             <div className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex gap-4 cursor-pointer">
                 <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                     <span className="material-symbols-outlined">chat</span>
                 </div>
                 <div className="flex-1">
                     <p className="text-gray-900 dark:text-white font-medium">Nouveau message</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kodjo Mensah vous a envoyé un message : "Bonjour, à quelle heure pensez-vous arriver ?"</p>
                     <p className="text-xs text-gray-400 mt-2">Hier</p>
                 </div>
             </div>

              {/* Notif 3 */}
             <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex gap-4 cursor-pointer">
                 <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                     <span className="material-symbols-outlined">local_offer</span>
                 </div>
                 <div className="flex-1">
                     <p className="text-gray-900 dark:text-white font-medium">Offre spéciale</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">-20% sur votre prochaine location de voiture à Dakar ! Profitez-en maintenant.</p>
                     <p className="text-xs text-gray-400 mt-2">Il y a 3 jours</p>
                 </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;