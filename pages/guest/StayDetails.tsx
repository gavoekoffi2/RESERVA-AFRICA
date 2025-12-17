import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const StayDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProperties, reviews, user, sendMessage, addNotification } = useApp();
  const property = allProperties.find(p => p.id === Number(id));
  
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return <div className="p-20 text-center">Hébergement non trouvé</div>;

  const propertyReviews = reviews.filter(r => r.propertyId === property.id);
  const images = [property.image, "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"];

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
      // Initialize chat if it doesn't exist
      sendMessage(user.id, property.ownerId || 'u2', "Bonjour, je suis intéressé par votre annonce : " + property.title);
      navigate('/account/messages');
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20 font-display">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/stays" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Hébergements</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200" onClick={() => setShowGallery(true)}>
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[1]} className="w-full h-full object-cover" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[2]} className="w-full h-full object-cover" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden"><img src={images[3]} className="w-full h-full object-cover" /></div>
        <div className="hidden md:block bg-gray-200 overflow-hidden relative cursor-pointer" onClick={() => setShowGallery(true)}>
          <img src={images[4]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white font-bold underline">Voir toutes les photos</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1">{property.title}</h1>
            <p className="text-lg text-[#9a664c] font-medium flex items-center gap-1"><span className="material-symbols-outlined text-primary">location_on</span> {property.location}</p>
          </div>

          <div><h3 className="text-xl font-bold mb-4">Hébergé par {property.owner}</h3><button onClick={handleContactHost} className="text-primary font-bold border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">Contacter l'hôte</button></div>

          <div><h3 className="text-xl font-bold mb-4">À propos</h3><p className="text-gray-600 leading-relaxed">{property.description || "Profitez d'un séjour exceptionnel dans ce cadre unique."}</p></div>

          <div className="grid grid-cols-2 gap-4">
              {property.features?.map((f, i) => <div key={i} className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-400">check_circle</span><span>{f}</span></div>)}
          </div>

          <hr />

          <div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-yellow-500 icon-filled">star</span> {property.rating} · {propertyReviews.length} avis</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {propertyReviews.map((r, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2"><div className="size-10 rounded-full bg-gray-200" /><div className="font-bold text-sm">{r.authorName}</div></div>
                        <p className="text-sm italic">"{r.comment}"</p>
                    </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#2d2420] rounded-2xl shadow-xl border p-6 flex flex-col gap-6">
            <div className="flex items-end gap-2 pb-4 border-b"><span className="text-3xl font-bold text-primary">{property.price}</span><span className="text-gray-500">/ nuit</span></div>
            <Link to={`/booking/details?type=stay&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-bold py-4 rounded-xl text-center shadow-lg transition-all">Réserver</Link>
          </div>
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-4">
            <button onClick={() => setShowGallery(false)} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
            <img src={images[currentImageIndex]} className="max-h-full max-w-full object-contain" />
            <div className="absolute bottom-10 flex gap-4">
                <button onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)} className="text-white bg-white/20 p-4 rounded-full">Précédent</button>
                <button onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)} className="text-white bg-white/20 p-4 rounded-full">Suivant</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StayDetails;