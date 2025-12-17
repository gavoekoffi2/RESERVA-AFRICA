import React, { useState } from 'react';

const HostReviews: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const REVIEWS = [
      { id: 1, guest: 'Alice M.', date: '10 Oct 2023', rating: 5, property: 'Villa Prestige Océan', comment: 'Séjour exceptionnel ! La maison est encore plus belle en vrai. Kodjo est un hôte fantastique.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', reply: '' },
      { id: 2, guest: 'Jean D.', date: '05 Oct 2023', rating: 4, property: 'Toyota Prado', comment: 'Voiture en excellent état. Petit retard à la livraison mais chauffeur très sympa.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', reply: 'Merci Jean ! Désolé pour le retard, nous améliorons notre logistique.' },
      { id: 3, guest: 'Sophie K.', date: '28 Sep 2023', rating: 5, property: 'Villa Prestige Océan', comment: 'Tout était parfait. La piscine est magnifique.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', reply: '' }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-[#f7f9fc] dark:bg-[#0f1115]">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Avis et Commentaires</h1>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                <div className="size-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl font-black">4.9</div>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">Note globale</p>
                    <p className="text-sm text-gray-500">Basé sur 145 avis</p>
                </div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-gray-500">Propreté</span>
                    <span className="font-bold">4.9</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%]"></div>
                </div>
                <div className="flex justify-between mt-3 mb-2">
                    <span className="text-sm font-bold text-gray-500">Communication</span>
                    <span className="font-bold">5.0</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[100%]"></div>
                </div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                <p className="text-sm font-bold text-gray-500 mb-2">Taux de réponse</p>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">100%</h3>
                <p className="text-xs text-green-600 font-bold mt-1">Excellent travail !</p>
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-1">
            <button onClick={() => setFilter('all')} className={`pb-3 px-2 font-bold text-sm border-b-2 transition-colors ${filter === 'all' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500'}`}>Tous (145)</button>
            <button onClick={() => setFilter('unreplied')} className={`pb-3 px-2 font-bold text-sm border-b-2 transition-colors ${filter === 'unreplied' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500'}`}>À répondre (2)</button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
            {REVIEWS.map(review => (
                <div key={review.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${review.avatar}")`}}></div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{review.guest}</h3>
                                <p className="text-xs text-gray-500">{review.date} • {review.property}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {Array.from({length: 5}).map((_, i) => (
                                <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'text-yellow-500 icon-filled' : 'text-gray-300'}`}>star</span>
                            ))}
                        </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">"{review.comment}"</p>

                    {review.reply ? (
                        <div className="ml-8 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Votre réponse</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{review.reply}</p>
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <button className="text-primary font-bold text-sm border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">Répondre</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

export default HostReviews;