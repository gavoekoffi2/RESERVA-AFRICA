import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

type AssetType = 'Hébergement' | 'Voiture' | 'Expérience';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const { addProperty, user, addNotification, submitVerification } = useApp();
  
  // Airbnb-style setup state
  const [step, setStep] = useState(-1); // -1 is Verification Check, 0 is Intro
  const totalSteps = 10;
  const [isPublishing, setIsPublishing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
      type: 'Hébergement' as AssetType,
      category: 'Villa',
      location: '',
      // Stay specific
      capacity: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      // Car specific
      brand: '',
      model: '',
      transmission: 'Automatique',
      // Experience specific
      duration: '4h',
      language: 'Français',
      
      amenities: [] as string[],
      photos: [] as string[],
      title: '',
      description: '',
      price: 0
  });

  const nextStep = () => setStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep(p => Math.max(p - 1, -1));

  const MOCK_PHOTOS = {
    'Hébergement': [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512918766671-ed6a07be3573?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687940-c52af0b0539b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613490493576-2f045a168583?auto=format&fit=crop&w=1200&q=80"
    ],
    'Voiture': [
        "https://images.unsplash.com/photo-1594731826724-4061a9415f3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
    ],
    'Expérience': [
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1547995886-67ba2bc41708?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1596328926077-333e9b11029c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1523810192022-5a0fb9aa7bc8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"
    ]
  };

  const handlePublish = async () => {
      if (!user) return;
      setIsPublishing(true);
      
      // Artificial delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 2000));

      addProperty({
          id: Date.now(),
          title: formData.title || 'Ma superbe annonce',
          location: formData.location || 'Lomé, Togo',
          type: formData.type,
          price: `${formData.price.toLocaleString()} F`,
          rawPrice: formData.price,
          image: formData.photos[0] || MOCK_PHOTOS[formData.type][0],
          status: 'En attente',
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
      addNotification('success', 'Félicitations ! Votre annonce a été soumise pour examen.');
      navigate('/host/dashboard');
  };

  const handleStartVerification = () => {
      setIsVerifying(true);
      // Simulate verification upload
      setTimeout(() => {
          submitVerification('ID Card', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=200&q=80');
          setIsVerifying(false);
          // Auto-verified for demo after short delay? No, stay in pending to show the Airbnb flow.
      }, 2000);
  };

  const toggleAmenity = (label: string) => {
    setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(label) 
            ? prev.amenities.filter(a => a !== label) 
            : [...prev.amenities, label]
    }));
  };

  // Guard: If verification is not verified, show verification gate
  if (step === -1) {
      return (
          <div className="min-h-screen bg-white dark:bg-[#0a0f18] flex flex-col font-display animate-reveal">
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
                  <div className="size-24 rounded-[40px] bg-primary/10 flex items-center justify-center text-primary mb-8 animate-float">
                      <span className="material-symbols-outlined text-5xl font-black">verified_user</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">La sécurité avant tout.</h1>
                  
                  {user?.verificationStatus === 'unverified' ? (
                      <>
                        <p className="text-xl text-gray-500 mb-10 leading-relaxed">Pour garantir la confiance de notre communauté, tous les hôtes doivent faire vérifier leur identité avant de lister un bien sur Reseva Africa.</p>
                        <div className="w-full space-y-4">
                            <button 
                                onClick={handleStartVerification}
                                disabled={isVerifying}
                                className="w-full py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-[32px] shadow-2xl shadow-primary/30 transition-all btn-active-scale uppercase tracking-widest text-lg flex items-center justify-center gap-4"
                            >
                                {isVerifying ? <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : 'Démarrer la vérification'}
                            </button>
                            <Link to="/host/dashboard" className="block w-full py-4 text-gray-400 font-bold uppercase tracking-widest text-sm hover:text-black">Plus tard</Link>
                        </div>
                      </>
                  ) : user?.verificationStatus === 'pending' ? (
                      <>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-[32px] border-2 border-yellow-100 dark:border-yellow-900/30 mb-8">
                            <p className="text-yellow-800 dark:text-yellow-200 font-bold">Votre demande de vérification est en cours d'examen par notre équipe de sécurité.</p>
                        </div>
                        <p className="text-lg text-gray-500 mb-12">Cela prend généralement moins de 24 heures. Nous vous enverrons une notification dès que vous pourrez commencer à lister vos biens.</p>
                        <Link to="/host/dashboard" className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black rounded-[28px] shadow-xl uppercase tracking-widest text-sm">Retour au dashboard</Link>
                      </>
                  ) : (
                      <>
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-[32px] border-2 border-green-100 dark:border-green-900/30 mb-8">
                            <p className="text-green-800 dark:text-green-200 font-bold">Identité vérifiée !</p>
                        </div>
                        <p className="text-xl text-gray-500 mb-12">Vous êtes prêt à devenir l'un des meilleurs hôtes du continent.</p>
                        <button 
                            onClick={() => setStep(0)}
                            className="px-16 py-6 bg-primary text-white font-black rounded-[32px] shadow-2xl shadow-primary/30 transition-all btn-active-scale uppercase tracking-widest text-lg"
                        >
                            Commencer le Setup
                        </button>
                      </>
                  )}
              </div>
          </div>
      );
  }

  const renderStep = () => {
      switch(step) {
          case 0: // Intro Screen
              return (
                  <div className="flex flex-col lg:flex-row h-full w-full max-w-[1440px] mx-auto animate-reveal">
                      <div className="lg:flex-1 bg-black flex flex-col justify-center p-12 lg:p-24 text-white relative overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" 
                            className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-50"
                            alt="Reseva Home"
                          />
                          <div className="relative z-10 space-y-6">
                              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Reseva Setup</h2>
                              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">C'est facile de devenir hôte sur Reseva.</h1>
                          </div>
                      </div>
                      <div className="lg:flex-1 bg-white dark:bg-[#0a0f18] flex flex-col justify-center p-12 lg:p-24">
                          <div className="max-w-md space-y-12">
                              <div className="flex gap-6">
                                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      <span className="material-symbols-outlined text-primary text-3xl">home_work</span>
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-black mb-2">1. Parlez-nous de votre lieu</h3>
                                      <p className="text-gray-500 font-medium">Partagez quelques informations de base, comme l'emplacement et le nombre de voyageurs acceptés.</p>
                                  </div>
                              </div>
                              <div className="flex gap-6">
                                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      <span className="material-symbols-outlined text-primary text-3xl">photo_library</span>
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-black mb-2">2. Faites-le sortir du lot</h3>
                                      <p className="text-gray-500 font-medium">Ajoutez au moins 5 photos, un titre et une description. On vous aidera à y voir plus clair.</p>
                                  </div>
                              </div>
                              <div className="flex gap-6">
                                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-black mb-2">3. Finalisez et publiez</h3>
                                      <p className="text-gray-500 font-medium">Fixez un prix de départ et publiez votre annonce.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          case 1: // Step 1: Type Selection
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-16 tracking-tighter leading-tight text-center">Quel type de bien <br/> allez-vous lister ?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                              { label: 'Hébergement', icon: 'home_work', desc: 'Villas, appartements...' },
                              { label: 'Voiture', icon: 'directions_car', desc: 'SUV, 4x4, Berlines...' },
                              { label: 'Expérience', icon: 'explore', desc: 'Safaris, Visites...' },
                          ].map(item => (
                              <button 
                                key={item.label}
                                onClick={() => setFormData({...formData, type: item.label as AssetType})}
                                className={`p-10 rounded-[48px] border-4 transition-all flex flex-col items-center gap-6 group hover:scale-[1.02] active:scale-95 ${formData.type === item.label ? 'border-primary bg-primary/5 shadow-2xl' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]'}`}
                              >
                                  <div className={`size-20 rounded-[32px] flex items-center justify-center transition-colors ${formData.type === item.label ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-primary'}`}>
                                      <span className="material-symbols-outlined text-5xl">{item.icon}</span>
                                  </div>
                                  <div className="text-center">
                                      <p className="font-black text-xl text-gray-900 dark:text-white">{item.label}</p>
                                      <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                                  </div>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 2: // Step 2: Category Picking
              const categories = formData.type === 'Hébergement' 
                ? [{l:'Villa', i:'villa'}, {l:'Appartement', i:'apartment'}, {l:'Maison', i:'home'}, {l:'Lodge', i:'cabin'}, {l:'Chambre', i:'bed'}]
                : formData.type === 'Voiture' 
                ? [{l:'SUV', i:'minor_crash'}, {l:'Berline', i:'directions_car'}, {l:'4x4', i:'agriculture'}, {l:'Luxe', i:'diamond'}]
                : [{l:'Culture', i:'museum'}, {l:'Aventure', i:'hiking'}, {l:'Safari', i:'pets'}, {l:'Gastronomie', i:'restaurant'}];

              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter leading-tight">Lequel de ces termes décrit le mieux votre {formData.type.toLowerCase()} ?</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                          {categories.map(cat => (
                              <button 
                                key={cat.l}
                                onClick={() => setFormData({...formData, category: cat.l})}
                                className={`p-8 rounded-[40px] border-4 transition-all flex flex-col items-start gap-4 hover:border-black dark:hover:border-white ${formData.category === cat.l ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-inner' : 'border-gray-100 dark:border-gray-800'}`}
                              >
                                  <span className="material-symbols-outlined text-4xl">{cat.i}</span>
                                  <span className="font-black text-lg">{cat.l}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 3: // Step 3: Location
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Où se situe votre {formData.type.toLowerCase()} ?</h2>
                      <p className="text-lg text-gray-500 mb-12 font-medium">Votre adresse précise aide les voyageurs à mieux planifier leur trajet.</p>
                      <div className="space-y-8">
                         <div className="relative">
                             <div className="absolute left-8 top-1/2 -translate-y-1/2 text-primary">
                                 <span className="material-symbols-outlined text-3xl">location_on</span>
                             </div>
                             <input 
                                type="text" 
                                autoFocus
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="Ville, Quartier ou Adresse complète..."
                                className="w-full h-24 pl-20 pr-8 rounded-[32px] border-4 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-black text-2xl"
                             />
                         </div>
                         <div className="h-[450px] bg-gray-100 dark:bg-gray-800 rounded-[50px] overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl relative">
                            <iframe 
                                width="100%" height="100%" frameBorder="0" scrolling="no" src={`https://maps.google.com/maps?q=${formData.location || 'Dakar, Senegal'}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                className="opacity-90 grayscale-[0.2] dark:invert"
                                title="Location map"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[42px]"></div>
                         </div>
                      </div>
                  </div>
              );
          case 4: // Step 4: Basics (Rooms/Guests or Specs)
              if (formData.type === 'Hébergement') {
                return (
                    <div className="animate-reveal max-w-2xl mx-auto w-full px-6 py-12">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Dites-nous en plus sur la capacité d'accueil</h2>
                        <p className="text-lg text-gray-500 mb-16 font-medium">Ces informations sont essentielles pour les voyageurs.</p>
                        <div className="space-y-10">
                           {[
                               { label: 'Voyageurs', key: 'capacity' },
                               { label: 'Chambres', key: 'bedrooms' },
                               { label: 'Lits', key: 'beds' },
                               { label: 'Salles de bain', key: 'bathrooms' },
                           ].map(item => (
                               <div key={item.key} className="flex justify-between items-center pb-8 border-b-2 border-gray-100 dark:border-gray-800">
                                   <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{item.label}</span>
                                   <div className="flex items-center gap-8">
                                       <button onClick={() => setFormData({...formData, [item.key]: Math.max(1, (formData as any)[item.key] - 1)})} className="size-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black dark:hover:border-white transition-all active:scale-90"><span className="material-symbols-outlined text-xl">remove</span></button>
                                       <span className="font-black text-2xl w-8 text-center">{(formData as any)[item.key]}</span>
                                       <button onClick={() => setFormData({...formData, [item.key]: (formData as any)[item.key] + 1})} className="size-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black dark:hover:border-white transition-all active:scale-90"><span className="material-symbols-outlined text-xl">add</span></button>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                );
              } else {
                  return (
                    <div className="animate-reveal max-w-2xl mx-auto w-full px-6 py-12">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter leading-tight">Détails techniques</h2>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modèle / Nom</label>
                                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} type="text" placeholder="Ex: Land Cruiser 2023" className="w-full h-20 px-8 rounded-3xl border-4 border-gray-100 dark:border-gray-800 bg-gray-50/50 outline-none focus:border-primary font-black text-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Langue / Carburant</label>
                                <input value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} type="text" placeholder="Ex: Français / Diesel" className="w-full h-20 px-8 rounded-3xl border-4 border-gray-100 dark:border-gray-800 bg-gray-50/50 outline-none focus:border-primary font-black text-xl" />
                            </div>
                        </div>
                    </div>
                  );
              }
          case 5: // Step 5: Amenities
              const amenities = formData.type === 'Hébergement' 
                ? [{l:'Wifi', i:'wifi'}, {l:'Cuisine', i:'cooking'}, {l:'Climatisation', i:'ac_unit'}, {l:'Piscine', i:'pool'}, {l:'Parking', i:'local_parking'}, {l:'Lave-linge', i:'local_laundry_service'}, {l:'TV', i:'tv'}, {l:'Espace Travail', i:'laptop_mac'}]
                : formData.type === 'Voiture'
                ? [{l:'Chauffeur', i:'person'}, {l:'Climatisation', i:'ac_unit'}, {l:'Bluetooth', i:'bluetooth'}, {l:'Assurance', i:'verified_user'}, {l:'GPS', i:'map'}, {l:'7 Places', i:'group'}]
                : [{l:'Transport', i:'directions_bus'}, {l:'Repas', i:'restaurant'}, {l:'Boissons', i:'local_bar'}, {l:'Guide', i:'verified'}, {l:'Photos', i:'photo_camera'}, {l:'Wifi', i:'wifi'}];

              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Quels sont les atouts de votre offre ?</h2>
                      <p className="text-lg text-gray-500 mb-16 font-medium">Sélectionnez les équipements ou services inclus.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          {amenities.map(amenity => (
                              <button 
                                key={amenity.l}
                                onClick={() => toggleAmenity(amenity.l)}
                                className={`p-10 rounded-[48px] border-4 transition-all flex flex-col items-center justify-center gap-6 hover:border-black dark:hover:border-white ${formData.amenities.includes(amenity.l) ? 'border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-inner' : 'border-gray-100 dark:border-gray-800'}`}
                              >
                                  <span className={`material-symbols-outlined text-5xl ${formData.amenities.includes(amenity.l) ? 'text-primary drop-shadow-[0_0_8px_rgba(238,108,43,0.3)]' : 'text-gray-400'}`}>{amenity.i}</span>
                                  <span className="font-black text-sm uppercase tracking-widest">{amenity.l}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 6: // Step 6: Photos
              const currentMockPhotos = MOCK_PHOTOS[formData.type];
              return (
                  <div className="animate-reveal max-w-5xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Mettez en valeur votre bien</h2>
                      <p className="text-lg text-gray-500 mb-16 font-medium">Ajoutez des photos de haute qualité pour attirer les voyageurs.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="col-span-full aspect-[21/9] bg-gray-50 dark:bg-gray-800 border-8 border-dashed border-gray-200 dark:border-gray-700 rounded-[64px] flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-primary/5 transition-all">
                              <div className="size-24 rounded-full bg-white dark:bg-gray-700 shadow-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                  <span className="material-symbols-outlined text-6xl">add_a_photo</span>
                              </div>
                              <p className="font-black text-3xl text-gray-400 group-hover:text-primary transition-colors tracking-tight">Ajoutez vos photos</p>
                          </div>
                          {currentMockPhotos.map((url, i) => (
                              <button 
                                key={i}
                                onClick={() => setFormData({
                                    ...formData, 
                                    photos: formData.photos.includes(url) ? formData.photos.filter(p => p !== url) : [...formData.photos, url]
                                })}
                                className={`aspect-[4/3] rounded-[48px] overflow-hidden border-8 transition-all relative ${formData.photos.includes(url) ? 'border-primary shadow-2xl scale-[1.05] z-10' : 'border-transparent hover:scale-[1.05]'}`}
                              >
                                  <img src={url} className="w-full h-full object-cover" alt="Preview" />
                                  {formData.photos.includes(url) && (
                                      <div className="absolute top-6 right-6 bg-primary text-white size-10 rounded-full shadow-2xl flex items-center justify-center border-2 border-white">
                                          <span className="material-symbols-outlined font-black">check</span>
                                      </div>
                                  )}
                              </button>
                          ))}
                      </div>
                  </div>
              );
          case 7: // Step 7: Title
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Donnez un titre captivant</h2>
                      <p className="text-lg text-gray-500 mb-12 font-medium">Un bon titre mentionne une caractéristique unique.</p>
                      <textarea 
                        autoFocus
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full h-56 p-12 rounded-[48px] border-4 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-black text-4xl leading-tight placeholder:text-gray-200"
                        placeholder="Ex: Villa Emeraude avec vue sur mer..."
                        maxLength={60}
                      ></textarea>
                      <div className="flex justify-end mt-6 px-4">
                        <span className="text-sm font-black text-gray-400 tracking-widest">{formData.title.length}/60</span>
                      </div>
                  </div>
              );
          case 8: // Step 8: Description
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Décrivez votre offre</h2>
                      <p className="text-lg text-gray-500 mb-12 font-medium">Faites voyager les clients avec vos mots. Parlez du quartier et de l'ambiance.</p>
                      <textarea 
                        autoFocus
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full h-80 p-12 rounded-[56px] border-4 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 outline-none focus:border-primary transition-all font-bold text-2xl leading-relaxed placeholder:text-gray-200"
                        placeholder="Qu'est-ce qui rend ce lieu unique ?..."
                      ></textarea>
                  </div>
              );
          case 9: // Step 9: Pricing
              return (
                  <div className="animate-reveal max-w-3xl mx-auto w-full px-6 py-12 text-center">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Fixez votre prix</h2>
                      <p className="text-lg text-gray-500 mb-16 font-medium">Vous pourrez le modifier à tout moment selon la saisonnalité.</p>
                      
                      <div className="flex flex-col items-center gap-16">
                          <div className="flex items-center gap-8 bg-gray-50 dark:bg-gray-800 p-16 rounded-[64px] border-4 border-gray-100 dark:border-gray-700 w-full justify-center shadow-inner">
                              <span className="text-7xl font-black text-gray-200">F</span>
                              <input 
                                type="number" 
                                autoFocus
                                value={formData.price || ''}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="bg-transparent border-none outline-none font-black text-9xl text-gray-900 dark:text-white text-center w-[400px]"
                                placeholder="0"
                              />
                          </div>
                          
                          <div className="bg-primary/5 dark:bg-primary/10 p-12 rounded-[56px] border-4 border-primary/10 w-full space-y-8 text-left">
                              <div className="flex justify-between items-center">
                                  <span className="text-xl font-bold text-gray-500 flex items-center gap-3"><span className="material-symbols-outlined">info</span> Commission Reseva (15%)</span>
                                  <span className="text-red-500 font-black text-2xl">- {(formData.price * 0.15).toLocaleString()} F</span>
                              </div>
                              <div className="pt-10 border-t-4 border-primary/10 flex justify-between items-center">
                                  <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Revenu Net estimé</span>
                                  <span className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(238,108,43,0.3)]">{(formData.price * 0.85).toLocaleString()} F</span>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          case 10: // Step 10: Final Review
              return (
                  <div className="animate-reveal max-w-4xl mx-auto w-full px-6 py-12">
                      <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">Dernière vérification</h2>
                      <p className="text-lg text-gray-500 mb-16 font-medium">C'est le moment de relire votre annonce avant de la publier.</p>
                      
                      <div className="bg-white dark:bg-[#1a202c] rounded-[64px] border-8 border-white dark:border-gray-800 shadow-[0_60px_150px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col lg:row gap-0 group">
                          <div className="w-full lg:w-[450px] aspect-[4/5] bg-gray-100 shrink-0 overflow-hidden relative">
                              <img src={formData.photos[0] || MOCK_PHOTOS[formData.type][0]} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="Preview" />
                              <div className="absolute top-10 left-10 bg-white/95 backdrop-blur px-6 py-3 rounded-3xl font-black text-xs uppercase tracking-widest text-primary shadow-2xl">Aperçu final</div>
                          </div>
                          <div className="p-16 flex flex-col justify-between flex-1">
                              <div>
                                  <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">{formData.category} • {formData.location || 'Afrique'}</span>
                                        <h3 className="text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter">{formData.title || 'Votre titre ici'}</h3>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-3xl flex items-center gap-2 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                                        <span className="material-symbols-outlined text-yellow-500 text-2xl icon-filled">star</span>
                                        <span className="font-black text-2xl">5.0</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-4 mt-12">
                                      {formData.amenities.slice(0, 5).map(a => (
                                          <span key={a} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs font-black text-gray-500 uppercase tracking-[0.1em] border border-gray-100 dark:border-gray-700">{a}</span>
                                      ))}
                                  </div>
                              </div>
                              <div className="mt-16 pt-12 border-t-4 border-gray-50 dark:border-gray-800 flex items-end justify-between">
                                  <div>
                                      <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Prix par nuit</p>
                                      <div className="flex items-baseline gap-2">
                                          <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">{formData.price.toLocaleString()} F</span>
                                      </div>
                                  </div>
                                  <div className="size-20 rounded-[28px] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 rotate-3 group-hover:rotate-0 transition-transform">
                                      <span className="material-symbols-outlined text-4xl font-black">done_all</span>
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
      <div className="h-24 px-8 md:px-12 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl sticky top-0 z-[100]">
         <div className="flex items-center gap-4">
            <div className="size-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-2xl rotate-6 group cursor-pointer hover:rotate-0 transition-transform">
              <span className="material-symbols-outlined text-3xl font-black">add_business</span>
            </div>
            <div className="hidden sm:block">
                <span className="text-2xl font-black italic text-gray-900 dark:text-white">Reserve <span className="text-primary not-italic">Setup.</span></span>
            </div>
         </div>
         <div className="flex items-center gap-6">
             <button 
                onClick={() => {
                    if (window.confirm('Voulez-vous vraiment quitter ? Votre progression sera perdue.')) {
                        navigate('/host/dashboard');
                    }
                }} 
                className="px-10 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 font-black text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
            >
                Quitter
            </button>
         </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-28">
          {renderStep()}
      </div>

      {/* Modern Airbnb-style Sticky Footer */}
      <div className="h-32 px-8 md:px-24 border-t-2 border-gray-100 dark:border-gray-800 bg-white/98 dark:bg-[#0a0f18]/98 backdrop-blur-2xl fixed bottom-0 left-0 right-0 z-[100]">
          <div className="max-w-[1440px] mx-auto w-full h-full flex justify-between items-center gap-10">
              <button 
                onClick={prevStep}
                disabled={step === 0 || isPublishing}
                className="px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-0 active:scale-95"
              >
                  Retour
              </button>
              
              <div className="hidden lg:flex flex-1 max-w-2xl px-12">
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_#ee6c2b]"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      ></div>
                  </div>
              </div>

              {step === 0 ? (
                <button 
                  onClick={nextStep}
                  className="px-16 py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-[28px] shadow-[0_30px_60px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-widest text-lg flex items-center gap-4"
                >
                    C'est parti <span className="material-symbols-outlined font-black">arrow_forward_ios</span>
                </button>
              ) : step === totalSteps ? (
                  <button 
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="px-20 py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-[28px] shadow-[0_30px_70px_rgba(238,108,43,0.5)] transition-all btn-active-scale uppercase tracking-[0.15em] text-lg flex items-center gap-4 disabled:opacity-50"
                  >
                      {isPublishing ? (
                          <>
                            <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                            Publication...
                          </>
                      ) : (
                          <>Publier l'annonce <span className="material-symbols-outlined font-black">rocket_launch</span></>
                      )}
                  </button>
              ) : (
                  <button 
                    onClick={nextStep}
                    disabled={
                        (step === 3 && !formData.location) ||
                        (step === 7 && !formData.title) ||
                        (step === 9 && formData.price <= 0)
                    }
                    className="px-16 py-6 bg-black dark:bg-white text-white dark:text-black font-black rounded-[28px] shadow-2xl hover:opacity-80 transition-all btn-active-scale uppercase tracking-widest text-lg flex items-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed"
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
