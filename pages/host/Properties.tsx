import React from 'react';
import { Link } from 'react-router-dom';

const Properties: React.FC = () => {
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

          {/* Item 1 */}
          <div className="grid grid-cols-12 p-4 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="col-span-6 flex gap-4">
                  <div className="w-20 h-16 rounded-lg bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80")'}}></div>
                  <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white">Villa Prestige Océan</h3>
                      <p className="text-xs text-gray-500">Lomé, Baguida • Hébergement</p>
                  </div>
              </div>
              <div className="col-span-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En ligne
                  </span>
              </div>
              <div className="col-span-2 text-right font-bold text-gray-700 dark:text-gray-300">
                  250 000 F <span className="text-xs font-normal text-gray-400">/nuit</span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                  <Link to="/host/properties/edit/1" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">edit</span></Link>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
              </div>
          </div>

           {/* Item 2 */}
          <div className="grid grid-cols-12 p-4 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="col-span-6 flex gap-4">
                  <div className="w-20 h-16 rounded-lg bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80")'}}></div>
                  <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white">Toyota Land Cruiser Prado</h3>
                      <p className="text-xs text-gray-500">Lomé, Aéroport • Voiture</p>
                  </div>
              </div>
              <div className="col-span-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En ligne
                  </span>
              </div>
              <div className="col-span-2 text-right font-bold text-gray-700 dark:text-gray-300">
                  65 000 F <span className="text-xs font-normal text-gray-400">/jour</span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                  <Link to="/host/properties/edit/2" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">edit</span></Link>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
              </div>
          </div>

           {/* Item 3 */}
          <div className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="col-span-6 flex gap-4">
                  <div className="w-20 h-16 rounded-lg bg-gray-200 bg-cover bg-center opacity-70" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1596483756461-9f939223cb23?auto=format&fit=crop&w=200&q=80")'}}></div>
                  <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 dark:text-white">Visite Historique Ouidah</h3>
                      <p className="text-xs text-gray-500">Ouidah, Bénin • Activité</p>
                  </div>
              </div>
              <div className="col-span-2">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Brouillon
                  </span>
              </div>
              <div className="col-span-2 text-right font-bold text-gray-700 dark:text-gray-300">
                  15 000 F <span className="text-xs font-normal text-gray-400">/pers</span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                  <Link to="/host/properties/edit/3" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">edit</span></Link>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Properties;