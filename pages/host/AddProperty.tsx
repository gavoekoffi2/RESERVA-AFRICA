import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

type AssetType = 'Hébergement' | 'Voiture' | 'Expérience';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addProperty, user, addNotification } = useApp();
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
    seats: 5,
    transmission: 'Automatique',
    amenities: [] as string[],
    photos: [] as string[],
    title: '',
    description: '',
    price: 0
  });

  // Protection & Audit
  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
    const isVerifiedHost = user.role === 'HOST' && user.verificationStatus === 'verified';
    
    if (!isAdmin && !isVerifiedHost) {
      addNotification('error', 'Seuls les comptes vérifiés ou administrateurs peuvent publier.');
      navigate('/become-a-host');
    }
  }, [user, navigate, addNotification]);

  const nextStep = () => setStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep(p => Math.max(p - 1, 0));

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Quitter sans enregistrer ? Vos modifications seront perdues.')) {
      const destination = (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') 
        ? '/admin/dashboard' 
        : '/host/dashboard';
      navigate(destination);
    }
  };

  const handleFileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then(newPhotos => {
        setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
        addNotification('success', `${newPhotos.length} photo(s) ajoutée(s).`);
      });
    }
    if (e.target) e.target.value = '';
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 2000));

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

    addProperty({
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      type: formData.type,
      price: `${formData.price.toLocaleString()} F`,
      rawPrice: formData.price,
      image: formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      status: isAdmin ? 'En ligne' : 'En attente',
      owner: user?.name || '',
      ownerId: user?.id || '',
      category: formData.category,
      features: formData.amenities,
      capacity: formData.type === 'Voiture' ? formData.seats : formData.capacity,
      description: formData.description,
      coordinates: { lat: 6.13, lng: 1.22 },
      blockedDates: []
    });

    setIsPublishing(false);
    addNotification('success', isAdmin ? 'Bien publié officiellement !' : 'Annonce créée ! En cours de modération.');
    
    if (isAdmin) navigate('/admin/properties');
    else navigate('/host/dashboard');
  };

  const Counter = ({ label, sublabel, value, onChange }: any) => (
    <div className="flex items-center justify-between py-4 md:py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div>
        <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{label}</p>
        {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChange(Math.max(1, value - 1))}
          className="size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">remove</span>
        </button>
        <span className="w-6 text-center font-bold text-lg">{value}</span>
        <button 
          onClick={() => onChange(value + 1)}
          className="size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>
    </div>
  );

  const SelectionCard = ({ label, icon, selected, onClick, description }: any) => (
    <button 
      onClick={onClick}
      className={`p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md active:scale-95 ${selected ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]'}`}
    >
      <span className="material-symbols-outlined text-2xl md:text-3xl mb-3 md:mb-4 block text-gray-900 dark:text-white">{icon}</span>
      <p className="font-black text-base md:text-lg text-gray-900 dark:text-white leading-tight mb-1">{label}</p>
      {description && <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2">{description}</p>}
    </button>
  );

  const renderContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="flex flex-col md:flex-row h-full w-full max-w-[1440px] mx-auto animate-reveal">
            <div className="flex-1 bg-gradient-to-br from-primary to-orange-600 p-8 md:p-24 text-white flex flex-col justify-center">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6 md:mb-8">C'est simple de <br/> ajouter un bien <br/> sur Reserva.</h1>
              <p className="text-lg md:text-xl font-bold opacity-90 max-w-md">Accompagnez-nous pour créer une annonce exceptionnelle en quelques minutes.</p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#0a0f18] p-8 md:p-24 flex flex-col justify-center items-center">
                <div className="max-w-md w-full space-y-8 md:y-12">
                   {[
                     { n: 1, t: 'Parlez-nous du bien', d: 'Indiquez le type, la catégorie et la localisation.' },
                     { n: 2, t: 'Faites-le sortir du lot', d: 'Ajoutez des photos, un titre et une description.' },
                     { n: 3, t: 'Finalisez et publiez', d: 'Choisissez un prix et publiez votre annonce.' },
                   ].map(item => (
                     <div key={item.n} className="flex gap-4 md:gap-6 items-start">
                        <span className="text-3xl md:text-4xl font-black text-gray-100 dark:text-gray-800 leading-none">{item.n}</span>
                        <div>
                           <h3 className="text-lg md:text-xl font-black mb-1 md:mb-2">{item.t}</h3>
                           <p className="text-sm md:text-gray-500 font-medium">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="max-w-3xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight text-center md:text-left">Lequel de ces logements décrit le mieux le bien ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { l: 'Hébergement', i: 'home_work', d: 'Villas, appartements, lodges...' },
                { l: 'Voiture', i: 'directions_car', d: 'SUV, 4x4, Berlines de luxe...' },
                { l: 'Expérience', i: 'explore', d: 'Safaris, visites guidées, cours...' },
              ].map(item => (
                <SelectionCard 
                  key={item.l}
                  label={item.l}
                  icon={item.i}
                  description={item.d}
                  selected={formData.type === item.l}
                  onClick={() => setFormData({...formData, type: item.l as AssetType})}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-3xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight">Précisez la catégorie.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {(formData.type === 'Hébergement' ? ['Villa', 'Appartement', 'Lodge', 'Hôtel', 'Chambre', 'Maison'] : 
                formData.type === 'Voiture' ? ['SUV', '4x4', 'Luxe', 'Berline', 'Van', 'Pickup'] : 
                ['Safari', 'Culture', 'Aventure', 'Gastronomie', 'Visite', 'Sport']
              ).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`p-4 md:p-6 rounded-xl border-2 font-bold text-xs md:text-sm text-left transition-all ${formData.category === cat ? 'border-black dark:border-white shadow-sm' : 'border-gray-100 dark:border-gray-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 tracking-tight">Où se situe le bien ?</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 dark:border-gray-700">
               <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Ville, Pays..."
                    className="flex-1 bg-transparent border-none outline-none font-bold text-base md:text-lg"
                    autoFocus
                  />
               </div>
               <div className="mt-6 md:mt-8 h-48 md:h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden relative shadow-inner">
                  {formData.location.length > 2 ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(formData.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      className="absolute inset-0 w-full h-full dark:invert"
                      title="Location Preview"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                      <span className="material-symbols-outlined text-4xl opacity-20">map</span>
                      <span className="font-black uppercase tracking-widest text-[8px]">Entrez une adresse</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight">Les informations de base.</h2>
            <div className="flex flex-col">
              {formData.type === 'Hébergement' ? (
                <>
                  <Counter label="Voyageurs" value={formData.capacity} onChange={(v: number) => setFormData({...formData, capacity: v})} />
                  <Counter label="Chambres" value={formData.bedrooms} onChange={(v: number) => setFormData({...formData, bedrooms: v})} />
                  <Counter label="Lits" value={formData.beds} onChange={(v: number) => setFormData({...formData, beds: v})} />
                  <Counter label="Salles de bain" value={formData.bathrooms} onChange={(v: number) => setFormData({...formData, bathrooms: v})} />
                </>
              ) : formData.type === 'Voiture' ? (
                <>
                  <Counter label="Passagers" sublabel="Nombre de places assises" value={formData.seats} onChange={(v: number) => setFormData({...formData, seats: v})} />
                  <div className="py-6 md:py-8">
                     <p className="text-base md:text-lg font-bold mb-4">Transmission</p>
                     <div className="flex gap-2">
                        {['Automatique', 'Manuelle'].map(t => (
                          <button 
                            key={t}
                            onClick={() => setFormData({...formData, transmission: t})}
                            className={`flex-1 py-3 md:py-4 rounded-xl border-2 font-bold text-sm transition-all ${formData.transmission === t ? 'border-black dark:border-white bg-black/5' : 'border-gray-100 dark:border-gray-800'}`}
                          >
                            {t}
                          </button>
                        ))}
                     </div>
                  </div>
                </>
              ) : (
                <Counter label="Capacité du groupe" sublabel="Nombre max de participants" value={formData.capacity} onChange={(v: number) => setFormData({...formData, capacity: v})} />
              )}
            </div>
          </div>
        );
      case 5:
        const amens = ['Wifi', 'Cuisine', 'Climatisation', 'Piscine', 'Parking', 'TV', 'Sécurité 24/7'];
        return (
          <div className="max-w-3xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight text-center md:text-left">Équipements.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {amens.map(a => (
                <button 
                  key={a}
                  onClick={() => setFormData(p => ({...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]}))}
                  className={`p-6 md:p-8 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all hover:border-black dark:hover:border-white ${formData.amenities.includes(a) ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-gray-50 dark:border-gray-800'}`}
                >
                  <span className="material-symbols-outlined text-xl md:text-2xl text-gray-900 dark:text-white">
                    {a === 'Wifi' ? 'wifi' : a === 'Piscine' ? 'pool' : a === 'Parking' ? 'local_parking' : 'done'}
                  </span>
                  <span className="font-bold text-[10px] uppercase tracking-widest">{a}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="max-w-4xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">Photos du bien.</h2>
            <p className="text-gray-500 mb-8 md:mb-12 font-medium text-sm">Téléchargez au moins une photo pour présenter votre bien.</p>
            
            <input type="file" ref={fileInputRef} multiple accept="image/*" className="hidden" onChange={handleFileChange} />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                <div 
                  onClick={handleFileClick}
                  className="aspect-square rounded-[24px] md:rounded-[40px] border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer group shadow-inner"
                >
                   <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-primary transition-all">add_a_photo</span>
                   <p className="mt-3 font-black text-gray-400 uppercase tracking-widest text-[8px]">Ajouter</p>
                </div>

                {formData.photos.map((src, idx) => (
                    <div key={idx} className="aspect-square rounded-[24px] md:rounded-[40px] overflow-hidden relative shadow-lg border border-gray-100 dark:border-gray-800 group animate-reveal">
                        <img src={src} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                        <button 
                            onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                            className="absolute top-3 right-3 bg-red-500 text-white size-7 md:size-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                        {idx === 0 && (
                            <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-black/90 px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest">Principal</div>
                        )}
                    </div>
                ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">Titre du bien.</h2>
            <p className="text-gray-500 mb-8 font-medium text-sm">Donnez un nom accrocheur à votre bien.</p>
            <textarea 
              className="w-full p-6 md:p-8 rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:border-black dark:focus:border-white transition-all font-black text-2xl md:text-3xl text-gray-900 dark:text-white h-40 resize-none shadow-inner"
              placeholder="Ex: Villa Emeraude Prestige"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              autoFocus
            />
          </div>
        );
      case 8:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">Description.</h2>
            <p className="text-gray-500 mb-8 font-medium text-sm">Décrivez ce qui rend ce bien unique.</p>
            <textarea 
              className="w-full p-6 md:p-8 rounded-[32px] border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:border-black dark:focus:border-white transition-all font-bold text-base md:text-lg h-56 shadow-inner"
              placeholder="Ambiance, quartier, services..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              autoFocus
            />
          </div>
        );
      case 9:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">Prix final.</h2>
            <p className="text-gray-500 mb-12 font-medium text-sm">Fixez le tarif par nuit ou par jour.</p>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-8 py-6 md:px-12 md:py-10 rounded-[40px] md:rounded-[60px] border-2 border-gray-100 dark:border-gray-700 shadow-inner focus-within:border-black dark:focus-within:border-white transition-all">
                   <span className="text-2xl md:text-4xl font-black text-gray-300">F</span>
                   <input 
                     type="number"
                     value={formData.price || ''}
                     onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                     className="bg-transparent border-none outline-none font-black text-3xl md:text-5xl text-gray-900 dark:text-white text-center w-full max-w-[300px]"
                     placeholder="0"
                     autoFocus
                   />
                </div>
                <div className="mt-8 p-6 bg-black dark:bg-white text-white dark:text-black rounded-3xl w-full flex justify-between items-center shadow-xl">
                   <div className="text-left">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Gains nets estimés</p>
                      <p className="text-2xl font-black">{(formData.price * 0.85).toLocaleString()} F</p>
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest opacity-50 text-right">Commission déduite</span>
                </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="max-w-4xl mx-auto w-full px-4 md:px-6 animate-reveal">
            <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight">Récapitulatif final.</h2>
            <div className="bg-white dark:bg-[#1a202c] rounded-[40px] border-2 border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row group">
                <div className="w-full md:w-[400px] aspect-[4/5] bg-gray-100 shrink-0 overflow-hidden relative">
                    <img 
                      src={formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-[4s]" 
                      alt="Review" 
                    />
                    <div className="absolute top-6 left-6 bg-white/95 dark:bg-black/90 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">Aperçu du bien</div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between flex-1">
                   <div>
                      <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">{formData.category} • {formData.location || 'Afrique'}</span>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none mb-6 line-clamp-2">{formData.title || 'Nouveau Bien'}</h3>
                      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-500 text-sm">Tarif public</span>
                            <span className="font-black text-xl text-primary">{formData.price.toLocaleString()} F</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-500 text-sm">Propriétaire</span>
                            <span className="font-black text-gray-900 dark:text-white text-sm">{user?.name}</span>
                         </div>
                      </div>
                   </div>
                   <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4">
                      <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                         <span className="material-symbols-outlined text-2xl font-black">verified</span>
                      </div>
                      <p className="text-xs font-bold text-gray-500 leading-relaxed">
                        {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' 
                          ? "En tant qu'administrateur, votre bien sera en ligne immédiatement." 
                          : "Votre bien sera vérifié par notre équipe sous 24h."}
                      </p>
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
    <div className="min-h-screen bg-white dark:bg-[#0a0f18] flex flex-col font-display selection:bg-primary selection:text-white overflow-x-hidden">
      <header className="h-16 md:h-20 px-4 md:px-12 flex justify-between items-center border-b border-gray-50 dark:border-gray-800/50 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl sticky top-0 z-[110]">
         <div className="flex items-center gap-3">
            <div className="size-8 md:size-10 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-lg md:text-xl font-black">add_business</span>
            </div>
            <span className="text-base md:text-lg font-black italic text-gray-900 dark:text-white hidden sm:block">Reserva <span className="text-primary not-italic">Setup.</span></span>
         </div>
         <button onClick={handleClose} className="px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 font-black text-[9px] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-900 dark:text-white">
           Fermer et quitter
         </button>
      </header>

      <main className={`flex-1 flex flex-col items-center justify-center overflow-y-auto no-scrollbar py-8 ${step === 0 ? '' : 'pb-32 md:pb-40 pt-10 md:pt-20'}`}>
          {renderContent()}
      </main>

      <footer className="h-24 md:h-32 px-4 md:px-24 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl fixed bottom-0 left-0 right-0 z-[100]">
          <div className="max-w-[1440px] mx-auto w-full h-full flex justify-between items-center gap-4 md:gap-10">
              <button 
                onClick={prevStep} 
                className={`px-6 md:px-10 py-4 md:py-5 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                Retour
              </button>
              
              <div className="hidden md:flex flex-1 max-w-xl px-10">
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-black dark:bg-white transition-all duration-700" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                  </div>
              </div>

              {step === totalSteps ? (
                  <button 
                    onClick={handlePublish} 
                    disabled={isPublishing}
                    className="px-10 md:px-20 py-4 md:py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl md:rounded-3xl shadow-xl transition-all btn-active-scale uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-3"
                  >
                    {isPublishing ? <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <>Publier <span className="material-symbols-outlined font-black text-sm">rocket_launch</span></>}
                  </button>
              ) : (
                  <button 
                    onClick={nextStep} 
                    disabled={
                      (step === 3 && !formData.location) || 
                      (step === 6 && formData.photos.length === 0) ||
                      (step === 7 && !formData.title) || 
                      (step === 9 && formData.price <= 0)
                    }
                    className="px-10 md:px-16 py-4 md:py-6 bg-black dark:bg-white text-white dark:text-black font-black rounded-2xl md:rounded-3xl shadow-xl hover:opacity-80 transition-all btn-active-scale uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-3 disabled:opacity-30"
                  >
                    {step === 0 ? 'Commencer' : 'Suivant'} <span className="material-symbols-outlined font-black text-sm">arrow_forward</span>
                  </button>
              )}
          </div>
      </footer>
    </div>
  );
};

export default AddProperty;