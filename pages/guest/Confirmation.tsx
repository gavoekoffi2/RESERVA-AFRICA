import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Confirmation: React.FC = () => {
  const { addBooking } = useApp();
  const [searchParams] = useSearchParams();
  // In a real app, these would come from state management/location state passed from Payment
  
  useEffect(() => {
      // Simulate adding a booking upon successful payment/confirmation page load
      // Ideally check if not already added to avoid duplicates on refresh
      addBooking({
          id: `RES-${Math.floor(Math.random() * 10000)}`,
          title: 'Toyota Rav4 2021', // Dynamic based on flow
          location: 'Dakar, Sénégal',
          dates: '12 Oct - 15 Oct 2023',
          image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80',
          price: '110 000 FCFA',
          status: 'Confirmé',
          type: 'car'
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
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
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <p className="text-sm text-gray-500 uppercase">Référence</p>
            <p className="text-xl font-bold">#DKR-2024-88A</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Payé & Confirmé</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Toyota Rav4 2021</h3>
            <p className="text-gray-500">Dakar, Sénégal</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total payé</p>
            <p className="text-2xl font-bold text-primary">110 000 FCFA</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg font-bold text-gray-800 dark:text-white transition-colors">
            Retour à l'accueil
          </Link>
          <Link to="/account/bookings" className="px-6 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
            Voir mes réservations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;