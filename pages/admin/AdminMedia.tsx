
import React, { useState } from 'react';
// Import SiteAsset from AppContext to fix type inference issues
import { useApp, SiteAsset } from '../../context/AppContext';

const AdminMedia: React.FC = () => {
  const { siteAssets, updateSiteAsset } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');

  // Cast Object.values to SiteAsset[] to prevent 'unknown' property errors in the map function
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
       <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Médiathèque du Site</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Gérez et modifiez les visuels statiques de la plateforme.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assetsArray.map((asset) => (
             <div key={asset.id} className="bg-white dark:bg-[#1e293b] rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col group">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img src={asset.url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={asset.name} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                           onClick={() => handleEdit(asset.id, asset.url)}
                           className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                           Modifier
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{asset.name}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-black mt-1">ID: {asset.id}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase">{asset.category}</span>
                    </div>

                    {editingId === asset.id ? (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">URL de l'image</label>
                                <textarea 
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono outline-none focus:ring-2 focus:ring-primary/20"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleSave}
                                    className="flex-1 bg-black text-white dark:bg-white dark:text-black py-2.5 rounded-xl font-bold text-sm"
                                >
                                    Enregistrer
                                </button>
                                <button 
                                    onClick={() => setEditingId(null)}
                                    className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-xl font-bold text-sm"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 font-mono truncate bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">{asset.url}</p>
                    )}
                </div>
             </div>
          ))}
       </div>

       <div className="mt-12 p-8 bg-primary/5 rounded-[40px] border border-primary/10">
           <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">help</span> Comment ça marche ?
           </h3>
           <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Toutes les images modifiées ici sont instantanément mises à jour pour tous les utilisateurs. Pour de meilleurs résultats, utilisez des URLs d'images haute résolution (Unsplash, CDN, etc.). 
              Ce système permet une gestion flexible de l'identité visuelle de **Reseva Africa** sans toucher au code source.
           </p>
       </div>
    </div>
  );
};

export default AdminMedia;
