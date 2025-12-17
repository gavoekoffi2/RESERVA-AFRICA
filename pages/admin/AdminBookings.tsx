import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const AdminBookings: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(b => {
      const matchFilter = filter === 'all' 
        ? true 
        : filter === 'pending' ? b.status === 'En attente'
        : filter === 'confirmed' ? b.status === 'Confirmé'
        : b.status === 'Annulé';
      
      const matchSearch = searchTerm === '' || 
          b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
          b.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchFilter && matchSearch;
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Gestion des Réservations</h1>
             <p className="text-gray-500 dark:text-gray-400 font-medium">Vue d'ensemble de toutes les réservations de la plateforme.</p>
          </div>
          <div className="relative">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input 
                type="text" 
                placeholder="Rechercher (ID, Nom, Titre)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] outline-none focus:border-primary w-full md:w-80 shadow-sm" 
             />
          </div>
       </div>

       <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
           {/* Filters */}
           <div className="flex border-b border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
               {[
                   { id: 'all', label: 'Toutes' },
                   { id: 'pending', label: 'En attente' },
                   { id: 'confirmed', label: 'Confirmées' },
                   { id: 'cancelled', label: 'Annulées' }
               ].map(tab => (
                   <button 
                      key={tab.id} 
                      onClick={() => setFilter(tab.id as any)}
                      className={`px-6 py-3 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${filter === tab.id ? 'border-primary text-primary bg-white dark:bg-[#1e293b]' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-white'}`}
                   >
                       {tab.label}
                   </button>
               ))}
           </div>

           <div className="overflow-x-auto">
               <table className="w-full text-left">
                   <thead>
                       <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs font-bold uppercase text-gray-500 border-b border-gray-100 dark:border-gray-800">
                           <th className="p-4">Référence</th>
                           <th className="p-4">Client</th>
                           <th className="p-4">Hôte</th>
                           <th className="p-4">Service</th>
                           <th className="p-4">Dates</th>
                           <th className="p-4 text-right">Montant</th>
                           <th className="p-4">Statut</th>
                           <th className="p-4 text-right">Actions</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                       {filteredBookings.map(booking => (
                           <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                               <td className="p-4 font-mono font-bold text-xs text-gray-500">{booking.id}</td>
                               <td className="p-4">
                                   <div className="flex items-center gap-2">
                                       <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${booking.guestAvatar}")`}}></div>
                                       <span className="font-bold text-sm text-gray-900 dark:text-white">{booking.guestName}</span>
                                   </div>
                               </td>
                               <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{booking.hostName}</td>
                               <td className="p-4">
                                   <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{booking.title}</p>
                                   <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{booking.type === 'stay' ? 'Hébergement' : booking.type === 'car' ? 'Voiture' : 'Activité'}</span>
                               </td>
                               <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{booking.dates}</td>
                               <td className="p-4 text-right font-bold text-gray-900 dark:text-white">
                                   {booking.totalAmount ? booking.totalAmount.toLocaleString() + ' F' : booking.price}
                               </td>
                               <td className="p-4">
                                   <span className={`px-2 py-1 rounded text-xs font-bold ${
                                       booking.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 
                                       booking.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 
                                       booking.status === 'Annulé' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                   }`}>
                                       {booking.status}
                                   </span>
                               </td>
                               <td className="p-4 text-right">
                                   <div className="flex justify-end gap-2">
                                       {booking.status === 'En attente' && (
                                           <button onClick={() => updateBookingStatus(booking.id, 'Confirmé')} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200" title="Confirmer">
                                               <span className="material-symbols-outlined text-sm">check</span>
                                           </button>
                                       )}
                                       {booking.status !== 'Annulé' && booking.status !== 'Terminé' && (
                                           <button onClick={() => updateBookingStatus(booking.id, 'Annulé')} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Annuler">
                                               <span className="material-symbols-outlined text-sm">cancel</span>
                                           </button>
                                       )}
                                       <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" title="Détails">
                                           <span className="material-symbols-outlined text-sm">visibility</span>
                                       </button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                       {filteredBookings.length === 0 && (
                           <tr>
                               <td colSpan={8} className="p-8 text-center text-gray-500">Aucune réservation trouvée.</td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>
       </div>
    </div>
  );
};

export default AdminBookings;