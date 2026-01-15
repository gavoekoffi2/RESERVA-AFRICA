import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const StayDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProperties, reviews, user, sendMessage, addNotification, allUsers } = useApp();
  const property = allProperties.find(p => p.id === Number(id));
  
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return <div className="p-20 text-center">Hébergement non trouvé</div>;

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
      // Redirect with host ID to pre-fill the chat
      navigate(`/account/messages?contactId=${property.ownerId}`);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20 font-display">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/stays" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Hébergements</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200" onClick={() => setShowGallery(true)}>
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" alt="Detail 1" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" alt="Detail 2" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[3]} className="w-full h-full object-cover" alt="Detail 3" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden relative cursor-pointer" onClick={() => setShowGallery(true)}>
          <img src={images[4]} className="w-full h-full object-cover" alt="Gallery" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white font-bold underline">Voir toutes les photos</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1 text-gray-900 dark:text-white">{property.title}</h1>
            <p className="text-lg text-[#9a664c] font-medium flex items-center gap-1"><span className="material-symbols-outlined text-primary">location_on</span> {property.location}</p>
          </div>

          {/* Host Information Section */}
          <div className="py-6 border-b border-gray-100 dark:border-gray-800">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-primary/10" style={{backgroundImage: `url("${host?.avatar || 'https://i.pravatar.cc/100'}")`}}></div>
                <div>
                   <h3 className="text-xl font-black text-gray-900 dark:text-white">Hôte : {property.owner}</h3>
                   <p className="text-sm text-gray-500 font-medium">Membre depuis 2023 • Identité vérifiée</p>
                </div>
             </div>
             <button 
                onClick={handleContactHost}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 font-black text-sm uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
             >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Contacter l'hôte
             </button>
          </div>

          <div>
             <h3 className="text-xl font-bold mb-4">Emplacement</h3>
             <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden relative border border-gray-100 dark:border-gray-800 shadow-inner">
                <iframe 
                    width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${property.coordinates?.lat},${property.coordinates?.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="opacity-90 grayscale-[0.3] dark:invert"
                    title="Property Map"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-black/90 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">my_location</span> Localisation vérifiée
                </div>
             </div>
          </div>

          <div><h3 className="text-xl font-bold mb-4">À propos</h3><p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{property.description || "Profitez d'un séjour exceptionnel dans ce cadre unique."}</p></div>

          <div className="grid grid-cols-2 gap-4 pb-8">
              {property.features?.map((f, i) => <div key={i} className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span><span className="font-medium">{f}</span></div>)}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-6">
            <div className="flex items-end gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
              <span className="text-4xl font-black text-primary tracking-tighter">{property.price}</span>
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-2">/ nuit</span>
            </div>
            <Link to={`/booking/details?type=stay&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-black py-5 rounded-2xl text-center shadow-xl shadow-primary/20 transition-all btn-active-scale uppercase tracking-widest text-sm">Réserver</Link>
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Frais de service (15%) inclus au paiement</p>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-4">
            <button onClick={() => setShowGallery(false)} className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all">
                <span className="material-symbols-outlined">close</span>
            </button>
            <img src={images[currentImageIndex]} className="max-h-full max-w-full object-contain animate-reveal" alt={`Gallery ${currentImageIndex}`} />
            <div className="absolute bottom-10 flex gap-4">
                <button onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)} className="text-white bg-white/20 hover:bg-white/30 p-5 rounded-full transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
                <button onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)} className="text-white bg-white/20 hover:bg-white/30 p-5 rounded-full transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StayDetails;