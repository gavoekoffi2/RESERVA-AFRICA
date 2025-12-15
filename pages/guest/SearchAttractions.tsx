import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchAttractions: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('dest') || 'Afrique de l\'Ouest';
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-5">
      <div className="flex flex-wrap justify-between gap-3 p-4 items-end border-b border-[#482f23] mb-6">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
             Attractions à <span className="text-primary">{destination}</span>
          </h1>
          <p className="text-text-secondary text-base font-normal">142 expériences trouvées</p>
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
                    {['Visites guidées', 'Safari', 'Gastronomie', 'Culture', 'Aventure'].map((cat, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="h-5 w-5 rounded border-[#e7d5cf] text-primary focus:ring-primary/20 bg-transparent checked:bg-primary transition-colors" />
                        <span className="text-text-main dark:text-gray-400 group-hover:text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-gray-300">Durée</h3>
                <div className="space-y-2">
                    {['Moins de 3h', 'Demi-journée', 'Journée complète', 'Plusieurs jours'].map((cat, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="h-5 w-5 rounded border-[#e7d5cf] text-primary focus:ring-primary/20 bg-transparent checked:bg-primary transition-colors" />
                        <span className="text-text-main dark:text-gray-400 group-hover:text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>

        {/* Results Grid */}
        <div className={`lg:col-span-3 grid grid-cols-1 md:grid-cols-2 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
            {/* Card 1 */}
            <Link to="/search/attractions/1" className="group flex flex-col bg-[#2c1e17] rounded-xl overflow-hidden border border-[#482f23] hover:border-primary/50 transition-all cursor-pointer">
            <div className="relative w-full aspect-[4/3]">
                <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1549488497-29560f64c616?auto=format&fit=crop&w=600&q=80" alt="Ile de Goree" />
                <div className="absolute bottom-3 left-3 bg-primary/90 px-2 py-1 rounded text-xs font-bold text-white uppercase">Incontournable</div>
            </div>
            <div className="p-4 flex flex-col flex-1 text-white">
                <h3 className="text-lg font-bold mb-2">Visite historique de l'Île de Gorée</h3>
                <p className="text-[#c9a492] text-sm mb-4">Dakar, Sénégal</p>
                <div className="mt-auto flex items-end justify-between border-t border-[#482f23] pt-4">
                <div className="flex flex-col">
                    <span className="text-[#c9a492] text-xs">À partir de</span>
                    <span className="text-primary text-xl font-black">15 000 FCFA</span>
                </div>
                </div>
            </div>
            </Link>
            {/* Card 2 */}
            <Link to="/search/attractions/2" className="group flex flex-col bg-[#2c1e17] rounded-xl overflow-hidden border border-[#482f23] hover:border-primary/50 transition-all cursor-pointer">
            <div className="relative w-full aspect-[4/3]">
                <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80" alt="Safari" />
                <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-black uppercase">Nature</div>
            </div>
            <div className="p-4 flex flex-col flex-1 text-white">
                <h3 className="text-lg font-bold mb-2">Safari Parc de la Pendjari</h3>
                <p className="text-[#c9a492] text-sm mb-4">Tanguiéta, Bénin</p>
                <div className="mt-auto flex items-end justify-between border-t border-[#482f23] pt-4">
                <div className="flex flex-col">
                    <span className="text-[#c9a492] text-xs">Par personne</span>
                    <span className="text-primary text-xl font-black">45 000 FCFA</span>
                </div>
                </div>
            </div>
            </Link>
            {/* Card 3 */}
            <Link to="/search/attractions/3" className="group flex flex-col bg-[#2c1e17] rounded-xl overflow-hidden border border-[#482f23] hover:border-primary/50 transition-all cursor-pointer">
            <div className="relative w-full aspect-[4/3]">
                <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1610477209376-745a3597d620?auto=format&fit=crop&w=600&q=80" alt="Lac Rose" />
                <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-black uppercase">Aventure</div>
            </div>
            <div className="p-4 flex flex-col flex-1 text-white">
                <h3 className="text-lg font-bold mb-2">Quad sur le Lac Rose</h3>
                <p className="text-[#c9a492] text-sm mb-4">Dakar, Sénégal</p>
                <div className="mt-auto flex items-end justify-between border-t border-[#482f23] pt-4">
                <div className="flex flex-col">
                    <span className="text-[#c9a492] text-xs">Par personne</span>
                    <span className="text-primary text-xl font-black">25 000 FCFA</span>
                </div>
                </div>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchAttractions;