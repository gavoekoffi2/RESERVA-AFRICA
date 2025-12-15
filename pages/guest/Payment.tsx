import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment: React.FC = () => {
  const [method, setMethod] = useState<'mobile' | 'card' | 'paypal'>('mobile');

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8">
      <div className="flex flex-col gap-8">
        <div className="max-w-[800px] mx-auto w-full">
          <div className="flex gap-6 justify-between items-end mb-3">
            <p className="font-medium">Étape 2 sur 3</p>
          </div>
          <div className="rounded-full bg-[#e7d7cf] h-2 w-full overflow-hidden">
            <div className="h-full bg-primary w-2/3"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h1 className="text-3xl font-black">Sécurisez votre réservation</h1>
            
            <div className="flex flex-col gap-4">
              <label className="font-bold text-sm uppercase">Mode de paiement</label>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setMethod('mobile')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${method === 'mobile' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined text-3xl">smartphone</span>
                  <span className="text-sm font-bold">Mobile Money</span>
                </button>
                <button 
                  onClick={() => setMethod('card')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${method === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined text-3xl">credit_card</span>
                  <span className="text-sm font-bold">Carte Bancaire</span>
                </button>
                <button 
                  onClick={() => setMethod('paypal')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${method === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                  <span className="text-sm font-bold">PayPal</span>
                </button>
              </div>
            </div>

            {method === 'mobile' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#2a1d17] border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold mb-4">Détails Mobile Money</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="py-2 px-3 border rounded-lg text-center cursor-pointer border-primary bg-primary/10 text-primary font-bold">MTN</div>
                  <div className="py-2 px-3 border rounded-lg text-center cursor-pointer border-gray-200">Orange</div>
                  <div className="py-2 px-3 border rounded-lg text-center cursor-pointer border-gray-200">Wave</div>
                </div>
                <label className="block mb-2 text-sm font-semibold">Numéro de téléphone</label>
                <input type="tel" placeholder="01 23 45 67 89" className="w-full p-3 rounded-lg border border-gray-200 dark:bg-gray-800" />
              </div>
            )}

            <div className="p-4 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600">lock</span>
              <p className="text-sm text-green-800">Paiement sécurisé par SSL.</p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a202c] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
              <div className="flex justify-between items-center mb-4">
                <span>Total à payer</span>
                <span className="text-2xl font-black text-primary">110 000 CFA</span>
              </div>
              <Link to="/booking/confirmation" className="block w-full py-4 bg-primary hover:bg-[#d65a1f] text-white text-center font-bold rounded-xl shadow-lg transition-all">
                Payer 110 000 CFA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;