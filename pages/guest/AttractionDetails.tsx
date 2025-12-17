import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const AttractionDetails: React.FC = () => {
  const { id } = useParams();
  const { allProperties } = useApp();
  const property = allProperties.find(p => p.id === Number(id));

  if (!property) return <div className="p-20 text-center">Attraction non trouvée</div>;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/attractions" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Attractions</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
        <div className="md:col-span-2 relative group cursor-pointer bg-gray-200">
          <img src={property.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Main View" />
        </div>
        <div className="flex flex-col gap-3">
             <div className="h-1/2 bg-gray-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1596328926077-333e9b11029c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail 1" /></div>
             <div className="h-1/2 bg-gray-200 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1547995886-67ba2bc41708?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail 2" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
                    <span className="text-white font-bold underline">+ 8 photos</span>
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1b120d] dark:text-white tracking-tight mb-2">{property.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-lg">location_on</span> {property.location}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-lg">schedule</span> 6 Heures</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-lg">group</span> Groupe ou Privé</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">L'expérience</h3>
            <p className="text-[#9a664c] leading-relaxed mb-4">
              {property.description || "Vivez une expérience unique et authentique. Découvrez la culture, les paysages et l'histoire locale avec nos guides experts."}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Au programme</h3>
            <div className="border-l-2 border-gray-200 ml-3 space-y-8 py-2">
                <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 size-4 bg-primary rounded-full border-4 border-white"></span>
                    <h4 className="font-bold text-gray-900 dark:text-white">08:00 - Départ</h4>
                    <p className="text-sm text-gray-500">Prise en charge à votre hôtel.</p>
                </div>
                <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 size-4 bg-gray-300 rounded-full border-4 border-white"></span>
                    <h4 className="font-bold text-gray-900 dark:text-white">12:00 - Activité Principale</h4>
                    <p className="text-sm text-gray-500">Visite et découverte.</p>
                </div>
                 <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 size-4 bg-black rounded-full border-4 border-white"></span>
                    <h4 className="font-bold text-gray-900 dark:text-white">16:00 - Retour</h4>
                    <p className="text-sm text-gray-500">Arrivée prévue en fin d'après-midi.</p>
                </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Ce qui est inclus</h3>
            <div className="grid grid-cols-2 gap-4">
                {property.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="material-symbols-outlined text-green-500">check</span> {feat}
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-white dark:bg-[#2d2420] rounded-2xl shadow-xl border border-[#f3ebe7] dark:border-stone-700 p-6 flex flex-col gap-6">
            <div className="flex items-end gap-2 pb-4 border-b border-[#f3ebe7]">
              <span className="text-3xl font-bold text-primary">{property.price}</span>
              <span className="text-[#9a664c] mb-1.5">/ personne</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-xl bg-transparent" />
              </div>
              <div>
                   <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Participants</label>
                   <select className="w-full p-3 border border-gray-300 rounded-xl bg-transparent">
                       <option>1 Adulte</option>
                       <option>2 Adultes</option>
                       <option>3 Adultes</option>
                       <option>4+ Adultes</option>
                   </select>
              </div>
            </div>

            <Link to={`/booking/details?type=attraction&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-bold py-4 rounded-xl text-center shadow-lg transition-all">
              Réserver cette expérience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetails;