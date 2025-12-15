import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Outlet, Navigate } from 'react-router-dom';
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
import { AppProvider, useApp, User } from './context/AppContext';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminUsers from './pages/admin/AdminUsers';
import AdminFinance from './pages/admin/AdminFinance';

// --- Types ---
interface LocationSettings {
  city: string;
  country: string;
  currency: string;
  symbol: string;
  lang: string;
  flag: string;
}

// --- Mappings ---
const TIMEZONE_MAP: Record<string, LocationSettings> = {
  'Africa/Abidjan': { city: 'Abidjan', country: "Côte d'Ivoire", currency: 'XOF', symbol: 'CFA', lang: 'Français', flag: '🇨🇮' },
  'Africa/Dakar': { city: 'Dakar', country: 'Sénégal', currency: 'XOF', symbol: 'CFA', lang: 'Français', flag: '🇸🇳' },
  'Africa/Lome': { city: 'Lomé', country: 'Togo', currency: 'XOF', symbol: 'CFA', lang: 'Français', flag: '🇹🇬' },
  'Africa/Accra': { city: 'Accra', country: 'Ghana', currency: 'GHS', symbol: 'GH₵', lang: 'English', flag: '🇬🇭' },
  'Africa/Lagos': { city: 'Lagos', country: 'Nigeria', currency: 'NGN', symbol: '₦', lang: 'English', flag: '🇳🇬' },
  'Africa/Douala': { city: 'Douala', country: 'Cameroun', currency: 'XAF', symbol: 'FCFA', lang: 'Français', flag: '🇨🇲' },
  'Europe/Paris': { city: 'Paris', country: 'France', currency: 'EUR', symbol: '€', lang: 'Français', flag: '🇫🇷' },
  'America/New_York': { city: 'New York', country: 'USA', currency: 'USD', symbol: '$', lang: 'English', flag: '🇺🇸' },
};

const DEFAULT_LOCATION: LocationSettings = { city: 'Lomé', country: 'Togo', currency: 'XOF', symbol: 'CFA', lang: 'Français', flag: '🇹🇬' };

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LocationToast: React.FC<{ settings: LocationSettings; visible: boolean; onClose: () => void }> = ({ settings, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[200] animate-fade-up">
      <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-2xl border border-primary/20 flex items-center gap-4 max-w-sm">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">
          {settings.flag}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">Localisation détectée</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Bienvenue à {settings.city}. Devise réglée sur {settings.currency}.
          </p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
};

const LanguageCurrencyModal: React.FC<{ isOpen: boolean; onClose: () => void; currentSettings: LocationSettings }> = ({ isOpen, onClose, currentSettings }) => {
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
                <button className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-colors ${currentSettings.lang.includes('Français') ? 'bg-gray-50 dark:bg-gray-800 border-primary text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'}`}>
                  <span>Français</span>
                  {currentSettings.lang.includes('Français') && <span className="material-symbols-outlined">check_circle</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-colors ${currentSettings.lang.includes('English') ? 'bg-gray-50 dark:bg-gray-800 border-primary text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'}`}>
                  <span>English</span>
                  {currentSettings.lang.includes('English') && <span className="material-symbols-outlined">check_circle</span>}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Devise</h3>
              <div className="space-y-2 text-gray-800 dark:text-gray-200">
                <button className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-colors ${currentSettings.currency === 'XOF' ? 'bg-gray-50 dark:bg-gray-800 border-primary text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'}`}>
                  <span>FCFA (XOF)</span>
                  <span className="font-mono">CFA</span>
                </button>
                <button className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-colors ${currentSettings.currency === 'EUR' ? 'bg-gray-50 dark:bg-gray-800 border-primary text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'}`}>
                  <span>Euro</span>
                  <span className="font-mono">€</span>
                </button>
                <button className={`flex items-center justify-between w-full p-3 rounded-xl border-2 transition-colors ${currentSettings.currency === 'USD' ? 'bg-gray-50 dark:bg-gray-800 border-primary text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'}`}>
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

