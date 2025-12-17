import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Dashboard: React.FC = () => {
  const { bookings, properties, user } = useApp();

  // Filter Data for the Current Host
  const myProperties = properties.filter(p => p.owner === user?.name);
  const myBookings = bookings.filter(b => b.hostName === user?.name);

  // Calculate dynamic stats
  const totalRevenue = myBookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const revenueString = totalRevenue > 1000000 ? `${(totalRevenue / 1000000).toFixed(1)}M` : `${(totalRevenue / 1000).toFixed(0)}k`;
  
  const reviewsCount = myProperties.reduce((acc, p) => acc + (p.reviews || 0), 0);
  const avgRating = myProperties.length > 0 
    ? (myProperties.reduce((acc, p) => acc + (p.rating || 0), 0) / myProperties.length).toFixed(1) 
    : '0';

  const upcomingBookings = myBookings.filter(b => b.status === 'Confirmé' || b.status === 'En attente');

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
      
      {/* Styles for animation */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Bonjour, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Voici ce qui se passe sur vos propriétés aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/host/properties/add" className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl font-bold hover:opacity-80 transition-all shadow-lg flex items-center gap-2">
              <span className="material-symbols-outlined">add</span> Créer une annonce
           </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        {/* Revenue */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">payments</span>
           </div>
           <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                 <span className="material-symbols-outlined text-xl">payments</span>
              </div>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Revenus (Total)</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{revenueString} <span className="text-lg">F</span></h2>
              <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg mb-1 flex items-center">
                 <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> +12%
              </span>
           </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-blue-500">door_front</span>
           </div>
           <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                 <span className="material-symbols-outlined text-xl">door_front</span>
              </div>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Réservations</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{upcomingBookings.length}</h2>
              <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg mb-1 flex items-center">
                 <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> +5%
              </span>
           </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-yellow-500">star</span>
           </div>
           <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500">
                 <span className="material-symbols-outlined text-xl">star</span>
              </div>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Note moyenne</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{avgRating}</h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg mb-1">
                 {reviewsCount} avis
              </span>
           </div>
        </div>

        {/* Views */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-purple-500">visibility</span>
           </div>
           <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                 <span className="material-symbols-outlined text-xl">visibility</span>
              </div>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Propriétés</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{myProperties.length}</h2>
              <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg mb-1 flex items-center">
                 <span className="material-symbols-outlined text-xs mr-0.5">add</span> New
              </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
         {/* Main Chart Section */}
         <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aperçu des revenus</h3>
                  <p className="text-sm text-gray-500">Vos performances sur les 6 derniers mois</p>
               </div>
               <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2 font-bold text-sm text-gray-700 dark:text-gray-300 cursor-pointer outline-none">
                  <option>6 derniers mois</option>
                  <option>Cette année</option>
               </select>
            </div>
            
            {/* Simulated Chart */}
            <div className="flex items-end justify-between gap-4 h-64 w-full">
               {[
                  { m: 'Mai', h: '40%', v: '1.2M' },
                  { m: 'Juin', h: '55%', v: '1.5M' },
                  { m: 'Juil', h: '70%', v: '1.9M' },
                  { m: 'Août', h: '90%', v: '2.8M' },
                  { m: 'Sep', h: '65%', v: '1.8M' },
                  { m: 'Oct', h: '80%', v: '2.4M', active: true },
               ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                     <div className="relative w-full h-full flex items-end justify-center">
                        <div 
                           className={`w-full max-w-[40px] rounded-t-xl transition-all duration-1000 ease-out group-hover:opacity-80 ${bar.active ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-700'}`} 
                           style={{ height: bar.h }}
                        >
                           {/* Tooltip */}
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {bar.v}
                           </div>
                        </div>
                     </div>
                     <span className={`text-sm font-bold ${bar.active ? 'text-primary' : 'text-gray-400'}`}>{bar.m}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Upcoming Arrivals */}
         <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Arrivées imminentes</h3>
            
            <div className="flex-1 space-y-4">
               {upcomingBookings.slice(0, 3).map((booking, idx) => (
                   <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="relative">
                         <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${booking.guestAvatar}")`}}></div>
                         <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-gray-800 size-4 rounded-full"></div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <h4 className="font-bold text-gray-900 dark:text-white truncate">{booking.guestName}</h4>
                         <p className="text-xs text-gray-500 truncate">{booking.title}</p>
                      </div>
                      <Link to={`/host/reservation/${booking.id}`} className="size-10 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                         <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                   </div>
               ))}
               {upcomingBookings.length === 0 && (
                   <div className="text-center text-gray-500 text-sm">Aucune arrivée prévue.</div>
               )}
            </div>

            <Link to="/host/calendar" className="mt-6 w-full py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 font-bold text-center text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all">
               Voir le calendrier
            </Link>
         </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Réservations récentes</h3>
            <Link to="/host/properties" className="text-primary font-bold text-sm hover:underline">Tout voir</Link>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left text-xs font-bold uppercase text-gray-400 tracking-wider border-b border-gray-100 dark:border-gray-800">
                     <th className="pb-4 pl-4">Voyageur</th>
                     <th className="pb-4">Propriété</th>
                     <th className="pb-4">Dates</th>
                     <th className="pb-4">Statut</th>
                     <th className="pb-4 text-right pr-4">Montant</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {myBookings.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                         <td className="py-4 pl-4">
                            <div className="flex items-center gap-3">
                               <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${booking.guestAvatar}")`}}></div>
                               <span className="font-bold text-gray-900 dark:text-white">{booking.guestName}</span>
                            </div>
                         </td>
                         <td className="py-4 text-gray-600 dark:text-gray-300 font-medium truncate max-w-[200px]">{booking.title}</td>
                         <td className="py-4 text-sm text-gray-500">{booking.dates}</td>
                         <td className="py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                                booking.status === 'Confirmé' ? 'bg-green-100 text-green-700' :
                                booking.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                               <span className={`size-1.5 rounded-full ${booking.status === 'Confirmé' ? 'bg-green-600' : booking.status === 'En attente' ? 'bg-yellow-600 animate-pulse' : 'bg-red-600'}`}></span> {booking.status}
                            </span>
                         </td>
                         <td className="py-4 text-right pr-4 font-black text-gray-900 dark:text-white">{booking.totalAmount ? booking.totalAmount.toLocaleString() : booking.price} F</td>
                      </tr>
                  ))}
                  {myBookings.length === 0 && (
                      <tr><td colSpan={5} className="py-8 text-center text-gray-500">Aucune réservation récente.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;