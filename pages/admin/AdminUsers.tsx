import React from 'react';
import { useApp } from '../../context/AppContext';

const AdminUsers: React.FC = () => {
  const { allUsers, toggleUserStatus } = useApp();

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Gestion des Utilisateurs</h1>
        
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-500 font-bold bg-gray-50 dark:bg-gray-800">
                            <th className="p-4">Utilisateur</th>
                            <th className="p-4">Rôle</th>
                            <th className="p-4">Date d'inscription</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((u, i) => (
                            <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${u.avatar || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200'}")`}}></div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                                            <p className="text-xs text-gray-500">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : u.role === 'HOST' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{u.joinDate}</td>
                                <td className="p-4">
                                    <span className={`flex items-center gap-2 text-sm font-bold ${u.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className={`size-2 rounded-full ${u.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => toggleUserStatus(u.email)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                                            u.status === 'Active' 
                                            ? 'border-red-200 text-red-600 hover:bg-red-50' 
                                            : 'border-green-200 text-green-600 hover:bg-green-50'
                                        }`}
                                    >
                                        {u.status === 'Active' ? 'Suspendre' : 'Activer'}
                                    </button>
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