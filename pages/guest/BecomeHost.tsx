import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BecomeHost: React.FC = () => {
  const [earnings, setEarnings] = useState(250000);
  const [nights, setNights] = useState(10);
  const { user, upgradeToHost, siteAssets } = useApp();
  const navigate = useNavigate();

  const handleBecomeHost = () => {
      upgradeToHost();
      navigate('/host/dashboard');
  };

  return (
    <div className="font-display">
      {/* Hero - Uses dynamic asset become_host_hero */}
      <div className="relative h-[600px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
            <img src={siteAssets?.become_host_hero?.url || "https://images.unsplash.com/photo-1556912173-3db4d6be6816?auto=format&fit=crop&w=2000&q=80"} className="w-full h-full object-cover brightness-50" alt="Host Home" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-6">Transformez votre espace en revenus</h1>
            <p className="text-xl md:text-2xl font-medium mb-8 text-white/90">Rejoignez des milliers d'hôtes en Afrique de l'Ouest qui gagnent de l'argent en partageant leur passion.</p>
            
            {user ? (
                <button onClick={handleBecomeHost} className="bg-primary hover:bg-[#d65a1f] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105 inline-block">
                    Activer mon compte hôte
                </button>
            ) : (
                <Link to="/register" className="bg-primary hover:bg-[#d65a1f] text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105 inline-block">
                    Commencer maintenant
                </Link>
            )}
        </div>
      </div>

      {/* Calculator */}
      <div className="py-20 px-4 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 w-full">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Estimez vos revenus</h2>
                  
                  <div className="mb-8">
                      <label className="text-lg font-bold text-gray-700 dark:text-gray-300 block mb-4">Nuitées par mois : <span className="text-primary text-2xl ml-2">{nights}</span></label>
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        value={nights} 
                        onChange={(e) => {
                            setNights(Number(e.target.value));
                            setEarnings(Number(e.target.value) * 25000); // 25k avg price
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                      />
                  </div>

                  <div className="mb-2">
                      <span className="text-5xl font-black text-gray-900 dark:text-white">{earnings.toLocaleString()} F</span>
                      <span className="text-gray-500 text-lg font-bold ml-2">/ mois</span>
                  </div>
                  <p className="text-sm text-gray-500">*Basé sur une estimation de 25 000 F par nuit pour un logement entier à Lomé.</p>
              </div>
              <div className="flex-1 w-full bg-primary/5 p-8 rounded-3xl border border-primary/10">
                  <h3 className="text-xl font-bold mb-4 text-primary">Pourquoi héberger ?</h3>
                  <ul className="space-y-4">
                      <li className="flex gap-3">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <span className="font-medium dark:text-gray-300">Paiements sécurisés via Mobile Money & Virement</span>
                      </li>
                      <li className="flex gap-3">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <span className="font-medium dark:text-gray-300">Contrôle total sur votre calendrier</span>
                      </li>
                      <li className="flex gap-3">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <span className="font-medium dark:text-gray-300">Support local 24/7 en cas de besoin</span>
                      </li>
                      <li className="flex gap-3">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <span className="font-medium dark:text-gray-300">Assurance protection hôte incluse</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* Steps */}
      <div className="bg-gray-50 dark:bg-[#1e293b] py-20 px-4">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black text-center mb-16 text-gray-900 dark:text-white">Comment ça marche ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center px-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary border border-gray-100 dark:border-gray-700">
                          <span className="material-symbols-outlined text-3xl">add_business</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 dark:text-white">1. Publiez votre annonce</h3>
                      <p className="text-gray-500">Créez votre annonce gratuitement. Décrivez votre logement, ajoutez des photos et fixez votre prix.</p>
                  </div>
                  <div className="text-center px-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary border border-gray-100 dark:border-gray-700">
                          <span className="material-symbols-outlined text-3xl">check_circle</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 dark:text-white">2. Accueillez vos voyageurs</h3>
                      <p className="text-gray-500">Communiquez avec les voyageurs via notre messagerie et gerez vos réservations facilement.</p>
                  </div>
                  <div className="text-center px-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary border border-gray-100 dark:border-gray-700">
                          <span className="material-symbols-outlined text-3xl">payments</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 dark:text-white">3. Recevez vos paiements</h3>
                      <p className="text-gray-500">Les paiements sont envoyés automatiquement 24h après l'arrivée des voyageurs.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 text-center">
          <h2 className="text-3xl font-black mb-6 text-gray-900 dark:text-white">Prêt à devenir hôte ?</h2>
          {user ? (
              <button onClick={handleBecomeHost} className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg hover:opacity-80 transition-opacity">
                  Activer mon compte hôte
              </button>
          ) : (
              <Link to="/register" className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg hover:opacity-80 transition-opacity">
                  Créer mon compte hôte
              </Link>
          )}
      </div>
    </div>
  );
};

export default BecomeHost;