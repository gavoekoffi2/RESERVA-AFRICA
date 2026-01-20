import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const BecomeHost: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const handleStartListing = () => {
    if (!user) {
      navigate('/register?redirect=/become-a-host/apply');
    } else if (user.role === 'HOST' || user.role === 'SUPER_ADMIN') {
      navigate('/host/dashboard');
    } else {
      navigate('/become-a-host/apply');
    }
  };

  return (
    <div className="font-display bg-white dark:bg-[#0a0f18] min-h-screen">
      {/* Hero Section - Optimized proportions */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover animate-ken-burns scale-110" alt="Prestige House" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 w-full py-20">
          <div className="max-w-3xl text-white animate-reveal">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] mb-4 drop-shadow-lg text-xs md:text-sm">Opportunité Hôte</h2>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1] tracking-tighter drop-shadow-2xl">
              Faites fructifier <br/><span className="text-primary italic">vos actifs.</span>
            </h1>
            <p className="text-base md:text-xl font-bold mb-10 text-white/90 leading-relaxed max-w-xl drop-shadow-lg">
              Rejoignez la révolution de l'hospitalité en Afrique. Villas, véhicules ou safaris : listez vos biens en toute confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleStartListing}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-[24px] font-black text-lg uppercase tracking-[0.1em] shadow-[0_15px_40px_rgba(238,108,43,0.4)] transition-all btn-active-scale flex items-center justify-center gap-3"
              >
                {user?.verificationStatus === 'pending' ? 'Candidature en cours' : user?.role === 'HOST' ? 'Aller au Dashboard' : 'Commencer le projet'} 
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Trust Badge */}
        <div className="absolute bottom-8 left-6 md:left-20 flex items-center gap-4 text-white/70 animate-reveal" style={{animationDelay: '0.4s'}}>
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => <div key={i} className="size-9 rounded-full border-2 border-black bg-gray-500 overflow-hidden shadow-lg"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Hôte" /></div>)}
          </div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest">+2,500 hôtes déjà inscrits</p>
        </div>
      </section>

      {/* Steps Section - Professional and Airy */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Le processus de validation</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Exigences de sécurité Reserva Africa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group bg-gray-50 dark:bg-[#1a202c] p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">edit_document</span>
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">1. Posez votre candidature</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed">Remplissez notre formulaire professionnel en décrivant votre projet et fournissez une pièce d'identité.</p>
          </div>

          <div className="flex flex-col items-center text-center group bg-gray-50 dark:bg-[#1a202c] p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">2. Examen par l'administrateur</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed">Notre équipe étudie votre dossier sous 24h. Vous recevez une notification dès que vous êtes approuvé.</p>
          </div>

          <div className="flex flex-col items-center text-center group bg-gray-50 dark:bg-[#1a202c] p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
            <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">rocket_launch</span>
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">3. Publiez vos annonces</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed">Une fois hôte officiel, accédez à votre dashboard pour lister vos propriétés, véhicules ou activités.</p>
          </div>
        </div>
      </section>

      {/* Modern Fee Banner */}
      <section className="bg-gray-900 py-20 px-6 rounded-[60px] mx-6 mb-20 text-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Gagnez jusqu'à 85% du prix brut.</h2>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">Commission fixe de 15% pour le support et la maintenance.</p>
              <div className="flex justify-center items-center gap-8">
                  <div className="text-left border-l-2 border-primary pl-6">
                      <p className="text-primary font-black text-4xl">85%</p>
                      <p className="text-[10px] font-black uppercase text-gray-500">Pour Vous</p>
                  </div>
                  <div className="text-left border-l-2 border-white/20 pl-6">
                      <p className="font-black text-4xl">15%</p>
                      <p className="text-[10px] font-black uppercase text-gray-500">Service Fee</p>
                  </div>
              </div>
          </div>
          <div className="absolute top-0 right-0 size-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default BecomeHost;