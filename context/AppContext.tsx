import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'GUEST' | 'HOST' | 'ADMIN' | 'SUPER_ADMIN';
  status?: 'Active' | 'Suspended';
  joinDate?: string;
  permissions?: string[];
  bio?: string;
  location?: string;
  phone?: string;
}

export interface Booking {
  id: string;
  title: string;
  location: string;
  dates: string;
  image: string;
  price: string;
  status: 'Confirmé' | 'En attente' | 'Annulé' | 'Terminé';
  type: 'stay' | 'car' | 'attraction';
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
  type: string;
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
  type: 'booking' | 'system' | 'promotion';
  targetUserId?: string;
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
  upgradeToHost: () => void;
  toggleUserRole: (email: string) => void;
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
  toggleUserStatus: (email: string) => void;
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

const parseMockDate = (dateStr: string, isEnd: boolean = false): Date => {
    const currentYear = new Date().getFullYear();
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        const part = isEnd ? parts[1].trim() : parts[0].trim();
        const d = new Date(`${part} ${!part.includes('20') ? currentYear : ''}`);
        return isNaN(d.getTime()) ? new Date() : d;
    }
    const d = new Date(`${dateStr} ${!dateStr.includes('20') ? currentYear : ''}`);
    return isNaN(d.getTime()) ? new Date() : d;
};

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'GUEST', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200', status: 'Active', joinDate: '12 Oct 2023', bio: 'Voyageur passionné.', location: 'Paris, France' },
  { id: 'u2', name: 'Kodjo Mensah', email: 'kodjo@host.com', role: 'HOST', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=200', status: 'Active', joinDate: '05 Jan 2022', bio: 'Hôte expérimenté à Lomé.', location: 'Lomé, Togo' },
  { id: 'a1', name: 'Super Admin', email: 'admin@reserve.africa', role: 'SUPER_ADMIN', avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000&color=fff', status: 'Active', joinDate: '01 Jan 2023', permissions: [] },
];

const MOCK_PROPERTIES: Property[] = [
  { id: 1, title: 'Villa Prestige Océan', location: 'Lomé, Baguida', type: 'Hébergement', category: 'Villa', price: '250 000 F', rawPrice: 250000, image: 'https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', status: 'En ligne', owner: 'Kodjo Mensah', ownerId: 'u2', features: ['Piscine', 'Wifi', 'Vue Mer', 'Climatisation'], capacity: 8, rating: 5.0, reviews: 1, coordinates: { lat: 6.13, lng: 1.25 }, blockedDates: [] },
  { id: 4, title: 'Penthouse Abidjan', location: 'Abidjan, CI', type: 'Hébergement', category: 'Appartement', price: '150 000 F', rawPrice: 150000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', status: 'En attente', owner: 'Kodjo Mensah', ownerId: 'u2', features: ['Wifi', 'Climatisation', 'Cuisine'], capacity: 4, rating: 4.7, reviews: 0, coordinates: { lat: 5.35, lng: -4.0 }, blockedDates: [] },
];

const DEFAULT_ASSETS: Record<string, SiteAsset> = {
    'site_logo': { id: 'site_logo', name: 'Logo de la Plateforme (URL)', url: '', category: 'logo' },
    'hero_bg': { id: 'hero_bg', name: 'Image de Fond Accueil', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80', category: 'image' },
    'host_cta_bg': { id: 'host_cta_bg', name: 'Bannière Devenir Hôte', url: 'https://images.unsplash.com/photo-1543343132-73a7d2e06d91?auto=format&fit=crop&w=1200&q=80', category: 'image' },
    'become_host_hero': { id: 'become_host_hero', name: 'Page Devenir Hôte Hero', url: 'https://images.unsplash.com/photo-1556912173-3db4d6be6816?auto=format&fit=crop&w=2000&q=80', category: 'image' },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
      const saved = localStorage.getItem('reserve_user');
      return saved ? JSON.parse(saved) : null;
  });

  const [favorites, setFavorites] = useState<Set<number>>(() => {
      const saved = localStorage.getItem('reserve_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
      const saved = localStorage.getItem('reserve_bookings');
      return saved ? JSON.parse(saved) : [];
  });

  const [properties, setProperties] = useState<Property[]>(() => {
      const saved = localStorage.getItem('reserve_properties');
      return saved ? JSON.parse(saved) : MOCK_PROPERTIES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
      const saved = localStorage.getItem('reserve_reviews');
      return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
      const saved = localStorage.getItem('reserve_messages');
      return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
      const saved = localStorage.getItem('reserve_transactions');
      return saved ? JSON.parse(saved) : [];
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
      const saved = localStorage.getItem('reserve_settings');
      return saved ? JSON.parse(saved) : { commissionRate: 15, serviceFeeRate: 5, maintenanceMode: false };
  });

  const [siteAssets, setSiteAssets] = useState<Record<string, SiteAsset>>(() => {
      const saved = localStorage.getItem('reserve_assets');
      return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('reserve_all_users');
      return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>(() => {
      const saved = localStorage.getItem('reserve_sys_notifs');
      return saved ? JSON.parse(saved) : [];
  });

  const unreadMessageCount = messages.filter(m => m.receiverId === user?.id && !m.read).length;
  const unreadNotificationCount = systemNotifications.filter(n => (!n.targetUserId || n.targetUserId === user?.id) && !n.read).length;

  useEffect(() => {
      if (user) localStorage.setItem('reserve_user', JSON.stringify(user));
      else localStorage.removeItem('reserve_user');
  }, [user]);

  useEffect(() => { localStorage.setItem('reserve_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('reserve_properties', JSON.stringify(properties)); }, [properties]);
  useEffect(() => { localStorage.setItem('reserve_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('reserve_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('reserve_sys_notifs', JSON.stringify(systemNotifications)); }, [systemNotifications]);
  useEffect(() => { localStorage.setItem('reserve_assets', JSON.stringify(siteAssets)); }, [siteAssets]);
  useEffect(() => { localStorage.setItem('reserve_all_users', JSON.stringify(allUsers)); }, [allUsers]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => { setNotifications(prev => prev.filter(n => n.id !== id)); }, 4000);
  };

  const login = (userData: User) => {
    setUser(userData);
    addNotification('success', `Ravi de vous revoir, ${userData.name.split(' ')[0]} !`);
  };

  const logout = () => {
    setUser(null);
    addNotification('info', 'Vous avez été déconnecté.');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        setAllUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...data } : u));
    }
  };

  const upgradeToHost = () => {
      if (user) {
          const updatedUser: User = { ...user, role: 'HOST' };
          setUser(updatedUser);
          setAllUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
          addNotification('success', 'Bienvenue dans la communauté des hôtes !');
      }
  };

  const toggleUserRole = (email: string) => {
      setAllUsers(prev => prev.map(u => {
          if (u.email === email) {
              const newRole = u.role === 'HOST' ? 'GUEST' : 'HOST';
              if (user?.email === email) setUser({ ...user, role: newRole as any });
              return { ...u, role: newRole as any };
          }
          return u;
      }));
      addNotification('success', 'Rôle de l\'utilisateur mis à jour.');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFav = new Set(prev);
      if (newFav.has(id)) {
          newFav.delete(id);
      } else {
          newFav.add(id);
          addNotification('success', 'Ajouté aux favoris');
      }
      return newFav;
    });
  };

  const addBooking = (booking: Booking) => {
    const property = properties.find(p => p.id === booking.propertyId);
    const hostId = property?.ownerId || 'u2';
    const hostName = property?.owner || 'Reserve Host';
    const newBooking = { ...booking, hostName, hostId, guestId: user?.id };
    setBookings(prev => [newBooking, ...prev]);
    
    const newNotif: SystemNotification = { id: `sn-${Date.now()}`, title: 'Réservation confirmée', message: `Votre réservation pour ${booking.title} est validée.`, date: 'À l\'instant', read: false, type: 'booking', targetUserId: user?.id };
    const hostNotif: SystemNotification = { id: `hn-${Date.now()}`, title: 'Nouveau voyageur !', message: `${user?.name} a réservé ${booking.title}.`, date: 'À l\'instant', read: false, type: 'booking', targetUserId: hostId };
    
    setSystemNotifications(prev => [newNotif, hostNotif, ...prev]);
  };

  const checkAvailability = (propertyId: number, start: Date, end: Date): boolean => {
      const property = properties.find(p => p.id === propertyId);
      if (!property) return true;
      if (property.blockedDates) {
          let curr = new Date(start);
          while (curr <= end) {
              if (property.blockedDates.includes(curr.toISOString().split('T')[0])) return false;
              curr.setDate(curr.getDate() + 1);
          }
      }
      return !bookings.some(b => 
          b.propertyId === propertyId && (b.status === 'Confirmé' || b.status === 'En attente') &&
          (start < (b.checkOutDate ? new Date(b.checkOutDate) : parseMockDate(b.dates, true)) && 
           end > (b.checkInDate ? new Date(b.checkInDate) : parseMockDate(b.dates, false)))
      );
  };

  const addReview = (propertyId: number, rating: number, comment: string, bookingId: string) => {
      const newReview: Review = { id: Date.now().toString(), propertyId, bookingId, authorName: user?.name || 'Utilisateur', authorAvatar: user?.avatar || '', rating, comment, date: new Date().toLocaleDateString('fr-FR') };
      setReviews(prev => [newReview, ...prev]);
      setProperties(prev => prev.map(p => {
          if (p.id === propertyId) {
              const count = (p.reviews || 0) + 1;
              const newRating = parseFloat(((((p.rating || 0) * (p.reviews || 0)) + rating) / count).toFixed(1));
              return { ...p, rating: newRating, reviews: count };
          }
          return p;
      }));
  };

  const sendMessage = (senderId: string, receiverId: string, text: string) => {
      const newMessage: Message = { id: Date.now().toString(), senderId, receiverId, text, timestamp: new Date().toISOString(), read: false };
      setMessages(prev => [...prev, newMessage]);
  };

  const markMessagesRead = (otherUserId: string) => {
      setMessages(prev => prev.map(m => (m.senderId === otherUserId && m.receiverId === user?.id) ? { ...m, read: true } : m));
  };

  const requestWithdrawal = (amount: number) => {
      const newTrx: Transaction = { id: `WTH-${Date.now().toString().slice(-6)}`, date: new Date().toLocaleDateString('fr-FR'), amount, type: 'withdrawal', status: 'Pending', label: 'Demande de virement bancaire' };
      setTransactions(prev => [newTrx, ...prev]);
      addNotification('success', 'Votre demande de virement a été transmise.');
  };

  const markAllNotificationsRead = () => {
      setSystemNotifications(prev => prev.map(n => (!n.targetUserId || n.targetUserId === user?.id) ? { ...n, read: true } : n));
  };

  const addProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
    addNotification('success', 'Annonce soumise avec succès.');
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
    addNotification('success', 'Annonce mise à jour.');
  };

  const deleteProperty = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    addNotification('info', 'Annonce supprimée.');
  };

  const updatePropertyStatus = (id: number, status: Property['status'], reason?: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status, rejectionReason: reason } : p));
    const property = properties.find(p => p.id === id);
    if (property && property.ownerId) {
        const notifTitle = status === 'En ligne' ? 'Annonce Approuvée' : 'Annonce Rejetée';
        const notifMsg = status === 'En ligne' ? `Votre annonce "${property.title}" est maintenant en ligne.` : `Votre annonce "${property.title}" a été rejetée. Motif: ${reason || 'Non spécifié'}`;
        const newNotif: SystemNotification = { id: `mod-${Date.now()}`, title: notifTitle, message: notifMsg, date: 'À l\'instant', read: false, type: 'system', targetUserId: property.ownerId };
        setSystemNotifications(pNotifs => [newNotif, ...pNotifs]);
    }
  };

  const togglePropertyBlock = (propertyId: number, date: string) => {
    setProperties(prev => prev.map(p => {
        if (p.id === propertyId) {
            const blocked = p.blockedDates || [];
            return { ...p, blockedDates: blocked.includes(date) ? blocked.filter(d => d !== date) : [...blocked, date] };
        }
        return p;
    }));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      const booking = bookings.find(b => b.id === id);
      if (booking) {
          const targetId = user?.id === booking.guestId ? booking.hostId : booking.guestId;
          const label = status === 'Annulé' ? 'Annulation de réservation' : 'Statut de réservation mis à jour';
          const msg = `La réservation #${booking.id} pour ${booking.title} est maintenant ${status}.`;
          const newNotif: SystemNotification = { id: `bks-${Date.now()}`, title: label, message: msg, date: 'À l\'instant', read: false, type: 'booking', targetUserId: targetId };
          setSystemNotifications(pNotifs => [newNotif, ...pNotifs]);
      }
  };

  const updateSiteAsset = (id: string, url: string) => {
      setSiteAssets(prev => ({
          ...prev,
          [id]: { ...prev[id], url }
      }));
      addNotification('success', 'Élément du site mis à jour.');
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, updateUser, upgradeToHost, toggleUserRole, favorites, toggleFavorite, 
      bookings, addBooking, updateBookingStatus, checkAvailability,
      properties, allProperties: properties, addProperty, updateProperty, deleteProperty, updatePropertyStatus, togglePropertyBlock,
      reviews, addReview, messages, sendMessage, markMessagesRead, unreadMessageCount, allUsers, toggleUserStatus: (e) => setAllUsers(prev => prev.map(u => u.email === e ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u)), createAdmin: (a) => setAllUsers(prev => [a, ...prev]),
      notifications, addNotification, removeNotification: (id) => setNotifications(prev => prev.filter(n => n.id !== id)), 
      systemNotifications, markAllNotificationsRead, unreadNotificationCount,
      isLoading: false, systemSettings, updateSystemSettings: (s) => setSystemSettings(prev => ({ ...prev, ...s })),
      transactions, requestWithdrawal,
      siteAssets, updateSiteAsset
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};