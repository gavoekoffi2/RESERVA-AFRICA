import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Profile: React.FC = () => {
  const location = useLocation();
  const { user, updateUser } = useApp();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      bio: ''
  });

  useEffect(() => {
      if (user) {
          const [first, ...last] = user.name.split(' ');
          setFormData({
              firstName: first || '',
              lastName: last.join(' ') || '',
              email: user.email || '',
              bio: user.bio || ''
          });
      }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          bio: formData.bio
      });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: `url("${user?.avatar}")`}}></div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">{user?.name}</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres du Profil</h2>
          
          <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex gap-5 items-center mb-6">
              <div className="size-24 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${user?.avatar}")`}}></div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-md hover:bg-[#d65a1f] transition-colors">Changer la photo</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prénom</label>
                <input 
                    className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent dark:text-white" 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nom</label>
                <input 
                    className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent dark:text-white" 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                <input 
                    className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent dark:text-white" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bio</label>
                <textarea 
                    className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-transparent dark:text-white" 
                    rows={3} 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Parlez-nous un peu de vous..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 mt-4 md:col-span-2">
                <button type="button" onClick={() => window.location.reload()} className="px-6 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors dark:text-white dark:border-gray-600 dark:hover:bg-gray-800">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors dark:bg-white dark:text-black">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;