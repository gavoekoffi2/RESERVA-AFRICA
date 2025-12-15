import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Favorites: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Favoris</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1a202c] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Hotel" />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-primary hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined filled text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Noom Hotel Abidjan</h3>
                <p className="text-sm text-gray-500 mb-2">Plateau, Abidjan</p>
                <div className="flex items-baseline gap-1">
                   <p className="text-primary font-bold text-lg">125 000 CFA</p>
                   <span className="text-gray-400 text-sm font-normal">/nuit</span>
                </div>
              </div>
            </div>

            <div className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1a202c] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Villa" />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-primary hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined filled text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Villa Océan</h3>
                <p className="text-sm text-gray-500 mb-2">Lomé, Togo</p>
                <div className="flex items-baseline gap-1">
                   <p className="text-primary font-bold text-lg">200 000 CFA</p>
                   <span className="text-gray-400 text-sm font-normal">/nuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;