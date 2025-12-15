import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Constants: Primary Focus on Togo (Lomé, etc), then expansion ---
const MOCK_DESTINATIONS = [
  'Lomé, Togo', 
  'Kpalimé, Togo', 
  'Ouidah, Bénin', 
  'Assinie, Côte d\'Ivoire', 
  'Glidji, Togo',
  'Grand-Popo, Bénin', 
  'Kara, Togo',
  'Abidjan, Côte d\'Ivoire',
  'Dakar, Sénégal',
  'Accra, Ghana'
];

type TabType = 'stays' | 'cars' | 'attractions' | 'taxi';

// --- Components ---

// Airbnb-style Date Picker Component
const AirbnbCalendar: React.FC<{ 
  startDate: string;
  endDate: string;
  onSelect: (start: string, end: string) => void;
  labelStart?: string;
  labelEnd?: string;
}> = ({ startDate, endDate, onSelect, labelStart = "Arrivée", labelEnd = "Départ" }) => {
  const [baseDate, setBaseDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun

  const renderMonth = (offset: number) => {
    const displayDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + offset, 1);
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);
    
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    return (
      <div className="w-full md:w-[320px] p-2">
        <div className="text-center font-bold mb-4 text-gray-800 dark:text-white capitalize">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-semibold text-gray-500 text-center">
          {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {blanks.map((_, i) => <div key={`blank-${i}`} />)}
          {days.map(day => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            let isSelected = false;
            let isRange = false;
            let isStart = startDate === dateStr;
            let isEnd = endDate === dateStr;

            if (startDate && endDate) {
              if (dateStr > startDate && dateStr < endDate) isRange = true;
            }
            if (isStart || isEnd) isSelected = true;

            const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));

            return (
              <button
                key={day}
                disabled={isPast}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!startDate || (startDate && endDate)) {
                    onSelect(dateStr, '');
                  } else {
                    if (dateStr < startDate) {
                       onSelect(dateStr, ''); 
                    } else {
                       onSelect(startDate, dateStr);
                    }
                  }
                }}
                className={`
                  h-10 w-full flex items-center justify-center text-sm font-semibold transition-all relative
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:border-2 hover:border-black dark:hover:border-white rounded-full'}
                  ${isSelected ? 'bg-black text-white dark:bg-white dark:text-black rounded-full z-10' : ''}
                  ${isRange ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-none' : ''}
                  ${isStart && endDate ? 'rounded-r-none' : ''}
                  ${isEnd && startDate ? 'rounded-l-none' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl p-6 md:p-8 animate-fade-up border border-gray-100 dark:border-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 min-w-[350px] md:min-w-[750px]">
       <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-bold whitespace-nowrap text-gray-800 dark:text-white">Dates exactes</div>
          <div className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-bold whitespace-nowrap hover:border-black cursor-pointer text-gray-800 dark:text-gray-300">± 1 jour</div>
          <div className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-bold whitespace-nowrap hover:border-black cursor-pointer text-gray-800 dark:text-gray-300">± 3 jours</div>
       </div>

       <div className="flex flex-col md:flex-row gap-8 justify-center relative">
          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)); }} 
             className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10"
          >
             <span className="material-symbols-outlined text-sm dark:text-white">chevron_left</span>
          </button>
          
          {renderMonth(0)}
          <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="hidden md:block">
             {renderMonth(1)}
          </div>

          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)); }} 
             className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10"
          >
             <span className="material-symbols-outlined text-sm dark:text-white">chevron_right</span>
          </button>
       </div>
    </div>
  );
};

interface LandingProps {
  detectedLocation?: {
    city: string;
    country: string;
    currency: string;
  };
}

const Landing: React.FC<LandingProps> = ({ detectedLocation }) => {
  const navigate = useNavigate();
  
  // --- State ---
  // Requested Order: Stays -> Cars -> Attractions -> Taxi
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [activeField, setActiveField] = useState<string | null>(null);
  
  // Search Data
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use detected location to pre-fill search
  useEffect(() => {
    if (detectedLocation) {
      setDestination(`${detectedLocation.city}, ${detectedLocation.country}`);
    }
  }, [detectedLocation]);

  // --- Handlers ---
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append('dest', destination);
    if (dates.start) params.append('checkin', dates.start);
    if (dates.end) params.append('checkout', dates.end);
    params.append('adults', travelers.adults.toString());

    let path = '/search/stays'; // Default first tab
    if (activeTab === 'cars') path = '/search/cars';
    if (activeTab === 'attractions') path = '/search/attractions';
    if (activeTab === 'taxi') path = '/taxi';

    navigate(`${path}?${params.toString()}`);
  };

  const filteredDestinations = MOCK_DESTINATIONS.filter(d => 
    d.toLowerCase().includes(destination.toLowerCase())
  );

  // Labels vary by tab
  const getStartLabel = () => {
    if (activeTab === 'stays') return 'Arrivée';
    if (activeTab === 'cars') return 'Prise en charge'; // "Departure" of the car
    return 'Début';
  };
  
  const getEndLabel = () => {
    if (activeTab === 'stays') return 'Départ';
    if (activeTab === 'cars') return 'Restitution'; // "Return" of the car
    return 'Fin';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#101622] font-display">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shadow-airbnb { box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
        .search-field-hover:hover { background-color: rgba(0,0,0,0.05); }
        .dark .search-field-hover:hover { background-color: rgba(255,255,255,0.1); }
      `}</style>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[90vh] min-h-[700px] w-full flex flex-col pt-10 px-4 lg:px-10 bg-black">
        
        {/* Background Image - Stunning Beautiful House */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80" 
            className="w-full h-full object-cover opacity-80" 
            alt="Maison de luxe"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
          <div className="absolute inset-0 bg-black/20"></div> {/* Additional overlay for text contrast */}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full">
          
          {/* TABS (Order: Stays, Cars, Attractions, Taxi) */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 animate-fade-up">
            {[
              { id: 'stays', label: 'Hébergements', icon: 'bed' },
              { id: 'cars', label: 'Voitures', icon: 'directions_car' },
              { id: 'attractions', label: 'Attractions', icon: 'attractions' },
              { id: 'taxi', label: 'Taxis aéroport', icon: 'local_taxi' },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex flex-col items-center gap-2 pb-2 text-sm md:text-base font-medium transition-all relative group ${activeTab === tab.id ? 'text-white font-bold' : 'text-white/70 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-3xl group-hover:scale-110 transition-transform ${activeTab === tab.id ? 'scale-110' : ''}`}>
                        {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-white rounded-full"></div>}
                </button>
            ))}
          </div>

          {/* SEARCH BAR (The Pill) */}
          <div ref={searchContainerRef} className="w-full max-w-[880px] animate-fade-up relative z-50" style={{ animationDelay: '0.1s' }}>
             <div className={`bg-white dark:bg-[#1a202c] rounded-full flex relative shadow-airbnb border border-gray-200 dark:border-gray-700 ${activeField ? 'bg-[#f7f7f7] dark:bg-gray-800' : ''}`}>
                
                {/* 1. Destination */}
                <div 
                   className={`flex-1 relative pl-8 pr-4 py-3.5 rounded-full cursor-pointer search-field-hover ${activeField === 'location' ? 'bg-white dark:bg-[#1a202c] shadow-xl z-20' : ''}`}
                   onClick={() => setActiveField('location')}
                >
                   <label className="block text-xs font-extrabold text-gray-800 dark:text-white uppercase tracking-wider mb-0.5">Destination</label>
                   <input 
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Lomé, Kpalimé..."
                      className="w-full bg-transparent border-none outline-none text-gray-600 dark:text-gray-300 font-medium placeholder:text-gray-400 truncate text-sm"
                   />
                   
                   {/* Dropdown */}
                   {activeField === 'location' && (
                     <div className="absolute top-full left-0 mt-4 w-[350px] bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl p-6 z-50 animate-fade-up border border-gray-100 dark:border-gray-700">
                        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase px-2">Destinations Populaires</h4>
                        <div className="flex flex-col">
                          {filteredDestinations.slice(0, 5).map((city, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setDestination(city); setActiveField('dates'); }}
                              className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors"
                            >
                              <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-xl">
                                <span className="material-symbols-outlined text-gray-600 dark:text-white text-[20px]">location_on</span>
                              </div>
                              <span className="font-semibold text-gray-700 dark:text-gray-200">{city}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-600 my-3"></div>

                {/* 2. Start Date */}
                <div 
                   className={`w-[150px] relative px-6 py-3.5 rounded-full cursor-pointer search-field-hover ${activeField === 'dates' ? 'bg-white dark:bg-[#1a202c] shadow-xl z-20' : ''}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-xs font-extrabold text-gray-800 dark:text-white uppercase tracking-wider mb-0.5">{getStartLabel()}</label>
                   <div className={`font-medium truncate text-sm ${dates.start ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
                      {dates.start || 'Ajouter'}
                   </div>
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-600 my-3"></div>

                {/* 3. End Date */}
                <div 
                   className={`w-[150px] relative px-6 py-3.5 rounded-full cursor-pointer search-field-hover ${activeField === 'dates' ? 'bg-white dark:bg-[#1a202c] shadow-xl z-20' : ''}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-xs font-extrabold text-gray-800 dark:text-white uppercase tracking-wider mb-0.5">{getEndLabel()}</label>
                   <div className={`font-medium truncate text-sm ${dates.end ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
                      {dates.end || 'Ajouter'}
                   </div>
                   
                   {/* Calendar Popup (Shared for Check-in/out) */}
                   {activeField === 'dates' && (
                      <AirbnbCalendar 
                        startDate={dates.start}
                        endDate={dates.end}
                        onSelect={(s, e) => setDates({ start: s, end: e })}
                        labelStart={getStartLabel()}
                        labelEnd={getEndLabel()}
                      />
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-600 my-3"></div>

                {/* 4. Travelers & Search Button */}
                <div 
                   className={`flex-1 relative pl-6 pr-2 py-2 flex items-center rounded-full cursor-pointer search-field-hover ${activeField === 'travelers' ? 'bg-white dark:bg-[#1a202c] shadow-xl z-20' : ''}`}
                   onClick={() => setActiveField('travelers')}
                >
                   <div className="flex-1 min-w-[100px]">
                      <label className="block text-xs font-extrabold text-gray-800 dark:text-white uppercase tracking-wider mb-0.5">Qui ?</label>
                      <div className={`font-medium truncate text-sm ${travelers.adults + travelers.children > 0 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
                        {travelers.adults + travelers.children > 0 ? `${travelers.adults + travelers.children} voyageurs` : 'Ajouter'}
                      </div>
                   </div>

                   <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                      className="ml-2 bg-[#ff385c] hover:bg-[#d93250] text-white p-3 md:px-6 md:py-3.5 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95 group"
                   >
                      <span className="material-symbols-outlined font-bold group-hover:scale-110 transition-transform">search</span>
                      <span className="hidden md:inline font-bold">Rechercher</span>
                   </button>

                   {/* Travelers Dropdown */}
                   {activeField === 'travelers' && (
                     <div className="absolute top-full right-0 mt-4 w-96 bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl p-8 z-50 animate-fade-up border border-gray-100 dark:border-gray-700">
                        {/* Adults */}
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
                           <div>
                              <div className="font-bold text-gray-900 dark:text-white text-base">Adultes</div>
                              <div className="text-sm text-gray-500">13 ans et plus</div>
                           </div>
                           <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: Math.max(1, p.adults-1)}))}} className={`size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white ${travelers.adults <= 1 ? 'opacity-20 cursor-not-allowed' : ''}`}>-</button>
                              <span className="font-bold w-4 text-center">{travelers.adults}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: p.adults+1}))}} className="size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white">+</button>
                           </div>
                        </div>
                        {/* Children */}
                        <div className="flex items-center justify-between">
                           <div>
                              <div className="font-bold text-gray-900 dark:text-white text-base">Enfants</div>
                              <div className="text-sm text-gray-500">2 - 12 ans</div>
                           </div>
                           <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: Math.max(0, p.children-1)}))}} className={`size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white ${travelers.children <= 0 ? 'opacity-20 cursor-not-allowed' : ''}`}>-</button>
                              <span className="font-bold w-4 text-center">{travelers.children}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: p.children+1}))}} className="size-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-black dark:hover:border-white">+</button>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>

          {/* Hero Text */}
          <div className="mt-20 text-center animate-fade-up" style={{animationDelay: '0.2s'}}>
             <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter leading-tight relative z-10">
                Le meilleur du <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">{detectedLocation ? detectedLocation.country : 'Togo'}</span> <br/> et de l'Afrique de l'Ouest.
             </h1>
             <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md relative z-10 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                Trouvez les plus belles maisons, voitures et expériences au {detectedLocation ? detectedLocation.country : 'Togo'} et ailleurs.
             </p>
          </div>
        </div>
      </div>

      {/* --- SHOWCASE: HÉBERGEMENTS D'EXCEPTION AU TOGO --- */}
      <section className="py-20 px-4 md:px-10 max-w-[1400px] mx-auto w-full -mt-20 relative z-20">
         <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black text-white drop-shadow-lg">Hébergements d'exception à {detectedLocation ? detectedLocation.city : 'Lomé'}</h2>
            <Link to="/search/stays" className="text-white underline font-bold drop-shadow hover:text-primary transition-colors">Voir tout</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/search/stays/1" className="group h-[450px] rounded-[32px] overflow-hidden relative shadow-2xl bg-black">
               <img src="https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Villa Lomé" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-3 border border-white/20">{detectedLocation ? detectedLocation.city : 'Lomé, Baguida'}</div>
                  <h3 className="text-white text-2xl font-bold mb-1">Villa Prestige Océan</h3>
                  <p className="text-white/80 text-sm mb-4">Piscine privée • Vue mer • 5 Chambres</p>
                  <div className="flex items-center justify-between">
                     <span className="text-white font-bold text-xl">250 000 {detectedLocation ? detectedLocation.currency : 'FCFA'} <span className="text-sm font-normal">/ nuit</span></span>
                     <span className="bg-white text-black size-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                     </span>
                  </div>
               </div>
            </Link>
            
            <Link to="/search/stays/2" className="group h-[450px] rounded-[32px] overflow-hidden relative shadow-2xl bg-black">
               <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Maison Moderne" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-3 border border-white/20">{detectedLocation ? detectedLocation.city : 'Lomé, Cité OUA'}</div>
                  <h3 className="text-white text-2xl font-bold mb-1">Résidence Les Palmiers</h3>
                  <p className="text-white/80 text-sm mb-4">Architecture moderne • Jardin tropical</p>
                  <div className="flex items-center justify-between">
                     <span className="text-white font-bold text-xl">180 000 {detectedLocation ? detectedLocation.currency : 'FCFA'} <span className="text-sm font-normal">/ nuit</span></span>
                     <span className="bg-white text-black size-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                     </span>
                  </div>
               </div>
            </Link>

             <Link to="/search/stays/3" className="group h-[450px] rounded-[32px] overflow-hidden relative shadow-2xl bg-black">
               <img src="https://images.unsplash.com/photo-1600596542815-e32cb5313d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Penthouse" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-3 border border-white/20">{detectedLocation ? detectedLocation.city : 'Lomé, Centre-ville'}</div>
                  <h3 className="text-white text-2xl font-bold mb-1">Penthouse Sky View</h3>
                  <p className="text-white/80 text-sm mb-4">Toit-terrasse • Jacuzzi • Service 24/7</p>
                  <div className="flex items-center justify-between">
                     <span className="text-white font-bold text-xl">300 000 {detectedLocation ? detectedLocation.currency : 'FCFA'} <span className="text-sm font-normal">/ nuit</span></span>
                     <span className="bg-white text-black size-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                     </span>
                  </div>
               </div>
            </Link>
         </div>
      </section>

      {/* --- MOST POPULAR PROPERTIES SECTION --- */}
      <section className="py-20 px-4 md:px-10 max-w-[1400px] mx-auto w-full">
         <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Les hébergements les plus populaires</h2>
            <Link to="/search/stays" className="text-primary font-bold hover:underline">Voir tout</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pop Card 1 */}
            <Link to="/search/stays/4" className="group flex flex-col gap-3 cursor-pointer">
               <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Villa" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                     <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.96 (128)
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wide">
                     Superhôte
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-start">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">Villa Kpalimé Nature</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Kpalimé, Togo</p>
                  <div className="flex items-baseline gap-1 mt-1">
                     <span className="font-bold text-black dark:text-white">85 000 {detectedLocation ? detectedLocation.currency : 'FCFA'}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">/ nuit</span>
                  </div>
               </div>
            </Link>

            {/* Pop Card 2 */}
            <Link to="/search/stays/5" className="group flex flex-col gap-3 cursor-pointer">
               <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Appartement" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                     <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.88 (95)
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-start">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">Maison Ouidah Histoire</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ouidah, Bénin</p>
                  <div className="flex items-baseline gap-1 mt-1">
                     <span className="font-bold text-black dark:text-white">45 000 {detectedLocation ? detectedLocation.currency : 'FCFA'}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">/ nuit</span>
                  </div>
               </div>
            </Link>

            {/* Pop Card 3 */}
            <Link to="/search/stays/6" className="group flex flex-col gap-3 cursor-pointer">
               <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Hotel" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                     <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.92 (210)
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-start">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">Suite Océan Baguida</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Baguida, Togo</p>
                  <div className="flex items-baseline gap-1 mt-1">
                     <span className="font-bold text-black dark:text-white">65 000 {detectedLocation ? detectedLocation.currency : 'FCFA'}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">/ nuit</span>
                  </div>
               </div>
            </Link>

            {/* Pop Card 4 */}
            <Link to="/search/stays/7" className="group flex flex-col gap-3 cursor-pointer">
               <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                  <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Chalet" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                     <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.90 (76)
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wide">
                     Nouveau
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-start">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">Bungalow Assinie</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Assinie, Côte d'Ivoire</p>
                  <div className="flex items-baseline gap-1 mt-1">
                     <span className="font-bold text-black dark:text-white">95 000 {detectedLocation ? detectedLocation.currency : 'FCFA'}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">/ nuit</span>
                  </div>
               </div>
            </Link>
         </div>
      </section>

      {/* --- FEATURED CITIES/VILLAGES --- */}
      <section className="py-20 px-4 md:px-10 max-w-[1400px] mx-auto w-full bg-gray-50 dark:bg-[#1a202c]/50 rounded-[40px] mb-20">
        <h2 className="text-3xl font-black mb-10 text-gray-900 dark:text-white">Destinations phares & Villages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Kpalimé, Togo', desc: 'Cascades & Nature luxuriante', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80' },
            { name: 'Ouidah, Bénin', desc: 'Histoire, Culture & Plages', img: 'https://images.unsplash.com/photo-1596483756461-9f939223cb23?auto=format&fit=crop&w=600&q=80' },
            { name: 'Assinie, CI', desc: 'Détente en bord de lagune', img: 'https://images.unsplash.com/photo-1577212017184-80cc0da11dfd?auto=format&fit=crop&w=600&q=80' },
            { name: 'Glidji, Togo', desc: 'Traditions & Lacs sacrés', img: 'https://images.unsplash.com/photo-1543343132-73a7d2e06d91?auto=format&fit=crop&w=600&q=80' },
          ].map((city, idx) => (
             <div 
               key={idx}
               onClick={() => { setDestination(city.name.split(',')[0]); handleSearch(); }}
               className="group relative h-80 rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
             >
                <img src={city.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={city.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
                   <h3 className="text-white text-2xl font-black mb-1 translate-y-2 group-hover:translate-y-0 transition-transform">{city.name}</h3>
                   <p className="text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">{city.desc}</p>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-10 px-4 md:px-10 max-w-[1400px] mx-auto w-full mb-20">
         <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Tout pour votre voyage</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/search/cars" className="group rounded-3xl overflow-hidden relative aspect-[16/10] shadow-md hover:shadow-xl transition-shadow">
               <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Voitures" />
               <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">Location de voitures</h3>
                    <p className="text-white/90 font-medium">Berlines, 4x4 & SUVs disponibles à {detectedLocation ? detectedLocation.city : 'Lomé'}</p>
                  </div>
               </div>
            </Link>
            <Link to="/search/stays" className="group rounded-3xl overflow-hidden relative aspect-[16/10] shadow-md hover:shadow-xl transition-shadow">
               <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Hôtels" />
               <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">Hébergements</h3>
                    <p className="text-white/90 font-medium">Villas, Hôtels & Appartements de luxe</p>
                  </div>
               </div>
            </Link>
            <Link to="/search/attractions" className="group rounded-3xl overflow-hidden relative aspect-[16/10] shadow-md hover:shadow-xl transition-shadow">
               <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Attractions" />
               <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">Attractions</h3>
                    <p className="text-white/90 font-medium">Découvertes locales au {detectedLocation ? detectedLocation.country : 'Togo'}</p>
                  </div>
               </div>
            </Link>
         </div>
      </section>

    </div>
  );
};

export default Landing;