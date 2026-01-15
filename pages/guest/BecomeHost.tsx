import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BecomeHost: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const handleStartListing = () => {
    if (!user) {
      navigate('/register?redirect=/host/setup');
    } else {
      navigate('/host/setup');
    }
  };

  return (
    <div className="font-display bg-white dark:bg-[#0a0f18] min-h-screen">
      {/* Hero Section - Refined Proportions */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover animate-ken-burns scale-110" alt="Reseva House" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl text-white animate-reveal">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] mb-4 text-xs md:text-sm">Opportunité Hôte</h2>
            {/* Title size reduced for better readability and UI fit */}
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
              Faites fructifier <br/><span className="text-primary italic">votre patrimoine.</span>
            </h1>
            <p className="text-base md:text-xl font-bold mb-10 text-white/90 leading-relaxed max-w-lg drop-shadow-lg">
              Rejoignez les meilleurs hôtes du continent. Villas, véhicules ou safaris : créez votre annonce en moins de 10 minutes.
            </p>
            <div className="flex">
              <button 
                onClick={handleStartListing}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-[24px] font-black text-lg uppercase tracking-[0.1em] shadow-[0_15px_40px_rgba(238,108,43,0.4)] transition-all btn-active-scale flex items-center gap-3"
              >
                Lancer mon setup <span className="material-symbols-outlined font-black">rocket_launch</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Trust badge */}
        <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4 text-white/60 animate-reveal" style={{animationDelay: '0.4s'}}>
          <div className="flex -space-x-3">
            {[1,2,3].map(i => <div key={i} className="size-9 rounded-full border-2 border-black bg-gray-500 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Hote" /></div>)}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest">+2,500 propriétaires nous font confiance</p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
              <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-black mb-3">Vérification Totale</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Chaque utilisateur est vérifié par nos soins pour garantir votre sécurité.</p>
          </div>
          <div className="flex flex-col items-center text-center">
              <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h3 className="text-xl font-black mb-3">Paiements Automatisés</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Recevez vos fonds dès le début du séjour via Mobile Money ou Virement.</p>
          </div>
          <div className="flex flex-col items-center text-center">
              <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h3 className="text-xl font-black mb-3">Accompagnement 24/7</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">Une équipe locale dédiée pour maximiser vos réservations et vos gains.</p>
          </div>
      </section>

      {/* Modern Fee Banner */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Une commission fixe de 15%.</h2>
              <p className="text-lg text-gray-500 font-bold uppercase tracking-widest mb-10">Pas d'abonnement. Pas de frais cachés.</p>
              <div className="flex justify-center gap-4">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-700 min-w-[200px]">
                      <p className="text-primary font-black text-4xl mb-1">85%</p>
                      <p className="text-[10px] font-black uppercase text-gray-400">Pour Vous</p>
                  </div>
                  <div className="bg-primary text-white p-8 rounded-[40px] shadow-xl shadow-primary/20 min-w-[200px]">
                      <p className="font-black text-4xl mb-1">15%</p>
                      <p className="text-[10px] font-black uppercase opacity-60">Service Reseva</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default BecomeHost;