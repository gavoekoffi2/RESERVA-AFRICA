import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Bookings: React.FC = () => {
  const location = useLocation();
  const { user, bookings, addReview, reviews, updateBookingStatus } = useApp();
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400';

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const openReviewModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setReviewModalOpen(true);
    setRating(0);
    setReviewText('');
  };

  const handleSubmitReview = () => {
      if (selectedBookingId && rating > 0) {
          const booking = bookings.find(b => b.id === selectedBookingId);
          if (booking) {
              addReview(booking.propertyId || 1, rating, reviewText, booking.id);
          }
          setReviewModalOpen(false);
      }
  };

  const handleSimulateFinish = (id: string) => {
      updateBookingStatus(id, 'Terminé');
      setActiveTab('completed');
  };

  const hasReviewed = (bookingId: string) => reviews.some(r => r.bookingId === bookingId);

  const displayedBookings = bookings.filter(b => {
      if (activeTab === 'upcoming') return b.status === 'Confirmé' || b.status === 'En attente';
      if (activeTab === 'completed') return b.status === 'Terminé';
      if (activeTab === 'cancelled') return b.status === 'Annulé';
      return false;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-display">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
            <div className="flex gap-3 items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="bg-cover bg-center size-12 rounded-full" style={{backgroundImage: `url("${user?.avatar}")`}}></div>
              <div><h1 className="font-bold text-gray-900 dark:text-white">{user?.name}</h1><p className="text-xs text-gray-500">Voyageur</p></div>
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              <Link to="/account/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/profile')}`}><span className="material-symbols-outlined text-[20px]">person</span> Mon Profil</Link>
              <Link to="/account/bookings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/bookings')}`}><span className="material-symbols-outlined text-[20px]">confirmation_number</span> Réservations</Link>
              <Link to="/account/messages" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/account/messages')}`}><span className="material-symbols-outlined text-[20px]">chat</span> Messages</Link>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col gap-6">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Mes Réservations</h1>
          
          <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-2">
            <button onClick={() => setActiveTab('upcoming')} className={`pb-3 font-bold transition-all border-b-2 ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>À venir</button>
            <button onClick={() => setActiveTab('completed')} className={`pb-3 font-bold transition-all border-b-2 ${activeTab === 'completed' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>Passés</button>
            <button onClick={() => setActiveTab('cancelled')} className={`pb-3 font-bold transition-all border-b-2 ${activeTab === 'cancelled' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>Annulés</button>
          </div>

          <div className="flex flex-col gap-4">
            {displayedBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col sm:flex-row gap-5 bg-white dark:bg-[#1a202c] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                    <div className="w-full sm:w-48 h-36 bg-gray-200 rounded-xl bg-cover bg-center shrink-0" style={{backgroundImage: `url("${booking.image}")`}}></div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">{booking.title}</h3>
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${booking.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{booking.status}</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{booking.location}</p>
                            <div className="mt-3 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                                <span className="material-symbols-outlined text-lg">calendar_today</span> {booking.dates}
                            </div>
                        </div>
                        <div className="flex justify-between items-end mt-6">
                            <p className="font-black text-xl text-primary">{booking.price}</p>
                            <div className="flex gap-2">
                                {booking.status === 'Confirmé' && (
                                    <button onClick={() => handleSimulateFinish(booking.id)} className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50">Terminer le séjour (Démo)</button>
                                )}
                                {booking.status === 'Terminé' && !hasReviewed(booking.id) && (
                                    <button onClick={() => openReviewModal(booking.id)} className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl text-sm font-bold shadow-lg">Laisser un avis</button>
                                )}
                                <button className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#d65a1f] shadow-lg shadow-primary/20">Détails</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {displayedBookings.length === 0 && <div className="p-20 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">Aucun voyage à afficher.</div>}
          </div>
        </div>
      </div>

      {reviewModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-fade-up p-8">
                <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">Votre avis compte !</h2>
                <p className="text-gray-500 text-sm mb-8">Comment s'est passé votre séjour ?</p>
                <div className="flex justify-center gap-3 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setRating(star)} className="text-4xl transition-transform hover:scale-125">
                            <span className={`material-symbols-outlined text-[48px] ${rating >= star ? 'text-yellow-500 icon-filled' : 'text-gray-200 dark:text-gray-700'}`}>star</span>
                        </button>
                    ))}
                </div>
                <textarea rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Partagez votre expérience..." className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 outline-none mb-6 text-gray-900 dark:text-white"></textarea>
                <div className="flex gap-4">
                    <button onClick={() => setReviewModalOpen(false)} className="flex-1 py-4 font-bold text-gray-500">Annuler</button>
                    <button onClick={handleSubmitReview} disabled={rating === 0} className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-[#d65a1f] disabled:opacity-50 shadow-lg">Publier</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;