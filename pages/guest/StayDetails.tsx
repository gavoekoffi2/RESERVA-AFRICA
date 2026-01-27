import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const StayDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProperties, reviews, user, addNotification, allUsers } = useApp();
  const property = allProperties.find(p => p.id === Number(id));
  
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return <div className="p-20 text-center font-black">Annonce introuvable sur Reserva Africa.</div>;

  const host = allUsers.find(u => u.id === property.ownerId);
  const propertyReviews = reviews.filter(r => r.propertyId === property.id);
  const images = [
    property.image, 
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1512918766671-ed6a07be3573?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1600607687940-c52af0b0539b?auto=format&fit=crop&w=1200&q=80"
  ];

  const handleContactHost = () => {
      if (!user) {
          addNotification('info', 'Veuillez vous connecter pour contacter l\'hôte.');
          navigate('/login');
          return;
      }
      if (user.id === property.ownerId) {
          addNotification('error', 'Vous ne pouvez pas vous contacter vous-même.');
          return;
      }
      navigate(`/account/messages?contactId=${property.ownerId}`);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20 font-display">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/stays" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Séjours</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold truncate">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200" onClick={() => setShowGallery(true)}>
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main" />
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest text-primary shadow-2xl border border-primary/10">Favori des voyageurs</div>
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" alt="Detail 1" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" alt="Detail 2" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden relative cursor-pointer group" onClick={() => setShowGallery(true)}>
          <img src={images[4]} className="w-full h-full object-cover" alt="Gallery" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <span className="text-white font-black text-xs uppercase tracking-widest underline underline-offset-4">Voir +8 photos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tighter leading-none">{property.title}</h1>
            <p className="text-lg text-[#9a664c] font-bold flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-xl">location_on</span> {property.location}</p>
          </div>

          <div className="py-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-cover bg-center ring-4 ring-primary/10 shadow-lg" style={{backgroundImage: `url("${host?.avatar || 'https://i.pravatar.cc/100'}")`}}></div>
                <div>
                   <h3 className="text-xl font-black text-gray-900 dark:text-white leading-none mb-1">Hôte : {property.owner}</h3>
                   <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Hôte certifié Reserva Africa</p>
                </div>
             </div>
             <button onClick={handleContactHost} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-black dark:border-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all btn-active-scale shadow-xl">
                <span className="material-symbols-outlined text-[20px]">forum</span>
                Message direct
             </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center group">
             <div className="size-20 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-xl text-primary group-hover:scale-110 transition-transform duration-500 shrink-0">
                <span className="material-symbols-outlined text-5xl">verified</span>
             </div>
             <div className="flex-1 text-center md:text-left">
                <h4 className="font-black text-xl text-gray-900 dark:text-white mb-2 leading-none">Annonce vérifiée physiquement</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Notre équipe d'experts a visité ce logement pour garantir la sécurité, la propreté et la conformité aux photos présentées.</p>
             </div>
          </div>

          <div>
             <h3 className="text-2xl font-black mb-6 tracking-tight">À propos du bien</h3>
             <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">{property.description || "Un cadre idyllique pour vos séjours d'affaires ou de loisirs en Afrique de l'Ouest. Profitez de tout le confort moderne dans un environnement sécurisé."}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
              {property.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-50 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <div className="size-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                    </div>
                    <span className="font-black text-sm text-gray-700 dark:text-gray-300 uppercase tracking-widest">{f}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] rounded-[48px] shadow-2xl border border-gray-100 dark:border-gray-800 p-10 flex flex-col gap-10">
            <div className="flex items-end gap-2 pb-8 border-b border-gray-50 dark:border-gray-800">
              <span className="text-5xl font-black text-primary tracking-tighter">{property.price}</span>
              <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2">/ nuit</span>
            </div>
            
            <div className="space-y-5">
               <div className="flex items-center gap-4 text-xs font-black text-gray-500 uppercase tracking-widest"><span className="material-symbols-outlined text-primary">verified</span> Confirmation immédiate</div>
               <div className="flex items-center gap-4 text-xs font-black text-green-600 uppercase tracking-widest"><span className="material-symbols-outlined">event_available</span> Annulation sans frais (48h)</div>
            </div>

            <Link to={`/booking/details?type=stay&id=${property.id}`} className="w-full bg-primary hover:bg-primary-dark text-white font-black py-6 rounded-3xl text-center shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3">
               Réserver le séjour <span className="material-symbols-outlined font-black">arrow_forward</span>
            </Link>
            
            <div className="flex flex-col items-center gap-4 grayscale opacity-40">
               <p className="text-[10px] font-black uppercase tracking-widest">Partenaires de paiement</p>
               <div className="flex gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 backdrop-blur-3xl animate-fade-in">
            <button onClick={() => setShowGallery(false)} className="absolute top-10 right-10 text-white bg-white/10 hover:bg-white/20 p-5 rounded-full transition-all z-10 btn-active-scale">
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center">
               <img src={images[currentImageIndex]} className="w-full h-full object-contain animate-reveal" alt={`Gallery ${currentImageIndex}`} />
            </div>
            <div className="absolute bottom-16 flex items-center gap-12 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
                <button onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)} className="text-white hover:text-primary transition-all active:scale-90"><span className="material-symbols-outlined text-4xl">chevron_left</span></button>
                <div className="flex flex-col items-center">
                    <span className="text-white font-black uppercase tracking-widest text-xs">{currentImageIndex + 1} / {images.length}</span>
                    <div className="flex gap-1.5 mt-2">
                        {images.map((_, i) => (
                            <div key={i} className={`size-1 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-primary' : 'bg-white/20'}`}></div>
                        ))}
                    </div>
                </div>
                <button onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)} className="text-white hover:text-primary transition-all active:scale-90"><span className="material-symbols-outlined text-4xl">chevron_right</span></button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StayDetails;