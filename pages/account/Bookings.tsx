import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Bookings: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const openReviewModal = () => {
    setReviewModalOpen(true);
    setRating(0);
    setReviewText('');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200")'}}></div>
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white">Jean Dupont</h1>
                <p className="text-xs text-gray-500">Voyageur</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/account/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/profile')}`}>
                 <span className="material-symbols-outlined text-[20px]">person</span> Mon Profil
              </Link>
              <Link to="/account/bookings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/bookings')}`}>
                 <span className="material-symbols-outlined text-[20px]">confirmation_number</span> Mes Réservations
              </Link>
              <Link to="/account/favorites" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/favorites')}`}>
                 <span className="material-symbols-outlined text-[20px]">favorite</span> Mes Favoris
              </Link>
              <Link to="/account/messages" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/messages')}`}>
                 <span className="material-symbols-outlined text-[20px]">chat</span> Messages
              </Link>
              <Link to="/account/notifications" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/notifications')}`}>
                 <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
              </Link>
              <Link to="/account/security" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/security')}`}>
                 <span className="material-symbols-outlined text-[20px]">lock</span> Sécurité
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Réservations</h1>
          </div>
          
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-2">
            <button onClick={() => setActiveTab('upcoming')} className={`pb-2 border-b-2 font-bold transition-colors ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>À venir</button>
            <button onClick={() => setActiveTab('completed')} className={`pb-2 border-b-2 font-bold transition-colors ${activeTab === 'completed' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Terminé</button>
            <button onClick={() => setActiveTab('cancelled')} className={`pb-2 border-b-2 font-bold transition-colors ${activeTab === 'cancelled' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>Annulé</button>
          </div>

          <div className="flex flex-col gap-4">
            
            {activeTab === 'upcoming' && (
                <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#1a202c] p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80")'}}></div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Sofitel Abidjan Hôtel Ivoire</h3>
                    <p className="text-gray-500 text-sm">Abidjan, Côte d'Ivoire</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">12 Nov - 15 Nov 2023</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Confirmé</span>
                    </div>
                    </div>
                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">450 000 XOF</p>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#d65a1f] transition-colors">Voir détails</button>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'completed' && (
                <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#1a202c] p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")'}}></div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Villa Prestige Océan</h3>
                    <p className="text-gray-500 text-sm">Lomé, Togo</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">10 Oct - 12 Oct 2023</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">Terminé</span>
                    </div>
                    </div>
                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">250 000 XOF</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Reçu</button>
                        <button onClick={openReviewModal} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg text-sm font-bold shadow-md hover:opacity-80 transition-colors">Laisser un avis</button>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'cancelled' && (
                <div className="p-8 text-center text-gray-500 bg-white dark:bg-[#1a202c] rounded-xl border border-gray-200 dark:border-gray-700">
                    Vous n'avez aucune réservation annulée.
                </div>
            )}

          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setReviewModalOpen(false)}></div>
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-fade-up p-6">
                <button onClick={() => setReviewModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
                
                <h2 className="text-xl font-bold mb-2">Comment s'est passé votre séjour ?</h2>
                <p className="text-gray-500 text-sm mb-6">Notez votre expérience à Villa Prestige Océan</p>

                <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star} 
                            onClick={() => setRating(star)}
                            className="text-4xl transition-transform hover:scale-110"
                        >
                            <span className={`material-symbols-outlined ${rating >= star ? 'text-yellow-500 icon-filled' : 'text-gray-300'}`}>star</span>
                        </button>
                    ))}
                </div>

                <textarea 
                    rows={4} 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Partagez votre expérience avec les autres voyageurs..." 
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 outline-none mb-4"
                ></textarea>

                <button 
                    onClick={() => {
                        // Mock submission
                        setReviewModalOpen(false);
                        alert('Merci ! Votre avis a été envoyé.');
                    }}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-[#d65a1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={rating === 0}
                >
                    Publier l'avis
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;