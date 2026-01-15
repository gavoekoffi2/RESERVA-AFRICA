import React, { useState } from 'react';
import { useApp, HostApplication, VerificationRequest } from '../../context/AppContext';

const AdminRequests: React.FC = () => {
  const { hostApplications, approveHostApplication, rejectHostApplication, verificationRequests, approveVerification, rejectVerification } = useApp();
  const [tab, setTab] = useState<'identity' | 'hosts'>('identity');
  
  const [selectedApp, setSelectedApp] = useState<HostApplication | null>(null);
  const [selectedVerif, setSelectedVerif] = useState<VerificationRequest | null>(null);
  
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const pendingApps = hostApplications.filter(a => a.status === 'Pending');
  const pendingVerifs = verificationRequests.filter(v => v.status === 'Pending');

  const handleApproveApp = (id: string) => {
      approveHostApplication(id);
      setSelectedApp(null);
  };

  const handleRejectApp = () => {
      if (selectedApp && rejectReason) {
          rejectHostApplication(selectedApp.id, rejectReason);
          setSelectedApp(null);
          setIsRejecting(false);
          setRejectReason('');
      }
  };

  const handleApproveVerif = (id: string) => {
      approveVerification(id);
      setSelectedVerif(null);
  };

  const handleRejectVerif = () => {
      if (selectedVerif && rejectReason) {
          rejectVerification(selectedVerif.id, rejectReason);
          setSelectedVerif(null);
          setIsRejecting(false);
          setRejectReason('');
      }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen font-display">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Modération Globale</h1>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Dossiers en attente de traitement</p>
            </div>
        </div>

        <div className="flex gap-10 mb-8 border-b border-gray-100 dark:border-gray-800">
            <button 
                onClick={() => setTab('identity')}
                className={`pb-4 px-2 font-black text-xs uppercase tracking-[0.2em] border-b-4 transition-all flex items-center gap-3 ${tab === 'identity' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                Vérification ID ({pendingVerifs.length})
            </button>
            <button 
                onClick={() => setTab('hosts')}
                className={`pb-4 px-2 font-black text-xs uppercase tracking-[0.2em] border-b-4 transition-all flex items-center gap-3 ${tab === 'hosts' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                <span className="material-symbols-outlined text-[20px]">business_center</span>
                Projets Hôtes ({pendingApps.length})
            </button>
        </div>

        {tab === 'hosts' ? (
            <div className="grid grid-cols-1 gap-4">
                {pendingApps.length === 0 ? (
                    <div className="py-32 text-center bg-white dark:bg-[#1e293b] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800 animate-reveal">
                        <span className="material-symbols-outlined text-6xl text-gray-200 mb-6 block">done_all</span>
                        <p className="font-black text-lg text-gray-400 uppercase tracking-widest">Tout est à jour pour les hôtes.</p>
                    </div>
                ) : (
                    pendingApps.map(app => (
                        <div key={app.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl transition-all animate-reveal">
                            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl">{app.domain === 'Hébergement' ? 'bed' : app.domain === 'Voiture' ? 'directions_car' : 'local_activity'}</span>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="font-black text-xl text-gray-900 dark:text-white leading-none mb-2">{app.userName}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black bg-gray-50 dark:bg-gray-800 text-gray-500 px-3 py-1 rounded-lg uppercase tracking-widest">{app.domain}</span>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{app.timestamp}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button onClick={() => setSelectedApp(app)} className="px-8 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Examiner</button>
                                <button onClick={() => handleApproveApp(app.id)} className="px-8 py-3 bg-primary text-white hover:bg-primary-dark rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20">Valider</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4">
                 {pendingVerifs.length === 0 ? (
                    <div className="py-32 text-center bg-white dark:bg-[#1e293b] rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800 animate-reveal">
                         <span className="material-symbols-outlined text-6xl text-gray-200 mb-6 block">verified</span>
                        <p className="font-black text-lg text-gray-400 uppercase tracking-widest">Aucune identité à vérifier.</p>
                    </div>
                ) : (
                    pendingVerifs.map(verif => (
                        <div key={verif.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl transition-all animate-reveal">
                            <div className="size-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl">badge</span>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="font-black text-xl text-gray-900 dark:text-white leading-none mb-2">{verif.userName}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg uppercase tracking-widest">{verif.documentType}</span>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{verif.timestamp}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button onClick={() => setSelectedVerif(verif)} className="px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">Voir la pièce</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

        {/* Identity Modal - CRITIQUE POUR L'AUDIT */}
        {selectedVerif && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
                <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedVerif(null)}></div>
                <div className="bg-white dark:bg-[#1a202c] rounded-[48px] shadow-2xl w-full max-w-3xl overflow-hidden relative z-10 animate-reveal flex flex-col max-h-[90vh]">
                    <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Vérification de Pièce d'Identité</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{selectedVerif.userName} • {selectedVerif.userEmail}</p>
                        </div>
                        <button onClick={() => setSelectedVerif(null)} className="p-3 hover:bg-white rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 bg-gray-100 dark:bg-black/40 flex items-center justify-center">
                         <div className="w-full h-full rounded-[32px] overflow-hidden border-8 border-white dark:border-gray-800 shadow-inner bg-white">
                             <img src={selectedVerif.documentUrl} className="w-full h-full object-contain" alt="Document d'identité" />
                         </div>
                    </div>

                    <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]">
                        {!isRejecting ? (
                            <div className="flex gap-4">
                                <button onClick={() => setIsRejecting(true)} className="flex-1 py-5 bg-red-50 text-red-600 font-black uppercase tracking-widest rounded-2xl hover:bg-red-100 transition-all text-xs">Rejeter Document</button>
                                <button onClick={() => handleApproveVerif(selectedVerif.id)} className="flex-[2] py-5 bg-green-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-green-700 transition-all shadow-xl text-xs">Approuver & Valider</button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-reveal">
                                <textarea 
                                    autoFocus
                                    value={rejectReason}
                                    onChange={e => setRejectReason(e.target.value)}
                                    placeholder="Motif du refus (ex: Image floue, Document expiré...)"
                                    className="w-full p-5 rounded-3xl border-2 border-red-100 bg-red-50/20 outline-none focus:border-red-500 transition-all font-medium text-sm"
                                    rows={3}
                                ></textarea>
                                <div className="flex gap-4">
                                    <button onClick={() => setIsRejecting(false)} className="flex-1 py-4 font-black uppercase tracking-widest text-gray-400 text-xs">Annuler</button>
                                    <button onClick={handleRejectVerif} disabled={!rejectReason} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all text-xs disabled:opacity-50">Confirmer Refus</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Host Projects Modal */}
        {selectedApp && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
                <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedApp(null)}></div>
                <div className="bg-white dark:bg-[#1a202c] rounded-[48px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-reveal p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">Projet Professionnel</span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">{selectedApp.userName}</h2>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">{selectedApp.userEmail}</p>
                        </div>
                        <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Business</p>
                            <p className="font-black text-lg text-gray-900 dark:text-white leading-tight">{selectedApp.businessName}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                            <p className="font-black text-lg text-gray-900 dark:text-white leading-tight">{selectedApp.phone}</p>
                        </div>
                    </div>

                    <div className="mb-10">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Présentation de l'offre</p>
                        <div className="bg-primary/5 p-8 rounded-[32px] italic text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            "{selectedApp.description}"
                        </div>
                    </div>

                    {!isRejecting ? (
                        <div className="flex gap-4">
                            <button onClick={() => setIsRejecting(true)} className="flex-1 py-5 bg-gray-100 text-gray-500 font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all text-xs">Plus tard</button>
                            <button onClick={() => handleApproveApp(selectedApp.id)} className="flex-[2] py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest rounded-2xl hover:opacity-80 transition-all shadow-2xl text-xs">Activer le compte Hôte</button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-reveal">
                            <textarea 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Motif du report/refus..."
                                className="w-full p-5 rounded-3xl border-2 border-red-100 bg-red-50/20 outline-none focus:border-red-500 transition-all font-medium text-sm"
                                rows={3}
                            ></textarea>
                            <div className="flex gap-4">
                                <button onClick={() => setIsRejecting(false)} className="flex-1 py-4 font-black uppercase tracking-widest text-gray-400 text-xs">Annuler</button>
                                <button onClick={handleRejectApp} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all text-xs">Confirmer</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminRequests;