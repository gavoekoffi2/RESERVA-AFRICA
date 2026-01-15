import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SearchCars: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Dakar';
  const [showMap, setShowMap] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');

  // Use Context
  const { allProperties } = useApp();

  const filteredCars = useMemo(() => {
      return allProperties.filter(p => {
          if (p.type !== 'Voiture') return false;
          if (p.status !== 'En ligne') return false;
          if (selectedCategory !== 'Tout' && p.category !== selectedCategory) return false;
          return true;
      });
  }, [allProperties, selectedCategory]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80';
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 py-6 h-[calc(100vh-80px)] flex flex-col font-display">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
             LOCATION DE VOITURES À <span className="text-primary">{destination.toUpperCase()}</span>
           </h1>
           <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{filteredCars.length} véhicules disponibles</p>
        </div>
        <button 
           onClick={() => setShowMap(!showMap)} 
           className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
        >
           <span className="material-symbols-outlined text-[18px]">{showMap ? 'list' : 'map'}</span>
           {showMap ? 'Liste' : 'Carte'}
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Results List */}
        <div className={`flex flex-col gap-6 overflow-y-auto pr-2 no-scrollbar ${showMap ? 'w-full lg:w-3/5' : 'w-full'}`}>
          {!showMap && (
            <div className="flex gap-4 overflow-x-auto pb-4 shrink-0 no-scrollbar">
               {['Tout', 'SUV', 'Berline', '4x4', 'Luxe'].map((f, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCategory(f)}
                    className={`px-6 py-2.5 rounded-full border-2 font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === f ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#1a202c] border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-300'}`}
                  >
                      {f}
                  </button>
               ))}
            </div>
          )}

          {filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-gray-50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-100">
                  <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">directions_car</span>
                  <p className="font-black text-lg text-gray-400 uppercase tracking-widest">Aucun véhicule disponible</p>
              </div>
          ) : (
              <div className={`grid ${showMap ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                {filteredCars.map((car) => (
                    <Link to={`/search/cars/${car.id}`} key={car.id} className="group bg-white dark:bg-[#1a202c] rounded-[40px] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all flex flex-col hover-lift">
                    <div className="aspect-video relative bg-gray-100 overflow-hidden">
                        <img 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                            src={car.image} 
                            alt={car.title} 
                            onError={handleImageError}
                        />
                        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary shadow-lg">Disponible</div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">{car.title}</h3>
                            <div className="flex items-center text-xs font-black text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                <span className="material-symbols-outlined text-sm mr-0.5 icon-filled">star</span> {car.rating}
                            </div>
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6">{car.category} • {car.location}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded-xl">
                                <span className="material-symbols-outlined text-sm">person</span> {car.capacity} places
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded-xl">
                                <span className="material-symbols-outlined text-sm">settings</span> Auto
                            </div>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                            <div className="flex flex-col">
                                <span className="text-primary font-black text-2xl tracking-tighter">{car.price}</span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Par jour</span>
                            </div>
                            <div className="size-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-lg">
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
              </div>
          )}
        </div>

        {/* Interactive Map */}
        {showMap && (
           <div className="hidden lg:block w-2/5 rounded-[40px] overflow-hidden relative border border-gray-100 dark:border-gray-800 shadow-2xl bg-gray-50">
              <iframe 
                width="100%" height="100%" frameBorder="0" scrolling="no" src={`https://maps.google.com/maps?q=${destination}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full opacity-90 grayscale-[0.2] dark:invert"
                title="Car Locations Map"
              ></iframe>
              
              <div className="absolute inset-0 pointer-events-none">
                {filteredCars.map((car, index) => (
                   <div 
                      key={car.id}
                      className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-110 hover:z-50"
                      style={{ top: `${30 + (index * 10) % 50}%`, left: `${40 + (index * 12) % 40}%` }} 
                      onClick={() => setSelectedCarId(selectedCarId === car.id ? null : car.id)}
                   >
                      <div className={`px-4 py-2 rounded-full font-black text-xs shadow-2xl transition-all border-2 ${selectedCarId === car.id ? 'bg-primary text-white border-white scale-110' : 'bg-white text-black border-transparent hover:bg-gray-100'}`}>
                         {car.price}
                      </div>
                   </div>
                ))}
              </div>

              {selectedCarId && (
                 <div className="absolute bottom-10 left-6 right-6 bg-white dark:bg-[#1a202c] p-5 rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] animate-reveal z-50 flex gap-5 border border-gray-100 dark:border-gray-800">
                    {(() => {
                       const car = filteredCars.find(c => c.id === selectedCarId);
                       if (!car) return null;
                       return (
                          <>
                             <div className="w-28 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                                <img src={car.image} className="w-full h-full object-cover" alt={car.title} onError={handleImageError} />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h3 className="font-black text-lg text-gray-900 dark:text-white truncate tracking-tight">{car.title}</h3>
                                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-3">{car.category} • {car.capacity} places</p>
                                <div className="flex justify-between items-center">
                                   <span className="font-black text-primary text-lg">{car.price}</span>
                                   <Link to={`/search/cars/${car.id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white underline underline-offset-4">Voir l'offre</Link>
                                </div>
                             </div>
                             <button onClick={() => setSelectedCarId(null)} className="absolute top-4 right-4 text-gray-300 hover:text-black dark:hover:text-white">
                                <span className="material-symbols-outlined text-sm">close</span>
                             </button>
                          </>
                       )
                    })()}
                 </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};

export default SearchCars;