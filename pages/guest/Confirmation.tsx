import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp, Booking } from '../../context/AppContext';

const Confirmation: React.FC = () => {
  const { bookings } = useApp();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<Booking | undefined>(undefined);

  useEffect(() => {
      if (bookingId) {
          const found = bookings.find(b => b.id === bookingId);
          setBooking(found);
      }
  }, [bookingId, bookings]);

  if (!bookingId) {
      return <div className="p-20 text-center">Identifiant de réservation manquant.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-display">
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600 animate-fade-up">
          <span className="material-symbols-outlined text-[48px]">check_circle</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Merci !<br/><span className="text-primary">Votre réservation est confirmée.</span></h1>
        <p className="text-gray-600 max-w-2xl">
          Un email de confirmation a été envoyé à votre adresse.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <p className="text-sm text-gray-500 uppercase font-bold">Référence</p>
            <p className="text-xl font-black text-gray-900 dark:text-white">#{bookingId}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Payé & Confirmé</span>
        </div>
        
        {booking ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{booking.title}</h3>
                <p className="text-gray-500">{booking.location}</p>
                <div className="mt-2 text-sm font-medium bg-gray-50 dark:bg-gray-800 p-2 rounded-lg inline-block">
                    {booking.dates}
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500">Total payé</p>
                <p className="text-2xl font-black text-primary">{booking.price}</p>
            </div>
            </div>
        ) : (
            <div className="text-center py-4 text-gray-500">
                Chargement des détails de la réservation... <br/>
                <span className="text-xs">(Si cela prend trop de temps, vérifiez vos réservations dans votre compte)</span>
            </div>
        )}

        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-bold text-gray-800 dark:text-white transition-colors">
            Retour à l'accueil
          </Link>
          <Link to="/account/bookings" className="px-6 py-3 bg-primary hover:bg-[#d65a1f] text-white rounded-lg font-bold transition-colors">
            Voir mes réservations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;