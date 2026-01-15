import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

type AssetType = 'Hébergement' | 'Voiture' | 'Expérience';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const { addProperty, user, addNotification } = useApp();
  
  // Airbnb-style setup state
  // Step -2: Initial Role Guard
  const [step, setStep] = useState(0); 
  const totalSteps = 10;
  const [isPublishing, setIsPublishing] = useState(false);

  // Form State
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

  // Guard: Mandatory verification before listing
  useEffect(() => {
      if (!user) {
          navigate('/login');
          return;
      }
      if (user.verificationStatus !== 'verified') {
          addNotification('error', 'Votre compte doit être validé par un administrateur avant de pouvoir lister un bien.');
          navigate('/become-a-host');
      }
  }, [user, navigate, addNotification]);

  const nextStep = () => setStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep(p => Math.max(p - 1, 0));

  const MOCK_PHOTOS = {
    'Hébergement': [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512918766671-ed6a07be3573?auto=format&fit=crop&w=1200&q=80"
    ],
    'Voiture': [
        "https://images.unsplash.com/photo-1594731826724-4061a9415f3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
    ],
    'Expérience': [
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1547995886-67ba2bc41708?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1596328926077-333e9b11029c?auto=format&fit=crop&w=1200&q=80"
    ]
  };

  const handlePublish = async () => {
      if (!user) return;
      setIsPublishing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      addProperty({
          id: Date.now(),
          title: formData.title || 'Ma superbe annonce',
          location: formData.location || 'Lomé, Togo',
          type: formData.type,
          price: `${formData.price.toLocaleString()} F`,
          rawPrice: formData.price,
          image: formData.photos[0] || MOCK_PHOTOS[formData.type][0],
          status: 'En attente', // Administrator must also validate individual listings
          owner: user.name,
          ownerId: user.id,
          category: formData.category,
          features: formData.amenities,
          capacity: formData.capacity,
          rating: 0,
          reviews: 0,
          description: formData.description,
          coordinates: { lat: 6.1366, lng: 1.2222 },
          blockedDates: []
      });

      setIsPublishing(false);
      addNotification('success', 'Votre annonce a été envoyée pour modération.');
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

  // --- RENDERING MODES ---
  const renderStepContent = () => {
      switch(step) {
          case 0: // Welcome
              return (
                <div className="flex flex-col lg:flex-row h-full w-full max-w-[1440px] mx-auto animate-reveal overflow-hidden rounded-[40px] bg-white dark:bg-[#1a202c] shadow-2xl">
                    <div className="lg:flex-1 bg-black flex flex-col justify-center p-12 md:p-20 text-white relative">
                        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-50" alt="Reseva Home" />
                        <div className="relative z-10 space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Reseva Setup</h2>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1]">Lançons votre première annonce.</h1>
                        </div>
                    </div>
                    <div className="lg:flex-1 flex flex-col justify-center p-10 md:p-16">
                        <div className="max-w-md space-y-10">
                            <div className="flex gap-6 group">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">home_work</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black mb-1">Détails du bien</h3>
                                    <p className="text-gray-500 font-medium text-sm">Précisez le type de logement ou de service.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">photo_library</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black mb-1">Visuels & Description</h3>
                                    <p className="text-gray-500 font-medium text-sm">Photos HD et présentation captivante.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">payments</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black mb-1">Prix & Disponibilité</h3>
                                    <p className="text-gray-500 font-medium text-sm">Gérez vos tarifs en toute liberté.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              );
          case 1: // Type Selection - FIXED ICON SIZES
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 text-center">
                      <h2 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter leading-tight">Quel type de bien <br/> allez-vous lister ?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                              { label: 'Hébergement', icon: 'home_work' },
                              { label: 'Voiture', icon: 'directions_car' },
                              { label: 'Expérience', icon: 'explore' },
                          ].map(item => (
                              <button 
                                key={item.label}
                                onClick={() => setFormData({...formData, type: item.label as AssetType})}
                                className={`p-8 md:p-10 rounded-[40px] border-4 transition-all flex flex-col items-center gap-4 group hover:scale-[1.02] active:scale-95 ${formData.type === item.label ? 'border-primary bg-primary/5 shadow-xl' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]'}`}
                              >
                                  <div className={`size-14 rounded-2xl flex items-center justify-center transition-colors ${formData.type === item.label ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-primary'}`}>
                                      {/* Reduced icon size from 4xl to 2xl */}
                                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                  </div>
                                  <p className="font-black text-base md:text-lg text-gray-900 dark:text-white">{item.label}</p>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 2: // Category Selection - FIXED ICON SIZES
              const cats = ['Villa', 'Appartement', 'Lodge', 'Chambre', 'Hôtel', 'Maison'];
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter">Lequel de ces termes décrit le mieux votre offre ?</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {cats.map(cat => (
                              <button 
                                key={cat}
                                onClick={() => setFormData({...formData, category: cat})}
                                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-start gap-2 hover:border-black dark:hover:border-white ${formData.category === cat ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-inner' : 'border-gray-100 dark:border-gray-800'}`}
                              >
                                  {/* Airbnb Style - Simple and professional */}
                                  <span className="font-bold text-sm">{cat}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 3: // Location
              return (
                  <div className="animate-reveal max-w-2xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Où se situe votre bien ?</h2>
                      <p className="text-gray-500 mb-10 font-medium text-sm md:text-base">Une adresse précise aide les voyageurs à mieux planifier.</p>
                      <div className="space-y-6">
                         <div className="relative">
                             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                                 <span className="material-symbols-outlined text-xl">location_on</span>
                             </div>
                             <input 
                                type="text" 
                                autoFocus
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="Ville, quartier ou adresse..."
                                className="w-full h-14 pl-14 pr-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-bold text-base"
                             />
                         </div>
                         <div className="h-60 bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-xl relative">
                            <iframe 
                                width="100%" height="100%" frameBorder="0" scrolling="no" src={`https://maps.google.com/maps?q=${formData.location || 'Afrique'}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                className="opacity-80 grayscale-[0.2] dark:invert"
                                title="Location map"
                            ></iframe>
                         </div>
                      </div>
                  </div>
              );
          case 4: // Basics
              return (
                <div className="animate-reveal max-w-xl mx-auto w-full px-6">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter">Capacité d'accueil</h2>
                    <div className="space-y-6">
                       {[
                           { label: 'Voyageurs max', key: 'capacity' },
                           { label: 'Chambres', key: 'bedrooms' },
                           { label: 'Lits', key: 'beds' },
                           { label: 'Salles de bain', key: 'bathrooms' },
                       ].map(item => (
                           <div key={item.key} className="flex justify-between items-center pb-5 border-b border-gray-100 dark:border-gray-800">
                               <span className="text-base font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
                               <div className="flex items-center gap-4">
                                   <button onClick={() => setFormData({...formData, [item.key]: Math.max(1, (formData as any)[item.key] - 1)})} className="size-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black dark:hover:border-white transition-all"><span className="material-symbols-outlined text-sm">remove</span></button>
                                   <span className="font-black text-base w-4 text-center">{(formData as any)[item.key]}</span>
                                   <button onClick={() => setFormData({...formData, [item.key]: (formData as any)[item.key] + 1})} className="size-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-black dark:hover:border-white transition-all"><span className="material-symbols-outlined text-sm">add</span></button>
                               </div>
                           </div>
                       ))}
                    </div>
                </div>
              );
          case 5: // Amenities - FIXED ICON SIZES
              const amenities = ['Wifi', 'Climatisation', 'Cuisine', 'Piscine', 'Parking', 'TV', 'Lave-linge', 'Espace Travail'];
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Quels équipements proposez-vous ?</h2>
                      <p className="text-gray-500 mb-10 font-medium text-sm">Cochez les services inclus dans votre offre.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {amenities.map(amenity => (
                              <button 
                                key={amenity}
                                onClick={() => toggleAmenity(amenity)}
                                className={`p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 hover:border-black dark:hover:border-white ${formData.amenities.includes(amenity) ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-inner' : 'border-gray-100 dark:border-gray-800'}`}
                              >
                                  <span className="font-bold text-xs">{amenity}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 6: // Photos
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter">Ajoutez vos meilleurs visuels</h2>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-full aspect-video bg-gray-50 dark:bg-gray-800 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-[40px] flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-primary/5 transition-all">
                              <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-colors">add_a_photo</span>
                              <p className="font-black text-xs text-gray-400 group-hover:text-primary transition-colors uppercase tracking-widest">Charger 5 photos minimum</p>
                          </div>
                          {MOCK_PHOTOS[formData.type].map((url, i) => (
                              <button 
                                key={i}
                                onClick={() => setFormData({
                                    ...formData, 
                                    photos: formData.photos.includes(url) ? formData.photos.filter(p => p !== url) : [...formData.photos, url]
                                })}
                                className={`aspect-[4/3] rounded-3xl overflow-hidden border-4 transition-all relative ${formData.photos.includes(url) ? 'border-primary' : 'border-transparent'}`}
                              >
                                  <img src={url} className="w-full h-full object-cover" alt="Preview" />
                                  {formData.photos.includes(url) && (
                                      <div className="absolute top-4 right-4 bg-primary text-white size-8 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-xs font-black">check</span></div>
                                  )}
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 7: // Title
              return (
                  <div className="animate-reveal max-w-2xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Donnez un titre captivant</h2>
                      <p className="text-gray-500 mb-10 font-medium text-sm">Mettez en avant le point fort de votre offre.</p>
                      <textarea 
                        autoFocus
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full h-40 p-8 rounded-[32px] border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-black text-xl placeholder:text-gray-300 leading-tight"
                        placeholder="Ex: Villa Emeraude avec piscine privée..."
                        maxLength={60}
                      ></textarea>
                      <div className="flex justify-end mt-4 px-2">
                        <span className="text-[10px] font-black text-gray-400 tracking-widest">{formData.title.length}/60</span>
                      </div>
                  </div>
              );
          case 8: // Description
              return (
                  <div className="animate-reveal max-w-2xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Décrivez votre offre</h2>
                      <p className="text-gray-500 mb-10 font-medium text-sm">Parlez du confort, de l'ambiance et des environs.</p>
                      <textarea 
                        autoFocus
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full h-60 p-8 rounded-[32px] border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-bold text-base leading-relaxed placeholder:text-gray-300"
                        placeholder="Que doivent savoir les voyageurs ?..."
                      ></textarea>
                  </div>
              );
          case 9: // Pricing
              return (
                  <div className="animate-reveal max-w-2xl mx-auto w-full px-6 text-center">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Fixez votre tarif</h2>
                      <p className="text-gray-500 mb-12 font-medium text-sm">Prix par nuit. Ajustable à tout moment.</p>
                      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-10 rounded-[48px] border-2 border-gray-100 dark:border-gray-700 w-full justify-center shadow-inner">
                          <span className="text-4xl font-black text-gray-200">F</span>
                          <input 
                            type="number" 
                            autoFocus
                            value={formData.price || ''}
                            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            className="bg-transparent border-none outline-none font-black text-5xl md:text-6xl text-gray-900 dark:text-white text-center w-full max-w-[250px]"
                            placeholder="0"
                          />
                      </div>
                      <div className="mt-10 p-6 bg-primary/5 rounded-3xl border border-primary/10 flex justify-between items-center text-left">
                          <div>
                              <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Vos gains nets estimés</p>
                              <p className="text-2xl font-black text-gray-900 dark:text-white">{(formData.price * 0.85).toLocaleString()} F</p>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold max-w-[120px]">Après commission Reseva (15%)</span>
                      </div>
                  </div>
              );
          case 10: // Review
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter">Révision finale</h2>
                      <div className="bg-white dark:bg-[#1a202c] rounded-[48px] border-2 border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row group">
                          <div className="w-full md:w-[350px] aspect-square bg-gray-100 shrink-0 overflow-hidden relative">
                              <img src={formData.photos[0] || MOCK_PHOTOS[formData.type][0]} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" alt="Preview" />
                          </div>
                          <div className="p-10 flex flex-col justify-between flex-1">
                              <div>
                                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">{formData.category} • {formData.location || 'Afrique'}</span>
                                  <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4">{formData.title || 'Votre titre ici'}</h3>
                                  <p className="text-sm text-gray-500 line-clamp-2">{formData.description || 'Une annonce prête pour vos futurs clients.'}</p>
                              </div>
                              <div className="pt-8 mt-8 border-t border-gray-50 dark:border-gray-800 flex items-end justify-between">
                                  <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prix final</p>
                                      <span className="text-3xl font-black text-gray-900 dark:text-white">{formData.price.toLocaleString()} F</span>
                                  </div>
                                  <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3">
                                      <span className="material-symbols-outlined text-2xl font-black">done_all</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          default:
              return null;
      }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f18] flex flex-col font-display selection:bg-primary selection:text-white">
      {/* Header Bar */}
      <div className="h-20 px-6 md:px-12 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl sticky top-0 z-[100]">
         <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg rotate-6">
              <span className="material-symbols-outlined text-xl font-black">add_business</span>
            </div>
            <span className="text-lg font-black italic text-gray-900 dark:text-white hidden sm:block">Reserve <span className="text-primary not-italic">Setup.</span></span>
         </div>
         <button 
            onClick={() => { if (window.confirm('Quitter le setup ? Votre progression sera perdue.')) navigate('/host/dashboard'); }} 
            className="px-6 py-2.5 rounded-full border-2 border-gray-100 dark:border-gray-800 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
          >
            Quitter
          </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-16 overflow-y-auto no-scrollbar pb-32">
          {renderStepContent()}
      </div>

      {/* Sticky Bottom Navigation */}
      <div className="h-28 px-6 md:px-16 border-t-2 border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl fixed bottom-0 left-0 right-0 z-[100]">
          <div className="max-w-5xl mx-auto w-full h-full flex justify-between items-center gap-8">
              <button 
                onClick={prevStep}
                disabled={step === 0 || isPublishing}
                className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-all disabled:opacity-0 active:scale-95"
              >
                  Retour
              </button>
              
              <div className="hidden md:flex flex-1 max-w-md px-10">
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 relative">
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      ></div>
                  </div>
              </div>

              {step === 0 ? (
                <button onClick={nextStep} className="px-12 py-5 bg-primary hover:bg-primary-dark text-white font-black rounded-[28px] shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-widest text-sm flex items-center gap-3">
                    C'est parti <span className="material-symbols-outlined font-black">arrow_forward_ios</span>
                </button>
              ) : step === totalSteps ? (
                  <button onClick={handlePublish} disabled={isPublishing} className="px-16 py-5 bg-primary hover:bg-primary-dark text-white font-black rounded-[28px] shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-widest text-sm flex items-center gap-3 disabled:opacity-50">
                      {isPublishing ? <span className="size-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : <>Publier <span className="material-symbols-outlined font-black">rocket_launch</span></>}
                  </button>
              ) : (
                  <button 
                    onClick={nextStep}
                    disabled={
                        (step === 3 && !formData.location) || 
                        (step === 7 && !formData.title) ||
                        (step === 9 && formData.price <= 0)
                    }
                    className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black rounded-[28px] shadow-xl hover:opacity-80 transition-all btn-active-scale uppercase tracking-widest text-sm flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                      Suivant <span className="material-symbols-outlined font-black">arrow_forward_ios</span>
                  </button>
              )}
          </div>
      </div>
    </div>
  );
};

export default AddProperty;