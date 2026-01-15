import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  
  const { registerUser, addNotification } = useApp();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateEmail(formData.email)) {
          addNotification('error', 'Veuillez saisir une adresse email valide.');
          return;
      }

      if (formData.password.length < 8) {
          addNotification('error', 'Le mot de passe doit contenir au moins 8 caractères.');
          return;
      }

      setIsLoading(true);
      setTimeout(() => {
          registerUser({
              id: `u-${Date.now()}`,
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              password: formData.password,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.firstName)}+${encodeURIComponent(formData.lastName)}&background=ee6c2b&color=fff`,
              role: 'GUEST',
              status: 'Active',
              joinDate: new Date().toLocaleDateString('fr-FR'),
              verificationStatus: 'unverified'
          });
          setIsLoading(false);
          addNotification('success', 'Bienvenue chez Reseva Africa !');
          navigate(redirectPath || '/');
      }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-[#0a0f18] font-display">
      <Link to="/" className="mb-10 flex items-center gap-2 group transition-all">
        <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">travel_explore</span>
        </div>
        <span className="text-2xl font-black italic text-gray-900 dark:text-white">Reseva <span className="text-primary not-italic">Africa.</span></span>
      </Link>

      <div className="w-full max-w-[520px] bg-white dark:bg-[#1a202c] p-8 md:p-12 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-800 animate-reveal">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Créer un compte</h1>
        <p className="text-gray-500 font-medium mb-10">Rejoignez la communauté de voyageurs Reseva.</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Prénom</label>
                <input 
                  required 
                  type="text" 
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                  className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
                  placeholder="Jean" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom</label>
                <input 
                  required 
                  type="text" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                  className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
                  placeholder="Dupont" 
                />
              </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse e-mail</label>
            <input 
                required 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
                placeholder="nom@exemple.com" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mot de passe sécurisé</label>
            <input 
              required 
              type="password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
              placeholder="Minimum 8 caractères" 
            />
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full h-16 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all btn-active-scale uppercase tracking-widest text-sm flex items-center justify-center gap-3">
            {isLoading ? <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : "S'inscrire"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 font-medium text-sm">
                Déjà inscrit ? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">Connectez-vous</Link>
            </p>
        </div>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8 leading-relaxed opacity-60">
            En continuant, vous acceptez nos <Link to="/legal/terms" className="text-gray-600 dark:text-gray-300 hover:underline">Conditions d'utilisation</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;