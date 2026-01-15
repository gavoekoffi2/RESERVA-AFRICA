import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

type AssetType = 'Hébergement' | 'Voiture' | 'Expérience';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const { addProperty, user, addNotification } = useApp();
  const [step, setStep] = useState(0); 
  const totalSteps = 10;
  const [isPublishing, setIsPublishing] = useState(false);

  const [formData, setFormData] = useState({
      type: 'Hébergement' as AssetType,
      category: 'Villa',
      location: '',
      capacity: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      brand: '',
      model: '',
      transmission: 'Automatique',
      duration: '4h',
      language: 'Français',
      amenities: [] as string[],
      photos: [] as string[],
      title: '',
      description: '',
      price: 0
  });

  // AUDIT ACCÈS : Seuls les hôtes vérifiés peuvent accéder ici
  useEffect(() => {
      if (!user) {
          navigate('/login');
          return;
      }
      if (user.role === 'GUEST' || user.verificationStatus !== 'verified') {
          addNotification('error', 'Accès restreint. Seuls les hôtes officiellement validés peuvent publier.');
          navigate('/become-a-host');
      }
  }, [user, navigate, addNotification]);

  const nextStep = () => setStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep(p => Math.max(p - 1, 0));

  const handlePublish = async () => {
      if (!user) return;
      setIsPublishing(true);
      
      // Simulation délai professionnel
      await new Promise(resolve => setTimeout(resolve, 3000));

      addProperty({
          id: Date.now(),
          title: formData.title || 'Nouvelle Annonce',
          location: formData.location || 'Afrique',
          type: formData.type,
          price: `${formData.price.toLocaleString()} F`,
          rawPrice: formData.price,
          image: formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
          status: 'En attente', // VALIDATION ADMIN REQUISE
          owner: user.name,
          ownerId: user.id,
          category: formData.category,
          features: formData.amenities,
          capacity: formData.capacity,
          rating: 0,
          reviews: 0,
          description: formData.description,
          coordinates: { lat: 0, lng: 0 },
          blockedDates: []
      });

      setIsPublishing(false);
      addNotification('success', 'Annonce transmise à la modération. Elle sera visible dès validation.');
      navigate('/host/dashboard');
  };

  const toggleAmenity = (label: string) => {
    setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(label) 
            ? prev.amenities.filter(a => a !== label) 
            : [...prev.amenities, label]
    }));
  };

  const renderStepContent = () => {
      switch(step) {
          case 0:
              return (
                <div className="flex flex-col lg:flex-row h-full w-full max-w-[1440px] mx-auto animate-reveal overflow-hidden rounded-[48px] bg-white dark:bg-[#1a202c] shadow-2xl">
                    <div className="lg:flex-1 bg-black flex flex-col justify-center p-12 md:p-24 text-white relative">
                        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Reseva Home" />
                        <div className="relative z-10 space-y-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Setup Hôte</h2>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1]">Prêt à lister votre bien ?</h1>
                        </div>
                    </div>
                    <div className="lg:flex-1 flex flex-col justify-center p-12 md:p-20">
                        <div className="max-w-md space-y-12">
                            {[
                                { icon: 'home_work', t: 'Identité du bien', d: 'Hébergement, véhicule ou activité.' },
                                { icon: 'photo_library', t: 'Contenu visuel', d: 'Mettez en avant vos plus beaux atouts.' },
                                { icon: 'verified', t: 'Validation Admin', d: 'Votre annonce sera vérifiée sous 24h.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black mb-1">{item.t}</h3>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              );
          case 1:
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 text-center">
                      <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-16 tracking-tighter leading-tight">Que proposez-vous ?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                              { label: 'Hébergement', icon: 'home_work' },
                              { label: 'Voiture', icon: 'directions_car' },
                              { label: 'Expérience', icon: 'explore' },
                          ].map(item => (
                              <button 
                                key={item.label}
                                onClick={() => setFormData({...formData, type: item.label as AssetType})}
                                className={`p-10 rounded-[48px] border-4 transition-all flex flex-col items-center gap-6 group hover:scale-[1.02] active:scale-95 ${formData.type === item.label ? 'border-primary bg-primary/5 shadow-xl' : 'border-gray-50 dark:border-gray-800 bg-white dark:bg-[#1a202c]'}`}
                              >
                                  <div className={`size-14 rounded-2xl flex items-center justify-center transition-colors ${formData.type === item.label ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-primary'}`}>
                                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                                  </div>
                                  <p className="font-black text-lg text-gray-900 dark:text-white">{item.label}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 2:
              const cats = ['Villa', 'Appartement', 'Lodge', 'Chambre', 'Hôtel', 'Maison'];
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6">
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter">Quelle catégorie correspond ?</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {cats.map(cat => (
                              <button 
                                key={cat}
                                onClick={() => setFormData({...formData, category: cat})}
                                className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-start gap-2 hover:border-black dark:hover:border-white ${formData.category === cat ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-inner' : 'border-gray-50 dark:border-gray-800'}`}
                              >
                                  <span className="font-black text-sm uppercase tracking-widest">{cat}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 5:
              const amens = ['Wifi', 'Climatisation', 'Cuisine', 'Piscine', 'Parking', 'TV', 'Lave-linge', 'Espace Travail'];
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6">
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Équipements inclus.</h2>
                      <p className="text-gray-500 mb-16 font-medium">Cochez les services que les voyageurs pourront utiliser.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {amens.map(a => (
                              <button key={a} onClick={() => toggleAmenity(a)} className={`p-8 rounded-[40px] border-2 transition-all flex flex-col items-center gap-4 hover:border-black dark:hover:border-white ${formData.amenities.includes(a) ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-gray-50 dark:border-gray-800'}`}>
                                  <span className="font-black text-xs uppercase tracking-widest">{a}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 9:
              return (
                  <div className="animate-reveal max-w-2xl mx-auto w-full px-6 text-center">
                      <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">Fixez votre prix.</h2>
                      <p className="text-gray-500 mb-16 font-medium">Le prix par nuit (incluant vos charges et entretien).</p>
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-12 rounded-[56px] border-2 border-gray-100 dark:border-gray-700 w-full justify-center shadow-inner relative group">
                          <span className="text-5xl font-black text-gray-200 group-focus-within:text-primary transition-colors">F</span>
                          <input type="number" autoFocus value={formData.price || ''} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="bg-transparent border-none outline-none font-black text-6xl md:text-8xl text-gray-900 dark:text-white text-center w-full max-w-[300px]" placeholder="0" />
                      </div>
                      <div className="mt-12 p-8 bg-primary/5 rounded-[32px] border border-primary/10 flex justify-between items-center text-left">
                          <div>
                              <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Gains nets estimés</p>
                              <p className="text-3xl font-black text-gray-900 dark:text-white">{(formData.price * 0.85).toLocaleString()} F</p>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold max-w-[150px] leading-tight uppercase">Après commission de service (15%)</span>
                      </div>
                  </div>
              );
          case 10:
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6">
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-16 tracking-tighter">Vérification finale.</h2>
                      <div className="bg-white dark:bg-[#1a202c] rounded-[56px] border-2 border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row group transition-all">
                          <div className="w-full md:w-[400px] aspect-square bg-gray-100 shrink-0 overflow-hidden relative">
                              <img src={formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-[3s]" alt="Aperçu" />
                          </div>
                          <div className="p-12 flex flex-col justify-between flex-1">
                              <div>
                                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">{formData.category} • {formData.location || 'Afrique'}</span>
                                  <h3 className="text-4xl font-black text-gray-900 dark:text-white leading-none mb-6">{formData.title || 'Sans titre'}</h3>
                                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">{formData.description || 'Vérifiez vos informations avant de soumettre l\'annonce pour validation.'}</p>
                              </div>
                              <div className="pt-10 mt-10 border-t border-gray-50 dark:border-gray-800 flex items-end justify-between">
                                  <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tarif par nuit</p>
                                      <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{formData.price.toLocaleString()} F</span>
                                  </div>
                                  <div className="size-16 rounded-[24px] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30 rotate-6">
                                      <span className="material-symbols-outlined text-3xl font-black">done_all</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          default:
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6">
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">Dites-nous en plus.</h2>
                      <p className="text-gray-500 mb-12 font-medium">Le titre et la description doivent être percutants.</p>
                      <div className="space-y-6">
                        <input 
                            className="w-full h-16 p-8 rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 outline-none focus:border-primary transition-all font-black text-xl text-gray-900 dark:text-white"
                            placeholder="Titre de l'annonce..."
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                        <textarea 
                            className="w-full h-64 p-8 rounded-[40px] border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 outline-none focus:border-primary transition-all font-bold text-lg text-gray-900 dark:text-white leading-relaxed"
                            placeholder="Détaillez votre offre (emplacement, confort, services...)"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                      </div>
                  </div>
              );
      }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f18] flex flex-col font-display selection:bg-primary selection:text-white">
      {/* Header */}
      <div className="h-20 px-6 md:px-12 flex justify-between items-center border-b border-gray-50 dark:border-gray-800/50 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl sticky top-0 z-[100]">
         <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg rotate-12">
              <span className="material-symbols-outlined text-xl font-black">add_business</span>
            </div>
            <span className="text-lg font-black italic text-gray-900 dark:text-white hidden sm:block">Reserve <span className="text-primary not-italic">Setup.</span></span>
         </div>
         <button onClick={() => { if (window.confirm('Quitter sans enregistrer ?')) navigate('/host/dashboard'); }} className="px-8 py-2.5 rounded-full border-2 border-gray-100 dark:border-gray-800 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 text-gray-900 dark:text-white">Fermer</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-24 overflow-y-auto no-scrollbar pb-40">
          {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="h-32 px-6 md:px-24 border-t-2 border-gray-50 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl fixed bottom-0 left-0 right-0 z-[100]">
          <div className="max-w-[1400px] mx-auto w-full h-full flex justify-between items-center gap-10">
              <button onClick={prevStep} disabled={step === 0 || isPublishing} className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-0 active:scale-95 transition-all">Retour</button>
              
              <div className="hidden md:flex flex-1 max-w-xl px-10">
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_#ee6c2b]" style={{ width: `${(Math.max(0, step) / totalSteps) * 100}%` }}></div>
                  </div>
              </div>

              {step === 0 ? (
                <button onClick={nextStep} className="px-16 py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center gap-4">Commencer <span className="material-symbols-outlined font-black">arrow_forward</span></button>
              ) : step === totalSteps ? (
                  <button onClick={handlePublish} disabled={isPublishing} className="px-20 py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center gap-4 disabled:opacity-50">
                      {isPublishing ? <span className="size-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : <>Publier <span className="material-symbols-outlined font-black">rocket_launch</span></>}
                  </button>
              ) : (
                  <button onClick={nextStep} disabled={(step === 3 && !formData.location) || (step === 9 && formData.price <= 0)} className="px-16 py-6 bg-black dark:bg-white text-white dark:text-black font-black rounded-3xl shadow-2xl hover:opacity-80 transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed">Suivant <span className="material-symbols-outlined font-black">arrow_forward</span></button>
              )}
          </div>
      </div>
    </div>
  );
};

export default AddProperty;