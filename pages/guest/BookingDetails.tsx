import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BookingDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'car'; 
  const id = searchParams.get('id');
  const checkinParam = searchParams.get('checkin');
  const checkoutParam = searchParams.get('checkout');

  const { allProperties, checkAvailability, systemSettings } = useApp();
  const property = allProperties.find(p => p.id === Number(id));

  const [startDate, setStartDate] = useState<string>(
      checkinParam ? new Date(checkinParam).toISOString().split('T')[0] 
      : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
      checkoutParam ? new Date(checkoutParam).toISOString().split('T')[0] 
      : new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0]
  );

  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
      const s = new Date(startDate);
      const e = new Date(endDate);
      setSearchParams(prev => {
          prev.set('checkin', s.toISOString());
          prev.set('checkout', e.toISOString());
          return prev;
      });
      if (property) {
          setIsAvailable(checkAvailability(property.id, s, e));
      }
  }, [startDate, endDate, property, setSearchParams]);

  const diffDays = Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) || 1;

  if (!property && id) return <div className="p-20 text-center">Élément non trouvé</div>;

  const displayProperty = property || { id: 0, title: 'Inconnu', image: '', location: '', rating: 0, reviews: 0, price: '0 F', rawPrice: 0 };

  // RIGOROUS FIX: Calculated based on system settings
  const basePrice = (displayProperty.rawPrice * diffDays);
  const serviceFee = Math.round(basePrice * (systemSettings.serviceFeeRate / 100));
  const grandTotal = basePrice + serviceFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <Link to={-1 as any} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 hover:text-black dark:hover:text-white">
               <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">Demande de réservation</h1>
            <p className="text-gray-500">Étape 1 sur 3 · Aucun montant débité pour l'instant</p>
          </div>

          <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Votre voyage</h2>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-end">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Dates</h3>
                    <p className="text-sm text-gray-500">{diffDays} {type === 'stay' ? 'nuits' : 'jours'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Début</label>
                        <input type="date" value={startDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-transparent font-bold" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Fin</label>
                        <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-transparent font-bold" />
                    </div>
                </div>
                {!isAvailable && <div className="p-3 bg-red-100 text-red-700 text-sm font-bold rounded-lg flex items-center gap-2"><span className="material-symbols-outlined">error</span>Ces dates sont déjà réservées.</div>}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Détails personnels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="w-full rounded-lg border-gray-300 p-4 bg-transparent" placeholder="Prénom" type="text" />
              <input className="w-full rounded-lg border-gray-300 p-4 bg-transparent" placeholder="Nom" type="text" />
            </div>
          </section>

          <div className="pt-6">
            <Link to={isAvailable ? `/booking/payment?id=${displayProperty.id}&type=${type}&checkin=${startDate}&checkout=${endDate}` : '#'} className={`inline-block w-full md:w-auto min-w-[300px] text-white font-bold text-lg rounded-xl py-4 px-8 text-center transition-all shadow-lg ${isAvailable ? 'bg-primary hover:bg-[#d65a1f]' : 'bg-gray-300 cursor-not-allowed'}`}>
                {isAvailable ? 'Continuer vers le paiement' : 'Dates indisponibles'}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 flex gap-4 border-b border-gray-100">
              <img src={displayProperty.image} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-500 uppercase font-bold">{displayProperty.location}</p>
                <h3 className="font-bold leading-tight mb-1">{displayProperty.title}</h3>
                <div className="flex items-center gap-1 text-sm"><span className="material-symbols-outlined text-primary text-sm">star</span> {displayProperty.rating} ({displayProperty.reviews} avis)</div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Détails du prix</h4>
              <div className="flex justify-between"><span>{displayProperty.rawPrice.toLocaleString()} F x {diffDays} {type === 'stay' ? 'nuits' : 'jours'}</span><span>{basePrice.toLocaleString()} F</span></div>
              <div className="flex justify-between"><span>Frais de service ({systemSettings.serviceFeeRate}%)</span><span>{serviceFee.toLocaleString()} F</span></div>
              <hr />
              <div className="flex justify-between items-center font-bold text-lg"><span>Total</span><span className="text-primary">{grandTotal.toLocaleString()} FCFA</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;