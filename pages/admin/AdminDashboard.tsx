import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { allProperties, allUsers, bookings } = useApp();

  const pendingProperties = allProperties.filter(p => p.status === 'En attente').length;
  const activeUsers = allUsers.filter(u => u.status === 'Active').length;
  const totalRevenue = "12.5M FCFA"; // Mocked calculation

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Vue d'ensemble</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Administration Globale de Reseva Africa</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span> Rapport
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
        
        {/* Revenue */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                 <span className="material-symbols-outlined text-xl">monetization_on</span>
              </div>
              <span className="text-sm font-bold text-gray-500">Volume d'affaires</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">{totalRevenue}</h2>
           <p className="text-xs text-green-500 font-bold mt-1">+15% ce mois</p>
        </div>

        {/* Users */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                 <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <span className="text-sm font-bold text-gray-500">Utilisateurs Actifs</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">{activeUsers}</h2>
           <p className="text-xs text-blue-500 font-bold mt-1">Total: {allUsers.length} comptes</p>
        </div>

        {/* Bookings */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                 <span className="material-symbols-outlined text-xl">book_online</span>
              </div>
              <span className="text-sm font-bold text-gray-500">Réservations</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">{bookings.length}</h2>
           <p className="text-xs text-purple-500 font-bold mt-1">En cours</p>
        </div>

        {/* Pending Approvals */}
        <Link to="/admin/properties" className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:border-primary transition-colors cursor-pointer">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                 <span className="material-symbols-outlined text-xl">rule</span>
              </div>
              <span className="text-sm font-bold text-gray-500">Modération</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">{pendingProperties}</h2>
           <p className="text-xs text-orange-500 font-bold mt-1">Annonces en attente</p>
           <span className="absolute top-4 right-4 bg-red-500 w-3 h-3 rounded-full animate-ping" style={{ display: pendingProperties > 0 ? 'block' : 'none' }}></span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Actions */}
         <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Activités récentes</h3>
            </div>
            <div className="space-y-4">
                {bookings.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined text-xl">shopping_cart</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">Nouvelle réservation <span className="font-normal text-gray-500">#{b.id}</span></p>
                            <p className="text-xs text-gray-500">{b.title} • {b.price}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-400">Il y a 2h</span>
                    </div>
                ))}
                {allProperties.filter(p => p.status === 'En attente').map((p, i) => (
                    <div key={`prop-${i}`} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20">
                        <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <span className="material-symbols-outlined text-xl">add_home</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">Nouvelle annonce soumise</p>
                            <p className="text-xs text-gray-500">{p.title} par {p.owner}</p>
                        </div>
                        <Link to="/admin/properties" className="text-xs font-bold bg-white dark:bg-black px-3 py-1 rounded-lg border shadow-sm">Examiner</Link>
                    </div>
                ))}
            </div>
         </div>

         {/* Quick Actions */}
         <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Actions Rapides</h3>
            <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">person_add</span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">Ajouter un admin</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">payments</span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">Générer les versements</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">settings</span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">Paramètres système</span>
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;