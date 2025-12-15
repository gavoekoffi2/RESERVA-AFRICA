import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for regular user
    login({
        name: 'Jean Dupont',
        email: email || 'jean.dupont@email.com',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200',
        role: 'GUEST',
        status: 'Active'
    });
    navigate(-1); 
  };

  const handleAdminLogin = () => {
      login({
          name: 'Super Admin',
          email: 'admin@reseva.africa',
          avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff',
          role: 'ADMIN',
          status: 'Active'
      });
      navigate('/admin/dashboard');
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-white dark:bg-[#101622]">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Bienvenue sur Reseva Africa</h1>
          <p className="text-gray-500 dark:text-gray-400">Planifiez votre prochaine aventure en toute simplicité.</p>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-8 justify-center">
            <button className="pb-3 border-b-[3px] border-primary text-gray-900 dark:text-white font-bold text-sm tracking-wide">
              Connexion
            </button>
            <Link to="/register" className="pb-3 border-b-[3px] border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold text-sm tracking-wide transition-colors">
              Inscription
            </Link>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Adresse e-mail</span>
            <input 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                placeholder="exemple@email.com" 
                type="email" 
            />
          </label>
          <label className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Mot de passe</span>
              <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">Mot de passe oublié ?</Link>
            </div>
            <div className="relative flex items-center">
              <input 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                placeholder="Entrez votre mot de passe" 
                type="password" 
              />
              <button type="button" className="absolute right-0 top-0 bottom-0 px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </label>
          <button type="submit" className="w-full h-12 mt-2 bg-primary hover:bg-[#d65a1f] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
            Se connecter
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Ou continuer avec</span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-700 dark:text-gray-200">
            <span>Google</span>
          </button>
          <button className="flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-700 dark:text-gray-200">
            <span>Facebook</span>
          </button>
        </div>

        {/* Demo Admin Login */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-400 mb-2 uppercase">Démo Accès</p>
            <button onClick={handleAdminLogin} className="text-xs font-bold text-gray-500 hover:text-primary underline">
                Connexion Administrateur
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;