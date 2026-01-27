import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { allProperties, allUsers, bookings, hostApplications } = useApp();

  const pendingProperties = allProperties.filter(p => p.status === 'En attente').length;
  const pendingApps = hostApplications.filter(a => a.status === 'Pending').length;
  const activeUsers = allUsers.filter(u => u.status === 'Active').length;

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115] font-display">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">Administration</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base mt-2">Gestion globale de Reserva Africa</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <Link to="/host/setup" className="flex-1 md:flex-none bg-primary hover:bg-primary-dark text-white px-5 py-4 md:py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">add_circle</span> Ajouter un bien
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 animate-fade-in-up">
        <div className="bg-white dark:bg-[#1e293b] p-5 md:p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm">
           <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-xl shrink-0"><span className="material-symbols-outlined text-lg md:text-xl">monetization_on</span></div>
              <span className="text-[9px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">Finance</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none">12.5M</h2>
           <p className="text-[9px] text-green-500 font-bold mt-2 uppercase tracking-widest">+15%</p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-5 md:p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm">
           <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shrink-0"><span className="material-symbols-outlined text-lg md:text-xl">group</span></div>
              <span className="text-[9px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">Membres</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none">{activeUsers}</h2>
           <p className="text-[9px] text-blue-500 font-bold mt-2 uppercase tracking-widest">Total: {allUsers.length}</p>
        </div>

        <Link to="/admin/requests" className="bg-white dark:bg-[#1e293b] p-5 md:p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-primary transition-colors">
           <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl shrink-0"><span className="material-symbols-outlined text-lg md:text-xl">person_search</span></div>
              <span className="text-[9px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">Dossiers</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none">{pendingApps}</h2>
           <p className="text-[9px] text-purple-500 font-bold mt-2 uppercase tracking-widest">À traiter</p>
        </Link>

        <Link to="/admin/properties" className="bg-white dark:bg-[#1e293b] p-5 md:p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-primary transition-colors">
           <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl shrink-0"><span className="material-symbols-outlined text-lg md:text-xl">rule</span></div>
              <span className="text-[9px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">Biens</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none">{pendingProperties}</h2>
           <p className="text-[9px] text-orange-500 font-bold mt-2 uppercase tracking-widest">En attente</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
         <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Activités récentes</h3>
            <div className="space-y-4">
                {bookings.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                            <span className="material-symbols-outlined text-xl">shopping_cart</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 dark:text-white truncate">Réservation <span className="text-gray-400 font-medium">#{b.id}</span></p>
                            <p className="text-[10px] text-gray-500 truncate">{b.title} • {b.price}</p>
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase">2h</span>
                    </div>
                ))}
            </div>
         </div>

         <div className="bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Actions Rapides</h3>
            <div className="space-y-3 flex-1">
                <Link to="/host/setup" className="w-full flex items-center gap-4 p-5 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all shadow-xl group">
                    <span className="material-symbols-outlined">add_business</span>
                    <span className="font-black text-[10px] uppercase tracking-widest">Nouveau Bien Admin</span>
                </Link>
                <Link to="/admin/requests" className="w-full flex items-center gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">how_to_reg</span>
                    <span className="font-black text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-200">Valider Dossiers</span>
                </Link>
                <Link to="/admin/users" className="w-full flex items-center gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">manage_accounts</span>
                    <span className="font-black text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-200">Gérer Membres</span>
                </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;