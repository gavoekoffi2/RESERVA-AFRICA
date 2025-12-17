import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const { allProperties } = useApp();
  const property = allProperties.find(p => p.id === Number(id));

  if (!property) return <div className="p-20 text-center">Véhicule non trouvé</div>;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 pb-20">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Link to="/search/cars" className="text-[#9a664c] hover:text-primary text-sm font-medium transition-colors">Voitures</Link>
        <span className="material-symbols-outlined text-[#9a664c] text-[16px]">chevron_right</span>
        <span className="text-[#1b120d] dark:text-white text-sm font-semibold">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[450px] rounded-xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer bg-gray-200">
          <img src={property.image} className="w-full h-full object-cover" alt="Main View" />
        </div>
        <div className="hidden md:block bg-gray-200"><img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Interior" /></div>
        <div className="hidden md:block bg-gray-200"><img src="https://images.unsplash.com/photo-1494905998402-395d579af905?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Detail" /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1b120d] dark:text-white tracking-tight">{property.title}</h1>
            <p className="text-lg text-[#9a664c] font-medium mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span> {property.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 py-4 border-y border-[#f3ebe7] dark:border-stone-800">
            {property.features?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#2d2420] rounded-lg border border-[#f3ebe7] dark:border-stone-700">
                <span className="material-symbols-outlined text-[#9a664c]">check</span>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Description</h3>
            <p className="text-[#9a664c] leading-relaxed">
              {property.description || "Véhicule idéal pour vos déplacements, alliant confort, robustesse et élégance. Parfait pour les voyages d'affaires ou les escapades en famille."}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-white dark:bg-[#2d2420] rounded-xl shadow-lg border border-[#f3ebe7] dark:border-stone-700 p-6 flex flex-col gap-6">
            <div className="flex items-end gap-2 pb-4 border-b border-[#f3ebe7]">
              <span className="text-3xl font-bold text-primary">{property.price}</span>
              <span className="text-[#9a664c] mb-1.5">/ jour</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Dates de location</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-[#f3ebe7] dark:border-stone-600 rounded-lg p-3 bg-background-light dark:bg-[#1b120d]">
                  <p className="text-xs text-[#9a664c]">Départ</p>
                  <p className="font-semibold text-sm mt-1">12 Oct 2023</p>
                </div>
                <div className="border border-[#f3ebe7] dark:border-stone-600 rounded-lg p-3 bg-background-light dark:bg-[#1b120d]">
                  <p className="text-xs text-[#9a664c]">Retour</p>
                  <p className="font-semibold text-sm mt-1">15 Oct 2023</p>
                </div>
              </div>
            </div>

            <Link to={`/booking/details?type=car&id=${property.id}`} className="w-full bg-primary hover:bg-[#d5581e] text-white font-bold py-4 rounded-xl text-center shadow-lg transition-all">
              Réserver maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;