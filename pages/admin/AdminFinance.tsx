import React from 'react';

const AdminFinance: React.FC = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
       <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Finances & Versements</h1>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-black text-white p-6 rounded-2xl shadow-lg">
               <p className="text-white/70 text-sm font-bold mb-1">Commission Totale (Net)</p>
               <h2 className="text-3xl font-black">1 250 000 F</h2>
               <p className="text-xs bg-white/20 w-fit px-2 py-1 rounded mt-2">+8.5% vs mois dernier</p>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
               <p className="text-gray-500 text-sm font-bold mb-1">En attente de versement</p>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white">4 500 000 F</h2>
               <button className="text-xs font-bold text-primary mt-2 underline">Traiter les paiements</button>
           </div>
           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
               <p className="text-gray-500 text-sm font-bold mb-1">Volume Brut</p>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white">12 500 000 F</h2>
           </div>
       </div>

       <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
           <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Historique des transactions</h3>
           <div className="space-y-4">
               {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                       <div className="flex items-center gap-4">
                           <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                               <span className="material-symbols-outlined">arrow_upward</span>
                           </div>
                           <div>
                               <p className="font-bold text-gray-900 dark:text-white">Réservation #DKR-{880+i}</p>
                               <p className="text-xs text-gray-500">Paiement reçu via Mobile Money</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <p className="font-black text-gray-900 dark:text-white">+ 110 000 F</p>
                           <p className="text-xs text-gray-500">12 Oct 2023</p>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

export default AdminFinance;