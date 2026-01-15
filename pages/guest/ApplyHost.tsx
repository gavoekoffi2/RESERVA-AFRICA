import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ApplyHost: React.FC = () => {
  const navigate = useNavigate();
  const { user, submitHostApplication, submitVerification, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
      businessName: '',
      domain: 'Hébergement' as 'Hébergement' | 'Voiture' | 'Expérience',
      description: '',
      phone: '',
      idType: 'CNI',
      idUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&q=80'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a bit of delay for professional feel
    setTimeout(() => {
        submitVerification(formData.idType, formData.idUrl);
        submitHostApplication({
            businessName: formData.businessName || user?.name || '',
            domain: formData.domain,
            description: formData.description,
            phone: formData.phone
        });
        
        setIsSubmitting(false);
        addNotification('success', 'Votre dossier a été transmis à l\'administration.');
        setStep(3); // Success Step
    }, 2000);
  };

  if (user?.verificationStatus === 'pending') {
      return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-display">
              <div className="size-20 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl animate-pulse">hourglass_empty</span>
              </div>
              <h1 className="text-3xl font-black mb-4">Candidature en cours d'examen</h1>
              <p className="text-gray-500 max-w-md mb-8">Nos administrateurs vérifient vos informations. Vous recevrez une notification par email dès que votre compte sera activé.</p>
              <Link to="/" className="px-8 py-3 bg-black text-white rounded-xl font-bold uppercase text-xs tracking-widest">Retour au site</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f18] py-12 md:py-20 px-4 font-display">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1a202c] rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
           
           {/* Progress Bar */}
           <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800">
               <div 
                  className="h-full bg-primary transition-all duration-700" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
           </div>

           <div className="p-8 md:p-12">
               {step === 1 && (
                 <div className="animate-reveal">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Devenez hôte professionnel</h1>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">Parlez-nous de vous et de ce que vous souhaitez proposer sur Reserve Africa.</p>
                    
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Type d'activité principal</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Hébergement', 'Voiture', 'Expérience'].map(type => (
                                    <button 
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({...formData, domain: type as any})}
                                        className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all ${formData.domain === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 text-gray-500'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Nom du Business (ou Nom Pro)</label>
                            <input required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} type="text" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-bold" placeholder="Ex: Résidence Blue Bay" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Téléphone de contact</label>
                            <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-bold" placeholder="+228 90 00 00 00" />
                        </div>

                        <button type="submit" className="w-full h-16 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-lg transition-all uppercase tracking-widest text-sm btn-active-scale">Étape Suivante</button>
                    </form>
                 </div>
               )}

               {step === 2 && (
                 <div className="animate-reveal">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase mb-6 hover:text-black dark:hover:text-white"><span className="material-symbols-outlined text-sm">arrow_back</span> Retour</button>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Validation & Documents</h2>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">Une preuve d'identité est requise pour assurer la sécurité des voyageurs.</p>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Présentation de votre offre</label>
                            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 outline-none focus:border-primary font-medium text-sm leading-relaxed" placeholder="Décrivez brièvement ce que vous proposez et votre expérience en tant qu'hôte..."></textarea>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Document d'identité (Photo/Scan)</label>
                            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                                <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary mb-3">cloud_upload</span>
                                <p className="font-bold text-sm text-gray-500">Charger votre CNI ou Passeport</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">Format JPG, PNG ou PDF</p>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-16 bg-black dark:bg-white text-white dark:text-black font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-sm btn-active-scale flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? <span className="size-6 border-4 border-white dark:border-black border-t-transparent rounded-full animate-spin"></span> : 'Soumettre ma Candidature'}
                        </button>
                    </form>
                 </div>
               )}

               {step === 3 && (
                 <div className="animate-reveal text-center py-10">
                    <div className="size-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <span className="material-symbols-outlined text-4xl font-black">done_all</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Merci, {user?.name.split(' ')[0]} !</h2>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-sm mx-auto">
                        Votre demande est maintenant entre les mains de notre équipe de modération. 
                        <strong> Ce processus prend généralement moins de 24h.</strong>
                    </p>
                    <Link to="/" className="inline-block bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:opacity-80 transition-all">Retour à l'accueil</Link>
                 </div>
               )}
           </div>
        </div>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-10 opacity-60">Paiement 100% sécurisé • Reserve Africa Global Host Program</p>
      </div>
    </div>
  );
};

export default ApplyHost;