const Header: React.FC<{ toggleTheme: () => void; isDark: boolean; settings: LocationSettings }> = ({ toggleTheme, isDark, settings }) => {
  const { user, logout } = useApp();
  const location = useLocation();
  const isHost = location.pathname.startsWith('/host');
  const isAdmin = location.pathname.startsWith('/admin');
  const isLanding = location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isHost || isAdmin) return null;

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
            {/* Host Mode Button - Enhanced (Only if not host already) */}
            <Link 
              to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/host/dashboard'} 
              className={`hidden md:flex items-center gap-2 text-sm font-extrabold px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-lg border-2 ${
                isTransparent 
                  ? 'bg-white/10 border-white text-white hover:bg-white hover:text-black backdrop-blur-md' 
                  : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary'
              }`}
            >
              <span>{user?.role === 'ADMIN' ? 'Admin' : user?.role === 'HOST' ? 'Tableau de bord' : 'Devenir hôte'}</span>
            </Link>
            
            {/* Tools (Lang + Theme) */}
            <div className="hidden md:flex items-center gap-1 mr-2 ml-2">
                <button onClick={() => setLangModalOpen(true)} className={`p-2 rounded-full transition-colors flex items-center gap-1 font-bold text-sm ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span className="material-symbols-outlined text-[20px]">language</span>
                    <span>{settings.currency}</span>
                </button>
                <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </div>

            {/* Profile Menu / Login Button */}
            {user ? (
                <div className="relative">
                    <div 
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className={`hidden md:flex items-center gap-1 rounded-full p-1 pl-2 border cursor-pointer hover:shadow-md transition-all ${
                            isTransparent 
                            ? 'bg-black/20 border-white/30 backdrop-blur-md text-white' 
                            : 'bg-white dark:bg-[#1e293b] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                    >
                        <span className="material-symbols-outlined ml-2 text-[20px]">menu</span>
                        <div className="ml-2 size-8 rounded-full bg-gray-300 bg-cover bg-center border-2 border-white dark:border-gray-600" style={{backgroundImage: `url("${user.avatar}")`}}></div>
                    </div>
                    {/* Dropdown Menu */}
                    {profileMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setProfileMenuOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-20 animate-fade-up">
                                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                                    <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <Link to="/account/profile" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"><span className="material-symbols-outlined text-[18px]">person</span> Mon profil</Link>
                                <Link to="/account/bookings" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"><span className="material-symbols-outlined text-[18px]">airplane_ticket</span> Mes voyages</Link>
                                <Link to="/account/favorites" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"><span className="material-symbols-outlined text-[18px]">favorite</span> Favoris</Link>
                                <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>
                                <button onClick={() => { logout(); setProfileMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"><span className="material-symbols-outlined text-[18px]">logout</span> Déconnexion</button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="hidden md:flex gap-2">
                    <Link to="/login" className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'}`}>
                        Connexion
                    </Link>
                    <Link to="/register" className={`px-4 py-2 rounded-full font-bold text-sm bg-white text-black hover:bg-gray-100 transition-colors`}>
                        Inscription
                    </Link>
                </div>
            )}

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
          
          <div className="relative w-[80%] max-w-sm h-full bg-white dark:bg-[#1a202c] shadow-2xl p-6 flex flex-col animate-fade-in-right overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-primary">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200">
                   <span className="material-symbols-outlined">close</span>
                </button>
             </div>

             {/* Mobile Theme & Lang Controls */}
             <div className="flex gap-4 mb-6">
                <button onClick={() => { setLangModalOpen(true); setMobileMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 font-bold text-sm text-gray-800 dark:text-white">
                    <span className="material-symbols-outlined text-lg">language</span> {settings.lang} ({settings.currency})
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

             <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                {user ? (
                    <>
                        <Link to="/account/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                            <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${user.avatar}")`}}></div>
                            <span className="font-bold">{user.name}</span>
                        </Link>
                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full py-4 bg-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">logout</span> Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">login</span> Connexion
                        </Link>
                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2">
                            Créer un compte
                        </Link>
                    </>
                )}
                
                <Link to="/host/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between gap-4 p-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold shadow-lg">
                   <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined">dashboard</span> Espace Hôte
                   </span>
                   <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
             </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      <LanguageCurrencyModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} currentSettings={settings} />
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

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useApp();

  // Protect Admin Route
  if (user?.role !== 'ADMIN') {
      return <Navigate to="/login" />;
  }

  const isActive = (path: string) => location.pathname === path ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300';

  const NavLinks = () => (
    <>
      <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/admin/dashboard')}`}>
        <span className="material-symbols-outlined">dashboard</span> Vue d'ensemble
      </Link>
      <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/admin/users')}`}>
        <span className="material-symbols-outlined">group</span> Utilisateurs
      </Link>
      <Link to="/admin/properties" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/admin/properties')}`}>
        <span className="material-symbols-outlined">rule</span> Modération
      </Link>
      <Link to="/admin/finance" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/admin/finance')}`}>
        <span className="material-symbols-outlined">payments</span> Finances
      </Link>
      <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>
      <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-black dark:hover:text-white transition-colors">
        <span className="material-symbols-outlined">public</span> Voir le site
      </Link>
      <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto">
        <span className="material-symbols-outlined">logout</span> Déconnexion
      </button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark flex-col lg:flex-row font-display">
      <div className="lg:hidden bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center shrink-0">
         <div className="flex items-center gap-2">
            <div className="bg-black text-white rounded-lg p-1.5">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Admin Panel</span>
         </div>
         <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
         </button>
      </div>

      <aside className="hidden lg:flex flex-col w-72 h-full bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-gray-800">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-black text-white rounded-xl p-2 flex items-center justify-center size-10">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Reseva Africa</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
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
                 <h2 className="font-bold text-lg text-gray-900 dark:text-white">Menu Admin</h2>
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

const Footer: React.FC<{ settings: LocationSettings }> = ({ settings }) => {
  const location = useLocation();
  if (location.pathname.startsWith('/host') || location.pathname.startsWith('/admin')) return null;
  
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
          <p className="text-gray-500 text-sm">La plateforme numéro 1 pour voyager au {settings.country} et en Afrique de l'Ouest. Hébergements de luxe, voitures et expériences uniques.</p>
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
             <button className={`px-2 py-1 rounded transition-colors ${settings.currency === 'XOF' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>XOF</button>
             <button className={`px-2 py-1 rounded transition-colors ${settings.currency === 'EUR' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>EUR</button>
             <button className={`px-2 py-1 rounded transition-colors ${settings.currency === 'USD' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>USD</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center">
        <p className="text-text-secondary dark:text-gray-500 text-sm">© 2024 Reseva Africa ({settings.country}). Tous droits réservés.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Location & Settings Management
  const [locationSettings, setLocationSettings] = useState<LocationSettings>(DEFAULT_LOCATION);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Simulate Location Detection
  useEffect(() => {
    const detectLocation = () => {
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const detected = TIMEZONE_MAP[timeZone];
            
            if (detected) {
                setLocationSettings(detected);
                setShowToast(true);
                // Hide toast after 5 seconds
                setTimeout(() => setShowToast(false), 5000);
            }
        } catch (error) {
            console.error("Location detection failed", error);
        }
    };

    detectLocation();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppProvider>
        <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
            <Header toggleTheme={toggleTheme} isDark={theme === 'dark'} settings={locationSettings} />
            <LocationToast settings={locationSettings} visible={showToast} onClose={() => setShowToast(false)} />
            <Routes>
            <Route path="/" element={<Landing detectedLocation={locationSettings} />} />
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

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="finance" element={<AdminFinance />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer settings={locationSettings} />
        </div>
        </HashRouter>
    </AppProvider>
  );
};

export default App;