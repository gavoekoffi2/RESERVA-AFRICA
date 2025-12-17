import React, { useState } from 'react';
import { useApp, Property } from '../../context/AppContext';

const AdminProperties: React.FC = () => {
  const { allProperties, updatePropertyStatus } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'active'>('pending');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredProps = allProperties.filter(p => {
      if (filter === 'pending') return p.status === 'En attente';
      if (filter === 'active') return p.status === 'En ligne';
      return true;
  });

  const handleApprove = (id: number) => {
      updatePropertyStatus(id, 'En ligne');
      setSelectedProperty(null);
  };

  const handleReject = () => {
      if (rejectingId && rejectReason.trim()) {
          updatePropertyStatus(rejectingId, 'Rejeté', rejectReason);
          setRejectingId(null);
          setRejectReason('');
          setSelectedProperty(null);
      }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Modération des Annonces</h1>
        
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setFilter('pending')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'pending' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>En attente ({allProperties.filter(p => p.status === 'En attente').length})</button>
            <button onClick={() => setFilter('active')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'active' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>En ligne</button>
            <button onClick={() => setFilter('all')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>Tout voir</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {filteredProps.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white dark:bg-[#1e293b] rounded-2xl">Aucune propriété dans cette catégorie.</div>
            ) : (
                filteredProps.map(property => (
                    <div key={property.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 h-40 bg-gray-200 rounded-xl bg-cover bg-center shrink-0" style={{backgroundImage: `url("${property.image}")`}}></div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{property.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        property.status === 'En ligne' ? 'bg-green-100 text-green-700' : 
                                        property.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 
                                        property.status === 'Rejeté' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
                                    }`}>{property.status}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-2">{property.location} • {property.type}</p>
                                <p className="text-gray-500 text-sm">Propriétaire: <span className="font-bold text-gray-800 dark:text-gray-200">{property.owner || 'Inconnu'}</span></p>
                                <p className="font-bold text-primary mt-2">{property.price}</p>
                                {property.status === 'Rejeté' && property.rejectionReason && (
                                    <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded-lg border border-red-100">Raison du rejet: {property.rejectionReason}</p>
                                )}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button onClick={() => setSelectedProperty(property)} className="px-6 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-bold transition-colors">Voir Détails</button>
                                {property.status === 'En attente' && (
                                    <>
                                        <button onClick={() => handleApprove(property.id)} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors">Approuver</button>
                                        <button onClick={() => setRejectingId(property.id)} className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-bold transition-colors">Rejeter</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Rejection Modal */}
        {rejectingId !== null && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRejectingId(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-fade-up">
                    <h2 className="text-2xl font-black mb-4">Motif du rejet</h2>
                    <p className="text-sm text-gray-500 mb-6">Veuillez expliquer à l'hôte pourquoi son annonce ne peut pas être publiée en l'état.</p>
                    <textarea 
                        autoFocus
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Ex: Photos de mauvaise qualité, description incomplète..."
                        rows={4}
                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-6"
                    ></textarea>
                    <div className="flex gap-4">
                        <button onClick={() => setRejectingId(null)} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Annuler</button>
                        <button 
                            disabled={!rejectReason.trim()}
                            onClick={handleReject} 
                            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 dark:shadow-none hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            Confirmer le rejet
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Details Modal */}
        {selectedProperty && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProperty(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 animate-fade-up max-h-[90vh] flex flex-col">
                    
                    <div className="relative h-64 bg-gray-200 shrink-0">
                        <img src={selectedProperty.image} className="w-full h-full object-cover" alt="Cover" />
                        <button onClick={() => setSelectedProperty(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="absolute bottom-4 left-4 bg-white dark:bg-black px-4 py-1 rounded-lg text-sm font-bold shadow-lg">
                            ID: {selectedProperty.id}
                        </div>
                    </div>

                    <div className="p-8 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{selectedProperty.title}</h2>
                                <p className="text-gray-500 text-lg flex items-center gap-1"><span className="material-symbols-outlined text-primary">location_on</span> {selectedProperty.location}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-primary">{selectedProperty.price}</p>
                                <p className="text-sm font-bold text-gray-400">/ période</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                    {selectedProperty.description || "Aucune description fournie."}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Caractéristiques</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-bold">Capacité: {selectedProperty.capacity || 2} pers.</span>
                                    {selectedProperty.features?.map((feat, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">{feat}</span>
                                    )) || <span className="text-gray-400 italic">Aucune caractéristique</span>}
                                </div>
                                
                                <div className="mt-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Informations Hôte</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-200"></div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{selectedProperty.owner}</p>
                                            <p className="text-xs text-gray-500">Hôte vérifié</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-4 shrink-0">
                        {selectedProperty.status === 'En attente' && (
                            <>
                                <button onClick={() => setRejectingId(selectedProperty.id)} className="px-6 py-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-xl font-bold transition-colors">Rejeter l'annonce</button>
                                <button onClick={() => handleApprove(selectedProperty.id)} className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold shadow-lg transition-colors">Approuver et Publier</button>
                            </>
                        )}
                        {selectedProperty.status === 'En ligne' && (
                            <button onClick={() => updatePropertyStatus(selectedProperty.id, 'Brouillon')} className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl font-bold transition-colors">Mettre hors ligne</button>
                        )}
                        <button onClick={() => setSelectedProperty(null)} className="px-6 py-3 bg-black text-white rounded-xl font-bold">Fermer</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminProperties;