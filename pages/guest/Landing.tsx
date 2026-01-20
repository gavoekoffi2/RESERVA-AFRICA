import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// --- Global Destinations List ---
const MOCK_DESTINATIONS = [
  'Lomé, Togo', 'Kpalimé, Togo', 'Aného, Togo', 'Kara, Togo', 'Dapaong, Togo',
  'Assinie, Côte d\'Ivoire', 'Abidjan, Côte d\'Ivoire', 'Yamoussoukro, Côte d\'Ivoire',
  'Ouidah, Bénin', 'Cotonou, Bénin', 'Grand-Popo, Bénin',
  'Dakar, Sénégal', 'Saint-Louis, Sénégal', 'Saly, Sénégal',
  'Accra, Ghana', 'Kumasi, Ghana', 'Cape Coast, Ghana'
];

type TabType = 'stays' | 'cars' | 'experiences' | 'taxi';

const AirbnbCalendar: React.FC<{ 
  startDate: string;
  endDate: string;
  onSelect: (start: string, end: string) => void;
  onClose: () => void;
}> = ({ startDate, endDate, onSelect, onClose }) => {
  const [baseDate, setBaseDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

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
        <div className="text-center font-black mb-4 text-gray-800 dark:text-white capitalize tracking-tight">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] font-black text-gray-400 text-center uppercase tracking-widest">
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
                  h-10 w-full flex items-center justify-center text-sm font-bold transition-all relative
                  ${isPast ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'}
                  ${isSelected ? 'bg-primary text-white rounded-full z-10 shadow-lg scale-105' : ''}
                  ${isRange ? 'bg-primary/10 text-primary rounded-none' : ''}
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
    <>
      {/* Mobile Backdrop Overlay */}
      <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose}></div>
      
      <div className="fixed md:absolute inset-x-4 md:inset-x-auto top-20 md:top-full md:left-1/2 md:-translate-x-1/2 bg-white dark:bg-[#1e293b] rounded-[32px] md:rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.4)] p-6 md:p-8 animate-reveal border border-gray-100 dark:border-gray-700 z-[101] md:mt-4 min-w-0 md:min-w-[750px]">
         <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-black text-lg">Choisir vos dates</h3>
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><span className="material-symbols-outlined text-sm">close</span></button>
         </div>

         <div className="flex flex-col md:flex-row gap-8 justify-center relative max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-visible no-scrollbar">
            <button 
               onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)); }} 
               className="absolute left-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-95"
            >
               <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            
            {renderMonth(0)}
            <div className="hidden md:block w-px bg-gray-100 dark:bg-gray-700 my-4"></div>
            <div className="block md:block">
               {renderMonth(1)}
            </div>

            <button 
               onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)); }} 
               className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-95"
            >
               <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
         </div>

         <div className="mt-8 flex justify-between items-center md:hidden pt-4 border-t border-gray-100 dark:border-gray-700">
             <button onClick={() => onSelect('','')} className="text-xs font-black uppercase underline">Effacer</button>
             <button onClick={onClose} className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Appliquer</button>
         </div>
      </div>
    </>
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
  const { user, allProperties } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });
  const [isSearching, setIsSearching] = useState(false);

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const toRotate = [ "votre séjour.", "vos trajets.", "vos expériences." ];
  const period = 2000;
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

  useEffect(() => {
    if (detectedLocation && !destination) {
      setDestination(`${detectedLocation.city}, ${detectedLocation.country}`);
    }
  }, [detectedLocation]);

  useEffect(() => {
    let ticker = setTimeout(() => { tick(); }, typingSpeed);
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    setText(updatedText);
    if (isDeleting) setTypingSpeed(80);
    else setTypingSpeed(120);
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(400);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
        const params = new URLSearchParams();
        if (destination) params.append('dest', destination);
        if (dates.start) params.append('checkin', dates.start);
        if (dates.end) params.append('checkout', dates.end);
        params.append('adults', travelers.adults.toString());
        let path = '/search/stays';
        if (activeTab === 'cars') path = '/search/cars';
        if (activeTab === 'experiences') path = '/search/experiences';
        if (activeTab === 'taxi') path = '/taxi';
        navigate(`${path}?${params.toString()}`);
    }, 800);
  };

  const filteredDestinations = destination.length > 0 
    ? MOCK_DESTINATIONS.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
    : MOCK_DESTINATIONS.slice(0, 6);

  const popularProperties = useMemo(() => {
    return [...allProperties].filter(p => p.status === 'En ligne').sort((a,b) => b.rating - a.rating).slice(0, 6);
  }, [allProperties]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0f18] font-display overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative min-h-[600px] lg:h-[95vh] w-full flex flex-col pt-16 px-4 lg:px-10 bg-[#0a0f18] overflow-hidden">
        
        {/* CORNER IMAGE */}
        <div className="absolute top-0 right-0 w-full lg:w-[68%] h-full z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0f18]/60 to-[#0a0f18] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover object-center opacity-50 lg:opacity-85 animate-ken-burns origin-right" 
            alt="Villa"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center lg:items-start">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mb-6 animate-reveal">
            {[
              { id: 'stays', label: 'Séjours', icon: 'home_pin' },
              { id: 'cars', label: 'Véhicules', icon: 'directions_car' },
              { id: 'experiences', label: 'Expériences', icon: 'explore' },
              { id: 'taxi', label: 'Taxi', icon: 'local_taxi' },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setActiveField(null); }}
                    className={`flex flex-col items-center lg:items-start gap-2 pb-2 transition-all relative group ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className={`material-symbols-outlined text-lg md:text-xl ${activeTab === tab.id ? 'text-primary' : ''}`}>
                            {tab.icon}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em]">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"></div>}
                </button>
            ))}
          </div>

          {/* Search Bar Container - COMPACTED FOR MOBILE */}
          <div ref={searchContainerRef} className="w-full max-w-[1020px] relative z-[60] animate-reveal">
             <div className={`bg-white/95 dark:bg-[#1a202c]/95 backdrop-blur-3xl rounded-full flex flex-row relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] md:shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/20 transition-all duration-500 md:overflow-visible ${activeField ? 'ring-4 md:ring-10 ring-primary/10' : ''}`}>
                
                {/* Field: Destination */}
                <div 
                   className={`flex-[1.5] relative px-4 md:pl-10 md:pr-2 py-3 md:py-5 rounded-full cursor-pointer transition-all ${activeField === 'location' ? 'bg-white dark:bg-[#2d3748] shadow-lg md:shadow-2xl z-20' : 'hover:bg-black/5'}`}
                   onClick={() => setActiveField('location')}
                >
                   <label className="hidden md:block text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Destination</label>
                   <div className="flex items-center gap-2 md:block">
                      <span className="material-symbols-outlined text-gray-400 text-lg md:hidden">location_on</span>
                      <input 
                          type="text"
                          readOnly={window.innerWidth < 768}
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          placeholder="Où ?"
                          className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-black placeholder:text-gray-400 truncate text-xs md:text-base leading-none"
                      />
                   </div>
                   {activeField === 'location' && (
                     <div className="fixed md:absolute top-24 md:top-full left-4 right-4 md:left-0 md:right-auto md:mt-4 md:w-[380px] bg-white dark:bg-[#1e293b] rounded-[32px] md:rounded-[40px] shadow-2xl p-6 z-[101] animate-reveal border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <h3 className="font-black">Destination</h3>
                            <button onClick={(e) => {e.stopPropagation(); setActiveField(null);}}><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <input 
                            className="w-full p-4 mb-4 bg-gray-50 dark:bg-gray-800 rounded-2xl md:hidden font-bold outline-none border border-gray-100" 
                            placeholder="Rechercher..." 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            autoFocus
                        />
                        <h4 className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.3em] px-2">Suggestions</h4>
                        <div className="space-y-1 overflow-y-auto max-h-[40vh] md:max-h-none">
                          {filteredDestinations.map((city, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setDestination(city); setActiveField('dates'); }}
                              className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl cursor-pointer transition-all"
                            >
                              <div className="bg-primary/10 text-primary p-2 rounded-xl md:rounded-2xl"><span className="material-symbols-outlined text-base md:text-[18px] font-bold">explore</span></div>
                              <div><span className="font-black text-gray-800 dark:text-white block text-xs md:text-sm">{city}</span></div>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-px bg-gray-100 dark:bg-gray-700 my-3 md:my-4"></div>

                {/* Field: Dates */}
                <div 
                   className={`flex-1 relative px-3 md:px-6 py-3 md:py-5 rounded-full cursor-pointer transition-all ${activeField === 'dates' ? 'bg-white dark:bg-[#2d3748] shadow-lg md:shadow-2xl z-20' : 'hover:bg-black/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="hidden md:block text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Dates</label>
                   <div className="flex items-center gap-2 md:block">
                      <span className="material-symbols-outlined text-gray-400 text-lg md:hidden">calendar_today</span>
                      <div className={`font-black truncate text-[10px] md:text-sm tracking-tight ${dates.start ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                          {dates.start ? `${new Date(dates.start).toLocaleDateString('fr-FR', {day:'numeric', month:'short'})}` : 'Quand ?'}
                      </div>
                   </div>
                   {activeField === 'dates' && (
                      <AirbnbCalendar 
                        startDate={dates.start}
                        endDate={dates.end}
                        onSelect={(s, e) => setDates({ start: s, end: e })}
                        onClose={() => setActiveField(null)}
                      />
                   )}
                </div>

                <div className="w-px bg-gray-100 dark:bg-gray-700 my-3 md:my-4"></div>

                {/* Field: Travelers */}
                <div 
                   className={`flex-[0.8] md:flex-1 relative px-3 md:pl-6 md:pr-4 py-3 md:py-5 flex items-center rounded-full cursor-pointer transition-all ${activeField === 'travelers' ? 'bg-white dark:bg-[#2d3748] shadow-lg md:shadow-2xl z-20' : 'hover:bg-black/5'}`}
                   onClick={() => setActiveField('travelers')}
                >
                   <div className="flex items-center gap-2 md:block">
                      <span className="material-symbols-outlined text-gray-400 text-lg md:hidden">group</span>
                      <div className="hidden md:block">
                         <label className="block text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Qui ?</label>
                         <div className={`font-black truncate text-sm tracking-tight ${travelers.adults + travelers.children > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                           {travelers.adults + travelers.children} pers.
                         </div>
                      </div>
                      <span className={`md:hidden font-black text-[10px] ${travelers.adults + travelers.children > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {travelers.adults + travelers.children}
                      </span>
                   </div>

                   {/* Travelers Dropdown - ALIGNMENT FIXED */}
                   {activeField === 'travelers' && (
                     <>
                        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={(e) => {e.stopPropagation(); setActiveField(null);}}></div>
                        <div className="fixed md:absolute top-24 md:top-full left-4 right-4 md:left-auto md:right-0 md:mt-4 md:w-[320px] bg-white dark:bg-[#1e293b] rounded-[32px] md:rounded-[40px] shadow-2xl p-6 md:p-8 z-[101] animate-reveal border border-gray-100 dark:border-gray-700">
                             <h3 className="font-black text-lg mb-6 md:hidden">Voyageurs</h3>
                             <div className="space-y-6">
                                {[
                                    { id: 'adults', label: 'Adultes', desc: '13+' },
                                    { id: 'children', label: 'Enfants', desc: '2-12' }
                                ].map((cat) => (
                                    <div key={cat.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-black text-sm">{cat.label}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase">{cat.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setTravelers(prev => ({...prev, [cat.id]: Math.max(0, (prev as any)[cat.id] - 1)}))}}
                                                className="size-7 md:size-8 rounded-full border border-gray-200 flex items-center justify-center font-black hover:border-black transition-colors"
                                            >-</button>
                                            <span className="font-black w-4 text-center">{(travelers as any)[cat.id]}</span>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setTravelers(prev => ({...prev, [cat.id]: (prev as any)[cat.id] + 1}))}}
                                                className="size-7 md:size-8 rounded-full border border-gray-200 flex items-center justify-center font-black hover:border-black transition-colors"
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <button onClick={(e) => {e.stopPropagation(); setActiveField(null);}} className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest md:hidden">Confirmer</button>
                        </div>
                     </>
                   )}

                   {/* SEARCH BUTTON - INTEGRATED CIRCLE ON ALL SCREENS */}
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                      disabled={isSearching}
                      className={`ml-auto size-10 md:size-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 group ${isSearching ? 'opacity-70' : ''}`}
                   >
                      {isSearching ? <span className="size-4 md:size-5 border-2 md:border-3 border-white border-t-transparent rounded-full animate-spin"></span> : <span className="material-symbols-outlined text-base md:text-xl font-black group-hover:rotate-12 transition-transform">search</span>}
                   </button>
                </div>
             </div>
          </div>

          {/* Headline Text - ADJUSTED FOR COMPACTNESS */}
          <div className="mt-8 lg:mt-16 text-center lg:text-left animate-reveal relative z-10 px-4 w-full max-w-[850px]" style={{animationDelay: '0.2s'}}>
             <h1 className="text-[clamp(1.6rem,6vw,4.8rem)] font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1.1] drop-shadow-lg">
                Simplifiez <br className="hidden md:block"/>
                <div className="min-h-[1.2em] block lg:inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-orange-400 italic">
                    {text}
                    </span>
                </div>
             </h1>
             <p className="text-xs md:text-xl text-white font-bold max-w-2xl leading-relaxed tracking-wide opacity-90">
                Villas de prestige, mobilité de confiance et expériences locales sur la première plateforme de voyage d'exception en <strong>Afrique</strong>.
             </p>
          </div>
        </div>
      </div>

      {/* Popular Listings */}
      <section className="py-16 md:py-24 px-4 md:px-10 max-w-[1500px] mx-auto w-full relative z-20">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
            <div className="px-2">
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary font-black text-sm md:text-base">star</span>
                    <span className="text-primary font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em]">Sélection Prestige</span>
                </div>
                <h2 className="text-2xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Résidences d'Exception</h2>
                <p className="text-gray-500 font-bold mt-2 md:mt-4 uppercase text-[9px] md:text-[11px] tracking-widest">Le confort absolu dans les plus beaux cadres du continent.</p>
            </div>
            <Link to="/search/stays" className="bg-black dark:bg-white text-white dark:text-black px-8 md:px-12 py-3 md:py-5 rounded-full font-black text-[9px] md:text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Tout explorer</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {popularProperties.map((p, idx) => (
                <Link 
                    to={`/search/${p.type === 'Hébergement' ? 'stays' : p.type === 'Voiture' ? 'cars' : 'experiences'}/${p.id}`} 
                    key={p.id}
                    style={{ animationDelay: `${0.1 * idx}s` }}
                    className="group bg-white dark:bg-[#1a202c] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 hover-lift border border-gray-100 dark:border-gray-800"
                >
                    <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s]" alt={p.title} />
                        <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-white/95 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-2 shadow-2xl">
                            <span className="material-symbols-outlined text-yellow-500 text-xs md:text-sm icon-filled">star</span>
                            <span className="text-[10px] md:text-xs font-black text-gray-900">{p.rating} <span className="text-gray-400 font-bold ml-1">({p.reviews})</span></span>
                        </div>
                    </div>
                    <div className="p-6 md:p-10">
                        <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-3 block">{p.category} • {p.location}</span>
                        <h3 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 line-clamp-1 tracking-tighter leading-tight">{p.title}</h3>
                        <div className="flex items-center justify-between pt-4 md:pt-8 border-t border-gray-50 dark:border-gray-800">
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-black text-xl md:text-3xl tracking-tighter">{p.price}</span>
                                <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Par nuit</span>
                            </div>
                            <div className="size-10 md:size-14 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-700">
                                <span className="material-symbols-outlined text-lg md:text-xl font-black group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
         </div>
      </section>

      {/* Become Host CTA */}
      <section className="py-20 md:py-40 px-6 md:px-10 max-w-[1440px] mx-auto w-full bg-primary rounded-[40px] md:rounded-[80px] my-10 md:my-40 relative overflow-hidden group">
         <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-1000" 
              alt="Villa"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
         </div>
         <div className="relative z-10 py-8 md:py-16 md:pl-28 max-w-4xl">
            <h2 className="text-3xl md:text-9xl font-black text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">Votre espace <br/> vaut de l'or.</h2>
            <p className="text-sm md:text-3xl text-white font-bold mb-8 md:mb-12 leading-relaxed max-w-2xl opacity-90 drop-shadow-lg">Rejoignez la révolution de l'hospitalité en Afrique de l'Ouest. Mettez votre résidence ou votre véhicule en location dès aujourd'hui.</p>
            <Link to="/become-a-host" className="inline-block bg-white text-primary px-8 md:px-16 py-3 md:py-6 rounded-full font-black text-xs md:text-xl uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl">Commencer</Link>
         </div>
      </section>
    </div>
  );
};

export default Landing;