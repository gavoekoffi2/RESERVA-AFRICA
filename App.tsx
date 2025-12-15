import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/host/Dashboard';
import Calendar from './pages/host/Calendar';
import Messages from './pages/host/Messages';
import Properties from './pages/host/Properties';
import AddProperty from './pages/host/AddProperty';
import EditProperty from './pages/host/EditProperty';
import HostSettings from './pages/host/Settings';
import SearchCars from './pages/guest/SearchCars';
import CarDetails from './pages/guest/CarDetails';
import SearchAttractions from './pages/guest/SearchAttractions';
import AttractionDetails from './pages/guest/AttractionDetails';
import SearchStays from './pages/guest/SearchStays';
import StayDetails from './pages/guest/StayDetails';
import AirportTaxi from './pages/guest/AirportTaxi';
import Landing from './pages/guest/Landing';
import Profile from './pages/account/Profile';
import Bookings from './pages/account/Bookings';
import Favorites from './pages/account/Favorites';
import GuestMessages from './pages/account/Messages';
import Security from './pages/account/Security';
import Notifications from './pages/account/Notifications';
import HostProfile from './pages/guest/HostProfile';
import BookingDetails from './pages/guest/BookingDetails';
import Payment from './pages/guest/Payment';
import Confirmation from './pages/guest/Confirmation';
import HelpCenter from './pages/support/HelpCenter';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import NotFound from './pages/NotFound';

// --- Context & Globals ---
// In a real app, use React Context. Here we pass props or use local state for the prototype.

// --- Components ---

const LanguageCurrencyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 text-gray-900 dark:text-white">Paramètres régionaux</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Langue</h3>
              <div className="space-y-2 text-gray-800 dark:text-gray-200">
                <button className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-primary text-primary font-bold">
                  <span>Français (CA)</span>
                  <span className="material-symbols-outlined">check_circle</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent transition-colors">
                  <span>English (US)</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent transition-colors">
                  <span>Español</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Devise</h3>
              <div className="space-y-2 text-gray-800 dark:text-gray-200">
                <button className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-primary text-primary font-bold">
                  <span>FCFA (XOF)</span>
                  <span className="font-mono">CFA</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent transition-colors">
                  <span>Euro</span>
                  <span className="font-mono">€</span>
                </button>
                <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent transition-colors">
                  <span>US Dollar</span>
                  <span className="font-mono">$</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button onClick={onClose} className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ toggleTheme: () => void; isDark: boolean }> = ({ toggleTheme, isDark }) => {
  const location = useLocation();
  const isHost = location.pathname.startsWith('/host');
  const isLanding = location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isHost) return null;

  const isTransparent = isLanding && !isScrolled;
  
  const headerClasses = `fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out px-4 md:px-10 ${
    isTransparent 
      ? 'bg-transparent py-6' 
      : 'bg-white/90 dark:bg-[#1a202c]/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100 dark:border-gray-800'
  }`;

  const textClass = isTransparent ? 'text-white' : 'text-gray-900 dark:text-white';
  const logoBgClass = isTransparent ? 'bg-white text-primary' : 'bg-primary text-white';
  const navLinkClass = (isActive: boolean) => `
    px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 
    ${isTransparent 
      ? (isActive ? 'bg-white/20 text-white backdrop-blur-sm' : 'text-white/90 hover:bg-white/10 hover:text-white') 
      : (isActive ? 'bg-gray-100 dark:bg-gray-800 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
    }
  `;

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-[1920px] mx-auto flex items-center justify-between h-full">
          
          <Link to="/" className={`flex items-center gap-3 group ${textClass}`}>
            <div className={`size-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${logoBgClass}`}>
              <span className="material-symbols-outlined text-2xl">travel_explore</span>
            </div>
            <h2 className="hidden md:block text-xl font-black tracking-tight leading-none">
              Reseva<span className="text-primary">.</span>
            </h2>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/search/stays" className={navLinkClass(location.pathname.includes('/search/stays'))}>
              Hébergements
            </Link>
            <Link to="/search/cars" className={navLinkClass(location.pathname.includes('/search/cars'))}>
              Voitures
            </Link>
            <Link to="/search/attractions" className={navLinkClass(location.pathname.includes('/search/attractions'))}>
              Attractions
            </Link>
            <Link to="/taxi" className={navLinkClass(location.pathname.includes('/taxi'))}>
              Taxis
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Host Mode Button - Enhanced */}
            <Link 
              to="/host/dashboard" 
              className={`hidden md:flex items-center gap-2 text-sm font-extrabold px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-lg border-2 ${
                isTransparent 
                  ? 'bg-white/10 border-white text-white hover:bg-white hover:text-black backdrop-blur-md' 
                  : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary'
              }`}
            >
              <span>Devenir hôte</span>
            </Link>
            
            {/* Tools (Lang + Theme) */}
            <div className="hidden md:flex items-center gap-1 mr-2 ml-2">
                <button onClick={() => setLangModalOpen(true)} className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span className="material-symbols-outlined text-[20px]">language</span>
                </button>
                <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </div>

            {/* Profile Menu */}
            <div className={`hidden md:flex items-center gap-1 rounded-full p-1 pl-2 border cursor-pointer hover:shadow-md transition-all ${
                isTransparent 
                  ? 'bg-black/20 border-white/30 backdrop-blur-md text-white' 
                  : 'bg-white dark:bg-[#1e293b] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
               <span className="material-symbols-outlined ml-2 text-[20px]">menu</span>
               <Link to="/account/profile" className="ml-2 size-8 rounded-full bg-gray-300 bg-cover bg-center border-2 border-white dark:border-gray-600" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200")'}}></Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-full ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
               <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {!isLanding && <div className="h-20" />}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className="relative w-[80%] max-w-sm h-full bg-white dark:bg-[#1a202c] shadow-2xl p-6 flex flex-col animate-fade-in-right">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-primary">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200">
                   <span className="material-symbols-outlined">close</span>
                </button>
             </div>

             {/* Mobile Theme & Lang Controls */}
             <div className="flex gap-4 mb-6">
                <button onClick={() => { setLangModalOpen(true); setMobileMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold text-sm text-gray-800 dark:text-white">
                    <span className="material-symbols-outlined text-lg">language</span> Français (XOF)
                </button>
                <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold text-sm text-gray-800 dark:text-white">
                    <span className="material-symbols-outlined text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span> {isDark ? 'Clair' : 'Sombre'}
                </button>
             </div>

             <nav className="flex flex-col gap-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                   <span className="material-symbols-outlined text-primary">home</span> Accueil
                </Link>
                <Link to="/search/stays" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                   <span className="material-symbols-outlined text-primary">bed</span> Hébergements
                </Link>
                <Link to="/search/cars" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                   <span className="material-symbols-outlined text-primary">directions_car</span> Voitures
                </Link>
                <Link to="/search/attractions" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                   <span className="material-symbols-outlined text-primary">attractions</span> Attractions
                </Link>
                 <Link to="/taxi" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                   <span className="material-symbols-outlined text-primary">local_taxi</span> Taxis Aéroport
                </Link>
             </nav>

             <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800">
                <Link to="/host/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between gap-4 p-4 bg-primary text-white hover:bg-[#d65a1f] rounded-2xl mb-4 font-bold shadow-lg shadow-primary/30">
                   <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined">dashboard</span> Espace Hôte
                   </span>
                   <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined">login</span> Connexion
                </Link>
             </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      <LanguageCurrencyModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />
    </>
  );
};

const HostLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300';

  const NavLinks = () => (
    <>
      <Link to="/host/dashboard" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/host/dashboard')}`}>
        <span className="material-symbols-outlined">dashboard</span> Tableau de bord
      </Link>
      <Link to="/host/properties" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/host/properties')}`}>
        <span className="material-symbols-outlined">domain</span> Mes propriétés
      </Link>
      <Link to="/host/calendar" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/host/calendar')}`}>
        <span className="material-symbols-outlined">calendar_month</span> Calendrier
      </Link>
      <Link to="/host/messages" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/host/messages')}`}>
        <span className="material-symbols-outlined">mail</span> Messagerie
      </Link>
      <Link to="/host/settings" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/host/settings')}`}>
        <span className="material-symbols-outlined">settings</span> Paramètres
      </Link>
      <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>
      <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-primary transition-colors">
        <span className="material-symbols-outlined">arrow_back</span> Retour au site
      </Link>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark flex-col lg:flex-row font-display">
      <div className="lg:hidden bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center shrink-0">
         <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-1.5 text-primary">
              <span className="material-symbols-outlined text-xl">travel_explore</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Espace Hôte</span>
         </div>
         <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
         </button>
      </div>

      <aside className="hidden lg:flex flex-col w-72 h-full bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-gray-800">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-2 flex items-center justify-center size-10 text-primary">
            <span className="material-symbols-outlined text-2xl">travel_explore</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Reseva Africa</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Extranet Hôte</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <NavLinks />
        </nav>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex lg:hidden">
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
           <div className="relative bg-white dark:bg-[#1e293b] w-4/5 max-w-sm h-full shadow-2xl flex flex-col animate-fade-in-right">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                 <h2 className="font-bold text-lg text-gray-900 dark:text-white">Menu Hôte</h2>
                 <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined text-gray-900 dark:text-white">close</span>
                 </button>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                 <NavLinks />
              </nav>
           </div>
        </div>
      )}

      <main className="flex-1 overflow-auto relative">
        <Outlet />
      </main>
    </div>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/host')) return null;
  
  return (
    <footer className="mt-auto border-t border-[#f3ebe7] dark:border-gray-800 bg-gray-50 dark:bg-[#1a202c]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined text-3xl">travel_explore</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reseva Africa</h2>
          </div>
          <p className="text-gray-500 text-sm">La plateforme numéro 1 pour voyager au Togo et en Afrique de l'Ouest. Hébergements de luxe, voitures et expériences uniques.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Découvrir</h3>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/search/stays" className="hover:text-primary">Hébergements</Link></li>
            <li><Link to="/search/cars" className="hover:text-primary">Voitures</Link></li>
            <li><Link to="/search/attractions" className="hover:text-primary">Attractions</Link></li>
            <li><Link to="/taxi" className="hover:text-primary">Taxis aéroport</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Support</h3>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/support" className="hover:text-primary">Centre d'aide</Link></li>
            <li><Link to="/support" className="hover:text-primary">Annulation</Link></li>
            <li><Link to="/support" className="hover:text-primary">Sécurité</Link></li>
            <li><Link to="/support" className="hover:text-primary">Nous contacter</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Informations</h3>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
             <li><Link to="/legal/terms" className="hover:text-primary">Conditions générales</Link></li>
             <li><Link to="/legal/privacy" className="hover:text-primary">Confidentialité</Link></li>
          </ul>
          <div className="flex gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
             <button className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">XOF</button>
             <button className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">EUR</button>
             <button className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">USD</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center">
        <p className="text-text-secondary dark:text-gray-500 text-sm">© 2024 Reseva Africa. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header toggleTheme={toggleTheme} isDark={theme === 'dark'} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Guest Routes - Stays */}
          <Route path="/search/stays" element={<SearchStays />} />
          <Route path="/search/stays/:id" element={<StayDetails />} />
          
          {/* Guest Routes - Cars */}
          <Route path="/search/cars" element={<SearchCars />} />
          <Route path="/search/cars/:id" element={<CarDetails />} />
          
          {/* Guest Routes - Attractions */}
          <Route path="/search/attractions" element={<SearchAttractions />} />
          <Route path="/search/attractions/:id" element={<AttractionDetails />} />
          
          {/* Guest Routes - Taxi */}
          <Route path="/taxi" element={<AirportTaxi />} />
          
          {/* Shared Checkout flow */}
          <Route path="/booking/details" element={<BookingDetails />} />
          <Route path="/booking/payment" element={<Payment />} />
          <Route path="/booking/confirmation" element={<Confirmation />} />
          
          {/* Account Routes */}
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/favorites" element={<Favorites />} />
          <Route path="/account/messages" element={<GuestMessages />} />
          <Route path="/account/security" element={<Security />} />
          <Route path="/account/notifications" element={<Notifications />} />
          
          {/* Public Profiles */}
          <Route path="/users/:id" element={<HostProfile />} />

          {/* Support */}
          <Route path="/support" element={<HelpCenter />} />

          {/* Legal */}
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />

          {/* Host Routes */}
          <Route path="/host" element={<HostLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/add" element={<AddProperty />} />
            <Route path="properties/edit/:id" element={<EditProperty />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<HostSettings />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;