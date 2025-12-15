import React from 'react';

const HelpCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#101622]">
      {/* Hero */}
      <div className="bg-gray-100 dark:bg-[#1e293b] py-16 px-4 text-center">
         <h1 className="text-3xl md:text-5xl font-black mb-6">Comment pouvons-nous vous aider ?</h1>
         <div className="max-w-xl mx-auto relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
              type="text" 
              placeholder="Rechercher dans l'aide..." 
              className="w-full pl-12 pr-4 py-4 rounded-full border-none shadow-lg outline-none text-lg"
            />
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
         {/* Topics */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
               { icon: 'book_online', title: 'Réservations', desc: 'Gérer, modifier ou annuler vos voyages.' },
               { icon: 'payments', title: 'Paiements', desc: 'Factures, remboursements et modes de paiement.' },
               { icon: 'manage_accounts', title: 'Mon Compte', desc: 'Profil, sécurité et préférences.' },
            ].map((topic, idx) => (
               <div key={idx} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-primary mb-4">{topic.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-gray-500">{topic.desc}</p>
               </div>
            ))}
         </div>

         {/* FAQ */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
               <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
               <div className="space-y-4">
                  {[
                     'Comment annuler ma réservation ?',
                     'Quand serai-je débité ?',
                     'Puis-je modifier les dates de mon séjour ?',
                     'Comment contacter mon hôte ?',
                     'Politique de remboursement COVID-19'
                  ].map((q, i) => (
                     <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-[#1e293b] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="font-medium">{q}</span>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary/5 p-8 rounded-3xl">
               <h2 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
               <p className="text-gray-600 dark:text-gray-400 mb-6">Notre équipe de support est disponible 24/7 pour répondre à toutes vos questions.</p>
               
               <form className="flex flex-col gap-4">
                  <input type="text" placeholder="Votre nom" className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c]" />
                  <input type="email" placeholder="Votre email" className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c]" />
                  <textarea rows={4} placeholder="Votre message..." className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a202c]"></textarea>
                  <button className="bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#d65a1f] transition-colors">Envoyer un message</button>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HelpCenter;