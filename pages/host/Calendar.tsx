import React from 'react';

const Calendar: React.FC = () => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthDays = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <div className="p-8 h-full flex flex-col bg-[#f7f9fc] dark:bg-[#0f1115] overflow-hidden font-display">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Calendrier</h1>
          <div className="flex items-center gap-3 mt-2 bg-white dark:bg-[#1e293b] py-1 px-3 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-bold">Villa Teranga - Lomé • En ligne</p>
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
             const isBooking = day >= 14 && day <= 16;
             const isPending = day === 22;
             const isToday = day === 12;
             
             return (
              <div key={day} className="relative border-r border-b border-gray-100 dark:border-gray-800 p-2 min-h-[120px] group transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className={`
                  flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-transform group-hover:scale-110
                  ${isToday ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {day}
                </span>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 text-[11px] font-bold text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                  35k
                </div>

                {/* Booking Bar: Confirmed */}
                {isBooking && (
                  <div className={`
                    absolute left-1 right-1 top-14 bottom-3 p-3 rounded-2xl bg-gradient-to-br from-primary to-[#ff8c55] shadow-lg shadow-primary/20 cursor-pointer hover:brightness-110 transition-all z-10
                    ${day === 14 ? 'ml-2 rounded-l-2xl rounded-r-none border-r-0' : ''}
                    ${day === 15 ? 'rounded-none border-x-0 mx-[-5px] z-10 scale-x-110' : ''}
                    ${day === 16 ? 'mr-2 rounded-r-2xl rounded-l-none border-l-0' : ''}
                  `}>
                    {day === 14 && (
                       <div className="flex flex-col h-full justify-between text-white animate-fade-in">
                          <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Confirmé</span>
                          <span className="text-xs font-bold truncate">Jean Dupont</span>
                       </div>
                    )}
                  </div>
                )}

                {/* Booking Bar: Pending */}
                {isPending && (
                  <div className="absolute left-2 right-2 top-14 bottom-3 p-3 rounded-2xl bg-[#fffbf0] border-2 border-dashed border-yellow-300 cursor-pointer hover:border-yellow-400 transition-all z-10 group-hover:shadow-md">
                     <div className="flex flex-col h-full justify-between text-yellow-800">
                        <span className="text-[10px] font-bold opacity-70 uppercase tracking-wider">En attente</span>
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full bg-yellow-400 text-white text-[8px] flex items-center justify-center font-bold">A</div>
                           <span className="text-xs font-bold truncate">A. Mendy</span>
                        </div>
                     </div>
                  </div>
                )}
                
                {/* Hover Add Button */}
                {!isBooking && !isPending && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black shadow-sm transition-all pointer-events-auto flex items-center justify-center">
                            <span className="material-symbols-outlined font-bold">add</span>
                        </button>
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