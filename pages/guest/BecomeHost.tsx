import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BecomeHost: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const handleStartListing = () => {
      if (!user) {
          navigate('/register?redirect=/host/properties/add');
      } else {
          navigate('/host/properties/add');
      }
  };

  return (
    <div className="font-display bg-white dark:bg-[#0a0f18] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover animate-ken-burns scale-110" alt="Prestige House" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-[1440px] mx-auto px-10 md:px-20 w-full">
              <div className="max-w-3xl text-white animate-reveal">
                  <h2 className="text-primary font-black uppercase tracking-[0.4em] mb-6 drop-shadow-lg">Opportunité Hôte</h2>
                  <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter drop-shadow-2xl">Faites fructifier <br/><span className="text-primary italic">vos actifs.</span></h1>
                  <p className="text-xl md:text-3xl font-bold mb-16 text-white/90 leading-relaxed max-w-2xl drop-shadow-lg">Rejoignez la révolution de l'hospitalité en Afrique. Villas, véhicules ou expériences : tout se loue sur Reseva Africa.</p>
                  <button 
                    onClick={handleStartListing}
                    className="bg-primary hover:bg-primary-dark text-white px-16 py-8 rounded-[40px] font-black text-2xl uppercase tracking-[0.1em] shadow-[0_30px_70px_rgba(238,108,43,0.4)] transition-all btn-active-scale"
                  >
                      Démarrer le setup
                  </button>
              </div>
          </div>
          
          {/* Bottom badge */}
          <div className="absolute bottom-12 left-10 md:left-20 flex items-center gap-6 text-white/70 animate-reveal" style={{animationDelay: '0.4s'}}>
              <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => <div key={i} className="size-12 rounded-full border-4 border-black bg-gray-500 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Hote" /></div>)}
              </div>
              <p className="text-sm font-black uppercase tracking-widest">+2,500 hôtes nous font confiance</p>
          </div>
      </section>

      {/* Why Reseva Section */}
      <section className="py-40 px-10 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-32 items-center">
              <div className="flex-1 space-y-16">
                  <h2 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]">Pourquoi <br/><span className="text-primary">Reseva Africa ?</span></h2>
                  
                  <div className="space-y-14">
                      <div className="flex gap-8 group">
                          <div className="size-20 rounded-[32px] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <span className="material-symbols-outlined text-4xl">verified_user</span>
                          </div>
                          <div>
                              <h3 className="text-2xl font-black mb-3">Sécurité maximale</h3>
                              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Vérification d'identité stricte pour chaque utilisateur. Dormez sur vos deux oreilles.</p>
                          </div>
                      </div>
                      <div className="flex gap-8 group">
                          <div className="size-20 rounded-[32px] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <span className="material-symbols-outlined text-4xl">payments</span>
                          </div>
                          <div>
                              <h3 className="text-2xl font-black mb-3">Revenus optimisés</h3>
                              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Tarification dynamique et visibilité globale pour maximiser votre rendement.</p>
                          </div>
                      </div>
                      <div className="flex gap-8 group">
                          <div className="size-20 rounded-[32px] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <span className="material-symbols-outlined text-4xl">support_agent</span>
                          </div>
                          <div>
                              <h3 className="text-2xl font-black mb-3">Accompagnement 24/7</h3>
                              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Une équipe locale dédiée pour vous assister dans chaque étape de votre succès.</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex-1 relative group">
                  <div className="absolute -inset-8 bg-primary/10 rounded-[80px] -rotate-3 transition-transform group-hover:rotate-0 duration-1000"></div>
                  <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" className="relative rounded-[70px] shadow-2xl border-8 border-white dark:border-gray-800" alt="Host Success" />
                  <div className="absolute -bottom-10 -right-10 bg-white dark:bg-[#1a202c] p-8 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 animate-float">
                      <p className="text-primary font-black text-4xl mb-1">+450k F</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Revenu moyen / mois</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Airbnb Style Large Graphic Section */}
      <section className="bg-black py-40">
          <div className="max-w-[1440px] mx-auto px-10 text-center">
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-32 leading-none">C'est simple. <br/> C'est rentable.</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
                  {/* Decorative line */}
                  <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  
                  <div className="flex flex-col items-center group">
                      <div className="size-32 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center mb-10 transition-all duration-700 group-hover:border-primary group-hover:scale-110">
                          <span className="font-black text-5xl text-white">1</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-6">Setup</h3>
                      <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">Configurez votre annonce en quelques minutes avec notre wizard intuitif.</p>
                  </div>
                  <div className="flex flex-col items-center group">
                      <div className="size-32 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center mb-10 transition-all duration-700 group-hover:border-primary group-hover:scale-110">
                          <span className="font-black text-5xl text-white">2</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-6">Validation</h3>
                      <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">Recevez et acceptez des demandes de voyageurs ou conducteurs vérifiés.</p>
                  </div>
                  <div className="flex flex-col items-center group">
                      <div className="size-32 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center mb-10 transition-all duration-700 group-hover:border-primary group-hover:scale-110">
                          <span className="font-black text-5xl text-white">3</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-6">Encaissement</h3>
                      <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">Vos fonds sont versés automatiquement dès le début de la prestation.</p>
                  </div>
              </div>
              
              <button 
                onClick={handleStartListing}
                className="mt-32 bg-white text-black px-20 py-8 rounded-[40px] font-black text-2xl uppercase tracking-widest shadow-2xl transition-all btn-active-scale hover:bg-primary hover:text-white"
              >
                  Lancer mon activité
              </button>
          </div>
      </section>

      {/* Fee Section */}
      <section className="py-40 px-10">
          <div className="max-w-6xl mx-auto bg-primary rounded-[80px] p-20 md:p-32 text-center text-white relative overflow-hidden shadow-[0_60px_100px_rgba(238,108,43,0.3)]">
              <div className="relative z-10">
                  <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">Pas d'abonnement. <br/> Pas de frais cachés.</h2>
                  <p className="text-2xl md:text-4xl font-bold mb-14 opacity-90 leading-tight">Nous prélevons une commission fixe de 15% <br className="hidden lg:block"/> uniquement lorsque vous gagnez de l'argent.</p>
                  <div className="flex justify-center items-center gap-10">
                      <div className="text-left border-l-4 border-white/30 pl-8">
                          <p className="text-4xl font-black">15%</p>
                          <p className="text-xs font-black uppercase tracking-widest opacity-60">Service Reseva</p>
                      </div>
                      <div className="text-left border-l-4 border-white/30 pl-8">
                          <p className="text-4xl font-black">85%</p>
                          <p className="text-xs font-black uppercase tracking-widest opacity-60">Pour Vous</p>
                      </div>
                  </div>
              </div>
              <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 size-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
      </section>
    </div>
  );
};

export default BecomeHost;