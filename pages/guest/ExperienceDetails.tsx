import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ExperienceDetails: React.FC = () => {
  const { id } = useParams();
  const { allProperties } = useApp();
  const property = allProperties.find(p => p.id === Number(id));

  if (!property) return <div className="p-20 text-center">Expérience non trouvée</div>;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-10 pb-20 font-display">
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Link to="/search/experiences" className="text-[#9a664c] hover:text-primary text-sm font-bold transition-colors">Expériences</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-black uppercase tracking-widest">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-[300px] md:h-[500px] rounded-[40px] overflow-hidden">
        <div className="md:col-span-2 relative group cursor-pointer bg-gray-100">
          <img src={property.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Vue Principale" />
        </div>
        <div className="flex flex-col gap-4">
             <div className="h-1/2 bg-gray-100 overflow-hidden"><img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
             <div className="h-1/2 bg-gray-100 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1547995886-67ba2bc41708?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
                    <span className="text-white font-black uppercase tracking-widest text-xs underline underline-offset-4">+ 12 photos</span>
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="border-b border-gray-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">{property.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full"><span className="material-symbols-outlined text-primary text-xl">location_on</span> {property.location}</span>
                <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full"><span className="material-symbols-outlined text-primary text-xl">schedule</span> 8 Heures</span>
                <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full"><span className="material-symbols-outlined text-primary text-xl">group</span> Max 10 pers.</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-6 tracking-tight">L'expérience</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
              {property.description || "Une immersion totale et authentique au cœur du patrimoine local. Nos guides passionnés vous feront découvrir des trésors cachés loin des sentiers battus."}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-8 tracking-tight">Programme détaillé</h3>
            <div className="border-l-4 border-primary/20 ml-4 space-y-10 py-2">
                <div className="relative pl-10">
                    <span className="absolute -left-[14px] top-0 size-6 bg-primary rounded-full border-4 border-white shadow-lg"></span>
                    <h4 className="font-black text-gray-900 dark:text-white text-lg">08:00 - Départ & Accueil</h4>
                    <p className="text-gray-500 font-medium">Prise en charge personnalisée à votre point de rendez-vous.</p>
                </div>
                <div className="relative pl-10">
                    <span className="absolute -left-[14px] top-0 size-6 bg-white border-4 border-primary rounded-full shadow-lg"></span>
                    <h4 className="font-black text-gray-900 dark:text-white text-lg">12:30 - Déjeuner Authentique</h4>
                    <p className="text-gray-500 font-medium">Dégustation de spécialités locales préparées avec soin.</p>
                </div>
                 <div className="relative pl-10">
                    <span className="absolute -left-[14px] top-0 size-6 bg-black rounded-full border-4 border-white shadow-lg"></span>
                    <h4 className="font-black text-gray-900 dark:text-white text-lg">16:30 - Retour</h4>
                    <p className="text-gray-500 font-medium">Fin de l'expérience et transfert retour.</p>
                </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-white/5 p-10 rounded-[40px]">
            <h3 className="text-2xl font-black mb-6 tracking-tight">Ce qui est inclus</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {property.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold">
                        <div className="size-8 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-lg">check</span>
                        </div>
                        {feat}
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 p-10 flex flex-col gap-8">
            <div className="flex items-end gap-2 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-4xl font-black text-primary tracking-tighter">{property.price}</span>
              <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-2">/ personne</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Sélectionner une date</label>
                  <input type="date" className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 font-bold text-sm outline-none focus:border-primary transition-all" />
              </div>
              <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Participants</label>
                   <select className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 font-bold text-sm outline-none focus:border-primary transition-all">
                       <option>1 Voyageur</option>
                       <option>2 Voyageurs</option>
                       <option>3 Voyageurs</option>
                       <option>4+ Voyageurs</option>
                   </select>
              </div>
            </div>

            <Link to={`/booking/details?type=experience&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-black py-5 rounded-2xl text-center shadow-xl shadow-primary/20 transition-all btn-active-scale uppercase tracking-widest text-sm">
              Réserver l'expérience
            </Link>
            
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Paiement 100% sécurisé</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;