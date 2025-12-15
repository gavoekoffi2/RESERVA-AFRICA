import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Security: React.FC = () => {
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sécurité du compte</h2>
          </div>
          
          {/* Password Section */}
          <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4">Changer de mot de passe</h3>
            <form className="max-w-md flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Mot de passe actuel</label>
                    <input className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent" type="password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
                    <input className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent" type="password" />
                </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Confirmer le nouveau mot de passe</label>
                    <input className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent" type="password" />
                </div>
                <button className="bg-black text-white py-2 px-6 rounded-lg font-bold w-fit mt-2 hover:bg-gray-800 transition-colors">Mettre à jour</button>
            </form>
          </div>

           {/* 2FA Section */}
           <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 flex justify-between items-center">
               <div>
                   <h3 className="text-lg font-bold mb-1">Authentification à deux facteurs (2FA)</h3>
                   <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
               </div>
               <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-300 bg-gray-200">
                   <span className="translate-x-0 inline-block w-5 h-5 m-0.5 rounded-full bg-white shadow transform transition duration-200 ease-in-out"></span>
               </div>
           </div>

           {/* Delete Account */}
           <div className="bg-red-50 dark:bg-red-900/10 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-900/30 mt-4">
               <h3 className="text-lg font-bold text-red-600 mb-2">Zone Danger</h3>
               <p className="text-sm text-red-800/80 mb-4">La suppression de votre compte est irréversible. Toutes vos données seront effacées.</p>
               <button className="border border-red-200 text-red-600 font-bold py-2 px-6 rounded-lg hover:bg-red-100 transition-colors">Supprimer mon compte</button>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Security;