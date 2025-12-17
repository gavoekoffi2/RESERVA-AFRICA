import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AirportTaxi: React.FC = () => {
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showRouteInfo, setShowRouteInfo] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    // Simulate route calculation delay
    setTimeout(() => setShowRouteInfo(true), 500);
  };

  // IDs 10 and 11 correspond to the new Taxi Mocks in AppContext
  const handleBook = (taxiId: number) => {
      navigate(`/booking/details?type=car&id=${taxiId}&checkin=${new Date().toISOString()}&checkout=${new Date().toISOString()}`);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Search */}
      <div className="bg-white dark:bg-[#1a202c] border-b border-gray-200 dark:border-gray-800 pb-10 pt-8 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white">Taxis aéroport et transferts privés</h1>
          
          <div className="bg-white dark:bg-[#2d2420] rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-primary flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">Aller simple</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-primary flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
                    </div>
                    <span className="font-bold text-gray-500 dark:text-gray-400">Aller-retour</span>
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 relative group">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Lieu de prise en charge</label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-4 border border-gray-200 dark:border-gray-700 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all">
                        <span className="material-symbols-outlined text-gray-400 mr-3">flight_land</span>
                        <input 
                          type="text" 
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          placeholder="Aéroport AIBD (DSS)..." 
                          className="bg-transparent w-full outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-400" 
                        />
                    </div>
                </div>
                <div className="md:col-span-5 relative group">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Destination</label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-4 border border-gray-200 dark:border-gray-700 focus-within:border-black dark:focus-within:border-white focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-all">
                        <span className="material-symbols-outlined text-gray-400 mr-3">location_on</span>
                        <input 
                          type="text" 
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                          placeholder="Hôtel, Adresse..." 
                          className="bg-transparent w-full outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-400" 
                        />
                    </div>
                </div>
                <div className="md:col-span-2 flex items-end">
                    <button 
                      onClick={handleSearch}
                      className="w-full h-[58px] bg-primary hover:bg-[#d65a1f] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                    >
                        Rechercher
                    </button>
                </div>
                
                <div className="md:col-span-6 grid grid-cols-2 gap-4 mt-2">
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Date</label>
                     <input type="date" className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none font-semibold border border-gray-200 dark:border-gray-700" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Heure</label>
                     <input type="time" className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none font-semibold border border-gray-200 dark:border-gray-700" />
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map & Results */}
      {hasSearched ? (
        <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in flex flex-col md:flex-row gap-8">
          
          {/* List */}
          <div className="flex-1 space-y-6">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Véhicules disponibles</h2>
             
             {/* Taxi Option 1: Standard (ID 10) */}
              <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-6 shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => setShowRouteInfo(true)}>
                  <div className="w-28 relative bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" alt="Standard" className="w-full h-20 object-contain rounded-lg group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Standard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Toyota Corolla ou similaire</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"><span className="material-symbols-outlined text-[14px]">person</span> 3</span>
                          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"><span className="material-symbols-outlined text-[14px]">luggage</span> 2</span>
                      </div>
                  </div>
                  <div className="text-right">
                      <p className="text-2xl font-black text-primary">25 000 F</p>
                      <button onClick={(e) => {e.stopPropagation(); handleBook(10);}} className="mt-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg font-bold text-xs hover:opacity-80">Réserver</button>
                  </div>
              </div>

              {/* Taxi Option 2: Minivan (ID 11) */}
              <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-6 shadow-sm hover:shadow-lg transition-all cursor-pointer group" onClick={() => setShowRouteInfo(true)}>
                  <div className="w-28 relative bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=300&q=80" alt="Van" className="w-full h-20 object-contain rounded-lg group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Minivan</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Toyota HiAce ou similaire</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"><span className="material-symbols-outlined text-[14px]">person</span> 7</span>
                          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"><span className="material-symbols-outlined text-[14px]">luggage</span> 5</span>
                      </div>
                  </div>
                  <div className="text-right">
                      <p className="text-2xl font-black text-primary">40 000 F</p>
                      <button onClick={(e) => {e.stopPropagation(); handleBook(11);}} className="mt-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg font-bold text-xs hover:opacity-80">Réserver</button>
                  </div>
              </div>
          </div>

          {/* Map Visualization */}
          <div className="w-full md:w-[400px] h-[400px] bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden relative shadow-xl border border-gray-200 dark:border-gray-700 sticky top-24">
             {/* Reliable Map Embed */}
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=Dakar&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full opacity-80 grayscale-[0.3] dark:invert dark:grayscale-[0.8]"
                title="Route Map"
             ></iframe>
             
             {/* Path Line (Visual only - SVG Overlay) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path d="M100,300 Q200,150 300,100" stroke="#ee6c2b" strokeWidth="4" fill="none" strokeDasharray="10,5" className="animate-[dash_2s_linear_infinite]" />
             </svg>
             <style>{`@keyframes dash { to { stroke-dashoffset: -30; } }`}</style>

             {/* Start Point */}
             <div className="absolute bottom-[25%] left-[25%] w-8 h-8 bg-black dark:bg-white rounded-full border-4 border-white dark:border-black shadow-lg flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-white dark:text-black text-sm">flight</span>
             </div>

             {/* End Point */}
             <div className="absolute top-[25%] right-[25%] w-8 h-8 bg-primary rounded-full border-4 border-white dark:border-black shadow-lg flex items-center justify-center z-10 cursor-pointer" onClick={() => setShowRouteInfo(!showRouteInfo)}>
                <span className="material-symbols-outlined text-white text-sm">location_on</span>
             </div>

             {/* Dynamic Route Info Overlay */}
             {showRouteInfo && (
                <div className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur rounded-xl p-4 shadow-lg animate-fade-up z-20 border border-gray-200 dark:border-gray-700">
                   <div className="flex justify-between items-start text-gray-900 dark:text-white">
                      <div>
                         <p className="text-xs font-bold text-gray-500 uppercase">Durée estimée</p>
                         <p className="text-xl font-black">45 min</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-bold text-gray-500 uppercase">Distance</p>
                         <p className="text-xl font-black">32 km</p>
                      </div>
                   </div>
                   <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Trafic fluide actuellement sur l'autoroute à péage.
                   </div>
                </div>
             )}
          </div>

        </div>
      ) : (
        <section className="bg-white dark:bg-[#1a202c] py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white">Pourquoi réserver votre transfert avec nous ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                          <span className="material-symbols-outlined text-4xl">schedule</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Chauffeurs ponctuels</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-xs">Nous suivons votre vol pour nous assurer que votre chauffeur est là quand vous atterrissez.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                          <span className="material-symbols-outlined text-4xl">payments</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Prix fixe</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-xs">Pas de surprise. Le prix que vous voyez est le prix que vous payez. Tout compris.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                          <span className="material-symbols-outlined text-4xl">support_agent</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Support 24/7</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-xs">Notre équipe est disponible à tout moment pour modifier ou annuler votre réservation.</p>
                  </div>
              </div>
          </div>
      </section>
      )}
    </div>
  );
};

export default AirportTaxi;