import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// --- Constants ---
const MOCK_DESTINATIONS = [
  'Lomé, Togo', 'Kpalimé, Togo', 'Ouidah, Bénin', 'Assinie, Côte d\'Ivoire', 
  'Glidji, Togo', 'Grand-Popo, Bénin', 'Kara, Togo', 'Abidjan, Côte d\'Ivoire',
  'Dakar, Sénégal', 'Accra, Ghana'
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
                  h-10 w-full flex items-center justify-center text-sm font-semibold transition-all-custom relative
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'}
                  ${isSelected ? 'bg-black text-white dark:bg-white dark:text-black rounded-full z-10 shadow-lg scale-110' : ''}
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
    <div className="bg-white dark:bg-[#1e293b] rounded-[32px] shadow-2xl p-6 md:p-8 animate-reveal border border-gray-100 dark:border-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 min-w-[350px] md:min-w-[750px]">
       <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <div className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold whitespace-nowrap">Dates exactes</div>
          <div className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-bold whitespace-nowrap hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 dark:text-gray-300">± 1 jour</div>
          <div className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-bold whitespace-nowrap hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 dark:text-gray-300">± 3 jours</div>
       </div>

       <div className="flex flex-col md:flex-row gap-8 justify-center relative">
          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)); }} 
             className="absolute left-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all-custom active:scale-90"
          >
             <span className="material-symbols-outlined text-sm dark:text-white">chevron_left</span>
          </button>
          
          {renderMonth(0)}
          <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700 my-4"></div>
          <div className="hidden md:block">
             {renderMonth(1)}
          </div>

          <button 
             onClick={(e) => { e.stopPropagation(); setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)); }} 
             className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full hidden md:block z-10 transition-all-custom active:scale-90"
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
  const { siteAssets } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });

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
    if (detectedLocation) {
      setDestination(`${detectedLocation.city}, ${detectedLocation.country}`);
    }
  }, [detectedLocation]);

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
  };

  const filteredDestinations = MOCK_DESTINATIONS.filter(d => 
    d.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#101622] font-display overflow-x-hidden">
      {/* Hero Section - Uses Dynamic Asset hero_bg */}
      <div className="relative h-[95vh] min-h-[750px] w-full flex flex-col pt-10 px-4 lg:px-10 bg-gray-950">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src={siteAssets?.hero_bg?.url || "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80"} 
            className="w-full h-full object-cover opacity-60 animate-ken-burns" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 animate-reveal">
            {[
              { id: 'stays', label: 'Hébergements', icon: 'bed' },
              { id: 'cars', label: 'Voitures', icon: 'directions_car' },
              { id: 'attractions', label: 'Attractions', icon: 'attractions' },
              { id: 'taxi', label: 'Taxis aéroport', icon: 'local_taxi' },
            ].map((tab, idx) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className={`flex flex-col items-center gap-2 pb-2 text-sm md:text-base font-medium transition-all-custom relative group animate-reveal ${activeTab === tab.id ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-3xl group-hover:scale-125 transition-transform-custom ${activeTab === tab.id ? 'scale-110' : ''}`}>
                        {tab.icon}
                    </span>
                    <span className="tracking-tight">{tab.label}</span>
                    {activeTab === tab.id && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-primary rounded-full shadow-[0_0_10px_#ee6c2b]"></div>}
                </button>
            ))}
          </div>

          {/* Search Bar */}
          <div ref={searchContainerRef} className="w-full max-w-[900px] relative z-50 animate-reveal" style={{ animationDelay: '0.4s' }}>
             <div className={`bg-white/95 dark:bg-[#1a202c]/95 backdrop-blur-2xl rounded-full flex relative shadow-2xl border border-white/20 transition-all-custom ${activeField ? 'ring-8 ring-black/5 dark:ring-white/5' : ''}`}>
                <div 
                   className={`flex-1 relative pl-10 pr-4 py-4 rounded-full cursor-pointer transition-all-custom ${activeField === 'location' ? 'bg-white dark:bg-[#1a202c] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('location')}
                >
                   <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">Destination</label>
                   <input 
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Lomé, Kpalimé..."
                      className="w-full bg-transparent border-none outline-none text-gray-800 dark:text-white font-bold placeholder:text-gray-400 truncate text-sm"
                   />
                   {activeField === 'location' && (
                     <div className="absolute top-full left-0 mt-6 w-[400px] bg-white dark:bg-[#1e293b] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.25)] p-8 z-50 animate-reveal border border-gray-100 dark:border-gray-700">
                        <h4 className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest px-2">Destinations de rêve</h4>
                        <div className="space-y-1">
                          {filteredDestinations.slice(0, 5).map((city, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setDestination(city); setActiveField('dates'); }}
                              className="flex items-center gap-4 p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl cursor-pointer transition-all-custom group"
                            >
                              <div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[20px] font-bold">location_on</span>
                              </div>
                              <span className="font-bold text-gray-700 dark:text-gray-200">{city}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`w-[180px] relative px-8 py-4 rounded-full cursor-pointer transition-all-custom ${activeField === 'dates' ? 'bg-white dark:bg-[#1a202c] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">{activeTab === 'stays' ? 'Arrivée' : 'Début'}</label>
                   <div className={`font-bold truncate text-sm ${dates.start ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {dates.start || 'Ajouter'}
                   </div>
                </div>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-4"></div>

                <div 
                   className={`w-[180px] relative px-8 py-4 rounded-full cursor-pointer transition-all-custom ${activeField === 'dates' ? 'bg-white dark:bg-[#1a202c] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('dates')}
                >
                   <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">{activeTab === 'stays' ? 'Départ' : 'Fin'}</label>
                   <div className={`font-bold truncate text-sm ${dates.end ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {dates.end || 'Ajouter'}
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
                   className={`flex-1 relative pl-8 pr-3 py-3 flex items-center rounded-full cursor-pointer transition-all-custom ${activeField === 'travelers' ? 'bg-white dark:bg-[#1a202c] shadow-2xl z-20' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                   onClick={() => setActiveField('travelers')}
                >
                   <div className="flex-1">
                      <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">Voyageurs</label>
                      <div className={`font-bold truncate text-sm ${travelers.adults + travelers.children > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {travelers.adults + travelers.children > 0 ? `${travelers.adults + travelers.children}` : 'Ajouter'}
                      </div>
                   </div>

                   <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                      className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(238,108,43,0.4)] flex items-center gap-3 transition-all-custom btn-active-scale group"
                   >
                      <span className="material-symbols-outlined font-black group-hover:rotate-12 transition-transform">search</span>
                      <span className="font-black text-sm uppercase tracking-widest">Rechercher</span>
                   </button>

                   {activeField === 'travelers' && (
                     <div className="absolute top-full right-0 mt-6 w-[360px] bg-white dark:bg-[#1e293b] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.25)] p-8 z-50 animate-reveal border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-8">
                           <div>
                              <div className="font-black text-gray-900 dark:text-white text-base">Adultes</div>
                              <div className="text-xs text-gray-400 font-bold uppercase mt-1">13 ans et +</div>
                           </div>
                           <div className="flex items-center gap-5">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: Math.max(1, p.adults-1)}))}} className="size-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-primary transition-colors">-</button>
                              <span className="font-black text-xl w-6 text-center">{travelers.adults}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, adults: p.adults+1}))}} className="size-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-primary transition-colors">+</button>
                           </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <div>
                              <div className="font-black text-gray-900 dark:text-white text-base">Enfants</div>
                              <div className="text-xs text-gray-400 font-bold uppercase mt-1">2 - 12 ans</div>
                           </div>
                           <div className="flex items-center gap-5">
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: Math.max(0, p.children-1)}))}} className="size-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-primary transition-colors">-</button>
                              <span className="font-black text-xl w-6 text-center">{travelers.children}</span>
                              <button onClick={(e)=>{e.stopPropagation(); setTravelers(p=>({...p, children: p.children+1}))}} className="size-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-primary transition-colors">+</button>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="mt-24 text-center animate-reveal relative z-10 px-4" style={{animationDelay: '0.6s'}}>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[0.9]">
                Simplifiez <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-orange-400 cursor-blink italic">
                  {text}
                </span>
             </h1>
             <p className="text-xl md:text-2xl text-white/90 font-medium max-w-4xl mx-auto drop-shadow-lg bg-black/20 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                Ouvrez les portes de l'Afrique de l'Ouest. <strong>Hébergements</strong>, <strong>mobilité</strong> et <strong>culture</strong> réunis sur une seule plateforme intuitive et fluide.
             </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Staggered */}
      <section className="py-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full -mt-24 relative z-20">
         <div className="flex justify-between items-end mb-12 px-2">
            <h2 className="text-4xl font-black text-white drop-shadow-2xl">Pépites {detectedLocation?.city || 'locales'}</h2>
            <Link to="/search/stays" className="text-white bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all-custom">Explorer tout</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
                { id: 1, title: 'Villa Prestige Océan', price: '250 000', location: 'Baguida', img: 'https://images.unsplash.com/photo-1613490493576-2f045a168583' },
                { id: 2, title: 'Résidence Les Palmiers', price: '180 000', location: 'Cité OUA', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c' },
                { id: 3, title: 'Penthouse Sky View', price: '300 000', location: 'Centre-ville', img: 'https://images.unsplash.com/photo-1600596542815-e32cb5313d5b' }
            ].map((p, idx) => (
                <Link 
                    to={`/search/stays/${p.id}`} 
                    key={p.id}
                    style={{ animationDelay: `${0.8 + (idx * 0.15)}s` }}
                    className="group h-[500px] rounded-[40px] overflow-hidden relative shadow-2xl bg-gray-900 animate-reveal hover-lift"
                >
                    <img src={`${p.img}?auto=format&fit=crop&w=1000&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] opacity-90" alt={p.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                        <div className="bg-primary/20 backdrop-blur-md self-start px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary-light border border-primary/30 mb-4 text-white">Top Rated</div>
                        <h3 className="text-white text-3xl font-black mb-1 leading-tight">{p.title}</h3>
                        <p className="text-white/60 font-bold mb-6 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">location_on</span> {p.location}, Togo
                        </p>
                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                            <span className="text-white font-black text-2xl">{p.price} F <span className="text-xs font-medium text-white/50">/ nuit</span></span>
                            <div className="bg-white text-black size-12 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all-custom group-hover:rotate-[-45deg]">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
         </div>
      </section>

      {/* Popular Staggered Grid */}
      <section className="py-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
         <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Destinations populaires</h2>
               <p className="text-gray-500 font-medium mt-2">Ce que les voyageurs adorent en ce moment.</p>
            </div>
            <Link to="/search/stays" className="text-primary font-black uppercase text-xs tracking-widest hover:underline">Voir tout</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1,2,3,4].map((item, idx) => (
                <div key={item} className="animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                   <Link to={`/search/stays/${item + 3}`} className="group flex flex-col gap-4 cursor-pointer hover-lift">
                      <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-lg">
                         <img src={`https://images.unsplash.com/photo-${1580000000000 + (idx * 1000000)}?auto=format&fit=crop&w=800&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s]" alt="Property" />
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl text-[10px] font-black shadow-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-yellow-500 icon-filled">star</span> 4.9 ({idx * 23 + 12})
                         </div>
                      </div>
                      <div className="px-2">
                         <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">Éden Resort {idx + 1}</h3>
                         <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-wider">Kpalimé, Togo</p>
                         <div className="flex items-baseline gap-1 mt-3">
                            <span className="font-black text-2xl text-black dark:text-white">{(45000 + idx * 5000).toLocaleString()} F</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ nuit</span>
                         </div>
                      </div>
                   </Link>
                </div>
            ))}
         </div>
      </section>

      {/* Community Section - Uses Dynamic Asset host_cta_bg */}
      <section className="py-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full bg-black rounded-[60px] mb-24 relative overflow-hidden text-center group">
         <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity">
            <img src={siteAssets?.host_cta_bg?.url || "https://images.unsplash.com/photo-1543343132-73a7d2e06d91?auto=format&fit=crop&w=1200&q=80"} className="w-full h-full object-cover animate-ken-burns" alt="Host community" />
         </div>
         <div className="relative z-10 py-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">Devenez hôte <br/> sur Reseva.</h2>
            <p className="text-xl text-white/70 font-medium mb-10 leading-relaxed px-6">Gagnez jusqu'à 250 000 FCFA par mois en partageant votre espace ou votre véhicule avec la communauté.</p>
            <Link to="/become-a-host" className="inline-block bg-white text-black px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all-custom shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
               Commencer l'aventure
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Landing;