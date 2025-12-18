import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// --- Global Destinations List ---
const MOCK_DESTINATIONS = [
  'Lomé, Togo', 'Kpalimé, Togo', 'Ouidah, Bénin', 'Assinie, Côte d\'Ivoire', 
  'Glidji, Togo', 'Grand-Popo, Bénin', 'Kara, Togo', 'Abidjan, Côte d\'Ivoire',
  'Dakar, Sénégal', 'Accra, Ghana', 'Bamako, Mali', 'Niamey, Niger',
  'Ouagadougou, Burkina Faso', 'Conakry, Guinée', 'Freetown, Sierra Leone'
];

type TabType = 'stays' | 'cars' | 'attractions' | 'taxi';

const AirbnbCalendar: React.FC<{ 
  startDate: string;
  endDate: string;
  onSelect: (start: string, end: string) => void;
  labelStart?: string;
  labelEnd?: string;
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
       <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <button className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Dates exactes</button>
          <button className="px-5 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-500">± 1 jour</button>
          <button className="px-5 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-500">± 3 jours</button>
       </div>

       <div className="flex flex-col md:flex-row gap-8 justify-center relative">
          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)); }} 
             className="absolute left-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-90"
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
             className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all active:scale-90"
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
  const { siteAssets } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });
  const [isSearching, setIsSearching] = useState(false);

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = [ "votre séjour.", "vos trajets.", "vos activités." ];
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
    if (isDeleting) setTypingSpeed(prev => prev / 1.5);
    else setTypingSpeed(100 + Math.random() * 50);
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
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
        if (activeTab === 'attractions') path = '/search/attractions';
        if (activeTab === 'taxi') path = '/taxi';

        navigate(`${path}?${params.toString()}`);
    }, 800);
  };

  // Meticulous Filter Logic: Check if input matches city or country
  const filteredDestinations = destination.length > 0 
    ? MOCK_DESTINATIONS.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
    : MOCK_DESTINATIONS.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#101622] font-display overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[95vh] min-h-[750px] w-full flex flex-col pt-10 px-4 lg:px-10 bg-gray-950">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src={siteAssets?.hero_bg?.url || "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80"} 
            className="w-full h-full object-cover opacity-60 animate-ken-burns" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full">
          {/* Enhanced Tabs */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-14 mb-12 animate-reveal">
            {[
              { id: 'stays', label: 'Hébergements', icon: 'bed' },
              { id: 'cars', label: 'Voitures', icon: 'directions_car' },
              { id: 'attractions', label: 'Attractions', icon: 'attractions' },
              { id: 'taxi', label: 'Transferts', icon: 'local_taxi' },
            ].map((tab, idx) => (
                <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setActiveField(null); }}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className={`flex flex-col items-center gap-3 pb-3 transition-all relative group animate-reveal ${activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-4xl transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                        {tab.icon}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{tab.label}</span>
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full shadow-[0_0_15px_#ee6c2b]"></div>}
                </button>
            ))}
          </div>

          {/* Precision Search Bar */}
          <div ref={searchContainerRef} className="w-full max-w-[950px] relative z-50 animate-reveal" style={{ animationDelay: '0.4s' }}>
             <div className={`bg-white/95 dark:bg-[#1a202c]/95 backdrop-blur-3xl rounded-full flex relative shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-500 ${activeField ? 'ring-[16px] ring-black/5 dark:ring-white/5' : ''}`}>
                
                {/* Destination Field with Live Autocomplete */}
                <div 
                   className={`flex-[1.5] relative pl-10 pr-4 py-4 rounded-full cursor-pointer transition-all ${activeField === 'location' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('location')}
                >
                   <label className="block text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-0.5">Destinations</label>
                   <input 
                      type="text"
                      autoFocus={activeField === 'location'}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Où allez-vous ?"
                      className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white font-black placeholder:text-gray-400 truncate text-sm"
                   />
                   {activeField === 'location' && (
                     <div className="absolute top-full left-0 mt-6 w-[450px] bg-white dark:bg-[#1e293b] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] p-8 z-50 animate-reveal border border-gray-100 dark:border-gray-700">
                        <h4 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.25em] px-3">Exploration Rapide</h4>
                        <div className="space-y-1">
                          {filteredDestinations.length > 0 ? filteredDestinations.map((city, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setDestination(city); setActiveField('dates'); }}
                              className="flex items-center gap-5 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-3xl cursor-pointer transition-all group"
                            >
                              <div className="bg-primary/10 text-primary p-3.5 rounded-2xl group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white">
                                <span className="material-symbols-outlined text-[24px] font-bold">explore</span>
                              </div>
                              <div>
                                <span className="font-black text-gray-800 dark:text-white block">{city.split(',')[0]}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{city.split(',')[1]}</span>
                              </div>
                            </div>
                          )) : (
                              <p className="p-4 text-sm text-gray-400 italic">Aucun résultat pour "{destination}"</p>
                          )}
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                {/* Dates Field */}
                <div 
                   className={`flex-1 relative px-8 py-4 rounded-full cursor-pointer transition-all ${activeField === 'dates' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-0.5">{activeTab === 'stays' ? 'Arrivée' : 'Départ'}</label>
                   <div className={`font-black truncate text-sm tracking-tight ${dates.start ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {dates.start ? new Date(dates.start).toLocaleDateString('fr-FR', {day:'numeric', month:'short'}) : 'Ajouter'}
                   </div>
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`flex-1 relative px-8 py-4 rounded-full cursor-pointer transition-all ${activeField === 'dates' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-0.5">{activeTab === 'stays' ? 'Départ' : 'Retour'}</label>
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

                {/* Travelers Field */}
                <div 
                   className={`flex-1 relative pl-8 pr-3 py-3 flex items-center rounded-full cursor-pointer transition-all ${activeField === 'travelers' ? 'bg-white dark:bg-[#2d3748] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('travelers')}
                >
                   <div className="flex-1">
                      <label className="block text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-0.5">Voyageurs</label>
                      <div className={`font-black truncate text-sm tracking-tight ${travelers.adults + travelers.children > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {travelers.adults + travelers.children} pers.
                      </div>
                   </div>

                   <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                      disabled={isSearching}
                      className={`bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full shadow-[0_15px_40px_rgba(238,108,43,0.4)] flex items-center gap-3 transition-all active:scale-95 group ${isSearching ? 'opacity-70' : ''}`}
                   >
                      {isSearching ? (
                          <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                          <span className="material-symbols-outlined font-black group-hover:rotate-12 transition-transform">search</span>
                      )}
                      <span className="font-black text-sm uppercase tracking-widest">{isSearching ? 'Calcul...' : 'Rechercher'}</span>
                   </button>

                   {activeField === 'travelers' && (
                     <div className="absolute top-full right-0 mt-6 w-[360px] bg-white dark:bg-[#1e293b] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] p-10 z-50 animate-reveal border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-10">
                           <div>
                              <div className="font-black text-gray-900 dark:text-white text-lg tracking-tight">Adultes</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">13 ans et +</div>
                           </div>
                           <div className="flex items-center gap-6">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: Math.max(1, p.adults-1)}))}} className="size-10 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:border-primary hover:text-primary transition-all font-black text-xl">-</button>
                              <span className="font-black text-2xl w-6 text-center">{travelers.adults}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: p.adults+1}))}} className="size-10 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:border-primary hover:text-primary transition-all font-black text-xl">+</button>
                           </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <div>
                              <div className="font-black text-gray-900 dark:text-white text-lg tracking-tight">Enfants</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">2 - 12 ans</div>
                           </div>
                           <div className="flex items-center gap-6">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: Math.max(0, p.children-1)}))}} className="size-10 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:border-primary hover:text-primary transition-all font-black text-xl">-</button>
                              <span className="font-black text-2xl w-6 text-center">{travelers.children}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: p.children+1}))}} className="size-10 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:border-primary hover:text-primary transition-all font-black text-xl">+</button>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="mt-24 text-center animate-reveal relative z-10 px-4" style={{animationDelay: '0.6s'}}>
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 drop-shadow-2xl tracking-tighter leading-[0.85]">
                Simplifiez <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-orange-400 cursor-blink italic">
                  {text}
                </span>
             </h1>
             <p className="text-xl md:text-2xl text-white/95 font-medium max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
                Logements de prestige, mobilité urbaine et expériences authentiques <br className="hidden lg:block"/> réunis sur la première plateforme de voyage en <strong>Afrique de l'Ouest</strong>.
             </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Precision Staggered Grid */}
      <section className="py-32 px-4 md:px-10 max-w-[1500px] mx-auto w-full -mt-24 relative z-20">
         <div className="flex justify-between items-end mb-16 px-4">
            <div>
                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tighter">Pépites de {detectedLocation?.city || 'la région'}</h2>
                <p className="text-white/60 font-bold uppercase text-[10px] tracking-[0.4em] mt-3">Sélection exclusive Reseva</p>
            </div>
            <Link to="/search/stays" className="text-white bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">Explorer tout</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { id: 1, title: 'Villa Prestige Océan', price: '250 000', location: 'Baguida', img: 'https://images.unsplash.com/photo-1613490493576-2f045a168583' },
                { id: 2, title: 'Résidence Les Palmiers', price: '180 000', location: 'Cité OUA', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c' },
                { id: 3, title: 'Penthouse Sky View', price: '300 000', location: 'Centre-ville', img: 'https://images.unsplash.com/photo-1600596542815-e32cb5313d5b' }
            ].map((p, idx) => (
                <Link 
                    to={`/search/stays/${p.id}`} 
                    key={p.id}
                    style={{ animationDelay: `${0.8 + (idx * 0.15)}s` }}
                    className="group h-[550px] rounded-[50px] overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] bg-gray-900 animate-reveal hover-lift border border-white/5"
                >
                    <img src={`${p.img}?auto=format&fit=crop&w=1200&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-90" alt={p.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-12">
                        <div className="bg-primary/20 backdrop-blur-md self-start px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-primary/30 mb-5">Premium Choice</div>
                        <h3 className="text-white text-3xl md:text-4xl font-black mb-2 leading-none tracking-tighter">{p.title}</h3>
                        <p className="text-white/60 font-bold mb-8 flex items-center gap-2 text-sm">
                           <span className="material-symbols-outlined text-sm text-primary">location_on</span> {p.location}, Togo
                        </p>
                        <div className="flex items-center justify-between border-t border-white/10 pt-8">
                            <div className="flex flex-col">
                                <span className="text-white font-black text-3xl tracking-tighter">{p.price} F</span>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Par nuit</span>
                            </div>
                            <div className="bg-white text-black size-14 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[-45deg] shadow-xl">
                                <span className="material-symbols-outlined font-black">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
         </div>
      </section>

      {/* Social Proof & Trust */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-32 mb-24 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="flex flex-col items-center gap-6">
                  <div className="size-20 bg-white dark:bg-gray-800 rounded-[30px] shadow-xl flex items-center justify-center text-primary border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-4xl font-bold">verified_user</span>
                  </div>
                  <div>
                      <h3 className="text-2xl font-black mb-2 tracking-tight">Hébergeurs Vérifiés</h3>
                      <p className="text-gray-500 font-medium">Nous auditons personnellement chaque annonce pour votre sécurité.</p>
                  </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                  <div className="size-20 bg-white dark:bg-gray-800 rounded-[30px] shadow-xl flex items-center justify-center text-primary border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-4xl font-bold">payments</span>
                  </div>
                  <div>
                      <h3 className="text-2xl font-black mb-2 tracking-tight">Paiement Mobile Money</h3>
                      <p className="text-gray-500 font-medium">Réservez instantanément avec T-Money, Flooz, Wave ou Orange Money.</p>
                  </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                  <div className="size-20 bg-white dark:bg-gray-800 rounded-[30px] shadow-xl flex items-center justify-center text-primary border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-4xl font-bold">support_agent</span>
                  </div>
                  <div>
                      <h3 className="text-2xl font-black mb-2 tracking-tight">Support Local 24/7</h3>
                      <p className="text-gray-500 font-medium">Une équipe basée à Dakar et Lomé pour vous accompagner à chaque étape.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Community / Host Section */}
      <section className="py-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full bg-black rounded-[80px] mb-32 relative overflow-hidden group">
         <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-[2s]">
            <img src={siteAssets?.host_cta_bg?.url || "https://images.unsplash.com/photo-1543343132-73a7d2e06d91?auto=format&fit=crop&w=1200&q=80"} className="w-full h-full object-cover animate-ken-burns" alt="Host community" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
         <div className="relative z-10 py-16 pl-12 md:pl-24 max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter">Votre espace <br/> vaut de l'or.</h2>
            <p className="text-xl md:text-2xl text-white/70 font-medium mb-12 leading-relaxed max-w-2xl">Rejoignez la révolution de l'hospitalité en Afrique de l'Ouest. Mettez votre logement ou votre véhicule en location et générez des revenus passifs.</p>
            <Link to="/become-a-host" className="inline-block bg-white text-black px-14 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
               Démarrer maintenant
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Landing;