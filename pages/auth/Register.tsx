import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login, addNotification } = useApp();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulation: Create User Session
      login({
          id: `u-${Date.now()}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`,
          role: 'GUEST',
          status: 'Active',
          joinDate: new Date().toLocaleDateString('fr-FR')
      });
      navigate('/');
  };

  const handleGoogleRegister = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
        login({
            id: 'g-' + Math.random().toString(36).substr(2, 9),
            name: 'Nouvel Utilisateur',
            email: 'user@gmail.com',
            avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
            role: 'GUEST',
            status: 'Active',
            joinDate: new Date().toLocaleDateString('fr-FR')
        });
        addNotification('success', 'Compte créé avec succès via Google');
        setIsGoogleLoading(false);
        navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-white dark:bg-[#101622] animate-reveal">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Créer un compte</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Rejoignez la communauté Reseva Africa dès aujourd'hui.</p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-8 justify-center">
            <Link to="/login" className="pb-3 border-b-[3px] border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold text-sm tracking-wide transition-all">
              Connexion
            </Link>
            <button className="pb-3 border-b-[3px] border-primary text-gray-900 dark:text-white font-black text-sm tracking-wide">
              Inscription
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {/* Google Sign Up Button */}
          <button 
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading}
            className="group flex h-14 items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c] hover:border-primary/30 transition-all-custom btn-active-scale shadow-sm relative overflow-hidden"
          >
            {isGoogleLoading ? (
              <span className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-black text-sm text-gray-700 dark:text-gray-200">S'inscrire avec Google</span>
              </>
            )}
          </button>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Ou via le formulaire</span>
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
               <label className="flex flex-col gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Prénom</span>
                  <input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full h-14 px-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold" placeholder="Jean" type="text" />
               </label>
               <label className="flex flex-col gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Nom</span>
                  <input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full h-14 px-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold" placeholder="Dupont" type="text" />
               </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Adresse e-mail</span>
              <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full h-14 px-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold" placeholder="exemple@email.com" type="email" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Mot de passe</span>
              <div className="relative flex items-center">
                <input required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full h-14 px-5 pr-14 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold" placeholder="••••••••" type="password" />
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Au moins 8 caractères</p>
            </label>
            
            <button type="submit" className="w-full h-14 mt-2 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all-custom btn-active-scale uppercase tracking-widest text-sm">
              S'inscrire
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 font-medium px-6">
            En continuant, vous acceptez nos <Link to="/legal/terms" className="text-primary font-bold hover:underline">Conditions d'Utilisation</Link> et notre <Link to="/legal/privacy" className="text-primary font-bold hover:underline">Politique de Confidentialité</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;