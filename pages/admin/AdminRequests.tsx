import React, { useState } from 'react';
import { useApp, HostApplication, VerificationRequest } from '../../context/AppContext';

const AdminRequests: React.FC = () => {
  const { hostApplications, approveHostApplication, rejectHostApplication, verificationRequests, approveVerification, rejectVerification } = useApp();
  const [tab, setTab] = useState<'hosts' | 'identity'>('hosts');
  
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
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Demandes & Candidatures</h1>

        <div className="flex gap-4 mb-8 border-b border-gray-100 dark:border-gray-800">
            <button 
                onClick={() => setTab('hosts')}
                className={`pb-3 px-4 font-black text-sm uppercase tracking-widest border-b-4 transition-all ${tab === 'hosts' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
            >
                Devenir Hôte ({pendingApps.length})
            </button>
            <button 
                onClick={() => setTab('identity')}
                className={`pb-3 px-4 font-black text-sm uppercase tracking-widest border-b-4 transition-all ${tab === 'identity' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
            >
                Vérification Identité ({pendingVerifs.length})
            </button>
        </div>

        {tab === 'hosts' ? (
            <div className="grid grid-cols-1 gap-6">
                {pendingApps.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                        <div className="size-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <span className="material-symbols-outlined text-5xl">task_alt</span>
                        </div>
                        <p className="font-black text-xl text-gray-400">Aucune candidature hôte en attente.</p>
                    </div>
                ) : (
                    pendingApps.map(app => (
                        <div key={app.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-3xl">{app.domain === 'Hébergement' ? 'bed' : app.domain === 'Voiture' ? 'directions_car' : 'local_activity'}</span>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="font-black text-xl text-gray-900 dark:text-white">{app.userName}</h3>
                                <p className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">{app.domain}</p>
                                <p className="text-xs text-gray-500">Business: <span className="text-gray-800 dark:text-gray-200">{app.businessName}</span> • Reçu le {app.timestamp}</p>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button onClick={() => setSelectedApp(app)} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-xl font-bold transition-all text-sm">Voir Détails</button>
                                <button onClick={() => handleApproveApp(app.id)} className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold transition-all text-sm shadow-lg shadow-green-200 dark:shadow-none">Approuver</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
                 {pendingVerifs.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                        <div className="size-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <span className="material-symbols-outlined text-5xl">shield_person</span>
                        </div>
                        <p className="font-black text-xl text-gray-400">Aucune vérification d'identité en attente.</p>
                    </div>
                ) : (
                    pendingVerifs.map(verif => (
                        <div key={verif.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                            <div className="size-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-3xl">badge</span>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="font-black text-xl text-gray-900 dark:text-white">{verif.userName}</h3>
                                <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-widest">{verif.documentType}</p>
                                <p className="text-xs text-gray-500">Email: {verif.userEmail} • Reçu le {verif.timestamp}</p>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button onClick={() => setSelectedVerif(verif)} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-xl font-bold transition-all text-sm">Examiner</button>
                                <button onClick={() => handleApproveVerif(verif.id)} className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold transition-all text-sm">Valider</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

        {/* Host App Modal */}
        {selectedApp && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedApp(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-fade-up p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">Candidature #{selectedApp.id}</span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{selectedApp.userName}</h2>
                            <p className="text-gray-500 font-bold">{selectedApp.userEmail}</p>
                        </div>
                        <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Entreprise / Nom Hôte</p>
                            <p className="font-black text-lg text-gray-900 dark:text-white">{selectedApp.businessName}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Téléphone</p>
                            <p className="font-black text-lg text-gray-900 dark:text-white">{selectedApp.phone}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Motivation & Offre</p>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl italic text-gray-600 dark:text-gray-300 leading-relaxed">
                            "{selectedApp.description}"
                        </div>
                    </div>

                    {!isRejecting ? (
                        <div className="flex gap-4">
                            <button onClick={() => setIsRejecting(true)} className="flex-1 py-4 bg-red-50 text-red-600 font-black uppercase tracking-widest rounded-2xl hover:bg-red-100 transition-all text-sm">Refuser</button>
                            <button onClick={() => handleApproveApp(selectedApp.id)} className="flex-[2] py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest rounded-2xl hover:opacity-80 transition-all shadow-xl text-sm">Activer le compte Hôte</button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-fade-in">
                            <textarea 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Indiquez le motif du refus..."
                                className="w-full p-5 rounded-3xl border-2 border-red-100 bg-red-50/20 outline-none focus:border-red-500 transition-all font-medium text-sm"
                                rows={3}
                            ></textarea>
                            <div className="flex gap-4">
                                <button onClick={() => setIsRejecting(false)} className="flex-1 py-4 font-black uppercase tracking-widest text-gray-400">Annuler</button>
                                <button onClick={handleRejectApp} disabled={!rejectReason} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all text-sm disabled:opacity-50">Confirmer Refus</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Identity Verification Modal */}
        {selectedVerif && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVerif(null)}></div>
                <div className="bg-white dark:bg-[#1e293b] rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-fade-up p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block">Vérification ID #{selectedVerif.id}</span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{selectedVerif.userName}</h2>
                            <p className="text-gray-500 font-bold">{selectedVerif.userEmail}</p>
                        </div>
                        <button onClick={() => setSelectedVerif(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div className="mb-8">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Document Fourni ({selectedVerif.documentType})</p>
                         <div className="aspect-video w-full rounded-[32px] overflow-hidden border-4 border-gray-100 dark:border-gray-800 bg-gray-100">
                             <img src={selectedVerif.documentUrl} className="w-full h-full object-cover" alt="ID Document" />
                         </div>
                    </div>

                    {!isRejecting ? (
                        <div className="flex gap-4">
                            <button onClick={() => setIsRejecting(true)} className="flex-1 py-4 bg-red-50 text-red-600 font-black uppercase tracking-widest rounded-2xl hover:bg-red-100 transition-all text-sm">Document Invalide</button>
                            <button onClick={() => handleApproveVerif(selectedVerif.id)} className="flex-[2] py-4 bg-green-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-green-700 transition-all shadow-xl text-sm">Valider l'identité</button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-fade-in">
                            <textarea 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Pourquoi le document est-il invalide ?"
                                className="w-full p-5 rounded-3xl border-2 border-red-100 bg-red-50/20 outline-none focus:border-red-500 transition-all font-medium text-sm"
                                rows={3}
                            ></textarea>
                            <div className="flex gap-4">
                                <button onClick={() => setIsRejecting(false)} className="flex-1 py-4 font-black uppercase tracking-widest text-gray-400">Annuler</button>
                                <button onClick={handleRejectVerif} disabled={!rejectReason} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all text-sm disabled:opacity-50">Confirmer Refus</button>
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
