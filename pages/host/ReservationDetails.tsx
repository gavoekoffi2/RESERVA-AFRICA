import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ReservationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBookingStatus } = useApp();
  
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
      return <div className="p-8">Réservation non trouvée</div>;
  }

  const handleAction = (status: 'Confirmé' | 'Annulé') => {
      updateBookingStatus(booking.id, status);
      navigate('/host/dashboard');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
       <Link to="/host/dashboard" className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-black dark:hover:text-white">
           <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
       </Link>

       <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
           {/* Header Status */}
           <div className={`p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center ${
               booking.status === 'Confirmé' ? 'bg-green-50/50' : 
               booking.status === 'En attente' ? 'bg-yellow-50/50' : 'bg-gray-50/50'
           }`}>
               <div>
                   <h1 className="text-2xl font-black text-gray-900 dark:text-white">Réservation #{booking.id}</h1>
                   <p className="text-sm text-gray-500">Effectuée le 10 Oct 2023</p>
               </div>
               <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                   booking.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 
                   booking.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
               }`}>
                   {booking.status}
               </span>
           </div>

           <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Guest Info */}
               <div>
                   <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-wider">Voyageur</h3>
                   <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                       <div className="size-14 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${booking.guestAvatar}")`}}></div>
                       <div>
                           <p className="font-bold text-lg text-gray-900 dark:text-white">{booking.guestName}</p>
                           <p className="text-sm text-gray-500">Membre depuis 2023</p>
                           <button className="text-primary text-sm font-bold mt-1 hover:underline">Envoyer un message</button>
                       </div>
                   </div>
               </div>

               {/* Payment Info */}
               <div>
                   <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-wider">Paiement</h3>
                   <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-2">
                       <div className="flex justify-between">
                           <span className="text-gray-600 dark:text-gray-300">Prix total</span>
                           <span className="font-bold text-gray-900 dark:text-white">{booking.totalAmount?.toLocaleString()} FCFA</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-gray-600 dark:text-gray-300">Commission plateforme (15%)</span>
                           <span className="font-bold text-red-500">- {(booking.totalAmount! * 0.15).toLocaleString()} FCFA</span>
                       </div>
                       <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between text-lg">
                           <span className="font-bold text-gray-900 dark:text-white">Net à verser</span>
                           <span className="font-black text-green-600">{(booking.totalAmount! * 0.85).toLocaleString()} FCFA</span>
                       </div>
                   </div>
               </div>

               {/* Trip Details */}
               <div className="md:col-span-2">
                   <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-wider">Détails du voyage</h3>
                   <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1">
                           <p className="text-xs font-bold text-gray-400 uppercase">Propriété</p>
                           <p className="font-bold text-gray-900 dark:text-white text-lg">{booking.title}</p>
                           <p className="text-sm text-gray-500">{booking.location}</p>
                       </div>
                       <div className="flex-1">
                           <p className="text-xs font-bold text-gray-400 uppercase">Dates</p>
                           <p className="font-bold text-gray-900 dark:text-white text-lg">{booking.dates}</p>
                           <p className="text-sm text-gray-500">3 Nuits</p>
                       </div>
                       <div className="flex-1">
                           <p className="text-xs font-bold text-gray-400 uppercase">Voyageurs</p>
                           <p className="font-bold text-gray-900 dark:text-white text-lg">2 Adultes</p>
                       </div>
                   </div>
               </div>
           </div>

           {/* Actions */}
           {booking.status === 'En attente' && (
               <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                   <button 
                       onClick={() => handleAction('Annulé')}
                       className="px-6 py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors"
                   >
                       Refuser
                   </button>
                   <button 
                       onClick={() => handleAction('Confirmé')}
                       className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-200 dark:shadow-none transition-colors"
                   >
                       Accepter la réservation
                   </button>
               </div>
           )}
       </div>
    </div>
  );
};

export default ReservationDetails;