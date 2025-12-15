import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const BookingDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'car'; // 'stay', 'car', 'attraction'

  const renderSummaryCard = () => {
    switch (type) {
      case 'stay':
        return (
          <>
            <div className="p-6 flex gap-4 border-b border-gray-100 dark:border-gray-800">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80" className="w-24 h-24 rounded-lg object-cover" alt="Stay" />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-500 uppercase font-bold">Hébergement</p>
                <h3 className="font-bold leading-tight mb-1">Terrou-Bi Resort</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="material-symbols-outlined text-primary text-sm">star</span> 4.9 (230 avis)
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Détails du prix</h4>
              <div className="flex justify-between">
                <span>185 000 x 3 nuits</span>
                <span>555 000 FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de ménage</span>
                <span>10 000 FCFA</span>
              </div>
               <div className="flex justify-between">
                <span>Frais de service</span>
                <span>15 000 FCFA</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700 my-2" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">580 000 FCFA</span>
              </div>
            </div>
          </>
        );
      case 'attraction':
        return (
          <>
            <div className="p-6 flex gap-4 border-b border-gray-100 dark:border-gray-800">
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=80" className="w-24 h-24 rounded-lg object-cover" alt="Activity" />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-500 uppercase font-bold">Activité</p>
                <h3 className="font-bold leading-tight mb-1">Cascades de Kpalimé</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="material-symbols-outlined text-primary text-sm">star</span> 4.8 (105 avis)
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Détails du prix</h4>
              <div className="flex justify-between">
                <span>25 000 x 2 personnes</span>
                <span>50 000 FCFA</span>
              </div>
               <div className="flex justify-between">
                <span>Frais de service</span>
                <span>2 000 FCFA</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700 my-2" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">52 000 FCFA</span>
              </div>
            </div>
          </>
        );
      default: // 'car'
        return (
          <>
            <div className="p-6 flex gap-4 border-b border-gray-100 dark:border-gray-800">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80" className="w-24 h-24 rounded-lg object-cover" alt="Car" />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-500 uppercase font-bold">Voiture</p>
                <h3 className="font-bold leading-tight mb-1">Toyota Rav4 2021</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="material-symbols-outlined text-primary text-sm">star</span> 4.8
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Détails du prix</h4>
              <div className="flex justify-between">
                <span>35 000 x 3 jours</span>
                <span>105 000 FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de service</span>
                <span>5 000 FCFA</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700 my-2" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">110 000 FCFA</span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <Link to={-1 as any} className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 hover:text-black">
               <span className="material-symbols-outlined text-sm">arrow_back</span> Retour
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Demande de réservation</h1>
            <p className="text-gray-500">Étape 1 sur 3 · Aucun montant débité pour l'instant</p>
          </div>

          <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h2 className="text-xl font-bold mb-6">Votre voyage</h2>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-semibold">Dates</h3>
                <p className="text-gray-500 mt-1">12 Oct - 15 Oct</p>
              </div>
              <button className="underline font-semibold text-sm hover:text-primary">Modifier</button>
            </div>
            {type === 'car' && (
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="font-semibold">Lieu de prise en charge</h3>
                        <p className="text-gray-500 mt-1">Aéroport AIBD, Dakar</p>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Voyageurs</h3>
                <p className="text-gray-500 mt-1">2 adultes</p>
              </div>
              <button className="underline font-semibold text-sm hover:text-primary">Modifier</button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Détails du {type === 'car' ? 'conducteur' : 'voyageur'}</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3" placeholder="Prénom" type="text" />
              <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3" placeholder="Nom" type="text" />
              <div className="col-span-1 md:col-span-2">
                <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3" placeholder="Email" type="email" />
              </div>
              <div className="col-span-1 md:col-span-2">
                 <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-3" placeholder="Numéro de téléphone" type="tel" />
              </div>
            </form>
          </section>

          <div className="pt-6">
            <Link to="/booking/payment" className="inline-block w-full md:w-auto min-w-[300px] bg-primary hover:bg-[#d65a1f] text-white font-bold text-lg rounded-xl py-4 px-8 text-center transition-all">
              Continuer vers le paiement
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
            {renderSummaryCard()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;