import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

type AssetType = 'Hébergement' | 'Voiture' | 'Expérience';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
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
    if (user.role === 'GUEST' || user.verificationStatus !== 'verified') {
      addNotification('error', 'Seuls les hôtes vérifiés peuvent publier.');
      navigate('/become-a-host');
    }
  }, [user, navigate]);

  const nextStep = () => setStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep(p => Math.max(p - 1, 0));

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 2000));

    addProperty({
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      type: formData.type,
      price: `${formData.price.toLocaleString()} F`,
      rawPrice: formData.price,
      image: formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      status: 'En attente',
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
    addNotification('success', 'Annonce créée ! En cours de modération.');
    navigate('/host/dashboard');
  };

  const Counter = ({ label, sublabel, value, onChange }: any) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{label}</p>
        {sublabel && <p className="text-sm text-gray-500">{sublabel}</p>}
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
      className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md active:scale-95 ${selected ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]'}`}
    >
      <span className="material-symbols-outlined text-3xl mb-4 block text-gray-900 dark:text-white">{icon}</span>
      <p className="font-black text-lg text-gray-900 dark:text-white leading-tight mb-1">{label}</p>
      {description && <p className="text-xs text-gray-500 line-clamp-2">{description}</p>}
    </button>
  );

  const renderContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="flex flex-col md:flex-row h-full w-full max-w-[1440px] mx-auto animate-reveal">
            <div className="flex-1 bg-gradient-to-br from-primary to-orange-600 p-12 md:p-24 text-white flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">C'est simple de <br/> devenir hôte <br/> sur Reserva.</h1>
              <p className="text-xl font-bold opacity-90 max-w-md">Accompagnez-nous pour créer une annonce exceptionnelle en quelques minutes.</p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#0a0f18] p-12 md:p-24 flex flex-col justify-center items-center">
                <div className="max-w-md w-full space-y-12">
                   {[
                     { n: 1, t: 'Parlez-nous de votre bien', d: 'Indiquez le type, la catégorie et la localisation.' },
                     { n: 2, t: 'Faites-le sortir du lot', d: 'Ajoutez des photos, un titre et une description.' },
                     { n: 3, t: 'Finalisez et publiez', d: 'Choisissez un prix et publiez votre annonce.' },
                   ].map(item => (
                     <div key={item.n} className="flex gap-6 items-start">
                        <span className="text-4xl font-black text-gray-100 dark:text-gray-800 leading-none">{item.n}</span>
                        <div>
                           <h3 className="text-xl font-black mb-2">{item.t}</h3>
                           <p className="text-gray-500 font-medium">{item.d}</p>
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
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight text-center md:text-left">Lequel de ces logements décrit le mieux votre bien ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Précisez la catégorie.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(formData.type === 'Hébergement' ? ['Villa', 'Appartement', 'Lodge', 'Hôtel', 'Chambre', 'Maison'] : 
                formData.type === 'Voiture' ? ['SUV', '4x4', 'Luxe', 'Berline', 'Van', 'Pickup'] : 
                ['Safari', 'Culture', 'Aventure', 'Gastronomie', 'Visite', 'Sport']
              ).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`p-6 rounded-xl border-2 font-bold text-sm text-left transition-all ${formData.category === cat ? 'border-black dark:border-white shadow-sm' : 'border-gray-100 dark:border-gray-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Où se situe votre bien ?</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-inner">
               <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Saisissez une adresse..."
                    className="flex-1 bg-transparent border-none outline-none font-bold text-lg"
                    autoFocus
                  />
               </div>
               <div className="mt-8 h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden relative grayscale opacity-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Prévisualisation de la carte</span>
                  </div>
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="max-w-xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Les informations de base.</h2>
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
                  <div className="py-8">
                     <p className="text-lg font-bold mb-4">Transmission</p>
                     <div className="flex gap-3">
                        {['Automatique', 'Manuelle'].map(t => (
                          <button 
                            key={t}
                            onClick={() => setFormData({...formData, transmission: t})}
                            className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${formData.transmission === t ? 'border-black dark:border-white bg-black/5' : 'border-gray-100 dark:border-gray-800'}`}
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
        const amens = ['Wifi', 'Cuisine', 'Climatisation', 'Piscine', 'Parking', 'Espace de travail', 'TV', 'Sèche-cheveux', 'Lave-linge', 'Sécurité 24/7'];
        return (
          <div className="max-w-3xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Proposez-vous ces équipements ?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amens.map(a => (
                <button 
                  key={a}
                  onClick={() => setFormData(p => ({...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]}))}
                  className={`p-8 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all hover:border-black dark:hover:border-white ${formData.amenities.includes(a) ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-gray-50 dark:border-gray-800'}`}
                >
                  <span className="material-symbols-outlined text-2xl text-gray-900 dark:text-white">
                    {a === 'Wifi' ? 'wifi' : a === 'Cuisine' ? 'cooking' : a === 'Climatisation' ? 'ac_unit' : 'done'}
                  </span>
                  <span className="font-bold text-xs uppercase tracking-widest">{a}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="max-w-3xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Ajoutez des photos de votre bien.</h2>
            <p className="text-gray-500 mb-12 font-medium">Vous aurez besoin d'au moins 1 photo pour commencer. Vous pourrez en ajouter d'autres plus tard.</p>
            <div className="aspect-video rounded-[40px] border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 transition-colors cursor-pointer group">
               <span className="material-symbols-outlined text-6xl text-gray-300 group-hover:scale-110 transition-transform">add_a_photo</span>
               <p className="mt-4 font-black text-gray-400 uppercase tracking-widest text-xs">Faire glisser ou cliquer pour charger</p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Donnez un titre à votre bien.</h2>
            <p className="text-gray-500 mb-12 font-medium">Les titres courts sont les plus efficaces. Ne vous inquiétez pas, vous pourrez toujours le modifier.</p>
            <textarea 
              className="w-full p-8 rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:border-black dark:focus:border-white transition-all font-black text-3xl text-gray-900 dark:text-white h-48 resize-none"
              placeholder="Ex: Villa Emeraude avec vue sur mer"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              autoFocus
            />
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{formData.title.length}/50</p>
          </div>
        );
      case 8:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Décrivez votre offre.</h2>
            <p className="text-gray-500 mb-12 font-medium">Partagez ce qui rend votre bien unique et attrayant pour les voyageurs.</p>
            <textarea 
              className="w-full p-8 rounded-[40px] border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:border-black dark:focus:border-white transition-all font-bold text-lg leading-relaxed h-64"
              placeholder="Décrivez l'ambiance, les environs..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              autoFocus
            />
          </div>
        );
      case 9:
        return (
          <div className="max-w-2xl mx-auto w-full px-6 animate-reveal text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Maintenant, fixez votre prix.</h2>
            <p className="text-gray-500 mb-16 font-medium">Vous pouvez le modifier à tout moment.</p>
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 px-12 py-10 rounded-[60px] border-2 border-gray-100 dark:border-gray-700 shadow-inner group">
                   <span className="text-6xl font-black text-gray-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">F</span>
                   <input 
                     type="number"
                     value={formData.price || ''}
                     onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                     className="bg-transparent border-none outline-none font-black text-7xl md:text-9xl text-gray-900 dark:text-white text-center w-full max-w-[400px]"
                     placeholder="0"
                     autoFocus
                   />
                </div>
                <div className="mt-10 p-8 bg-black dark:bg-white text-white dark:text-black rounded-3xl w-full flex justify-between items-center shadow-2xl">
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Gains nets estimés (Hôte)</p>
                      <p className="text-3xl font-black">{(formData.price * 0.85).toLocaleString()} F</p>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-50 max-w-[120px] text-right">Après commission Reserva (15%)</span>
                </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="max-w-4xl mx-auto w-full px-6 animate-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Vérifiez votre annonce.</h2>
            <div className="bg-white dark:bg-[#1a202c] rounded-[50px] border-2 border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row group transition-all">
                <div className="w-full md:w-[450px] aspect-[4/5] bg-gray-100 shrink-0 overflow-hidden relative">
                    <img 
                      src={formData.photos[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-[4s]" 
                      alt="Review" 
                    />
                    <div className="absolute top-8 left-8 bg-white/95 dark:bg-black/90 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Aperçu de l'annonce</div>
                </div>
                <div className="p-12 flex flex-col justify-between flex-1">
                   <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">{formData.category} • {formData.location || 'Afrique'}</span>
                      <h3 className="text-4xl font-black text-gray-900 dark:text-white leading-none mb-6 line-clamp-2">{formData.title || 'Nouvelle Annonce'}</h3>
                      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-500">Tarif par nuit/jour</span>
                            <span className="font-black text-2xl text-primary">{formData.price.toLocaleString()} F</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-500">Type</span>
                            <span className="font-black text-gray-900 dark:text-white">{formData.type}</span>
                         </div>
                      </div>
                   </div>
                   <div className="pt-10 mt-10 border-t border-gray-100 dark:border-gray-800 flex items-center gap-6">
                      <div className="size-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                         <span className="material-symbols-outlined text-3xl font-black">verified</span>
                      </div>
                      <p className="text-sm font-bold text-gray-500 leading-relaxed">Votre annonce sera validée par nos experts sous 24h avant d'être publiée.</p>
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
      
      {/* Dynamic Header */}
      <header className="h-20 px-6 md:px-12 flex justify-between items-center border-b border-gray-50 dark:border-gray-800/50 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl sticky top-0 z-[100]">
         <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg rotate-6">
              <span className="material-symbols-outlined text-xl font-black">add_business</span>
            </div>
            <span className="text-lg font-black italic text-gray-900 dark:text-white hidden sm:block">Reserva <span className="text-primary not-italic">Setup.</span></span>
         </div>
         <button 
           onClick={() => { if (confirm('Quitter sans enregistrer ?')) navigate('/host/dashboard'); }}
           className="px-8 py-2.5 rounded-full border-2 border-gray-100 dark:border-gray-800 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 text-gray-900 dark:text-white shadow-sm"
         >
           Fermer et quitter
         </button>
      </header>

      {/* Main Form Content */}
      <main className={`flex-1 flex flex-col items-center justify-center overflow-y-auto no-scrollbar py-12 ${step === 0 ? '' : 'pb-40 pt-20'}`}>
          {renderContent()}
      </main>

      {/* Navigation Footer */}
      <footer className="h-32 px-6 md:px-24 border-t-2 border-gray-50 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f18]/95 backdrop-blur-xl fixed bottom-0 left-0 right-0 z-[100]">
          <div className="max-w-[1440px] mx-auto w-full h-full flex justify-between items-center gap-10">
              <button 
                onClick={prevStep} 
                className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                Retour
              </button>
              
              <div className="hidden md:flex flex-1 max-w-xl px-10">
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-black dark:bg-white transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]" 
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      ></div>
                  </div>
              </div>

              {step === totalSteps ? (
                  <button 
                    onClick={handlePublish} 
                    disabled={isPublishing}
                    className="px-20 py-6 bg-primary hover:bg-primary-dark text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center gap-4"
                  >
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
                    className="px-16 py-6 bg-black dark:bg-white text-white dark:text-black font-black rounded-3xl shadow-2xl hover:opacity-80 transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {step === 0 ? 'Commencer' : 'Suivant'} <span className="material-symbols-outlined font-black">arrow_forward</span>
                  </button>
              )}
          </div>
      </footer>
    </div>
  );
};

export default AddProperty;