import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Calendar: React.FC = () => {
  const { addNotification, bookings, properties, user, togglePropertyBlock } = useApp();
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthDays = Array.from({length: 31}, (_, i) => i + 1);
  
  // Select which property to view (simplified: defaults to first)
  const myProperties = properties.filter(p => p.owner === user?.name);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(myProperties[0]?.id || 0);
  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  // Filter bookings for the current property
  const activeBookings = bookings.filter(b => b.propertyId === selectedPropertyId && b.status !== 'Annulé' && b.status !== 'Terminé');

  const getBookingForDay = (day: number) => {
      // Robust ISO date matching for the current view (Oct 2023 for demo)
      const targetDate = `2023-10-${String(day).padStart(2, '0')}`;
      
      return activeBookings.find(b => {
          let bStart: string;
          let bEnd: string;

          if (b.checkInDate && b.checkOutDate) {
              bStart = b.checkInDate;
              bEnd = b.checkOutDate;
          } else {
              // Fallback for mock data strings
              // Assume mock data implies Oct 2023
              if (b.dates.includes('-')) {
                  const parts = b.dates.split('-');
                  const s = parseInt(parts[0]);
                  const e = parseInt(parts[1]);
                  bStart = `2023-10-${String(s).padStart(2, '0')}`;
                  bEnd = `2023-10-${String(e).padStart(2, '0')}`;
              } else {
                  return false;
              }
          }
          
          return targetDate >= bStart && targetDate <= bEnd;
      });
  };

  const handleDayClick = (day: number) => {
      if (!selectedProperty) return;
      
      if (getBookingForDay(day)) {
          addNotification('error', 'Impossible de bloquer une date avec une réservation existante.');
          return;
      }

      const dateStr = `2023-10-${String(day).padStart(2, '0')}`;
      togglePropertyBlock(selectedPropertyId, dateStr);
  };

  return (
    <div className="p-8 h-full flex flex-col bg-[#f7f9fc] dark:bg-[#0f1115] overflow-hidden font-display">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Calendrier</h1>
          <div className="flex items-center gap-3 mt-2">
             <select 
                value={selectedPropertyId} 
                onChange={(e) => setSelectedPropertyId(Number(e.target.value))}
                className="bg-white dark:bg-[#1e293b] py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-bold outline-none cursor-pointer"
             >
                 {myProperties.map(p => (
                     <option key={p.id} value={p.id}>{p.title}</option>
                 ))}
             </select>
          </div>
        </div>
        
        <div className="flex items-center bg-white dark:bg-[#1e293b] rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all active:scale-95">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">chevron_left</span>
          </button>
          <span className="px-6 font-bold text-lg text-gray-800 dark:text-white">Octobre 2023</span>
          <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all active:scale-95">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">chevron_right</span>
          </button>
        </div>
      </div>
      
      {/* Calendar Container */}
      <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-[32px] border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden flex flex-col">
        
        {/* Weekday Header */}
        <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
          {days.map(d => (
            <div key={d} className="py-5 text-center text-xs font-extrabold text-gray-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-white dark:bg-[#1e293b]">
          {monthDays.map((day) => {
             const booking = getBookingForDay(day);
             const isToday = day === 12; // Mock today
             
             // Check blocked status from GLOBAL Property state
             const dateStr = `2023-10-${String(day).padStart(2, '0')}`;
             const isBlocked = selectedProperty?.blockedDates?.includes(dateStr);
             
             return (
              <div 
                key={day} 
                onClick={() => handleDayClick(day)}
                className={`relative border-r border-b border-gray-100 dark:border-gray-800 p-2 min-h-[120px] group transition-all cursor-pointer ${
                    isBlocked 
                    ? 'bg-gray-100 dark:bg-gray-800/50' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <div className="flex justify-between items-start">
                    <span className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-transform group-hover:scale-110
                    ${isToday ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' : isBlocked ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}
                    `}>
                    {day}
                    </span>
                    
                    {/* Block Toggle Indicator (Only visible on hover) */}
                    {!booking && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className={`material-symbols-outlined text-lg ${isBlocked ? 'text-red-400' : 'text-gray-300'}`}>
                                {isBlocked ? 'lock' : 'lock_open'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Price Tag */}
                {!isBlocked && !booking && (
                    <div className="mt-2 text-[11px] font-bold text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md w-fit">
                    {selectedProperty?.price}
                    </div>
                )}

                {/* Blocked Overlay */}
                {isBlocked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-700 opacity-50 rotate-45">block</span>
                    </div>
                )}

                {/* Booking Bar */}
                {booking && (
                  <div className={`
                    absolute left-1 right-1 top-12 bottom-2 p-2 shadow-sm rounded-xl cursor-pointer hover:brightness-110 transition-all z-10 flex flex-col justify-center
                    ${booking.status === 'Confirmé' ? 'bg-primary text-white' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}
                  `}>
                       <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{booking.status}</span>
                       <span className="text-xs font-black truncate">{booking.guestName?.split(' ')[0]}</span>
                  </div>
                )}
              </div>
             );
          })}
          
          {/* Fillers */}
          {Array.from({length: 4}).map((_, i) => (
             <div key={`empty-${i}`} className="bg-gray-50/50 dark:bg-gray-900/50 border-r border-b border-gray-100 dark:border-gray-800"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;