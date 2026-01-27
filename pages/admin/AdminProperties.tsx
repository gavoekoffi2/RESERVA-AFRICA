import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, Property } from '../../context/AppContext';

const AdminProperties: React.FC = () => {
  const { allProperties, updatePropertyStatus, deleteProperty } = useApp();
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

  const handleDelete = (id: number) => {
      if (confirm('Voulez-vous vraiment supprimer définitivement cette annonce ?')) {
          deleteProperty(id);
      }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115] font-display">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Modération & Inventaire</h1>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Gérez les annonces de la plateforme ou ajoutez les vôtres</p>
            </div>
            <Link to="/host/setup" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl transition-all btn-active-scale">
                <span className="material-symbols-outlined">add</span>
                Créer un item
            </Link>
        </div>
        
        <div className="flex gap-6 mb-10 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setFilter('pending')} className={`pb-4 border-b-4 px-2 font-black text-xs uppercase tracking-widest transition-all ${filter === 'pending' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>En attente ({allProperties.filter(p => p.status === 'En attente').length})</button>
            <button onClick={() => setFilter('active')} className={`pb-4 border-b-4 px-2 font-black text-xs uppercase tracking-widest transition-all ${filter === 'active' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>En ligne</button>
            <button onClick={() => setFilter('all')} className={`pb-4 border-b-4 px-2 font-black text-xs uppercase tracking-widest transition-all ${filter === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Tout l'inventaire</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {filteredProps.length === 0 ? (
                <div className="text-center py-24 text-gray-400 bg-white dark:bg-[#1e293b] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
                    <span className="material-symbols-outlined text-6xl mb-4 block opacity-20">inventory_2</span>
                    Aucun item dans cette catégorie.
                </div>
            ) : (
                filteredProps.map(property => (
                    <div key={property.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl transition-all animate-reveal">
                        <div className="w-full md:w-64 h-44 bg-gray-200 rounded-3xl bg-cover bg-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url("${property.image}")`}}></div>
                        
                        <div className="flex-1 flex flex-col justify-between w-full">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1 block">{property.type}</span>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{property.title}</h3>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        property.status === 'En ligne' ? 'bg-green-50 text-green-600' : 
                                        property.status === 'En attente' ? 'bg-yellow-50 text-yellow-600' : 
                                        property.status === 'Rejeté' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                                    }`}>{property.status}</span>
                                </div>
                                <p className="text-gray-500 font-medium mb-3 flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {property.location}</p>
                                <div className="flex items-center gap-4">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hôte: <span className="text-gray-800 dark:text-gray-200">{property.owner || 'Admin'}</span></p>
                                    <p className="font-black text-primary text-xl tracking-tighter">{property.price}</p>
                                </div>
                                {property.status === 'Rejeté' && property.rejectionReason && (
                                    <p className="text-xs text-red-500 mt-4 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">Raison du rejet: {property.rejectionReason}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 mt-6">
                                <button onClick={() => setSelectedProperty(property)} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Détails complets</button>
                                <Link to={`/host/properties/edit/${property.id}`} className="px-6 py-3 border-2 border-gray-100 dark:border-gray-700 hover:border-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Éditer</button>
                                {property.status === 'En attente' && (
                                    <>
                                        <button onClick={() => handleApprove(property.id)} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-green-200">Approuver</button>
                                        <button onClick={() => setRejectingId(property.id)} className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Rejeter</button>
                                    </>
                                )}
                                <button onClick={() => handleDelete(property.id)} className="px-4 py-3 text-red-400 hover:text-red-600 transition-colors">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Rejection Modal */}
        {rejectingId !== null && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
                <div className="absolute inset-0 bg-black/60" onClick={() => setRejectingId(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-[40px] shadow-2xl w-full max-w-md p-10 relative z-10 animate-fade-up">
                    <h2 className="text-2xl font-black mb-2 tracking-tighter">Motif du rejet</h2>
                    <p className="text-sm text-gray-500 mb-8 font-medium">Veuillez expliquer à l'hôte pourquoi son annonce ne peut pas être publiée en l'état.</p>
                    <textarea 
                        autoFocus
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Ex: Photos de mauvaise qualité, description incomplète..."
                        rows={4}
                        className="w-full p-6 rounded-3xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:border-red-500 transition-all font-medium text-sm mb-8"
                    ></textarea>
                    <div className="flex gap-4">
                        <button onClick={() => setRejectingId(null)} className="flex-1 py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Annuler</button>
                        <button 
                            disabled={!rejectReason.trim()}
                            onClick={handleReject} 
                            className="flex-[2] py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-200 dark:shadow-none hover:bg-red-700 transition-all uppercase text-[10px] tracking-widest disabled:opacity-50"
                        >
                            Confirmer le rejet
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Details Modal */}
        {selectedProperty && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProperty(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-[48px] shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 animate-reveal flex flex-col max-h-[90vh]">
                    
                    <div className="relative h-72 bg-gray-200 shrink-0">
                        <img src={selectedProperty.image} className="w-full h-full object-cover" alt="Cover" />
                        <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all backdrop-blur-md">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-black/90 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                            ID Référence: {selectedProperty.id}
                        </div>
                    </div>

                    <div className="p-10 overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 block">{selectedProperty.category} • {selectedProperty.type}</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter leading-none">{selectedProperty.title}</h2>
                                <p className="text-gray-500 text-xl font-bold flex items-center gap-1.5"><span className="material-symbols-outlined text-primary">location_on</span> {selectedProperty.location}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-4xl font-black text-primary tracking-tighter leading-none">{selectedProperty.price}</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Tarif de base</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Présentation de l'item</h3>
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[32px] font-medium italic border border-gray-100 dark:border-gray-800">
                                    "{selectedProperty.description || "Aucune description détaillée fournie pour cet item."}"
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Équipements & Caractéristiques</h3>
                                <div className="flex flex-wrap gap-3">
                                    <div className="px-5 py-3 bg-primary/10 text-primary rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">group</span> Capacité: {selectedProperty.capacity || 2} pers.
                                    </div>
                                    {selectedProperty.features?.map((feat, i) => (
                                        <div key={i} className="px-5 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                                            {feat}
                                        </div>
                                    )) || <span className="text-gray-400 italic font-medium">Aucune caractéristique définie</span>}
                                </div>
                                
                                <div className="mt-10">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Informations Propriétaire</h3>
                                    <div className="flex items-center gap-4 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm">
                                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                            {selectedProperty.owner?.[0] || 'A'}
                                        </div>
                                        <div>
                                            <p className="font-black text-lg text-gray-900 dark:text-white leading-none mb-1">{selectedProperty.owner || 'Administrateur'}</p>
                                            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Identité Vérifiée</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end gap-5 shrink-0">
                        {selectedProperty.status === 'En attente' && (
                            <>
                                <button onClick={() => setRejectingId(selectedProperty.id)} className="px-8 py-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Rejeter l'annonce</button>
                                <button onClick={() => handleApprove(selectedProperty.id)} className="px-10 py-4 bg-green-600 text-white hover:bg-green-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-green-200 dark:shadow-none">Approuver & Publier</button>
                            </>
                        )}
                        {selectedProperty.status === 'En ligne' && (
                            <button onClick={() => updatePropertyStatus(selectedProperty.id, 'Brouillon')} className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">Mettre en pause</button>
                        )}
                        <button onClick={() => setSelectedProperty(null)} className="px-10 py-4 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-2xl font-black text-[10px] uppercase tracking-widest">Fermer</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminProperties;