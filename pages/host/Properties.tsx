import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Properties: React.FC = () => {
  const { properties } = useApp();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Propriétés</h1>
        <Link to="/host/properties/add" className="bg-primary hover:bg-[#d65a1f] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined">add</span> Ajouter
        </Link>
      </div>
      
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-200 dark:border-gray-700 text-xs font-bold uppercase text-gray-500 tracking-wider">
              <div className="col-span-6">Annonce</div>
              <div className="col-span-2">Statut</div>
              <div className="col-span-2 text-right">Prix</div>
              <div className="col-span-2 text-right">Actions</div>
          </div>

          {properties.map((property) => (
            <div key={property.id} className="grid grid-cols-12 p-4 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="col-span-6 flex gap-4">
                  <div className="w-20 h-16 rounded-lg bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url("${property.image}")`}}></div>
                  <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white">{property.title}</h3>
                      <p className="text-xs text-gray-500">{property.location} • {property.type}</p>
                  </div>
              </div>
              <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1 ${property.status === 'En ligne' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${property.status === 'En ligne' ? 'bg-green-500' : 'bg-gray-400'}`}></span> {property.status}
                  </span>
              </div>
              <div className="col-span-2 text-right font-bold text-gray-700 dark:text-gray-300">
                  {property.price}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                  <Link to={`/host/properties/edit/${property.id}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">edit</span></Link>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
              </div>
            </div>
          ))}
          
          {properties.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                  Vous n'avez pas encore de propriétés. Ajoutez-en une !
              </div>
          )}
      </div>
    </div>
  );
};

export default Properties;