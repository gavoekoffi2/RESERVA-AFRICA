import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const { addProperty, user } = useApp();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'stay' | 'car' | 'activity'>('stay');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const MOCK_IMAGES = [
      "https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
  ];

  const handleSubmit = () => {
      if (!user) return;
      addProperty({
          id: Date.now(),
          title: title || 'Nouvelle Propriété',
          location: location || 'Lomé, Togo',
          type: category === 'stay' ? 'Hébergement' : category === 'car' ? 'Voiture' : 'Activité',
          price: `${Number(price).toLocaleString() || '0'} F`,
          rawPrice: Number(price) || 0,
          image: selectedImage || MOCK_IMAGES[0],
          status: 'En attente',
          owner: user.name,
          ownerId: user.id, // RIGOROUS FIX: Bind ownership to User ID
          description: description,
          features: ['Wifi', 'Parking'],
          rating: 0,
          reviews: 0
      });
      navigate('/host/properties');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-display">
      <div className="mb-8">
         <Link to="/host/properties" className="text-gray-500 hover:text-black flex items-center gap-2 mb-4 text-sm font-bold">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
         </Link>
         <h1 className="text-3xl font-bold mb-2">Ajouter une nouvelle annonce</h1>
         <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-primary' : 'bg-gray-200'}`}></div>)}
         </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
         {step === 1 && (
            <div className="animate-fade-in">
               <h2 className="text-xl font-bold mb-6">Que souhaitez-vous lister ?</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => setCategory('stay')} className={`p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all ${category === 'stay' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                     <span className="material-symbols-outlined text-4xl">bed</span><span className="font-bold">Hébergement</span>
                  </button>
                  <button onClick={() => setCategory('car')} className={`p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all ${category === 'car' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                     <span className="material-symbols-outlined text-4xl">directions_car</span><span className="font-bold">Véhicule</span>
                  </button>
                  <button onClick={() => setCategory('activity')} className={`p-6 rounded-xl border-2 flex flex-col items-center gap-4 transition-all ${category === 'activity' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                     <span className="material-symbols-outlined text-4xl">local_activity</span><span className="font-bold">Activité</span>
                  </button>
               </div>
            </div>
         )}
         {step === 2 && (
            <div className="animate-fade-in space-y-4">
               <div><label className="font-bold text-sm">Titre</label><input value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full p-3 border rounded-lg bg-transparent" /></div>
               <div><label className="font-bold text-sm">Lieu</label><input value={location} onChange={e => setLocation(e.target.value)} type="text" className="w-full p-3 border rounded-lg bg-transparent" /></div>
               <div><label className="font-bold text-sm">Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full p-3 border rounded-lg bg-transparent"></textarea></div>
            </div>
         )}
         {step === 3 && (
            <div className="animate-fade-in space-y-4">
               <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center"><span className="material-symbols-outlined text-4xl text-gray-400">add_a_photo</span><p className="font-bold">Charger vos photos</p></div>
               <div className="grid grid-cols-4 gap-4">
                  {MOCK_IMAGES.map((img, i) => <button key={i} onClick={() => setSelectedImage(img)} className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}><img src={img} className="w-full h-full object-cover" /></button>)}
               </div>
            </div>
         )}
         {step === 4 && (
            <div className="animate-fade-in space-y-4">
               <div><label className="font-bold text-sm">Prix (FCFA)</label><input value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full p-3 border rounded-lg bg-transparent text-xl font-bold" /></div>
            </div>
         )}
         <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 ? <button onClick={handleBack} className="px-6 py-3 font-bold text-gray-500">Retour</button> : <div />}
            {step < 4 ? <button onClick={handleNext} className="px-8 py-3 bg-black text-white rounded-xl font-bold">Suivant</button> : <button onClick={handleSubmit} className="px-8 py-3 bg-primary text-white rounded-xl font-bold">Soumettre</button>}
         </div>
      </div>
    </div>
  );
};

export default AddProperty;