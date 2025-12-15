import React from 'react';

const Messages: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm" placeholder="Rechercher..." />
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="p-4 border-l-4 border-primary bg-primary/5 cursor-pointer">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-sm text-gray-900 dark:text-white">Jean-Pierre K.</span>
              <span className="text-xs text-gray-500">10:30</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Bonjour ! Oui, nous pouvons organiser...</p>
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-sm text-gray-900 dark:text-white">Fatou D.</span>
              <span className="text-xs text-gray-500">Hier</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Merci beaucoup !</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#101622]">
        <div className="p-4 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 dark:text-white">Jean-Pierre K.</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Arrive demain</span>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="bg-white dark:bg-[#1e293b] p-3 rounded-r-xl rounded-bl-xl shadow-sm max-w-[80%]">
              <p className="text-sm text-gray-800 dark:text-gray-200">Bonjour ! Est-ce qu'il y a un service de navette ?</p>
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <div className="bg-primary text-white p-3 rounded-l-xl rounded-br-xl shadow-sm max-w-[80%]">
              <p className="text-sm">Bonjour ! Oui, tout à fait. Le tarif est de 15 000 FCFA.</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary" placeholder="Écrivez votre message..." />
            <button className="p-2 bg-primary text-white rounded-lg">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;