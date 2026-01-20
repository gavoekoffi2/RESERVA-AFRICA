import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, allUsers, addNotification } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
        const foundUser = allUsers.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );

        if (foundUser) {
            login(foundUser);
            setIsLoading(false);
            if (foundUser.role === 'SUPER_ADMIN' || foundUser.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (foundUser.role === 'HOST') {
                navigate('/host/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setIsLoading(false);
            addNotification('error', 'Identifiants incorrects. Veuillez réessayer.');
        }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-[#0a0f18] font-display">
      <Link to="/" className="mb-10 flex items-center gap-2 group transition-all">
        <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">travel_explore</span>
        </div>
        <span className="text-2xl font-black italic text-gray-900 dark:text-white">Reserva <span className="text-primary not-italic">Africa.</span></span>
      </Link>

      <div className="w-full max-w-[480px] bg-white dark:bg-[#1a202c] p-8 md:p-12 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Bon retour parmi nous</h1>
        <p className="text-gray-500 font-medium mb-10">Connectez-vous pour gérer vos réservations et vos annonces.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse e-mail</label>
            <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
                placeholder="nom@exemple.com" 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mot de passe</label>
              <Link to="/forgot-password" text-none className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Oublié ?</Link>
            </div>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-all font-bold" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-16 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all btn-active-scale uppercase tracking-widest text-sm flex items-center justify-center gap-3"
          >
            {isLoading ? <span className="size-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span> : 'Se connecter'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 font-medium">
                Pas encore de compte ? <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">Inscrivez-vous gratuitement</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;