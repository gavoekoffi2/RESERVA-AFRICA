import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SearchStays: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || '';
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = parseInt(searchParams.get('adults') || '1');
  const childrenCount = parseInt(searchParams.get('children') || '0');
  const totalGuests = adults + childrenCount;

  const [showMap, setShowMap] = useState(false);
  const { allProperties, favorites, toggleFavorite, checkAvailability } = useApp();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500000);

  const handleToggleFavorite = (e: React.MouseEvent, id: number) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(id);
  };

  const filteredProperties = useMemo(() => {
      let start: Date | null = null;
      let end: Date | null = null;
      if (checkin && checkout) {
          start = new Date(checkin);
          end = new Date(checkout);
      }
      const destLower = destination.toLowerCase().split(',')[0].trim();

      return allProperties.filter(p => {
          if (p.type !== 'Hébergement') return false;
          if (p.status !== 'En ligne') return false;
          if (destLower && !p.location.toLowerCase().includes(destLower)) return false;
          if (totalGuests > 0 && p.capacity && p.capacity < totalGuests) return false;
          if (start && end && !checkAvailability(p.id, start, end)) return false;
          if (selectedTypes.length > 0 && p.category && !selectedTypes.includes(p.category)) return false;
          if (selectedAmenities.length > 0) {
              const hasAllAmenities = selectedAmenities.every(a => p.features?.includes(a));
              if (!hasAllAmenities) return false;
          }
          if (p.rawPrice && p.rawPrice > priceRange) return false;
          return true;
      });
  }, [allProperties, selectedTypes, selectedAmenities, priceRange, destination, checkin, checkout, totalGuests, checkAvailability]);

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-10 py-10 animate-reveal">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tight">
          SÉJOURS {destination ? `À ${destination.toUpperCase()}` : 'EN AFRIQUE'}
        </h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
          {checkin && checkout ? `Du ${new Date(checkin).toLocaleDateString()} au ${new Date(checkout).toLocaleDateString()} • ` : ''} 
          {filteredProperties.length} RÉSULTATS {totalGuests > 0 ? `POUR ${totalGuests} PERS.` : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-10 hidden lg:block h-fit sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tighter">Filtres</h2>
            <button 
                onClick={() => { setSelectedTypes([]); setSelectedAmenities([]); setPriceRange(500000); }}
                className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
            >
                Effacer
            </button>
          </div>
          
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none transition-all-custom group">
             <div className="flex items-center gap-4 mb-6">
               <div className="p-2.5 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined font-bold">map</span>
               </div>
               <span className="font-black text-sm uppercase tracking-wider">Carte Interactive</span>
               <div 
                 onClick={() => setShowMap(!showMap)}
                 className={`ml-auto w-12 h-6 rounded-full p-1 cursor-pointer transition-all-custom ${showMap ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
               >
                 <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${showMap ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </div>
             </div>
             {showMap && (
               <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-gray-700 animate-reveal">
                  <iframe 
                    width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${destination || 'Afrique'}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="opacity-90 grayscale-[0.3] dark:invert dark:grayscale"
                    title="Search results map"
                  ></iframe>
               </div>
             )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Budget max / nuit</h3>
            <div className="relative px-2">
              <input 
                type="range" min="0" max="500000" step="10000" value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs font-black mt-4 text-gray-500">
                <span>0 F</span>
                <span className="text-primary">{priceRange.toLocaleString()} F</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Type de logement</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Villa', 'Appartement', 'Maison', 'Hôtel'].map((cat) => (
                <label key={cat} className="flex items-center gap-4 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all-custom">
                  <div className={`size-5 rounded border-2 flex items-center justify-center transition-all ${selectedTypes.includes(cat) ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                     {selectedTypes.includes(cat) && <span className="material-symbols-outlined text-white text-xs font-black">check</span>}
                  </div>
                  <input type="checkbox" checked={selectedTypes.includes(cat)} onChange={() => setSelectedTypes(prev => prev.includes(cat) ? prev.filter(t => t !== cat) : [...prev, cat])} className="hidden" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className={`lg:col-span-3 flex flex-col gap-8 ${showMap ? 'lg:col-span-2' : ''}`}>
          {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-gray-50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-700 text-center px-10 animate-reveal">
                  <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-300">
                     <span className="material-symbols-outlined text-4xl">travel_explore</span>
                  </div>
                  <p className="font-black text-2xl text-gray-500 dark:text-gray-400">Aucun résultat trouvé</p>
                  <p className="text-sm text-gray-400 mt-2 font-medium max-w-sm">Essayez d'élargir vos critères de recherche ou vos dates de voyage.</p>
                  <button onClick={() => { setSelectedTypes([]); setPriceRange(500000); }} className="mt-8 bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest btn-active-scale">Réinitialiser les filtres</button>
              </div>
          ) : (
              <div className="space-y-8">
                  {filteredProperties.map((property, idx) => (
                    <Link 
                        to={`/search/stays/${property.id}`} 
                        key={property.id}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        className="group bg-white dark:bg-[#2d1e18] rounded-[40px] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all-custom flex flex-col md:flex-row cursor-pointer animate-reveal hover-lift"
                    >
                        <div className="w-full md:w-[400px] relative bg-gray-100 overflow-hidden shrink-0">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" src={property.image} alt={property.title} />
                            <button 
                                onClick={(e) => handleToggleFavorite(e, property.id)}
                                className={`absolute top-6 right-6 size-12 backdrop-blur-xl rounded-full flex items-center justify-center transition-all-custom hover:scale-125 z-10 border border-white/20 ${favorites.has(property.id) ? 'bg-white text-red-500 shadow-lg' : 'bg-black/20 text-white hover:bg-white hover:text-red-500'}`}
                            >
                                <span className={`material-symbols-outlined ${favorites.has(property.id) ? 'icon-filled' : ''}`}>favorite</span>
                            </button>
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="overflow-hidden">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-2 block">{property.category} • {property.location}</span>
                                        <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter truncate">{property.title}</h3>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/10 px-4 py-1.5 rounded-2xl flex items-center gap-1.5 border border-gray-100 dark:border-white/5 shrink-0">
                                        <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span>
                                        <span className="font-black text-sm">{property.rating || 'New'}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6 line-clamp-2 leading-relaxed">{property.description || "Un lieu d'exception sélectionné par nos experts pour sa qualité et son authenticité."}</p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-white/5">
                                       <span className="material-symbols-outlined text-sm">group</span> {property.capacity} pers.
                                    </div>
                                    {property.features?.slice(0, 3).map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-white/5">
                                            <span className="material-symbols-outlined text-sm">verified</span> {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full mb-3 inline-block">Annulation gratuite</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{property.price}</span>
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">/ nuit</span>
                                    </div>
                                </div>
                                <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all-custom btn-active-scale group">
                                    Voir dispo <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </Link>
                  ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStays;