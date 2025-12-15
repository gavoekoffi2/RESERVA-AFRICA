import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
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
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Bonjour, Kodjo 👋</h1>
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
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Revenus (Oct)</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">2.4M <span className="text-lg">F</span></h2>
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
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Taux d'occupation</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">78%</h2>
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
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">4.92</h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg mb-1">
                 145 avis
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
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Vues (30j)</span>
           </div>
           <div className="flex items-end gap-3">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">1.2k</h2>
              <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg mb-1 flex items-center">
                 <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> +18%
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
               {/* Guest 1 */}
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer">
                  <div className="relative">
                     <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80")'}}></div>
                     <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-gray-800 size-4 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-gray-900 dark:text-white">Jean-Pierre K.</h4>
                     <p className="text-xs text-gray-500">Villa Sunset • Aujourd'hui</p>
                  </div>
                  <button className="size-10 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-lg">chat</span>
                  </button>
               </div>

               {/* Guest 2 */}
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                  <div className="relative">
                     <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80")'}}></div>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-gray-900 dark:text-white">Sarah M.</h4>
                     <p className="text-xs text-gray-500">Loft Abidjan • Demain</p>
                  </div>
                  <button className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-lg">visibility</span>
                  </button>
               </div>
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
                  <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                     <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                           <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80")'}}></div>
                           <span className="font-bold text-gray-900 dark:text-white">Amara Sy</span>
                        </div>
                     </td>
                     <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">Villa Sunset</td>
                     <td className="py-4 text-sm text-gray-500">26 Oct - 29 Oct</td>
                     <td className="py-4">
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                           <span className="size-1.5 rounded-full bg-green-600"></span> Confirmé
                        </span>
                     </td>
                     <td className="py-4 text-right pr-4 font-black text-gray-900 dark:text-white">450 000 F</td>
                  </tr>
                  <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                     <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                           <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80")'}}></div>
                           <span className="font-bold text-gray-900 dark:text-white">Lucas M.</span>
                        </div>
                     </td>
                     <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">Loft Abidjan</td>
                     <td className="py-4 text-sm text-gray-500">28 Oct - 30 Oct</td>
                     <td className="py-4">
                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                           <span className="size-1.5 rounded-full bg-yellow-600 animate-pulse"></span> En attente
                        </span>
                     </td>
                     <td className="py-4 text-right pr-4 font-black text-gray-900 dark:text-white">180 000 F</td>
                  </tr>
                  <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                     <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                           <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80")'}}></div>
                           <span className="font-bold text-gray-900 dark:text-white">Fatou D.</span>
                        </div>
                     </td>
                     <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">Toyota Prado</td>
                     <td className="py-4 text-sm text-gray-500">02 Nov - 05 Nov</td>
                     <td className="py-4">
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                           <span className="size-1.5 rounded-full bg-green-600"></span> Confirmé
                        </span>
                     </td>
                     <td className="py-4 text-right pr-4 font-black text-gray-900 dark:text-white">210 000 F</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;