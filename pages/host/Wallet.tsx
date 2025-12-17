import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const HostWallet: React.FC = () => {
  const { bookings, user, systemSettings, transactions, requestWithdrawal } = useApp();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Host Financials
  const commissionRate = systemSettings.commissionRate / 100;
  
  const hostBookings = bookings.filter(b => b.hostId === user?.id || b.hostName === user?.name);
  
  // Solde : Bookings Terminés ou Confirmés moins commission
  const totalEarned = hostBookings
    .filter(b => b.status === 'Confirmé' || b.status === 'Terminé')
    .reduce((acc, b) => acc + ((b.totalAmount || 0) * (1 - commissionRate)), 0);

  const withdrawnTotal = transactions
    .filter(t => t.type === 'withdrawal')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentAvailable = totalEarned - withdrawnTotal;

  const handleWithdraw = () => {
      const amount = parseFloat(withdrawAmount);
      if (amount > 0 && amount <= currentAvailable) {
          requestWithdrawal(amount);
          setWithdrawAmount('');
      }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-display">
       <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Portefeuille</h1>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           {/* Card Balance */}
           <div className="lg:col-span-2 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 p-10 rounded-[40px] shadow-2xl relative overflow-hidden text-white dark:text-black">
               <div className="relative z-10 flex flex-col h-full">
                   <div className="flex justify-between items-start mb-12">
                       <div>
                           <p className="text-white/60 dark:text-black/60 font-black text-xs uppercase tracking-widest mb-1">Solde disponible</p>
                           <h2 className="text-5xl font-black tracking-tight">{currentAvailable.toLocaleString()} <span className="text-2xl font-bold opacity-70">FCFA</span></h2>
                       </div>
                       <div className="size-14 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-md flex items-center justify-center">
                           <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                       </div>
                   </div>
                   
                   <div className="mt-auto flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black uppercase text-white/40 dark:text-black/40 mb-2 ml-1">Montant du virement</label>
                            <input 
                                type="number" 
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-white/10 dark:bg-black/10 border-none rounded-2xl py-4 px-6 text-white dark:text-black placeholder:text-white/30 dark:placeholder:text-black/30 font-black text-xl outline-none ring-1 ring-white/20"
                            />
                        </div>
                        <button 
                            onClick={handleWithdraw}
                            disabled={!withdrawAmount || parseFloat(withdrawAmount) > currentAvailable}
                            className="bg-primary hover:bg-[#d65a1f] disabled:opacity-30 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center"
                        >
                            Retirer les fonds
                        </button>
                   </div>
               </div>
               <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[300px]">payments</span>
               </div>
           </div>

           {/* Summary Sidebar */}
           <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 text-xs font-black uppercase mb-4 tracking-wider">Résumé financier</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-700/50">
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Total gagné</span>
                            <span className="font-black text-gray-900 dark:text-white">{totalEarned.toLocaleString()} F</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-700/50">
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Retraits effectués</span>
                            <span className="font-black text-red-500">- {withdrawnTotal.toLocaleString()} F</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Commission Reseva</span>
                            <span className="font-black text-gray-400">{systemSettings.commissionRate}%</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-[32px] border border-primary/10">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                        <span className="material-symbols-outlined">info</span>
                        <span className="font-bold">Info versements</span>
                    </div>
                    <p className="text-xs text-primary/80 leading-relaxed font-medium">
                        Les virements vers votre compte Orange Money ou MTN sont traités sous 2h. Les virements bancaires peuvent prendre 24 à 48h.
                    </p>
                </div>
           </div>
       </div>

       {/* Transaction List */}
       <div className="bg-white dark:bg-[#1e293b] rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center">
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Historique</h3>
                <button className="text-xs font-black uppercase text-primary tracking-widest hover:underline">Exporter (.PDF)</button>
            </div>
            
            <div className="divide-y divide-gray-50 dark:divide-gray-700/30">
                {transactions.length === 0 ? (
                    <div className="p-20 text-center text-gray-400">Aucune transaction enregistrée.</div>
                ) : (
                    transactions.map((trx) => (
                        <div key={trx.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className={`size-12 rounded-2xl flex items-center justify-center ${trx.type === 'withdrawal' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    <span className="material-symbols-outlined">{trx.type === 'withdrawal' ? 'north_east' : 'south_west'}</span>
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 dark:text-white">{trx.label}</p>
                                    <p className="text-xs text-gray-500 font-bold">{trx.date} • {trx.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-lg font-black ${trx.type === 'withdrawal' ? 'text-red-500' : 'text-green-600'}`}>
                                    {trx.type === 'withdrawal' ? '-' : '+'} {trx.amount.toLocaleString()} F
                                </p>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${trx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {trx.status === 'Completed' ? 'Succès' : 'En cours'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
       </div>
    </div>
  );
};

export default HostWallet;