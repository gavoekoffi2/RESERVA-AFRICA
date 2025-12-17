import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SearchAttractions: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Afrique de l\'Ouest';
  const [showMap, setShowMap] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Use Context
  const { allProperties } = useApp();

  const handleCategoryChange = (cat: string) => {
      setSelectedCategories(prev => 
          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
  };

  const filteredAttractions = useMemo(() => {
      return allProperties.filter(p => {
          if (p.type !== 'Activité') return false;
          if (p.status !== 'En ligne') return false;
          if (selectedCategories.length > 0 && p.category && !selectedCategories.includes(p.category)) return false;
          
          if (destination && destination !== 'Afrique de l\'Ouest' && !p.location.toLowerCase().includes(destination.toLowerCase().split(',')[0])) {
             // Loose match
          }
          return true;
      });
  }, [allProperties, selectedCategories, destination]);

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-5">
      <div className="flex flex-wrap justify-between gap-3 p-4 items-end border-b border-[#482f23] mb-6">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
             Attractions à <span className="text-primary">{destination}</span>
          </h1>
          <p className="text-text-secondary text-base font-normal">{filteredAttractions.length} expériences trouvées</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
             <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-gray-200 dark:border-gray-700">
               <div className="flex items-center gap-3 mb-4">
                 <span className="material-symbols-outlined text-primary">map</span>
                 <span className="font-bold">Carte</span>
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
                      src={`https://maps.google.com/maps?q=${destination}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                      className="opacity-80"
                    ></iframe>
                 </div>
               )}
             </div>

             <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-gray-300">Catégories</h3>
                <div className="space-y-2">
                    {['Culture', 'Safari', 'Aventure', 'Gastronomie', 'Visite'].map((cat, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                            className="h-5 w-5 rounded border-[#e7d5cf] text-primary focus:ring-primary/20 bg-transparent checked:bg-primary transition-colors accent-primary" 
                        />
                        <span className="text-text-main dark:text-gray-400 group-hover:text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>

        {/* Results Grid */}
        <div className={`lg:col-span-3 grid grid-cols-1 md:grid-cols-2 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
            {filteredAttractions.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gray-500">
                    Aucune activité trouvée. Essayez d'autres filtres ou une autre destination.
                </div>
            ) : (
                filteredAttractions.map(attraction => (
                    <Link to={`/search/attractions/${attraction.id}`} key={attraction.id} className="group flex flex-col bg-[#2c1e17] rounded-xl overflow-hidden border border-[#482f23] hover:border-primary/50 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="relative w-full aspect-[4/3] bg-gray-900">
                        <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src={attraction.image} alt={attraction.title} />
                        <div className="absolute bottom-3 left-3 bg-primary/90 px-2 py-1 rounded text-xs font-bold text-white uppercase">{attraction.category}</div>
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-white">
                            <span className="material-symbols-outlined text-sm text-yellow-400 icon-filled">star</span> {attraction.rating || 'New'}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 text-white bg-gradient-to-b from-[#2c1e17] to-[#1b120d]">
                        <h3 className="text-lg font-bold mb-1 line-clamp-2">{attraction.title}</h3>
                        <p className="text-[#c9a492] text-sm mb-4">{attraction.location}</p>
                        
                        <div className="flex gap-2 mb-4">
                            {attraction.features?.slice(0,2).map((f, i) => (
                                <span key={i} className="text-[10px] border border-[#c9a492]/30 px-2 py-1 rounded text-[#c9a492]">{f}</span>
                            ))}
                        </div>

                        <div className="mt-auto flex items-end justify-between border-t border-[#482f23] pt-4">
                        <div className="flex flex-col">
                            <span className="text-[#c9a492] text-xs">À partir de</span>
                            <span className="text-primary text-xl font-black">{attraction.price}</span>
                        </div>
                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                        </div>
                    </div>
                    </Link>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchAttractions;