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
      {/* Hero Section - Optimized for visibility */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover animate-ken-burns scale-110" alt="Prestige House" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 w-full py-20">
          <div className="max-w-3xl text-white animate-reveal">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] mb-4 drop-shadow-lg text-sm md:text-base">Opportunité Hôte</h2>
            {/* Reduced font size slightly to prevent overflow */}
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1] tracking-tighter drop-shadow-2xl">
              Faites fructifier <br/><span className="text-primary italic">vos actifs.</span>
            </h1>
            <p className="text-lg md:text-2xl font-bold mb-12 text-white/90 leading-relaxed max-w-xl drop-shadow-lg">
              Rejoignez la révolution de l'hospitalité en Afrique. Villas, véhicules ou expériences : listez vos biens en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleStartListing}
                className="bg-primary hover:bg-primary-dark text-white px-12 py-6 rounded-[32px] font-black text-xl uppercase tracking-[0.1em] shadow-[0_20px_50px_rgba(238,108,43,0.4)] transition-all btn-active-scale flex items-center justify-center gap-3"
              >
                Commencer le setup <span className="material-symbols-outlined font-black">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom badge */}
        <div className="absolute bottom-10 left-6 md:left-20 flex items-center gap-4 text-white/70 animate-reveal" style={{animationDelay: '0.4s'}}>
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => <div key={i} className="size-10 rounded-full border-2 border-black bg-gray-500 overflow-hidden shadow-lg"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Hote" /></div>)}
          </div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">+2,500 hôtes déjà inscrits</p>
        </div>
      </section>

      {/* Steps Section - Airbnb Style */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Comment ça marche ?</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Trois étapes pour lancer votre activité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center group">
            <div className="size-24 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-8 border-2 border-gray-100 dark:border-gray-700 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary">draw</span>
            </div>
            <h3 className="text-2xl font-black mb-4">1. Créez votre annonce</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Utilisez notre wizard intuitif pour ajouter des photos, fixer votre prix et décrire votre offre en moins de 10 minutes.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="size-24 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-8 border-2 border-gray-100 dark:border-gray-700 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary">verified_user</span>
            </div>
            <h3 className="text-2xl font-black mb-4">2. Faites-vous vérifier</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">La sécurité est notre priorité. Une vérification d'identité rapide est nécessaire avant que votre annonce ne soit publiée.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="size-24 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-8 border-2 border-gray-100 dark:border-gray-700 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary">payments</span>
            </div>
            <h3 className="text-2xl font-black mb-4">3. Encaissez vos revenus</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Recevez vos paiements automatiquement sur votre compte bancaire ou Mobile Money dès le début du séjour.</p>
          </div>
        </div>
      </section>

      {/* Professional Graphic Section */}
      <section className="bg-black py-32 rounded-[60px] mx-6 mb-32 overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-white text-center lg:text-left relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">Prêt à accueillir votre premier voyageur ?</h2>
            <p className="text-xl text-gray-400 mb-12 font-medium">Rejoignez une communauté d'hôtes passionnés et commencez à générer des revenus dès aujourd'hui.</p>
            <button 
              onClick={handleStartListing}
              className="bg-white text-black hover:bg-primary hover:text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all btn-active-scale shadow-2xl"
            >
              Lancer mon annonce
            </button>
          </div>
          <div className="flex-1 relative group lg:block hidden">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" 
              className="rounded-[40px] shadow-2xl border-4 border-white/10 group-hover:scale-105 transition-transform duration-700 relative z-10" 
              alt="Listing Preview" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeHost;