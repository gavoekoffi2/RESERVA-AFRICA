import React, { useState } from 'react';
import { useApp, SiteAsset } from '../../context/AppContext';

const AdminMedia: React.FC = () => {
  const { siteAssets, updateSiteAsset } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');

  const assetsArray = Object.values(siteAssets) as SiteAsset[];

  const handleEdit = (id: string, currentUrl: string) => {
      setEditingId(id);
      setNewUrl(currentUrl);
  };

  const handleSave = () => {
      if (editingId && newUrl.trim()) {
          updateSiteAsset(editingId, newUrl);
          setEditingId(null);
      }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
       <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Identité Visuelle & Médias</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mt-1">Gérez le branding global et les visuels de Reserva Africa.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 border border-blue-100">
                <span className="material-symbols-outlined text-sm">cloud_done</span> Live Sync
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {assetsArray.map((asset) => (
             <div key={asset.id} className="bg-white dark:bg-[#1e293b] rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col group transition-all hover:shadow-2xl">
                <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    {asset.url ? (
                        <img src={asset.url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" alt={asset.name} />
                    ) : (
                        <div className="flex flex-col items-center gap-3 text-gray-300">
                            <span className="material-symbols-outlined text-5xl">{asset.category === 'logo' ? 'branding_watermark' : 'image'}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Image non définie</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button 
                           onClick={() => handleEdit(asset.id, asset.url)}
                           className="bg-white text-black px-10 py-3 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs"
                        >
                           Mettre à jour
                        </button>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tight">{asset.name}</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mt-1">Référence: {asset.id}</p>
                        </div>
                        <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest ${asset.category === 'logo' ? 'bg-purple-100 text-purple-700' : 'bg-primary/10 text-primary'}`}>
                            {asset.category}
                        </span>
                    </div>

                    {editingId === asset.id ? (
                        <div className="space-y-5 animate-fade-in">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">URL Publique (Unsplash, CDN, Host...)</label>
                                <textarea 
                                    autoFocus
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    className="w-full p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono outline-none focus:border-primary transition-all resize-none"
                                    rows={3}
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                                >
                                    Enregistrer
                                </button>
                                <button 
                                    onClick={() => setEditingId(null)}
                                    className="flex-1 bg-gray-100 text-gray-500 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                             <p className="text-[10px] text-gray-400 font-mono break-all line-clamp-1">{asset.url || 'Aucune URL configurée'}</p>
                        </div>
                    )}
                </div>
             </div>
          ))}
       </div>

       <div className="mt-16 p-10 bg-primary/5 rounded-[50px] border-2 border-dashed border-primary/20 max-w-4xl">
           <h3 className="text-2xl font-black text-primary mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl">info_spark</span> Conseils d'administration
           </h3>
           <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              <li className="flex gap-3"><span className="text-primary font-black">•</span> Privilégiez les images de haute qualité (min 1920px) pour les bannières Hero.</li>
              <li className="flex gap-3"><span className="text-primary font-black">•</span> Le **Logo** doit idéalement être en format PNG avec fond transparent pour un meilleur rendu.</li>
              <li className="flex gap-3"><span className="text-primary font-black">•</span> Utilisez des services comme Unsplash pour des visuels professionnels sans droits d'auteur.</li>
           </ul>
       </div>
    </div>
  );
};

export default AdminMedia;