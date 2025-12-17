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
          // Basic location match
          if (destination && !p.location.toLowerCase().includes(destination.toLowerCase().split(',')[0])) {
              // Loose matching for demo purposes
          }
          return true;
      });
  }, [allProperties, selectedCategory, destination]);

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 py-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
           <h1 className="text-3xl font-bold">
             Location de voitures à <span className="text-primary">{destination}</span>
           </h1>
           <p className="text-gray-500">{filteredCars.length} véhicules disponibles</p>
        </div>
        <button 
           onClick={() => setShowMap(!showMap)} 
           className="bg-black text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
           <span className="material-symbols-outlined">{showMap ? 'list' : 'map'}</span>
           {showMap ? 'Afficher la liste' : 'Afficher la carte'}
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Results List */}
        <div className={`flex flex-col gap-6 overflow-y-auto pr-2 no-scrollbar ${showMap ? 'w-full lg:w-3/5' : 'w-full'}`}>
          {!showMap && (
            <div className="flex gap-4 overflow-x-auto pb-2 shrink-0">
               {['Tout', 'SUV', 'Berline', '4x4', 'Luxe'].map((f, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCategory(f)}
                    className={`px-4 py-2 border rounded-full transition-colors whitespace-nowrap ${selectedCategory === f ? 'bg-black text-white border-black' : 'hover:border-black dark:border-gray-600 dark:hover:border-white'}`}
                  >
                      {f}
                  </button>
               ))}
            </div>
          )}

          {filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">directions_car</span>
                  <p className="font-bold text-gray-500">Aucun véhicule trouvé pour cette recherche.</p>
                  <button onClick={() => setSelectedCategory('Tout')} className="text-primary text-sm font-bold mt-2 hover:underline">Voir tous les véhicules</button>
              </div>
          ) : (
              filteredCars.map((car) => (
                <div key={car.id} className="group bg-white dark:bg-[#2d1e18] rounded-2xl border border-[#e7d5cf] dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row min-h-[220px]">
                  <div className="w-full sm:w-2/5 relative bg-gray-200 dark:bg-gray-800">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={car.image} alt="Car" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-black">Disponible</div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{car.category}</span>
                        <div className="flex items-center text-xs text-yellow-500 font-bold ml-auto">
                            <span className="material-symbols-outlined text-sm mr-0.5 icon-filled">star</span> {car.rating} ({car.reviews})
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-text-main dark:text-white">{car.title}</h3>
                      <div className="grid grid-cols-3 gap-2 my-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="material-symbols-outlined text-base">person</span>
                          <span>{car.capacity}</span>
                        </div>
                        {car.features?.slice(0,2).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                <span>{feat}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-[#e7d5cf] dark:border-gray-700 pt-4 mt-auto">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-primary">{car.price}</span>
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">/ jour</span>
                        </div>
                        <span className="text-[10px] text-gray-400">Kilométrage illimité</span>
                      </div>
                      <Link to={`/search/cars/${car.id}`} className="bg-primary hover:bg-[#d65a1f] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 text-sm">
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Interactive Map */}
        {showMap && (
           <div className="hidden lg:block w-2/5 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-gray-700 shadow-xl bg-gray-100 dark:bg-gray-800">
              {/* Reliable Embed Map */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${destination}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full opacity-90 grayscale-[0.2]"
                title="Car Locations Map"
              ></iframe>
              
              {/* Overlay Pins Simulation (Visual Only) */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredCars.map((car, index) => (
                   <div 
                      key={car.id}
                      className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-110 hover:z-50"
                      style={{ top: `${30 + (index * 10) % 50}%`, left: `${40 + (index * 12) % 40}%` }} 
                      onClick={() => setSelectedCarId(selectedCarId === car.id ? null : car.id)}
                   >
                      <div className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-md transition-colors border-2 ${selectedCarId === car.id ? 'bg-black text-white border-white scale-110' : 'bg-white text-black border-transparent hover:bg-gray-100'}`}>
                         {car.price}
                      </div>
                   </div>
                ))}
              </div>

              {/* Popup Info Card */}
              {selectedCarId && (
                 <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow-2xl animate-fade-up z-50">
                    {(() => {
                       const car = filteredCars.find(c => c.id === selectedCarId);
                       if (!car) return null;
                       return (
                          <div className="flex gap-4">
                             <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                                <img src={car.image} className="w-full h-full object-cover" alt={car.title} />
                             </div>
                             <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{car.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{car.category} • {car.capacity} places</p>
                                <div className="flex justify-between items-center">
                                   <span className="font-black text-primary">{car.price} <span className="text-xs font-normal text-gray-400">/jour</span></span>
                                   <Link to={`/search/cars/${car.id}`} className="text-sm font-bold underline text-gray-900 dark:text-white">Voir</Link>
                                </div>
                             </div>
                             <button onClick={() => setSelectedCarId(null)} className="absolute top-2 right-2 text-gray-400 hover:text-black dark:hover:text-white">
                                <span className="material-symbols-outlined text-sm">close</span>
                             </button>
                          </div>
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