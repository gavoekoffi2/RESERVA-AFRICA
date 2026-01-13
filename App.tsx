import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
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
import HostWallet from './pages/host/Wallet';
import HostReviews from './pages/host/Reviews';
import ReservationDetails from './pages/host/ReservationDetails';
import SearchCars from './pages/guest/SearchCars';
import CarDetails from './pages/guest/CarDetails';
import SearchExperiences from './pages/guest/SearchExperiences';
import ExperienceDetails from './pages/guest/ExperienceDetails';
import SearchStays from './pages/guest/SearchStays';
import StayDetails from './pages/guest/StayDetails';
import AirportTaxi from './pages/guest/AirportTaxi';
import Landing from './pages/guest/Landing';
import BecomeHost from './pages/guest/BecomeHost';
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
import TrustSafety from './pages/support/TrustSafety';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import NotFound from './pages/NotFound';

// --- Admin Imports ---
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminUsers from './pages/admin/AdminUsers';
import AdminFinance from './pages/admin/AdminFinance';
import AdminTeam from './pages/admin/AdminTeam';
import AdminSystemSettings from './pages/admin/AdminSystemSettings';
import AdminBookings from './pages/admin/AdminBookings';
import AdminMedia from './pages/admin/AdminMedia';
import AdminRequests from './pages/admin/AdminRequests';

import { AppProvider, useApp } from './context/AppContext';

// --- Types ---
interface LocationSettings {
  city: string;
  country: string;
  currency: string;
  symbol: string;
  lang: string;
  flag: string;
}

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

