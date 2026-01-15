import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: 'GUEST' | 'HOST' | 'ADMIN' | 'SUPER_ADMIN';
  status?: 'Active' | 'Suspended';
  verificationStatus?: 'unverified' | 'pending' | 'verified';
  verificationDoc?: string;
  joinDate?: string;
  permissions?: string[];
  bio?: string;
  location?: string;
  phone?: string;
}

export interface HostApplication {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    businessName: string;
    domain: 'Hébergement' | 'Voiture' | 'Expérience';
    description: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    timestamp: string;
    phone: string;
}

export interface VerificationRequest {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    documentType: string;
    documentUrl: string;
    timestamp: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Booking {
  id: string;
  title: string;
  location: string;
  dates: string;
  image: string;
  price: string;
  status: 'Confirmé' | 'En attente' | 'Annulé' | 'Terminé';
  type: 'stay' | 'car' | 'experience';
  hostName?: string;
  hostId?: string;
  guestName?: string;
  guestId?: string;
  guestAvatar?: string;
  totalAmount?: number;
  commission?: number;
  payoutStatus?: 'Paid' | 'Pending' | 'Withdrawn';
  bookingDate?: string;
  propertyId?: number;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  type: 'Hébergement' | 'Voiture' | 'Expérience';
  price: string;
  rawPrice: number;
  image: string;
  status: 'En ligne' | 'Brouillon' | 'En attente' | 'Rejeté';
  owner?: string;
  ownerId?: string;
  category?: string;
  features?: string[];
  capacity?: number;
  rating?: number;
  reviews?: number;
  description?: string;
  coordinates?: { lat: number; lng: number };
  blockedDates?: string[];
  rejectionReason?: string;
}

export interface Review {
  id: string;
  propertyId: number;
  bookingId?: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'booking' | 'system' | 'promotion' | 'verification';
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: 'payout' | 'withdrawal';
    status: 'Completed' | 'Pending';
    label: string;
}

export interface SystemSettings {
    commissionRate: number;
    serviceFeeRate: number;
    maintenanceMode: boolean;
}

export interface SiteAsset {
    id: string;
    name: string;
    url: string;
    category: 'image' | 'text' | 'logo';
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  registerUser: (userData: User) => void;
  submitVerification: (docType: string, docUrl: string) => void;
  verificationRequests: VerificationRequest[];
  approveVerification: (id: string) => void;
  rejectVerification: (id: string, reason: string) => void;
  submitHostApplication: (app: Omit<HostApplication, 'id' | 'userId' | 'userName' | 'userEmail' | 'status' | 'timestamp'>) => void;
  hostApplications: HostApplication[];
  approveHostApplication: (id: string) => void;
  rejectHostApplication: (id: string, reason: string) => void;
  toggleUserRole: (email: string) => void;
  toggleUserStatus: (email: string) => void;
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  checkAvailability: (propertyId: number, start: Date, end: Date) => boolean;
  properties: Property[];
  allProperties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  updatePropertyStatus: (id: number, status: Property['status'], reason?: string) => void;
  togglePropertyBlock: (propertyId: number, date: string) => void;
  reviews: Review[];
  addReview: (propertyId: number, rating: number, comment: string, bookingId: string) => void;
  messages: Message[];
  sendMessage: (senderId: string, receiverId: string, text: string) => void;
  markMessagesRead: (otherUserId: string) => void;
  unreadMessageCount: number;
  allUsers: User[];
  createAdmin: (admin: User) => void;
  notifications: Notification[];
  systemNotifications: SystemNotification[];
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;
  isLoading: boolean;
  systemSettings: SystemSettings;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  transactions: Transaction[];
  requestWithdrawal: (amount: number) => void;
  siteAssets: Record<string, SiteAsset>;
  updateSiteAsset: (id: string, url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- UPDATED MOCK DATA WITH FIXED IMAGE LINKS ---
const MOCK_PROPERTIES: Property[] = [
  { 
    id: 1, 
    title: 'Villa Emeraude Prestige', 
    location: 'Lomé, Baguida', 
    type: 'Hébergement', 
    category: 'Villa', 
    price: '250 000 F', 
    rawPrice: 250000, 
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 
    status: 'En ligne', 
    owner: 'Kodjo Mensah', 
    ownerId: 'u2', 
    features: ['Infinity Pool', 'Staff inclus', 'Vue Mer'], 
    capacity: 10, 
    rating: 5.0, 
    reviews: 42, 
    coordinates: { lat: 6.1366, lng: 1.2222 }, 
    blockedDates: [] 
  },
  { 
    id: 2, 
    title: 'Résidence Oasis Plateau', 
    location: 'Abidjan, Cocody', 
    type: 'Hébergement', 
    category: 'Villa', 
    price: '185 000 F', 
    rawPrice: 185000, 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 
    status: 'En ligne', 
    owner: 'Amadou Kone', 
    ownerId: 'u3', 
    features: ['Smart Home', 'Salle de Sport', 'Sécurité 24/7'], 
    capacity: 8, 
    rating: 4.8, 
    reviews: 28, 
    coordinates: { lat: 5.3484, lng: -4.0305 }, 
    blockedDates: [] 
  },
  { 
    id: 4, 
    title: 'Toyota Prado 4x4 Luxury', 
    location: 'Lomé, Togo', 
    type: 'Voiture', 
    category: 'SUV', 
    price: '75 000 F', 
    rawPrice: 75000, 
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80', 
    status: 'En ligne', 
    owner: 'Kodjo Mensah', 
    ownerId: 'u2', 
    features: ['Cuir Noir', 'Chauffeur Inclus', 'Climatisation'], 
    capacity: 7, 
    rating: 4.8, 
    reviews: 12, 
    coordinates: { lat: 6.1256, lng: 1.2254 }, 
    blockedDates: [] 
  },
  { 
    id: 5, 
    title: 'Range Rover Vogue Sport', 
    location: 'Dakar, Sénégal', 
    type: 'Voiture', 
    category: 'Luxe', 
    price: '120 000 F', 
    rawPrice: 120000, 
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80', 
    status: 'En ligne', 
    owner: 'Aïcha Sy', 
    ownerId: 'u5', 
    features: ['Toit Ouvrant', 'Système Bose', 'V8'], 
    capacity: 5, 
    rating: 4.9, 
    reviews: 8, 
    coordinates: { lat: 14.7167, lng: -17.4677 }, 
    blockedDates: [] 
  },
  { 
    id: 6, 
    title: 'Safari Parc National Kpendjal', 
    location: 'Mandouri, Togo', 
    type: 'Expérience', 
    category: 'Safari', 
    price: '45 000 F', 
    rawPrice: 45000, 
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80', 
    status: 'En ligne', 
    owner: 'Togo Tours', 
    ownerId: 'u6', 
    features: ['Guide Expert', 'Déjeuner Inclus', 'Transport 4x4'], 
    capacity: 12, 
    rating: 4.7, 
    reviews: 15, 
    coordinates: { lat: 10.8333, lng: 0.8167 }, 
    blockedDates: [] 
  }
];

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', password: 'password123', role: 'GUEST', avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=ee6c2b&color=fff', status: 'Active', verificationStatus: 'verified', joinDate: '12 Oct 2023' },
  { id: 'u2', name: 'Kodjo Mensah', email: 'kodjo@host.com', password: 'password123', role: 'HOST', avatar: 'https://ui-avatars.com/api/?name=Kodjo+Mensah&background=000&color=fff', status: 'Active', verificationStatus: 'verified', joinDate: '05 Jan 2022' },
  { id: 'a1', name: 'Super Admin', email: 'admin@reserve.africa', password: 'admin123', role: 'SUPER_ADMIN', avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff', status: 'Active', verificationStatus: 'verified', joinDate: '01 Jan 2023' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
      const saved = localStorage.getItem('reserve_user');
      return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('reserve_all_users');
      return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [properties, setProperties] = useState<Property[]>(() => {
      const saved = localStorage.getItem('reserve_properties');
      return saved ? JSON.parse(saved) : MOCK_PROPERTIES;
  });

  const [hostApplications, setHostApplications] = useState<HostApplication[]>(() => {
      const saved = localStorage.getItem('reserve_host_apps');
      return saved ? JSON.parse(saved) : [];
  });

  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(() => {
      const saved = localStorage.getItem('reserve_verif_reqs');
      return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [bookings, setBookings] = useState<Booking[]>(() => {
      const saved = localStorage.getItem('reserve_bookings');
      return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({ commissionRate: 15, serviceFeeRate: 15, maintenanceMode: false });
  const [siteAssets, setSiteAssets] = useState<Record<string, SiteAsset>>({
      'site_logo': { id: 'site_logo', name: 'Logo Principal', url: '', category: 'logo' }
  });

  useEffect(() => {
    localStorage.setItem('reserve_all_users', JSON.stringify(allUsers));
    localStorage.setItem('reserve_properties', JSON.stringify(properties));
    localStorage.setItem('reserve_host_apps', JSON.stringify(hostApplications));
    localStorage.setItem('reserve_verif_reqs', JSON.stringify(verificationRequests));
    localStorage.setItem('reserve_bookings', JSON.stringify(bookings));
    if (user) localStorage.setItem('reserve_user', JSON.stringify(user));
  }, [allUsers, properties, hostApplications, verificationRequests, bookings, user]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => { setNotifications(prev => prev.filter(n => n.id !== id)); }, 4000);
  };

  const login = (userData: User) => {
    setUser(userData);
    addNotification('success', `Ravi de vous voir, ${userData.name.split(' ')[0]}`);
  };

  const logout = () => { setUser(null); localStorage.removeItem('reserve_user'); addNotification('info', 'Déconnecté'); };

  const registerUser = (userData: User) => {
      setAllUsers(prev => [...prev, userData]);
      setUser(userData);
      addNotification('success', 'Compte créé avec succès !');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
        const updated = { ...user, ...data };
        setUser(updated);
        setAllUsers(prev => prev.map(u => u.id === user.id ? updated : u));
    }
  };

  const toggleUserStatus = (email: string) => {
      setAllUsers(prev => prev.map(u => u.email === email ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
      if (user?.email === email) setUser(prev => prev ? { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' } : null);
  };

  const toggleUserRole = (email: string) => {
      setAllUsers(prev => prev.map(u => u.email === email ? { ...u, role: u.role === 'GUEST' ? 'HOST' : 'GUEST' } : u));
      if (user?.email === email) setUser(prev => prev ? { ...prev, role: prev.role === 'GUEST' ? 'HOST' : 'GUEST' } : null);
  };

  const createAdmin = (admin: User) => setAllUsers(prev => [...prev, admin]);

  const submitVerification = (docType: string, docUrl: string) => {
      if (!user) return;
      const newReq: VerificationRequest = {
          id: `v-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          documentType: docType,
          documentUrl: docUrl,
          timestamp: new Date().toLocaleDateString(),
          status: 'Pending'
      };
      setVerificationRequests(prev => [newReq, ...prev]);
      updateUser({ verificationStatus: 'pending' });
  };

  const approveVerification = (id: string) => {
      const req = verificationRequests.find(r => r.id === id);
      if (!req) return;
      setVerificationRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
      setAllUsers(prev => prev.map(u => u.id === req.userId ? { ...u, verificationStatus: 'verified' } : u));
      if (user?.id === req.userId) setUser(prev => prev ? { ...prev, verificationStatus: 'verified' } : null);
      addNotification('success', 'Identité approuvée');
  };

  const rejectVerification = (id: string, reason: string) => {
      const req = verificationRequests.find(r => r.id === id);
      if (!req) return;
      setVerificationRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
      setAllUsers(prev => prev.map(u => u.id === req.userId ? { ...u, verificationStatus: 'unverified' } : u));
      if (user?.id === req.userId) setUser(prev => prev ? { ...prev, verificationStatus: 'unverified' } : null);
      addNotification('error', 'Identité rejetée');
  };

  const submitHostApplication = (app: any) => {
      if (!user) return;
      const newApp: HostApplication = {
          ...app,
          id: `app-${Date.now()}`,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          status: 'Pending',
          timestamp: new Date().toLocaleDateString()
      };
      setHostApplications(prev => [newApp, ...prev]);
  };

  const approveHostApplication = (id: string) => {
      const app = hostApplications.find(a => a.id === id);
      if (!app) return;
      setHostApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
      setAllUsers(prev => prev.map(u => u.id === app.userId ? { ...u, role: 'HOST' } : u));
      if (user?.id === app.userId) setUser(prev => prev ? { ...prev, role: 'HOST' } : null);
      addNotification('success', 'Promu au rôle d\'Hôte');
  };

  const rejectHostApplication = (id: string, reason: string) => {
      setHostApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
      addNotification('info', 'Demande hôte rejetée');
  };

  const updatePropertyStatus = (id: number, status: Property['status'], reason?: string) => {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status, rejectionReason: reason } : p));
  };

  const updateSiteAsset = (id: string, url: string) => {
      setSiteAssets(prev => ({ ...prev, [id]: { ...prev[id], url } }));
      addNotification('success', 'Média mis à jour');
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, updateUser, registerUser,
      submitVerification, verificationRequests, approveVerification, rejectVerification,
      submitHostApplication, hostApplications, approveHostApplication, rejectHostApplication,
      allUsers, properties, allProperties: properties, updatePropertyStatus,
      notifications, addNotification, removeNotification: (id) => setNotifications(p => p.filter(n => n.id !== id)),
      systemNotifications, markAllNotificationsRead: () => {},
      unreadMessageCount: 0, unreadNotificationCount: 0, isLoading: false,
      systemSettings, updateSystemSettings: (s) => setSystemSettings(p => ({...p, ...s})),
      favorites, toggleFavorite: (id) => setFavorites(p => { const n = new Set(p); if(n.has(id)) n.delete(id); else n.add(id); return n; }),
      bookings, addBooking: (b) => setBookings(p => [b, ...p]), updateBookingStatus: (id, s) => setBookings(p => p.map(b => b.id === id ? {...b, status: s} : b)),
      checkAvailability: () => true, addProperty: (p) => setProperties(prev => [p, ...prev]), updateProperty: (p) => setProperties(prev => prev.map(item => item.id === p.id ? p : item)),
      deleteProperty: (id) => setProperties(p => p.filter(item => item.id !== id)), togglePropertyBlock: () => {},
      reviews, addReview: () => {}, messages, sendMessage: () => {}, markMessagesRead: () => {},
      toggleUserRole, toggleUserStatus, createAdmin, transactions, requestWithdrawal: () => {},
      siteAssets, updateSiteAsset
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};