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
}> = ({ startDate, endDate, onSelect }) => {
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
    <div className="bg-white dark:bg-[#1e293b] rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.2)] p-6 md:p-8 animate-reveal border border-gray-100 dark:border-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-4 z-[100] min-w-[350px] md:min-w-[750px]">
       <div className="flex flex-col md:flex-row gap-8 justify-center relative">
          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)); }} 
             className="absolute left-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-95"
          >
             <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          {renderMonth(0)}
          <div className="hidden md:block w-px bg-gray-100 dark:bg-gray-700 my-4"></div>
          <div className="hidden md:block">
             {renderMonth(1)}
          </div>

          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)); }} 
             className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-95"
          >
             <span className="material-symbols-outlined text-sm">chevron_right</span>
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
  const { user, allProperties, siteAssets } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });
  const [isSearching, setIsSearching] = useState(false);

  // Simplified typing logic that starts immediately
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const toRotate = [ "votre séjour.", "vos trajets.", "vos expériences." ];
  const period = 2000;
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const popularProperties = useMemo(() => {
    return [...allProperties]
      .filter(p => p.status === 'En ligne')
      .sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) - ((a.rating || 0) * (a.reviews || 0)))
      .slice(0, 6);
  }, [allProperties]);

  const recentProperties = useMemo(() => {
    return [...allProperties]
      .filter(p => p.status === 'En ligne')
      .sort((a, b) => b.id - a.id)
      .slice(0, 6);
  }, [allProperties]);

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
  }, [detectedLocation]); // eslint-disable-line

  useEffect(() => {
    let ticker = setTimeout(() => { tick(); }, typingSpeed);
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum]); // eslint-disable-line

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed(80);
    } else {
      setTypingSpeed(120);
    }

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

  const handleBecomeHostCTA = () => {
      if (!user) {
          navigate('/register?redirect=/become-a-host');
      } else {
          navigate('/become-a-host');
      }
  };

  const filteredDestinations = destination.length > 0 
    ? MOCK_DESTINATIONS.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
    : MOCK_DESTINATIONS.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0f18] font-display overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative min-h-[750px] lg:h-[95vh] w-full flex flex-col pt-16 px-4 lg:px-10 bg-[#0a0f18] overflow-hidden">
        
        {/* CORNER IMAGE */}
        <div className="absolute top-0 right-0 w-full lg:w-[68%] h-full z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0f18]/60 to-[#0a0f18] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18]/40 via-transparent to-transparent z-10"></div>
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
              { id: 'taxi', label: 'Airport Taxi', icon: 'local_taxi' },
            ].map((tab, idx) => (
                <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setActiveField(null); }}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    className={`flex flex-col items-center lg:items-start gap-2 pb-2 transition-all relative group animate-reveal ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                >
                    <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-xl transition-transform duration-500 ${activeTab === tab.id ? 'scale-110 text-primary drop-shadow-[0_0_15px_rgba(238,108,43,0.5)]' : 'group-hover:scale-105'}`}>
                            {tab.icon}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full shadow-[0_0_15px_#ee6c2b]"></div>}
                </button>
            ))}
          </div>

          {/* Search Bar */}
          <div ref={searchContainerRef} className="w-full max-w-[1020px] relative z-50 animate-reveal" style={{ animationDelay: '0.1s' }}>
             <div className={`bg-white/95 dark:bg-[#1a202c]/95 backdrop-blur-3xl rounded-full flex relative shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/20 transition-all duration-500 ${activeField ? 'ring-10 ring-primary/10' : ''}`}>
                <div 
                   className={`flex-[1.4] relative pl-10 pr-2 py-5 rounded-full cursor-pointer transition-all ${activeField === 'location' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('location')}
                >
                   <label className="block text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-1">Destination</label>
                   <input 
                      type="text"
                      autoFocus={activeField === 'location'}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Où allez-vous ?"
                      className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-black placeholder:text-gray-400 truncate text-base leading-none"
                   />
                   {activeField === 'location' && (
                     <div className="absolute top-full left-0 mt-4 w-[380px] bg-white dark:bg-[#1e293b] rounded-[40px] shadow-2xl p-6 z-50 animate-reveal border border-gray-100 dark:border-gray-700">
                        <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.3em] px-2">Exploration Locale</h4>
                        <div className="space-y-1">
                          {filteredDestinations.map((city, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setDestination(city); setActiveField('dates'); }}
                              className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl cursor-pointer transition-all group"
                            >
                              <div className="bg-primary/10 text-primary p-2.5 rounded-2xl group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white shadow-sm">
                                <span className="material-symbols-outlined text-[18px] font-bold">explore</span>
                              </div>
                              <div>
                                <span className="font-black text-gray-800 dark:text-white block text-sm">{city.split(',')[0]}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{city.split(',')[1]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`flex-1 relative px-6 py-5 rounded-full cursor-pointer transition-all ${activeField === 'dates' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-1">Arrivée</label>
                   <div className={`font-black truncate text-sm tracking-tight ${dates.start ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {dates.start ? new Date(dates.start).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : 'Ajouter'}
                   </div>
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`flex-1 relative px-6 py-5 rounded-full cursor-pointer transition-all ${activeField === 'dates' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-1">Départ</label>
                   <div className={`font-black truncate text-sm tracking-tight ${dates.end ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {dates.end ? new Date(dates.end).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : 'Ajouter'}
                   </div>
                   {activeField === 'dates' && (
                      <AirbnbCalendar 
                        startDate={dates.start}
                        endDate={dates.end}
                        onSelect={(s, e) => setDates({ start: s, end: e })}
                      />
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`flex-1 relative pl-6 pr-4 py-5 flex items-center rounded-full cursor-pointer transition-all ${activeField === 'travelers' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('travelers')}
                >
                   <div className="flex-1">
                      <label className="block text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-1">Voyageurs</label>
                      <div className={`font-black truncate text-sm tracking-tight ${travelers.adults + travelers.children > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {travelers.adults + travelers.children} pers.
                      </div>
                   </div>

                   <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                      disabled={isSearching}
                      className={`bg-primary hover:bg-primary-dark text-white px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(238,108,43,0.5)] flex items-center justify-center gap-3 transition-all active:scale-95 group ${isSearching ? 'opacity-70' : ''}`}
                   >
                      {isSearching ? <span className="size-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span> : <span className="material-symbols-outlined text-lg font-black group-hover:rotate-12 transition-transform">search</span>}
                      <span className="font-black text-[11px] uppercase tracking-[0.2em]">{isSearching ? '...' : 'Explorer'}</span>
                   </button>
                </div>
             </div>
          </div>

          {/* Headline Text */}
          <div className="mt-12 lg:mt-16 text-center lg:text-left animate-reveal relative z-10 px-4 w-full max-w-[850px]" style={{animationDelay: '0.2s'}}>
             <h1 className="text-[clamp(2rem,7vw,4.8rem)] font-black text-white mb-6 tracking-tighter leading-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                Simplifiez <br className="hidden md:block"/>
                <div className="min-h-[1.2em] block lg:inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-orange-400 italic drop-shadow-none cursor-blink">
                    {text}
                    </span>
                </div>
             </h1>
             <p className="text-base sm:text-lg lg:text-xl text-white font-bold max-w-2xl leading-relaxed tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
                Villas de prestige, mobilité de confiance et expériences locales <br className="hidden lg:block"/> sur la première plateforme de voyage d'exception en <strong>Afrique</strong>.
             </p>
          </div>
        </div>
      </div>

      {/* Popular Listings */}
      <section className="py-24 px-4 md:px-10 max-w-[1500px] mx-auto w-full relative z-20">
         <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div className="px-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary font-black">star</span>
                    <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Sélection Prestige</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Résidences d'Exception</h2>
                <p className="text-gray-500 font-bold mt-4 uppercase text-[11px] tracking-widest">Le confort absolu dans les plus beaux cadres du continent.</p>
            </div>
            <Link to="/search/stays" className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Tout explorer</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {popularProperties.map((p, idx) => (
                <Link 
                    to={`/search/${p.type === 'Hébergement' ? 'stays' : p.type === 'Voiture' ? 'cars' : 'experiences'}/${p.id}`} 
                    key={p.id}
                    style={{ animationDelay: `${0.1 * idx}s` }}
                    className="group bg-white dark:bg-[#1a202c] rounded-[48px] overflow-hidden relative shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 hover-lift border border-gray-100 dark:border-gray-800"
                >
                    <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s]" alt={p.title} />
                        <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl">
                            <span className="material-symbols-outlined text-yellow-500 text-sm icon-filled">star</span>
                            <span className="text-xs font-black text-gray-900">{p.rating} <span className="text-gray-400 font-bold ml-1">({p.reviews})</span></span>
                        </div>
                    </div>
                    <div className="p-10">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">{p.category} • {p.location}</span>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 line-clamp-1 tracking-tighter leading-tight">{p.title}</h3>
                        <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-gray-800">
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-black text-3xl tracking-tighter">{p.price}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Par nuit</span>
                            </div>
                            <div className="size-14 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-700">
                                <span className="material-symbols-outlined text-xl font-black group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
         </div>
      </section>

      {/* Realistic Cars Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/30 w-full border-y border-gray-100 dark:border-gray-800/50">
         <div className="max-w-[1500px] mx-auto px-4 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 px-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary font-black">directions_car</span>
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Mobilité Quotidienne</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Véhicules de Confiance</h2>
                    <p className="text-gray-500 font-bold mt-4 uppercase text-[11px] tracking-widest">Une flotte entretenue pour tous vos déplacements urbains.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {recentProperties.filter(p => p.type === 'Voiture').map((p, idx) => (
                    <Link 
                        to={`/search/cars/${p.id}`} 
                        key={p.id}
                        className="group flex gap-8 bg-white dark:bg-[#1a202c] p-6 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-700 hover-lift border border-gray-100 dark:border-gray-800"
                    >
                        <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0 bg-gray-100">
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.title} />
                        </div>
                        <div className="flex flex-col justify-center flex-1 pr-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[9px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Disponible</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.location.split(',')[0]}</span>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-1 tracking-tighter leading-tight">{p.title}</h3>
                            <p className="text-primary font-black text-xl tracking-tighter leading-none">{p.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* Become Host CTA */}
      <section className="py-40 px-4 md:px-10 max-w-[1440px] mx-auto w-full bg-primary rounded-[80px] my-40 relative overflow-hidden group">
         <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-1000" 
              alt="Villa"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent"></div>
         </div>
         <div className="relative z-10 py-16 pl-10 md:pl-28 max-w-4xl">
            <h2 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.8] tracking-tighter drop-shadow-2xl">Votre espace <br/> vaut de l'or.</h2>
            <p className="text-xl md:text-3xl text-white font-bold mb-14 leading-relaxed max-w-2xl opacity-90 drop-shadow-lg">Rejoignez la révolution de l'hospitalité en Afrique de l'Ouest. Mettez votre résidence ou votre véhicule en location dès aujourd'hui.</p>
            <button 
               onClick={handleBecomeHostCTA}
               className="inline-block bg-white text-primary px-16 py-6 rounded-full font-black text-xl uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_40px_80px_rgba(255,255,255,0.4)]"
            >
               Commencer
            </button>
         </div>
      </section>
    </div>
  );
};

export default Landing;