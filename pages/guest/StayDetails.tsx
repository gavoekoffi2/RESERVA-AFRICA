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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200" onClick={() => setShowGallery(true)}>
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main" />
          <div className="absolute top-6 left-6 bg-white/95 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-primary shadow-lg border border-primary/10">Favori des voyageurs</div>
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" alt="Detail 1" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" alt="Detail 2" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[3]} className="w-full h-full object-cover" alt="Detail 3" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden relative cursor-pointer" onClick={() => setShowGallery(true)}>
          <img src={images[4]} className="w-full h-full object-cover" alt="Gallery" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all"><span className="text-white font-bold underline">Toutes les photos</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-black mb-2 text-gray-900 dark:text-white tracking-tighter leading-tight">{property.title}</h1>
            <p className="text-lg text-[#9a664c] font-medium flex items-center gap-1"><span className="material-symbols-outlined text-primary">location_on</span> {property.location}</p>
          </div>

          <div className="py-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-primary/10" style={{backgroundImage: `url("${host?.avatar || 'https://i.pravatar.cc/100'}")`}}></div>
                <div>
                   <h3 className="text-xl font-black text-gray-900 dark:text-white">Hôte : {property.owner}</h3>
                   <p className="text-sm text-gray-500 font-medium">Hôte d'exception • Membre depuis {host?.joinDate?.split(' ')[2] || '2023'}</p>
                </div>
             </div>
             <button onClick={handleContactHost} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-black dark:border-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-95 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Message direct
             </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center">
             <div className="size-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm text-primary"><span className="material-symbols-outlined text-4xl">verified</span></div>
             <div className="flex-1 text-center md:text-left">
                <h4 className="font-black text-lg text-gray-900 dark:text-white">Logement certifié Reserva Africa</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Cette propriété a été inspectée physiquement par nos experts locaux pour garantir la conformité aux photos et aux standards de sécurité.</p>
             </div>
          </div>

          <div>
             <h3 className="text-2xl font-black mb-6 tracking-tight">À propos de ce logement</h3>
             <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">{property.description || "Un cadre idyllique pour vos séjours d'affaires ou de loisirs en Afrique de l'Ouest."}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
              {property.features?.map((f, i) => <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-50 dark:border-gray-700 shadow-sm"><span className="material-symbols-outlined text-green-500 font-black">check_circle</span><span className="font-black text-sm text-gray-700 dark:text-gray-300">{f}</span></div>)}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 p-10 flex flex-col gap-8">
            <div className="flex items-end gap-2 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-5xl font-black text-primary tracking-tighter">{property.price}</span>
              <span className="text-gray-500 font-black uppercase text-[10px] tracking-widest mb-2">/ nuit</span>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest"><span className="material-symbols-outlined text-sm">schedule</span> Disponibilité immédiate</div>
               <div className="flex items-center gap-3 text-xs font-black text-green-600 uppercase tracking-widest"><span className="material-symbols-outlined text-sm">history</span> Annulation gratuite (48h)</div>
            </div>

            <Link to={`/booking/details?type=stay&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-black py-6 rounded-2xl text-center shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale uppercase tracking-[0.2em] text-xs">
               Réserver le séjour
            </Link>
            
            <div className="flex items-center justify-center gap-2 grayscale opacity-50">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-4 backdrop-blur-2xl">
            <button onClick={() => setShowGallery(false)} className="absolute top-8 right-8 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all z-10">
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative w-full max-w-5xl aspect-video">
               <img src={images[currentImageIndex]} className="w-full h-full object-contain animate-reveal" alt={`Gallery ${currentImageIndex}`} />
            </div>
            <div className="absolute bottom-12 flex items-center gap-10">
                <button onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)} className="text-white bg-white/10 hover:bg-white/20 p-6 rounded-full transition-all active:scale-90"><span className="material-symbols-outlined text-3xl">chevron_left</span></button>
                <span className="text-white font-black uppercase tracking-widest text-xs">{currentImageIndex + 1} / {images.length}</span>
                <button onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)} className="text-white bg-white/10 hover:bg-white/20 p-6 rounded-full transition-all active:scale-90"><span className="material-symbols-outlined text-3xl">chevron_right</span></button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StayDetails;