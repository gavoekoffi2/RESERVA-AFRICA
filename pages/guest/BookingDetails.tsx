import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BookingDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'stay'; 
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

  const diffMs = new Date(endDate).getTime() - new Date(startDate).getTime();
  const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  
  // Stays are counted by nights, others by days
  const unitLabel = type === 'stay' ? (diffDays === 1 ? 'nuit' : 'nuits') : (diffDays === 1 ? 'jour' : 'jours');

  if (!property && id) return <div className="p-20 text-center font-black">Élément non trouvé sur Reserva Africa.</div>;

  const displayProperty = property || { id: 0, title: 'Service', image: '', location: '', rating: 0, reviews: 0, price: '0 F', rawPrice: 0 };

  const basePrice = (displayProperty.rawPrice * diffDays);
  const serviceFee = Math.round(basePrice * (systemSettings.serviceFeeRate / 100));
  const grandTotal = basePrice + serviceFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div>
            <Link to={-1 as any} className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-6 hover:text-black dark:hover:text-white transition-colors">
               <span className="material-symbols-outlined text-sm">arrow_back</span> Retour aux détails
            </Link>
            <h1 className="text-3xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tighter">Vérification & Réservation</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Confirmez vos dates pour votre séjour chez Reserva Africa</p>
          </div>

          <section className="border-b border-gray-100 dark:border-gray-800 pb-12">
            <h2 className="text-xl font-black mb-8 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Période du séjour</h2>
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block ml-1 tracking-widest">Arrivée (Check-in)</label>
                        <input type="date" value={startDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent font-black text-lg outline-none cursor-pointer" />
                    </div>
                    <div className="p-5 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block ml-1 tracking-widest">Départ (Check-out)</label>
                        <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-transparent font-black text-lg outline-none cursor-pointer" />
                    </div>
                </div>
                {!isAvailable && (
                    <div className="p-4 bg-red-50 text-red-700 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 animate-reveal border border-red-100">
                        <span className="material-symbols-outlined text-lg">error</span>
                        Dates indisponibles pour cet établissement.
                    </div>
                )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black mb-8 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Vos Informations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800 font-bold text-sm outline-none focus:border-primary transition-all" placeholder="Prénom de l'occupant principal" type="text" />
              <input className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800 font-bold text-sm outline-none focus:border-primary transition-all" placeholder="Nom de famille" type="text" />
              <input className="w-full md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800 font-bold text-sm outline-none focus:border-primary transition-all" placeholder="Téléphone de contact" type="tel" />
            </div>
          </section>

          <div className="pt-6">
            <Link to={isAvailable ? `/booking/payment?id=${displayProperty.id}&type=${type}&checkin=${startDate}&checkout=${endDate}` : '#'} className={`inline-block w-full md:w-auto min-w-[350px] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl py-6 px-12 text-center transition-all shadow-2xl ${isAvailable ? 'bg-primary hover:bg-[#d65a1f] shadow-primary/20 active:scale-95' : 'bg-gray-200 cursor-not-allowed text-gray-400 opacity-50'}`}>
                {isAvailable ? 'Continuer vers le paiement' : 'Dates déjà réservées'}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] border border-gray-100 dark:border-gray-800 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden animate-reveal">
            <div className="p-8 md:p-10 flex gap-6 border-b border-gray-100 dark:border-gray-800">
              <div className="size-28 rounded-[24px] bg-gray-200 bg-cover bg-center shrink-0 shadow-lg" style={{backgroundImage: `url("${displayProperty.image}")`}}></div>
              <div className="flex flex-col justify-center overflow-hidden">
                <span className="text-[9px] text-primary uppercase font-black tracking-[0.3em] mb-2 truncate">{displayProperty.location}</span>
                <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight mb-3 truncate">{displayProperty.title}</h3>
                <div className="flex items-center gap-2 text-xs font-black">
                    <span className="material-symbols-outlined text-yellow-500 text-sm icon-filled">star</span> 
                    {displayProperty.rating} 
                    <span className="text-gray-400 ml-1">({displayProperty.reviews} avis)</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-2 opacity-40">Récapitulatif financier</h4>
              <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-400">
                <span>{displayProperty.rawPrice.toLocaleString()} F x {diffDays} {unitLabel}</span>
                <span className="text-gray-900 dark:text-white">{basePrice.toLocaleString()} F</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-400">
                <span>Frais de service (Gestion & Support)</span>
                <span className="text-gray-900 dark:text-white">{serviceFee.toLocaleString()} F</span>
              </div>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
              <div className="flex justify-between items-center">
                  <span className="font-black text-2xl text-gray-900 dark:text-white tracking-tighter">Total (Net)</span>
                  <div className="text-right">
                      <span className="text-4xl font-black text-primary tracking-tighter">{grandTotal.toLocaleString()} F</span>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Devise : FCFA</p>
                  </div>
              </div>
            </div>
            
            <div className="bg-primary/5 p-8 flex items-center gap-5">
                <div className="size-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-primary shadow-sm"><span className="material-symbols-outlined">security</span></div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Paiement Sécurisé</p>
                   <p className="text-[9px] text-gray-500 font-bold leading-relaxed">Vos fonds sont séquestrés jusqu'à 24h après votre check-in pour votre sécurité.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;