import React, { useState } from 'react';
import { useApp, User } from '../../context/AppContext';

const AdminTeam: React.FC = () => {
  const { allUsers, createAdmin } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const admins = allUsers.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN');

  const AVAILABLE_PERMISSIONS = [
      { id: 'manage_users', label: 'Gérer les utilisateurs' },
      { id: 'manage_properties', label: 'Modérer les annonces' },
      { id: 'manage_finance', label: 'Accès aux finances' },
  ];

  const handlePermissionChange = (id: string) => {
      setPermissions(prev => 
          prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newAdmin: User = {
          id: `admin-${Date.now()}`,
          name,
          email,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
          role: 'ADMIN',
          status: 'Active',
          joinDate: new Date().toLocaleDateString('fr-FR'),
          permissions
      };
      createAdmin(newAdmin);
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPermissions([]);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Équipe d'Administration</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Gérez les accès et les rôles des administrateurs.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:opacity-80 transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined">person_add</span> Nouvel Admin
            </button>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-500 font-bold bg-gray-50 dark:bg-gray-800">
                        <th className="p-4">Administrateur</th>
                        <th className="p-4">Rôle</th>
                        <th className="p-4">Permissions</th>
                        <th className="p-4">Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((u, i) => (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${u.avatar}")`}}></div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{u.name} {u.role === 'SUPER_ADMIN' && '👑'}</p>
                                        <p className="text-xs text-gray-500">{u.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {u.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {u.role === 'SUPER_ADMIN' ? (
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Accès total</span>
                                    ) : (
                                        u.permissions && u.permissions.length > 0 ? (
                                            u.permissions.map(p => (
                                                <span key={p} className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                    {AVAILABLE_PERMISSIONS.find(ap => ap.id === p)?.label || p}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs italic text-gray-400">Aucune permission</span>
                                        )
                                    )}
                                </div>
                            </td>
                            <td className="p-4">
                                <span className={`flex items-center gap-2 text-sm font-bold ${u.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                    <span className={`size-2 rounded-full ${u.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                    {u.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Create Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-fade-up p-8">
                    <h2 className="text-2xl font-black mb-6 text-gray-900 dark:text-white">Ajouter un administrateur</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Nom complet</label>
                            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Email</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">Permissions</label>
                            <div className="space-y-2">
                                {AVAILABLE_PERMISSIONS.map((perm) => (
                                    <label key={perm.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            checked={permissions.includes(perm.id)}
                                            onChange={() => handlePermissionChange(perm.id)}
                                            className="w-5 h-5 accent-black dark:accent-white"
                                        />
                                        <span className="font-medium text-gray-900 dark:text-white">{perm.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">Annuler</button>
                            <button type="submit" className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl hover:opacity-80 transition-colors">Créer le compte</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminTeam;