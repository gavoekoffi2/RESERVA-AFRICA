import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ApplyHost: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, submitHostApplication, submitVerification, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState(false);

  const [formData, setFormData] = useState({
      businessName: '',
      domain: 'Hébergement' as 'Hébergement' | 'Voiture' | 'Expérience',
      description: '',
      phone: '',
      idType: 'CNI'
  });

  const handleFileClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setSelectedFile(file);
          setFileError(false);
          
          // Image Preview logic
          if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onloadend = () => setPreviewUrl(reader.result as string);
              reader.readAsDataURL(file);
          } else {
              setPreviewUrl(null);
          }
          
          addNotification('info', `Fichier "${file.name}" prêt.`);
      } else {
          setSelectedFile(null);
          setPreviewUrl(null);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // VALIDATION STRICTE : Le document est obligatoire avant soumission
    if (!selectedFile) {
        setFileError(true);
        addNotification('error', 'Action requise : Veuillez sélectionner votre document d\'identité.');
        return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
        // Simulation upload réussi
        const simulatedUrl = previewUrl || 'https://via.placeholder.com/600x400?text=Document+Identite';
        
        submitVerification(formData.idType, simulatedUrl);
        submitHostApplication({
            businessName: formData.businessName || user?.name || '',
            domain: formData.domain,
            description: formData.description,
            phone: formData.phone
        });
        
        setIsSubmitting(false);
        setStep(3); // Étape Succès
        addNotification('success', 'Dossier transmis avec succès.');
    }, 2500);
  };

  if (user?.verificationStatus === 'pending') {
      return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-display animate-reveal">
              <div className="size-20 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl animate-pulse">hourglass_empty</span>
              </div>
              <h1 className="text-3xl font-black mb-4">Candidature en cours</h1>
              <p className="text-gray-500 max-w-md mb-8 leading-relaxed font-medium">
                  Nos administrateurs vérifient votre document d'identité pour Reserva Africa. 
                  Vous recevrez une notification par e-mail dès validation.
              </p>
              <Link to="/" className="px-10 py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:opacity-80 transition-all">Quitter vers l'accueil</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f18] py-12 md:py-24 px-4 font-display">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1a202c] rounded-[48px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
           
           <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800">
               <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
           </div>

           <div className="p-10 md:p-16">
               {step === 1 && (
                 <div className="animate-reveal">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter leading-tight">Postulez comme Hôte.</h1>
                    <p className="text-gray-500 font-medium mb-12 leading-relaxed">Devenez un partenaire privilégié de Reserva Africa.</p>
                    
                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Domaine d'activité</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Hébergement', 'Voiture', 'Expérience'].map(type => (
                                    <button 
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({...formData, domain: type as any})}
                                        className={`py-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${formData.domain === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 text-gray-400 hover:border-gray-300'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nom du Business</label>
                            <input required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} type="text" className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-bold text-gray-900 dark:text-white" placeholder="Ex: Résidence Blue Bay" />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Téléphone Direct</label>
                            <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full h-16 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-bold text-gray-900 dark:text-white" placeholder="+228 90 00 00 00" />
                        </div>

                        <button type="submit" className="w-full h-16 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-lg transition-all uppercase tracking-widest text-xs btn-active-scale">Étape Suivante</button>
                    </form>
                 </div>
               )}

               {step === 2 && (
                 <div className="animate-reveal">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10 hover:text-black dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm font-black">arrow_back</span> Retour
                    </button>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter leading-tight">Document Identity.</h2>
                    <p className="text-gray-500 font-medium mb-12 leading-relaxed">Une validation humaine est obligatoire pour assurer la sécurité de tous sur Reserva Africa.</p>

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Description de votre offre</label>
                            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-medium text-sm leading-relaxed text-gray-900 dark:text-white" placeholder="Pourquoi devrions-nous vous valider ?"></textarea>
                        </div>

                        <div className="space-y-4">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${fileError ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                                Pièce d'Identité • OBLIGATOIRE
                            </label>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,application/pdf"
                            />
                            <div 
                                onClick={handleFileClick}
                                className={`border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${selectedFile ? 'border-green-400 bg-green-50/10' : fileError ? 'border-red-300 bg-red-50/5' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                                {previewUrl ? (
                                    <div className="size-20 rounded-2xl overflow-hidden mb-4 shadow-lg ring-4 ring-white">
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    </div>
                                ) : (
                                    <span className={`material-symbols-outlined text-5xl mb-4 transition-transform group-hover:scale-110 ${selectedFile ? 'text-green-500' : 'text-gray-300 group-hover:text-primary'}`}>
                                        {selectedFile ? 'task_alt' : 'cloud_upload'}
                                    </span>
                                )}
                                <p className={`font-black text-[10px] uppercase tracking-widest ${selectedFile ? 'text-green-600' : 'text-gray-500'}`}>
                                    {selectedFile ? selectedFile.name : 'Importer CNI ou Passeport'}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !selectedFile}
                                className={`w-full h-16 font-black rounded-2xl shadow-2xl transition-all uppercase tracking-[0.2em] text-xs btn-active-scale flex items-center justify-center gap-3 ${!selectedFile ? 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50' : 'bg-black dark:bg-white text-white dark:text-black'}`}
                            >
                                {isSubmitting ? <span className="size-6 border-4 border-white dark:border-black border-t-transparent rounded-full animate-spin"></span> : 'Soumettre le dossier'}
                            </button>
                            {!selectedFile && <p className="text-center text-[10px] text-red-500 font-black uppercase tracking-widest mt-6">L'importation du document est requise</p>}
                        </div>
                    </form>
                 </div>
               )}

               {step === 3 && (
                 <div className="animate-reveal text-center py-12">
                    <div className="size-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-10 animate-float">
                        <span className="material-symbols-outlined text-5xl font-black">verified</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Félicitations !</h2>
                    <p className="text-gray-500 font-medium mb-12 leading-relaxed max-w-sm mx-auto">
                        Votre demande est transmise. Nos agents vont vérifier votre identité sous <strong>24 heures</strong> pour valider votre statut professionnel sur Reserva Africa.
                    </p>
                    <Link to="/" className="inline-block bg-black dark:bg-white text-white dark:text-black px-16 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:opacity-80 transition-all">Retourner au site</Link>
                 </div>
               )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyHost;