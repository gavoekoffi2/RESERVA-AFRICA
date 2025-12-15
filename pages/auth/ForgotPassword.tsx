import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-white dark:bg-[#101622]">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Mot de passe oublié ?</h1>
          <p className="text-gray-500 dark:text-gray-400">Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        </div>

        <form className="flex flex-col gap-5 mt-2 bg-white dark:bg-[#1a202c] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Adresse e-mail</span>
            <input className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="exemple@email.com" type="email" />
          </label>
          <button className="w-full h-12 mt-2 bg-primary hover:bg-[#d65a1f] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
            Envoyer le lien
          </button>
        </form>

        <div className="text-center">
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Retour à la connexion
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;