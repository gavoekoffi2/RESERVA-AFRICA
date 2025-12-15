import React from 'react';

const HostSettings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="space-y-8">
          
          {/* Profile Section */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h2 className="text-xl font-bold mb-4">Profil Public</h2>
             <div className="flex gap-6 items-start">
                 <div className="size-20 rounded-full bg-gray-200 bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")'}}></div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                         <label className="text-sm font-bold text-gray-500 block mb-1">Nom d'affichage</label>
                         <input type="text" defaultValue="Kodjo Mensah" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                     </div>
                     <div>
                         <label className="text-sm font-bold text-gray-500 block mb-1">Lieu</label>
                         <input type="text" defaultValue="Lomé, Togo" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                     </div>
                     <div className="md:col-span-2">
                         <label className="text-sm font-bold text-gray-500 block mb-1">Bio</label>
                         <textarea rows={3} defaultValue="Passionné par mon pays le Togo..." className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"></textarea>
                     </div>
                 </div>
             </div>
             <div className="mt-4 text-right">
                 <button className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800">Enregistrer</button>
             </div>
          </div>

          {/* Payouts Section */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h2 className="text-xl font-bold mb-4">Préférences de versement</h2>
             <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex justify-between items-center border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center gap-3">
                     <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                         <span className="material-symbols-outlined text-green-600">account_balance</span>
                     </div>
                     <div>
                         <p className="font-bold">Compte Bancaire (Ecobank)</p>
                         <p className="text-sm text-gray-500">Terminant par **** 8892</p>
                     </div>
                 </div>
                 <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Par défaut</span>
             </div>
             <button className="mt-4 text-primary font-bold text-sm hover:underline">+ Ajouter un mode de versement</button>
          </div>

          {/* Security */}
           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h2 className="text-xl font-bold mb-4">Sécurité</h2>
             <button className="flex justify-between items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                 <span className="font-medium">Changer de mot de passe</span>
                 <span className="material-symbols-outlined text-gray-400">chevron_right</span>
             </button>
             <button className="flex justify-between items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                 <span className="font-medium">Authentification à deux facteurs</span>
                 <span className="text-sm text-green-600 font-bold">Activé</span>
             </button>
          </div>

      </div>
    </div>
  );
};

export default HostSettings;