import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const AdminProperties: React.FC = () => {
  const { allProperties, updatePropertyStatus } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'active'>('pending');

  const filteredProps = allProperties.filter(p => {
      if (filter === 'pending') return p.status === 'En attente';
      if (filter === 'active') return p.status === 'En ligne';
      return true;
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Modération des Annonces</h1>
        
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setFilter('pending')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'pending' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>En attente ({allProperties.filter(p => p.status === 'En attente').length})</button>
            <button onClick={() => setFilter('active')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'active' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>En ligne</button>
            <button onClick={() => setFilter('all')} className={`pb-3 border-b-2 font-bold px-2 ${filter === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>Tout voir</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {filteredProps.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white dark:bg-[#1e293b] rounded-2xl">Aucune propriété dans cette catégorie.</div>
            ) : (
                filteredProps.map(property => (
                    <div key={property.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 h-40 bg-gray-200 rounded-xl bg-cover bg-center shrink-0" style={{backgroundImage: `url("${property.image}")`}}></div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{property.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        property.status === 'En ligne' ? 'bg-green-100 text-green-700' : 
                                        property.status === 'En attente' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                    }`}>{property.status}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-2">{property.location} • {property.type}</p>
                                <p className="text-gray-500 text-sm">Propriétaire: <span className="font-bold text-gray-800 dark:text-gray-200">{property.owner || 'Inconnu'}</span></p>
                                <p className="font-bold text-primary mt-2">{property.price}</p>
                            </div>

                            {property.status === 'En attente' && (
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => updatePropertyStatus(property.id, 'En ligne')} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors">Approuver</button>
                                    <button onClick={() => updatePropertyStatus(property.id, 'Rejeté')} className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-bold transition-colors">Rejeter</button>
                                </div>
                            )}
                             {property.status === 'En ligne' && (
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => updatePropertyStatus(property.id, 'Brouillon')} className="px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-colors">Désactiver</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default AdminProperties;