import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProperty: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'stay' | 'car' | 'activity'>('stay');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = () => navigate('/host/properties');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
         <Link to="/host/properties" className="text-gray-500 hover:text-black flex items-center gap-2 mb-4 text-sm font-bold">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Retour aux propriétés
         </Link>
         <h1 className="text-3xl font-bold mb-2">Modifier l'annonce</h1>
         <div className="flex gap-2">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 4 ? 'bg-primary' : 'bg-gray-200'}`}></div>
         </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
         
         {/* Step 1: Category */}
         {step === 1 && (
            <div className="animate-fade-in">
               <h2 className="text-xl font-bold mb-6">Catégorie</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                     onClick={() => setCategory('stay')}
                     className={`cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all hover:shadow-md ${category === 'stay' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                     <span className="material-symbols-outlined text-4xl text-gray-700 dark:text-white">bed</span>
                     <span className="font-bold">Hébergement</span>
                  </div>
                  <div 
                     onClick={() => setCategory('car')}
                     className={`cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all hover:shadow-md ${category === 'car' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                     <span className="material-symbols-outlined text-4xl text-gray-700 dark:text-white">directions_car</span>
                     <span className="font-bold">Véhicule</span>
                  </div>
                  <div 
                     onClick={() => setCategory('activity')}
                     className={`cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all hover:shadow-md ${category === 'activity' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                     <span className="material-symbols-outlined text-4xl text-gray-700 dark:text-white">local_activity</span>
                     <span className="font-bold">Activité</span>
                  </div>
               </div>
            </div>
         )}

         {/* Step 2: Basic Info */}
         {step === 2 && (
            <div className="animate-fade-in flex flex-col gap-6">
               <h2 className="text-xl font-bold mb-2">Informations de base</h2>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Titre de l'annonce</label>
                  <input type="text" defaultValue="Villa Prestige Océan" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800" />
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Localisation</label>
                  <input type="text" defaultValue="Lomé, Baguida" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800" />
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Description</label>
                  <textarea rows={5} defaultValue="Magnifique villa en bord de mer..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"></textarea>
               </div>
            </div>
         )}

         {/* Step 3: Photos */}
         {step === 3 && (
            <div className="animate-fade-in flex flex-col gap-6">
               <h2 className="text-xl font-bold mb-2">Photos</h2>
               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">add_a_photo</span>
                  <p className="font-bold">Glissez vos photos ici</p>
                  <p className="text-sm text-gray-500">ou cliquez pour parcourir</p>
               </div>
               <div className="grid grid-cols-4 gap-4">
                  <div className="aspect-square bg-gray-200 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80")'}}></div>
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
               </div>
            </div>
         )}

         {/* Step 4: Pricing */}
         {step === 4 && (
            <div className="animate-fade-in flex flex-col gap-6">
               <h2 className="text-xl font-bold mb-2">Tarification</h2>
               <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Prix par nuit / jour (FCFA)</label>
                  <input type="number" defaultValue={250000} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 text-lg font-bold" />
               </div>
               <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex justify-between items-center">
                     <span className="font-bold">Réductions longue durée</span>
                     <input type="checkbox" className="w-5 h-5 accent-primary" />
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-bold">Accepter automatiquement les réservations</span>
                     <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
                  </div>
               </div>
            </div>
         )}

         {/* Navigation Buttons */}
         <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            {step > 1 ? (
               <button onClick={handleBack} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Retour</button>
            ) : (
               <div></div>
            )}
            
            {step < 4 ? (
               <button onClick={handleNext} className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">Suivant</button>
            ) : (
               <button onClick={handleSubmit} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#d65a1f] transition-colors">Enregistrer les modifications</button>
            )}
         </div>

      </div>
    </div>
  );
};

export default EditProperty;