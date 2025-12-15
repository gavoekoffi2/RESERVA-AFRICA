import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchStays: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Lomé';
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const [showMap, setShowMap] = useState(false);
  
  // Favorites State
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
      e.preventDefault();
      e.stopPropagation();
      const newFavorites = new Set(favorites);
      if (newFavorites.has(id)) {
          newFavorites.delete(id);
      } else {
          newFavorites.add(id);
      }
      setFavorites(newFavorites);
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">
          Hébergements à <span className="text-primary">{destination}</span>
        </h1>
        <p className="text-gray-500 font-medium">
          {checkin && checkout ? `Du ${checkin} au ${checkout} · ` : ''} 
          240+ séjours trouvés
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 hidden lg:block h-fit sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Filtres</h2>
            <button className="text-sm text-primary font-medium hover:underline">Réinitialiser</button>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-gray-200 dark:border-gray-700">
             <div className="flex items-center gap-3 mb-4">
               <span className="material-symbols-outlined text-primary">map</span>
               <span className="font-bold">Afficher la carte</span>
               <div 
                 onClick={() => setShowMap(!showMap)}
                 className={`ml-auto w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${showMap ? 'bg-primary' : 'bg-gray-300'}`}
               >
                 <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${showMap ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </div>
             </div>
             {showMap && (
               <div className="h-40 bg-gray-200 rounded-lg overflow-hidden relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${destination}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="opacity-80"
                  ></iframe>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/10 font-bold text-white hover:bg-black/20">
                     Agrandir
                  </button>
               </div>
             )}
          </div>
          
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-gray-300">Budget par nuit</h3>
            <div className="relative pt-6 pb-2">
              <div className="flex h-1 w-full rounded-sm bg-[#e7d5cf] dark:bg-gray-600 relative">
                <div className="absolute left-0 right-[20%] top-0 bottom-0 rounded-sm bg-primary"></div>
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full bg-white border-2 border-primary shadow-md"></div>
              </div>
              <div className="flex justify-between text-xs font-bold mt-2">
                <span>0 CFA</span>
                <span>500k+ CFA</span>
              </div>
            </div>
          </div>

          <hr className="border-[#e7d5cf] dark:border-gray-700"/>

          {/* Type */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-gray-300">Type de logement</h3>
            <div className="space-y-2">
              {['Hôtel', 'Appartement', 'Villa', 'Maison d\'hôtes', 'Resort'].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="h-5 w-5 rounded border-[#e7d5cf] text-primary focus:ring-primary/20 bg-transparent checked:bg-primary transition-colors" />
                  <span className="text-text-main dark:text-gray-400 group-hover:text-primary transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className={`lg:col-span-3 flex flex-col gap-6 ${showMap ? 'lg:col-span-2' : ''}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-[#2d1e18] p-4 rounded-xl border border-[#e7d5cf] shadow-sm">
            <div className="text-text-main dark:text-white font-medium">
              <span className="font-bold text-primary">156</span> hébergements trouvés
            </div>
            <div className="relative flex items-center gap-2">
              <span className="text-sm text-[#9a5f4c] hidden sm:inline">Trier par:</span>
              <select className="bg-background-light dark:bg-gray-800 border-[#e7d5cf] dark:border-gray-700 rounded-lg text-sm font-bold text-text-main dark:text-white py-2 pl-3 pr-8">
                <option>Recommandé</option>
                <option>Prix: Croissant</option>
                <option>Note: Décroissant</option>
              </select>
            </div>
          </div>

          {/* Hotel Card 1 */}
          <Link to="/search/stays/1" className="group bg-white dark:bg-[#2d1e18] rounded-2xl border border-[#e7d5cf] overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row cursor-pointer">
            <div className="w-full md:w-2/5 relative bg-gray-100 min-h-[240px]">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Hotel" />
              <button 
                onClick={(e) => toggleFavorite(e, 1)}
                className={`absolute top-3 right-3 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110 ${favorites.has(1) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${favorites.has(1) ? 'icon-filled' : ''}`}>favorite</span>
              </button>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Hôtel • 5 Étoiles</span>
                     <h3 className="text-xl font-bold text-text-main dark:text-white mt-1">Hôtel 2 Février, Lomé</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-lg">
                    <span className="font-bold text-sm">9.5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Le plus haut bâtiment du Togo offrant une vue panoramique sur Lomé, une piscine de luxe et un service 5 étoiles.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">Piscine</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">Vue Panoramique</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">Spa</span>
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-[#e7d5cf] dark:border-gray-700 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-green-600 font-bold mb-1">Annulation gratuite</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">145 000</span>
                    <span className="text-sm font-medium text-text-main dark:text-gray-300">FCFA / nuit</span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-[#d65a1f] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all">
                  Voir dispo
                </button>
              </div>
            </div>
          </Link>

          {/* Hotel Card 2 */}
          <Link to="/search/stays/2" className="group bg-white dark:bg-[#2d1e18] rounded-2xl border border-[#e7d5cf] overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row cursor-pointer">
            <div className="w-full md:w-2/5 relative bg-gray-100 min-h-[240px]">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80" alt="Villa" />
               <button 
                onClick={(e) => toggleFavorite(e, 2)}
                className={`absolute top-3 right-3 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110 ${favorites.has(2) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${favorites.has(2) ? 'icon-filled' : ''}`}>favorite</span>
              </button>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Villa • Assinie</span>
                     <h3 className="text-xl font-bold text-text-main dark:text-white mt-1">Villa Cocotier</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-lg">
                    <span className="font-bold text-sm">8.8</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Magnifique villa avec piscine privée au bord de la lagune. Idéale pour les familles.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">Bord de mer</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">4 Chambres</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-medium">Wifi</span>
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-[#e7d5cf] dark:border-gray-700 pt-4 mt-auto">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">120 000</span>
                    <span className="text-sm font-medium text-text-main dark:text-gray-300">FCFA / nuit</span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-[#d65a1f] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all">
                  Voir dispo
                </button>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Large Map View */}
        {showMap && (
           <div className="lg:col-span-1 hidden lg:block sticky top-24 h-[calc(100vh-120px)] rounded-xl overflow-hidden shadow-lg border border-gray-200">
               <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${destination}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full"
              ></iframe>
           </div>
        )}
      </div>
    </div>
  );
};

export default SearchStays;