const ToastContainer = () => {
    const { notifications, removeNotification } = useApp();
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-3 w-full max-w-sm px-4">
            {notifications.map(n => (
                <div key={n.id} className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border border-white/20 animate-fade-up ${
                    n.type === 'success' ? 'bg-green-600 text-white' :
                    n.type === 'error' ? 'bg-red-600 text-white' :
                    'bg-black text-white'
                }`}>
                    <span className="material-symbols-outlined">
                        {n.type === 'success' ? 'check_circle' : n.type === 'error' ? 'error' : 'info'}
                    </span>
                    <p className="font-bold text-sm flex-1">{n.message}</p>
                    <button onClick={() => removeNotification(n.id)} className="opacity-50 hover:opacity-100"><span className="material-symbols-outlined text-sm">close</span></button>
                </div>
            ))}
        </div>
    );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user } = useApp();
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

const Header: React.FC<{ toggleTheme: () => void; isDark: boolean; settings: LocationSettings }> = ({ toggleTheme, isDark, settings }) => {
  const { user, logout, unreadMessageCount, unreadNotificationCount, siteAssets } = useApp();
  const location = useLocation();
  const isHost = location.pathname.startsWith('/host');
  const isAdmin = location.pathname.startsWith('/admin');
  const isLanding = location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  if (isHost || isAdmin) return null;

  const isTransparent = isLanding && !isScrolled;
  
  const headerClasses = `fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out px-4 md:px-10 ${
    isTransparent 
      ? 'bg-transparent py-4' 
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
          <div className="flex items-center gap-4">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 rounded-full ${textClass} hover:bg-black/5`}>
                <span className="material-symbols-outlined text-[28px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
             </button>
             <Link to="/" className={`flex items-center gap-3 group ${textClass}`}>
                {siteAssets?.site_logo?.url ? (
                    <img src={siteAssets.site_logo.url} className="h-10 w-auto object-contain" alt="Reserve Africa" />
                ) : (
                    <>
                        <div className={`size-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${logoBgClass}`}>
                        <span className="material-symbols-outlined text-2xl">travel_explore</span>
                        </div>
                        <h2 className="hidden md:block text-xl font-black tracking-tight leading-none italic">Reseva <span className="text-primary not-italic">Africa.</span></h2>
                    </>
                )}
             </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/search/stays" className={navLinkClass(location.pathname.includes('/search/stays'))}>Séjours</Link>
            <Link to="/search/cars" className={navLinkClass(location.pathname.includes('/search/cars'))}>Voitures</Link>
            <Link to="/search/experiences" className={navLinkClass(location.pathname.includes('/search/experiences'))}>Expériences</Link>
            <Link to="/taxi" className={navLinkClass(location.pathname.includes('/taxi'))}>Airport Taxi</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link 
              to={user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN' ? '/admin/dashboard' : user?.role === 'HOST' ? '/host/dashboard' : '/become-a-host'} 
              className={`hidden md:flex items-center gap-2 text-sm font-extrabold px-5 py-2.5 rounded-full transition-all shadow-lg border-2 ${
                isTransparent ? 'bg-white/10 border-white text-white hover:bg-white hover:text-black' : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary'
              }`}
            >
              <span>{user?.role === 'SUPER_ADMIN' ? 'Super Admin' : user?.role === 'ADMIN' ? 'Admin' : user?.role === 'HOST' ? 'Tableau de bord' : 'Devenir hôte'}</span>
            </Link>
            
            <div className="flex items-center gap-1 mr-2 ml-2">
                <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span className="material-symbols-outlined text-[24px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </div>

            {user ? (
                <div className="relative">
                    <div onClick={() => setProfileMenuOpen(!profileMenuOpen)} className={`flex items-center gap-1 rounded-full p-1 border cursor-pointer hover:shadow-md transition-all relative ${isTransparent ? 'bg-black/20 border-white/30 text-white' : 'bg-white dark:bg-[#1e293b] border-gray-200 dark:border-gray-700'}`}>
                        <div className="ml-1 size-9 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-600 shadow-sm" style={{backgroundImage: `url("${user.avatar}")`}}></div>
                        {(unreadMessageCount + unreadNotificationCount) > 0 && <span className="absolute -top-1 -right-1 size-4 font-black text-gray-900 bg-primary border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>}
                        <span className="material-symbols-outlined ml-1 mr-1 text-[20px] hidden md:block">expand_more</span>
                    </div>
                    {profileMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setProfileMenuOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#1e293b] rounded-[24px] shadow-2xl border border-gray-100 dark:border-gray-700 py-3 z-20 animate-fade-up overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 mb-2 border-b border-gray-100 dark:border-gray-700">
                                    <p className="font-black text-gray-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate font-bold uppercase tracking-widest">{user.role}</p>
                                </div>
                                <div className="px-2 space-y-1">
                                    <Link to="/account/profile" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-4 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"><span className="material-symbols-outlined text-[20px]">person</span> Profil</Link>
                                    <Link to="/account/bookings" onClick={() => setProfileMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4"><span className="material-symbols-outlined text-[20px]">confirmation_number</span> Voyages</div>
                                    </Link>
                                    <Link to="/account/messages" onClick={() => setProfileMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4"><span className="material-symbols-outlined text-[20px]">chat</span> Messages</div>
                                        {unreadMessageCount > 0 && <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-black">{unreadMessageCount}</span>}
                                    </Link>
                                    <div className="my-2 border-t border-gray-100 dark:border-gray-700"></div>
                                    <button onClick={() => { logout(); setProfileMenuOpen(false); }} className="w-full text-left flex items-center gap-4 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"><span className="material-symbols-outlined text-[20px]">logout</span> Déconnexion</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="flex gap-2">
                    <Link to="/login" className={`px-5 py-2.5 rounded-full font-bold text-sm ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}>Connexion</Link>
                    <Link to="/register" className="px-5 py-2.5 rounded-full font-bold text-sm bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">Inscription</Link>
                </div>
            )}
          </div>
        </div>
      </header>
      {!isLanding && <div className="h-20" />}
    </>
  );
};

