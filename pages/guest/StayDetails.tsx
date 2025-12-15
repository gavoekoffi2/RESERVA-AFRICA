import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StayDetails: React.FC = () => {
  const [showGallery, setShowGallery] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/stays" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Hébergements</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold">Terrou-Bi Resort Dakar</span>
      </div>

      {/* Grid Images */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200" onClick={() => openGallery(0)}>
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main View" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden cursor-pointer" onClick={() => openGallery(1)}>
            <img src={images[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Room" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden cursor-pointer" onClick={() => openGallery(2)}>
            <img src={images[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Pool" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden cursor-pointer" onClick={() => openGallery(3)}>
            <img src={images[3]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Restaurant" />
        </div>
        <div className="hidden md:block bg-gray-200 overflow-hidden relative cursor-pointer" onClick={() => openGallery(4)}>
          <img src={images[4]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/40 transition-colors">
            <span className="text-white font-bold underline">Voir toutes les photos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#1b120d] dark:text-white tracking-tight">Terrou-Bi Resort Dakar</h1>
                    <p className="text-lg text-[#9a664c] font-medium mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[20px]">location_on</span> Boulevard Martin Luther King, Dakar
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-500 icon-filled text-sm">star</span>)}
                    </div>
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">À propos de cet hébergement</h3>
            <p className="text-[#9a664c] leading-relaxed mb-4">
              Profitez d'un séjour de luxe au Terrou-Bi, où l'élégance rencontre le confort moderne. Situé en bord de mer, notre établissement propose une piscine chauffée, une plage privée, un casino et plusieurs options de restauration gastronomique.
            </p>
            <p className="text-[#9a664c] leading-relaxed">
              Les chambres spacieuses sont équipées de tout le nécessaire pour un séjour inoubliable, avec une vue imprenable sur l'océan Atlantique ou sur nos jardins tropicaux.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Ce que propose ce logement</h3>
            <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">wifi</span>
                    <span>Wifi haut débit</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">pool</span>
                    <span>Piscine & Plage privée</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">restaurant</span>
                    <span>3 Restaurants</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">ac_unit</span>
                    <span>Climatisation centrale</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">spa</span>
                    <span>Spa et bien-être</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">casino</span>
                    <span>Casino</span>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-white dark:bg-[#2d2420] rounded-2xl shadow-xl border border-[#f3ebe7] dark:border-stone-700 p-6 flex flex-col gap-6">
            <div className="flex items-end gap-2 pb-4 border-b border-[#f3ebe7]">
              <span className="text-3xl font-bold text-primary">185 000 CFA</span>
              <span className="text-[#9a664c] mb-1.5">/ nuit</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                <div className="p-3 border-r border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <p className="text-[10px] font-bold uppercase text-gray-500">Arrivée</p>
                  <p className="text-sm font-semibold">12 Oct 2023</p>
                </div>
                <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <p className="text-[10px] font-bold uppercase text-gray-500">Départ</p>
                  <p className="text-sm font-semibold">15 Oct 2023</p>
                </div>
                <div className="col-span-2 border-t border-gray-300 dark:border-gray-600 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                   <p className="text-[10px] font-bold uppercase text-gray-500">Voyageurs</p>
                   <p className="text-sm font-semibold">2 adultes, 1 chambre</p>
                </div>
              </div>
            </div>

            <Link to="/booking/details?type=stay" className="w-full bg-primary hover:bg-[#d5581e] text-white font-bold py-4 rounded-xl text-center shadow-lg transition-all">
              Réserver
            </Link>

            <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
               <div className="flex justify-between">
                 <span className="underline">185 000 x 3 nuits</span>
                 <span>555 000 CFA</span>
               </div>
               <div className="flex justify-between">
                 <span className="underline">Frais de service</span>
                 <span>25 000 CFA</span>
               </div>
               <div className="flex justify-between font-bold text-base text-black dark:text-white pt-3 border-t border-gray-200">
                 <span>Total</span>
                 <span>580 000 CFA</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black bg-opacity-95 flex items-center justify-center animate-fade-in">
            <button 
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-[160]"
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full z-[160]"
            >
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
            </button>

            <img 
                src={images[currentImageIndex]} 
                alt="Gallery View" 
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
            />

            <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full z-[160]"
            >
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {images.length}
            </div>
        </div>
      )}
    </div>
  );
};

export default StayDetails;