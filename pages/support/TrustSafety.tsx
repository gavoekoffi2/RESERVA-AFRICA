import React from 'react';
import { Link } from 'react-router-dom';

const TrustSafety: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#101622] pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4">
         <div className="text-center mb-16">
             <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="material-symbols-outlined text-4xl">shield</span>
             </div>
             <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Confiance et Sécurité</h1>
             <p className="text-xl text-gray-500">Votre sécurité est notre priorité absolue.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
             <div>
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary">verified_user</span>
                     Identités vérifiées
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     Chaque hôte et voyageur sur Reseva Africa passe par un processus de vérification. Nous demandons une pièce d'identité officielle et vérifions les numéros de téléphone pour garantir que tout le monde est bien qui il prétend être.
                 </p>
             </div>
             <div>
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary">lock</span>
                     Paiements sécurisés
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     Toutes les transactions passent par notre système de paiement sécurisé (Monero). Nous conservons les fonds jusqu'à 24 heures après l'arrivée du voyageur pour protéger les deux parties contre la fraude.
                 </p>
             </div>
             <div>
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary">star</span>
                     Avis authentiques
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     Seuls les utilisateurs ayant réellement séjourné ou utilisé un service peuvent laisser un avis. Cela garantit que les commentaires que vous lisez sont basés sur des expériences réelles.
                 </p>
             </div>
             <div>
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary">support_agent</span>
                     Support 24/7
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     En cas de problème, notre équipe de support basée en Afrique de l'Ouest est disponible à tout moment pour vous aider, que ce soit pour une urgence ou une simple question.
                 </p>
             </div>
         </div>

         <div className="bg-gray-50 dark:bg-[#1e293b] rounded-3xl p-10 text-center">
             <h2 className="text-2xl font-bold mb-4">Une urgence ?</h2>
             <p className="text-gray-600 dark:text-gray-300 mb-8">Si vous êtes en situation de danger immédiat, contactez d'abord les autorités locales.</p>
             <div className="flex flex-wrap justify-center gap-4">
                 <a href="tel:118" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors">
                     <span className="material-symbols-outlined">sos</span> Urgences (118)
                 </a>
                 <Link to="/support" className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:opacity-80 transition-colors">
                     Contacter le support Reseva
                 </Link>
             </div>
         </div>
      </div>
    </div>
  );
};

export default TrustSafety;