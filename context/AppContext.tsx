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
    blockedDates: [],
    description: "Une villa d'exception face à l'Océan Atlantique pour vos séjours de luxe."
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
  { id: 'a1', name: 'Super Admin', email: 'admin@reserva.africa', password: 'admin123', role: 'SUPER_ADMIN', avatar: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff', status: 'Active', verificationStatus: 'verified', joinDate: '01 Jan 2023' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
      const saved = localStorage.getItem('reserva_user');
      return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('reserva_all_users');
      const loaded = saved ? JSON.parse(saved) : MOCK_USERS;
      // Protection Admin : on s'assure que l'admin par défaut est TOUJOURS présent
      if (!loaded.find((u: User) => u.email === 'admin@reserva.africa')) {
          return [...loaded, MOCK_USERS[2]];
      }
      return loaded;
  });

  const [properties, setProperties] = useState<Property[]>(() => {
      const saved = localStorage.getItem('reserva_properties');
      return saved ? JSON.parse(saved) : MOCK_PROPERTIES;
  });

  const [hostApplications, setHostApplications] = useState<HostApplication[]>(() => {
      const saved = localStorage.getItem('reserva_host_apps');
      return saved ? JSON.parse(saved) : [];
  });

  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(() => {
      const saved = localStorage.getItem('reserva_verif_reqs');
      return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>(() => {
      const saved = localStorage.getItem('reserva_sys_notifs');
      return saved ? JSON.parse(saved) : [
          { id: 'n1', title: 'Bienvenue', message: 'Bienvenue sur Reserva Africa, la plateforme premium de voyage en Afrique.', date: 'Maintenant', read: false, type: 'system' }
      ];
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [bookings, setBookings] = useState<Booking[]>(() => {
      const saved = localStorage.getItem('reserva_bookings');
      return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
      const saved = localStorage.getItem('reserva_messages');
      return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
      const saved = localStorage.getItem('reserva_transactions');
      return saved ? JSON.parse(saved) : [];
  });
  
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({ commissionRate: 15, serviceFeeRate: 15, maintenanceMode: false });
  const [siteAssets, setSiteAssets] = useState<Record<string, SiteAsset>>({
      'site_logo': { id: 'site_logo', name: 'Logo Principal', url: '', category: 'logo' }
  });

  useEffect(() => {
    localStorage.setItem('reserva_all_users', JSON.stringify(allUsers));
    localStorage.setItem('reserva_properties', JSON.stringify(properties));
    localStorage.setItem('reserva_host_apps', JSON.stringify(hostApplications));
    localStorage.setItem('reserva_verif_reqs', JSON.stringify(verificationRequests));
    localStorage.setItem('reserva_bookings', JSON.stringify(bookings));
    localStorage.setItem('reserva_messages', JSON.stringify(messages));
    localStorage.setItem('reserva_sys_notifs', JSON.stringify(systemNotifications));
    localStorage.setItem('reserva_transactions', JSON.stringify(transactions));
    if (user) localStorage.setItem('reserva_user', JSON.stringify(user));
  }, [allUsers, properties, hostApplications, verificationRequests, bookings, user, messages, systemNotifications, transactions]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => { setNotifications(prev => prev.filter(n => n.id !== id)); }, 4000);
  };

  const login = (userData: User) => {
    setUser(userData);
    addNotification('success', `Ravi de vous revoir, ${userData.name.split(' ')[0]}`);
  };

  const logout = () => { setUser(null); localStorage.removeItem('reserva_user'); addNotification('info', 'Vous avez été déconnecté.'); };

  const registerUser = (userData: User) => {
      setAllUsers(prev => [...prev, userData]);
      setUser(userData);
      addNotification('success', 'Votre compte Reserva Africa est prêt !');
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
  };

  const toggleUserRole = (email: string) => {
      setAllUsers(prev => prev.map(u => u.email === email ? { ...u, role: u.role === 'GUEST' ? 'HOST' : 'GUEST' } : u));
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
  };

  const rejectVerification = (id: string, reason: string) => {
      const req = verificationRequests.find(r => r.id === id);
      if (!req) return;
      setVerificationRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
      setAllUsers(prev => prev.map(u => u.id === req.userId ? { ...u, verificationStatus: 'unverified' } : u));
      if (user?.id === req.userId) setUser(prev => prev ? { ...prev, verificationStatus: 'unverified' } : null);
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
      addNotification('success', 'Félicitations, vous êtes maintenant hôte !');
  };

  const rejectHostApplication = (id: string, reason: string) => {
      setHostApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
      addNotification('error', `Candidature rejetée : ${reason}`);
  };

  const checkAvailability = (propertyId: number, start: Date, end: Date) => {
      const prop = properties.find(p => p.id === propertyId);
      if (!prop || !prop.blockedDates) return true;
      const days = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      for (let i = 0; i <= days; i++) {
          const d = new Date(start);
          d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          if (prop.blockedDates.includes(dateStr)) return false;
      }
      return true;
  };

  const updatePropertyStatus = (id: number, status: Property['status'], reason?: string) => {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status, rejectionReason: reason } : p));
  };

  const updateSiteAsset = (id: string, url: string) => {
      setSiteAssets(prev => ({ ...prev, [id]: { ...prev[id], url } }));
      addNotification('success', 'Asset mis à jour.');
  };

  const sendMessage = (senderId: string, receiverId: string, text: string) => {
      const newMsg: Message = { id: Date.now().toString(), senderId, receiverId, text, timestamp: new Date().toISOString(), read: false };
      setMessages(prev => [...prev, newMsg]);
  };

  const markMessagesRead = (otherUserId: string) => {
      if (!user) return;
      setMessages(prev => prev.map(m => m.receiverId === user.id && m.senderId === otherUserId ? { ...m, read: true } : m));
  };

  const addReview = (propertyId: number, rating: number, comment: string, bookingId: string) => {
      if (!user) return;
      const newReview: Review = { id: Date.now().toString(), propertyId, bookingId, authorName: user.name, authorAvatar: user.avatar, rating, comment, date: new Date().toLocaleDateString('fr-FR') };
      setReviews(prev => [newReview, ...prev]);
      addNotification('success', 'Merci pour votre avis !');
  };

  const togglePropertyBlock = (propertyId: number, date: string) => {
      setProperties(prev => prev.map(p => {
          if (p.id === propertyId) {
              const blocks = p.blockedDates || [];
              const newBlocks = blocks.includes(date) ? blocks.filter(d => d !== date) : [...blocks, date];
              return { ...p, blockedDates: newBlocks };
          }
          return p;
      }));
  };

  const requestWithdrawal = (amount: number) => {
      const newTrx: Transaction = { id: `WDR-${Date.now().toString().slice(-6)}`, date: new Date().toLocaleDateString('fr-FR'), amount, type: 'withdrawal', status: 'Pending', label: 'Retrait de fonds' };
      setTransactions(prev => [newTrx, ...prev]);
      addNotification('success', 'Virement en cours de traitement.');
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, updateUser, registerUser,
      submitVerification, verificationRequests, approveVerification, rejectVerification,
      submitHostApplication, hostApplications, approveHostApplication, rejectHostApplication,
      allUsers, properties, allProperties: properties, updatePropertyStatus,
      notifications, addNotification, removeNotification: (id) => setNotifications(p => p.filter(n => n.id !== id)),
      systemNotifications, markAllNotificationsRead: () => setSystemNotifications(prev => prev.map(n => ({...n, read: true}))),
      unreadMessageCount: messages.filter(m => m.receiverId === user?.id && !m.read).length,
      unreadNotificationCount: systemNotifications.filter(n => !n.read).length,
      isLoading: false,
      systemSettings, updateSystemSettings: (s) => setSystemSettings(p => ({...p, ...s})),
      favorites, toggleFavorite: (id) => setFavorites(p => { const n = new Set(p); if(n.has(id)) n.delete(id); else n.add(id); return n; }),
      bookings, addBooking: (b) => setBookings(p => [b, ...p]), updateBookingStatus: (id, s) => setBookings(p => p.map(b => b.id === id ? {...b, status: s} : b)),
      checkAvailability, addProperty: (p) => setProperties(prev => [p, ...prev]), updateProperty: (p) => setProperties(prev => prev.map(item => item.id === p.id ? p : item)),
      deleteProperty: (id) => setProperties(p => p.filter(item => item.id !== id)), togglePropertyBlock,
      reviews, addReview, messages, sendMessage, markMessagesRead,
      toggleUserRole, toggleUserStatus, createAdmin, transactions, requestWithdrawal,
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