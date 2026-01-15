import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminUsers: React.FC = () => {
  const { allUsers, toggleUserStatus, toggleUserRole, addNotification } = useApp();

  const handleStatusToggle = (email: string, currentStatus: string) => {
      const msg = currentStatus === 'Active' ? 'Utilisateur suspendu' : 'Utilisateur réactivé';
      toggleUserStatus(email);
      addNotification('info', msg);
  };

  const handleRoleToggle = (email: string, currentRole: string) => {
      const msg = currentRole === 'GUEST' ? 'Utilisateur promu Hôte' : 'Utilisateur rétrogradé';
      toggleUserRole(email);
      addNotification('success', msg);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115] font-display">
        <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Utilisateurs</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Gestion globale des comptes et permissions</p>
        </div>
        
        <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl shadow-gray-200/40 dark:shadow-none">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 text-[10px] uppercase text-gray-400 font-black tracking-[0.2em] bg-gray-50/50 dark:bg-gray-800/30">
                            <th className="p-6">Identité</th>
                            <th className="p-6">Permissions</th>
                            <th className="p-6">Date Inscription</th>
                            <th className="p-6">Statut Compte</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {allUsers.map((u, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors animate-reveal" style={{animationDelay: `${i * 0.05}s`}}>
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-gray-100 bg-cover bg-center shadow-sm border-2 border-white dark:border-gray-700" style={{backgroundImage: `url("${u.avatar}")`}}></div>
                                        <div>
                                            <p className="font-black text-gray-900 dark:text-white">{u.name}</p>
                                            <p className="text-xs text-gray-400 font-medium">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                            u.role === 'SUPER_ADMIN' ? 'bg-black text-white' : 
                                            u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 
                                            u.role === 'HOST' ? 'bg-primary/10 text-primary' : 
                                            'bg-gray-100 text-gray-500'
                                        }`}>
                                            {u.role}
                                        </span>
                                        {(u.role === 'GUEST' || u.role === 'HOST') && (
                                            <button 
                                                onClick={() => handleRoleToggle(u.email, u.role)}
                                                className="text-[9px] font-black text-primary hover:underline uppercase tracking-tighter"
                                                title={u.role === 'GUEST' ? 'Passer en Hôte' : 'Passer en Voyageur'}
                                            >
                                                {u.role === 'GUEST' ? 'Promouvoir' : 'Rétrograder'}
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="p-6 text-xs text-gray-500 font-bold uppercase tracking-widest">{u.joinDate}</td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        <span className={`size-2 rounded-full ${u.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button 
                                            onClick={() => handleStatusToggle(u.email, u.status || 'Active')}
                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${
                                                u.status === 'Active' 
                                                ? 'border-red-50 text-red-600 hover:bg-red-600 hover:text-white' 
                                                : 'border-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                                            }`}
                                        >
                                            {u.status === 'Active' ? 'Suspendre' : 'Réactiver'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default AdminUsers;