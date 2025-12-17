import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const AdminSystemSettings: React.FC = () => {
  const { addNotification, systemSettings, updateSystemSettings } = useApp();
  const [commission, setCommission] = useState(systemSettings.commissionRate);
  const [serviceFee, setServiceFee] = useState(systemSettings.serviceFeeRate);
  const [maintenance, setMaintenance] = useState(systemSettings.maintenanceMode);

  useEffect(() => {
      setCommission(systemSettings.commissionRate);
      setServiceFee(systemSettings.serviceFeeRate);
      setMaintenance(systemSettings.maintenanceMode);
  }, [systemSettings]);

  const handleSave = () => {
      updateSystemSettings({
          commissionRate: commission,
          serviceFeeRate: serviceFee,
          maintenanceMode: maintenance
      });
      addNotification('success', 'Paramètres système mis à jour');
  };

  return (
    <div className="p-8 max-w-[1000px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
       <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Configuration Système</h1>

       <div className="space-y-6">
           {/* Fees */}
           <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">percent</span> Commission & Frais
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                       <label className="block text-sm font-bold text-gray-500 mb-2">Commission Hôte (%)</label>
                       <input 
                            type="number" 
                            value={commission}
                            onChange={(e) => setCommission(Number(e.target.value))}
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-bold text-lg text-gray-900 dark:text-white" 
                        />
                       <p className="text-xs text-gray-400 mt-2">Pourcentage prélevé sur chaque réservation.</p>
                   </div>
                   <div>
                       <label className="block text-sm font-bold text-gray-500 mb-2">Frais de service Voyageur (%)</label>
                       <input 
                            type="number" 
                            value={serviceFee}
                            onChange={(e) => setServiceFee(Number(e.target.value))}
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-bold text-lg text-gray-900 dark:text-white" 
                        />
                   </div>
               </div>
           </div>

           {/* Maintenance */}
           <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <span className="material-symbols-outlined text-red-500">engineering</span> Maintenance
               </h2>
               <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                   <div>
                       <p className="font-bold text-red-800 dark:text-red-400">Mode Maintenance</p>
                       <p className="text-sm text-red-600/80 dark:text-red-400/70">Si activé, seuls les administrateurs pourront accéder au site.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={maintenance} onChange={() => setMaintenance(!maintenance)} className="sr-only peer" />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
               </div>
           </div>

           <div className="flex justify-end">
               <button onClick={handleSave} className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold hover:opacity-80 transition-all shadow-lg">
                   Enregistrer les modifications
               </button>
           </div>
       </div>
    </div>
  );
};

export default AdminSystemSettings;