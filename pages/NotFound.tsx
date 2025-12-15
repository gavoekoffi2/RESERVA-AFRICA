import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
        <span className="material-symbols-outlined text-6xl text-gray-400">explore_off</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">Oups ! Cette page n'existe pas.</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Il semble que vous ayez pris un chemin de traverse. La page que vous recherchez a peut-être été déplacée ou supprimée.
      </p>
      <Link to="/" className="bg-primary hover:bg-[#d65a1f] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2">
        <span className="material-symbols-outlined">home</span> Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;