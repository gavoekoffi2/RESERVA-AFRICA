import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchCars: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Dakar';
  const [showMap, setShowMap] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const CARS = [
    { id: 1, name: 'Toyota Land Cruiser Prado', price: 65000, type: 'SUV / 4x4', seats: 7, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80', lat: 14.7167, lng: -17.4677 },
    { id: 2, name: 'Hyundai Tucson', price: 45000, type: 'SUV', seats: 5, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80', lat: 14.722, lng: -17.45 },
    { id: 3, name: 'Peugeot 3008', price: 40000, type: 'SUV', seats: 5, img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80', lat: 14.710, lng: -17.460 },
  ];

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 py-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
           <h1 className="text-3xl font-bold">
             Location de voitures à <span className="text-primary">{destination}</span>
           </h1>
           <p className="text-gray-500">32 véhicules disponibles</p>
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
               {['SUV', 'Berline', 'Luxe', 'Économique'].map((f, i) => (
                  <button key={i} className="px-4 py-2 border rounded-full hover:border-black transition-colors whitespace-nowrap dark:border-gray-600 dark:hover:border-white">{f}</button>
               ))}
            </div>
          )}

          {CARS.map((car) => (
             <div key={car.id} className="group bg-white dark:bg-[#2d1e18] rounded-2xl border border-[#e7d5cf] dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row min-h-[220px]">
              <div className="w-full sm:w-2/5 relative bg-gray-100 dark:bg-gray-800">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={car.img} alt="Car" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-black">Disponible</div>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{car.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main dark:text-white">{car.name}</h3>
                  <div className="grid grid-cols-3 gap-2 my-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-base">person</span>
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-base">settings</span>
                      <span>Auto</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-base">ac_unit</span>
                      <span>Clim</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between border-t border-[#e7d5cf] dark:border-gray-700 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-primary">{car.price.toLocaleString()}</span>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">FCFA / jour</span>
                    </div>
                  </div>
                  <Link to={`/search/cars/${car.id}`} className="bg-primary hover:bg-[#d65a1f] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 text-sm">
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
                {CARS.map((car, index) => (
                   <div 
                      key={car.id}
                      className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-110 hover:z-50"
                      style={{ top: `${30 + index * 15}%`, left: `${40 + index * 10}%` }} 
                      onClick={() => setSelectedCarId(selectedCarId === car.id ? null : car.id)}
                   >
                      <div className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-md transition-colors border-2 ${selectedCarId === car.id ? 'bg-black text-white border-white scale-110' : 'bg-white text-black border-transparent hover:bg-gray-100'}`}>
                         {car.price.toLocaleString()} F
                      </div>
                   </div>
                ))}
              </div>

              {/* Popup Info Card */}
              {selectedCarId && (
                 <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow-2xl animate-fade-up z-50">
                    {(() => {
                       const car = CARS.find(c => c.id === selectedCarId);
                       if (!car) return null;
                       return (
                          <div className="flex gap-4">
                             <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                <img src={car.img} className="w-full h-full object-cover" alt={car.name} />
                             </div>
                             <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{car.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{car.type} • {car.seats} places</p>
                                <div className="flex justify-between items-center">
                                   <span className="font-black text-primary">{car.price.toLocaleString()} FCFA <span className="text-xs font-normal text-gray-400">/jour</span></span>
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