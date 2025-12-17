import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Favorites: React.FC = () => {
  const location = useLocation();
  const { user, favorites, allProperties, toggleFavorite } = useApp();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  const favoriteProperties = allProperties.filter(p => favorites.has(p.id));

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: `url("${user?.avatar || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200'}")`}}></div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">{user?.name || 'Visiteur'}</h1>
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
            {favoriteProperties.length > 0 ? (
                favoriteProperties.map(property => (
                    <Link to={`/search/${property.type === 'Hébergement' ? 'stays' : property.type === 'Voiture' ? 'cars' : 'attractions'}/${property.id}`} key={property.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1a202c] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all cursor-pointer">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                        <img src={property.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={property.title} />
                        <button 
                            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-red-500 hover:scale-110 transition-transform"
                        >
                        <span className="material-symbols-outlined filled text-[20px] icon-filled">favorite</span>
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
                            <div className="flex items-center text-xs font-bold gap-1"><span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> {property.rating}</div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2 truncate">{property.location}</p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-primary font-bold text-lg">{property.price}</p>
                            <span className="text-gray-400 text-sm font-normal">
                                {property.type === 'Hébergement' ? '/nuit' : property.type === 'Voiture' ? '/jour' : ''}
                            </span>
                        </div>
                    </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <span className="material-symbols-outlined text-4xl">favorite_border</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun favori pour le moment</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Explorez et sauvegardez les annonces qui vous plaisent.</p>
                    <Link to="/search/stays" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg font-bold">Explorer</Link>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;