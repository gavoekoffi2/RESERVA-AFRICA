import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SearchExperiences: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Afrique';
  const [showMap, setShowMap] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { allProperties } = useApp();

  const handleCategoryChange = (cat: string) => {
      setSelectedCategories(prev => 
          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
  };

  const filteredExperiences = useMemo(() => {
      return allProperties.filter(p => {
          if (p.type !== 'Expérience') return false;
          if (p.status !== 'En ligne') return false;
          if (selectedCategories.length > 0 && p.category && !selectedCategories.includes(p.category)) return false;
          
          if (destination && destination !== 'Afrique' && !p.location.toLowerCase().includes(destination.toLowerCase().split(',')[0])) {
             // Loose match
          }
          return true;
      });
  }, [allProperties, selectedCategories, destination]);

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-10">
      <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-4xl font-black tracking-tight leading-tight">
             EXPÉRIENCES À <span className="text-primary">{destination.toUpperCase()}</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{filteredExperiences.length} AVENTURES TROUVÉES</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block space-y-10 sticky top-24 h-fit">
             <div className="bg-white dark:bg-[#1e293b] p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none">
               <div className="flex items-center gap-3 mb-4">
                 <span className="material-symbols-outlined text-primary font-bold">explore</span>
                 <span className="font-black text-sm uppercase tracking-wider">Carte</span>
                 <div 
                   onClick={() => setShowMap(!showMap)}
                   className={`ml-auto w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${showMap ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                 >
                   <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${showMap ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
               </div>
               {showMap && (
                 <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative border border-gray-100 animate-reveal">
                    <iframe 
                      width="100%" height="100%" frameBorder="0" scrolling="no" src={`https://maps.google.com/maps?q=${destination}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                      className="opacity-90 grayscale-[0.3]"
                      title="Experience Location Map"
                    ></iframe>
                 </div>
               )}
             </div>

             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Thématiques</h3>
                <div className="space-y-3">
                    {['Culture', 'Safari', 'Aventure', 'Gastronomie', 'Visite'].map((cat, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all-custom">
                            <div className={`size-5 rounded border-2 flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                                {selectedCategories.includes(cat) && <span className="material-symbols-outlined text-white text-xs font-black">check</span>}
                            </div>
                            <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>

        <div className={`lg:col-span-3 grid grid-cols-1 md:grid-cols-2 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
            {filteredExperiences.length === 0 ? (
                <div className="col-span-full py-32 text-center text-gray-400 bg-gray-50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-100">
                    Aucune expérience trouvée.
                </div>
            ) : (
                filteredExperiences.map(exp => (
                    <Link to={`/search/experiences/${exp.id}`} key={exp.id} className="group flex flex-col bg-white dark:bg-[#2d1e18] rounded-[40px] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all-custom hover-lift">
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                            <img className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s]" src={exp.image} alt={exp.title} />
                            <div className="absolute bottom-4 left-4 bg-primary/95 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">{exp.category}</div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-black tracking-tight line-clamp-2 leading-tight">{exp.title}</h3>
                                <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                                    <span className="material-symbols-outlined text-sm icon-filled">star</span> {exp.rating || 'New'}
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 font-medium">{exp.location}</p>
                            
                            <div className="mt-auto flex items-end justify-between border-t border-gray-50 dark:border-gray-800 pt-6">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">À partir de</span>
                                    <span className="text-primary text-xl font-black">{exp.price}</span>
                                </div>
                                <div className="size-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
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

export default SearchExperiences;