const App: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [locationSettings, setLocationSettings] = useState<LocationSettings>(DEFAULT_LOCATION);
    const [showToast, setShowToast] = useState(false);
  
    useEffect(() => {
      const root = window.document.documentElement;
      if (theme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    useEffect(() => {
      const detectLocation = () => {
          try {
              const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const detected = TIMEZONE_MAP[timeZone];
              if (detected) { setLocationSettings(detected); setShowToast(true); setTimeout(() => setShowToast(false), 5000); }
          } catch (error) { console.error(error); }
      };
      detectLocation();
    }, []);
  
    return (
      <AppProvider>
          <HashRouter>
          <ScrollToTop />
          <ToastContainer />
          <div className="flex flex-col min-h-screen">
              <Header toggleTheme={() => setTheme(p => p === 'dark' ? 'light' : 'dark')} isDark={theme === 'dark'} settings={locationSettings} />
              <LocationToast settings={locationSettings} visible={showToast} onClose={() => setShowToast(false)} />
              <Routes>
              <Route path="/" element={<Landing detectedLocation={locationSettings} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              <Route path="/search/stays" element={<SearchStays />} />
              <Route path="/search/stays/:id" element={<StayDetails />} />
              <Route path="/search/cars" element={<SearchCars />} />
              <Route path="/search/cars/:id" element={<CarDetails />} />
              <Route path="/search/experiences" element={<SearchExperiences />} />
              <Route path="/search/experiences/:id" element={<ExperienceDetails />} />
              <Route path="/taxi" element={<AirportTaxi />} />
              
              <Route path="/become-a-host" element={<BecomeHost />} />
              <Route path="/booking/details" element={<BookingDetails />} />
              <Route path="/booking/payment" element={<Payment />} />
              <Route path="/booking/confirmation" element={<Confirmation />} />
              
              <Route path="/account/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/account/bookings" element={<RequireAuth><Bookings /></RequireAuth>} />
              <Route path="/account/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
              <Route path="/account/messages" element={<RequireAuth><GuestMessages /></RequireAuth>} />
              <Route path="/account/security" element={<RequireAuth><Security /></RequireAuth>} />
              <Route path="/account/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
              
              <Route path="/users/:id" element={<HostProfile />} />
              <Route path="/support" element={<HelpCenter />} />
              <Route path="/support/trust" element={<TrustSafety />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
  
              <Route path="/host" element={<HostLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="properties" element={<Properties />} />
                  <Route path="properties/add" element={<AddProperty />} />
                  <Route path="properties/edit/:id" element={<EditProperty />} />
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="reviews" element={<HostReviews />} />
                  <Route path="settings" element={<HostSettings />} />
                  <Route path="wallet" element={<HostWallet />} />
                  <Route path="reservation/:id" element={<ReservationDetails />} />
              </Route>
  
              <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="properties" element={<AdminProperties />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="requests" element={<AdminRequests />} />
                  <Route path="finance" element={<AdminFinance />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="system" element={<AdminSystemSettings />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="media" element={<AdminMedia />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer settings={locationSettings} />
          </div>
          </HashRouter>
      </AppProvider>
    );
};

const LocationToast: React.FC<{ settings: LocationSettings; visible: boolean; onClose: () => void }> = ({ settings, visible, onClose }) => {
    if (!visible) return null;
    return (
      <div className="fixed bottom-6 right-6 z-[200] animate-fade-up">
        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-2xl border border-primary/20 flex items-center gap-4 max-w-sm">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">{settings.flag}</div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Localisation détectée</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bienvenue à {settings.city}. Devise réglée sur {settings.currency}.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400"><span className="material-symbols-outlined text-lg">close</span></button>
        </div>
      </div>
    );
};

const Footer: React.FC<{ settings: LocationSettings }> = ({ settings }) => {
    const location = useLocation();
    const { siteAssets } = useApp();
    if (location.pathname.startsWith('/host') || location.pathname.startsWith('/admin')) return null;
    return (
      <footer className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1a202c]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-6">
                {siteAssets?.site_logo?.url ? (
                    <img src={siteAssets.site_logo.url} className="h-10 w-auto object-contain" alt="Reserve Africa" />
                ) : (
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white italic">Reseva <span className="text-primary not-italic">Africa.</span></h2>
                )}
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">La plateforme numéro 1 pour voyager, loger et se déplacer en toute confiance en Afrique.</p>
            <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary transition-all"><i className="material-symbols-outlined text-xl">share</i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary transition-all"><i className="material-symbols-outlined text-xl">public</i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary transition-all"><i className="material-symbols-outlined text-xl">thumb_up</i></a>
            </div>
          </div>
          <div><h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Découvrir</h3><ul className="space-y-3 text-sm font-bold text-gray-500"><li><Link to="/search/stays" className="hover:text-primary transition-colors">Séjours</Link></li><li><Link to="/search/cars" className="hover:text-primary transition-colors">Voitures</Link></li><li><Link to="/search/experiences" className="hover:text-primary transition-colors">Expériences</Link></li><li><Link to="/taxi" className="hover:text-primary transition-colors">Airport Taxi</Link></li></ul></div>
          <div><h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Support</h3><ul className="space-y-3 text-sm font-bold text-gray-500"><li><Link to="/support" className="hover:text-primary transition-colors">Centre d'aide</Link></li><li><Link to="/support/trust" className="hover:text-primary transition-colors">Confiance & Sécurité</Link></li><li><Link to="/become-a-host" className="hover:text-primary transition-colors">Devenir Hôte</Link></li></ul></div>
          <div><h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Légal</h3><ul className="space-y-3 text-sm font-bold text-gray-500"><li><Link to="/legal/terms" className="hover:text-primary transition-colors">Conditions</Link></li><li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Confidentialité</Link></li></ul></div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 py-8 text-center px-4">
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">© 2023 Reseva Africa. Tous droits réservés.</p>
        </div>
      </footer>
    );
};

const HostLayout = () => {
    const { user } = useApp();
    const location = useLocation();
    if (!user || (user.role !== 'HOST' && user.role !== 'SUPER_ADMIN')) return <Navigate to="/become-a-host" />;
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#f7f9fc] dark:bg-[#0f1115] font-display">
            <aside className="w-72 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-gray-800 hidden lg:flex flex-col">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="font-black text-xl text-primary tracking-tighter uppercase">RESEVA HOST</h2>
                </div>
                <nav className="p-4 space-y-1 flex-1">
                    {[
                        { path: '/host/dashboard', label: 'Dashboard', icon: 'dashboard' },
                        { path: '/host/properties', label: 'Mes Annonces', icon: 'home_work' },
                        { path: '/host/calendar', label: 'Calendrier', icon: 'calendar_today' },
                        { path: '/host/wallet', label: 'Revenus', icon: 'payments' },
                        { path: '/host/messages', label: 'Messages', icon: 'chat' },
                        { path: '/host/reviews', label: 'Avis', icon: 'star' },
                    ].map(link => (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            className={`flex items-center gap-4 px-5 py-3 rounded-2xl font-black text-sm transition-all ${location.pathname === link.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                            <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 mt-auto">
                    <Link to="/" className="flex items-center gap-4 px-5 py-3 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        <span className="material-symbols-outlined">exit_to_app</span>
                        Retour au site
                    </Link>
                </div>
            </aside>
            <main className="flex-1 overflow-auto"><Outlet /></main>
        </div>
    );
};

const AdminLayout = () => {
    const { user } = useApp();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) return <Navigate to="/" />;
    return (
        <div className="flex h-screen overflow-hidden font-display">
            <aside className="w-72 bg-black text-white flex flex-col shrink-0">
                <div className="p-8 border-b border-white/10">
                   <h2 className="text-xl font-black tracking-tight">ADMIN PANEL</h2>
                </div>
                <nav className="p-4 flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">dashboard</span> Dashboard</Link>
                    <Link to="/admin/requests" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">how_to_reg</span> Candidatures</Link>
                    <Link to="/admin/properties" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">rule</span> Modération</Link>
                    <Link to="/admin/bookings" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">book_online</span> Réservations</Link>
                    <Link to="/admin/users" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">group</span> Utilisateurs</Link>
                    <Link to="/admin/finance" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">payments</span> Finances</Link>
                    <Link to="/admin/media" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">image</span> Médiathèque</Link>
                    <Link to="/admin/team" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">admin_panel_settings</span> Équipe</Link>
                    <div className="mt-auto pt-4 border-t border-white/10">
                        <Link to="/admin/system" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">settings</span> Configuration</Link>
                        <Link to="/" className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-2xl transition-colors font-bold"><span className="material-symbols-outlined">home</span> Retour Site</Link>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-black"><Outlet /></main>
        </div>
    );
};

export default App;