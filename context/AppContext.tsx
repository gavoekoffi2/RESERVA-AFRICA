import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- Types ---
export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: 'GUEST' | 'HOST' | 'ADMIN';
  status?: 'Active' | 'Suspended';
  joinDate?: string;
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
  guestName?: string;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  type: string; // 'Hébergement', 'Voiture', 'Activité'
  price: string;
  image: string;
  status: 'En ligne' | 'Brouillon' | 'En attente' | 'Rejeté';
  owner?: string;
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  properties: Property[]; // User's properties (if host)
  allProperties: Property[]; // ADMIN: All platform properties
  addProperty: (property: Property) => void;
  updatePropertyStatus: (id: number, status: Property['status']) => void;
  allUsers: User[]; // ADMIN: All users
  toggleUserStatus: (email: string) => void;
  isLoading: boolean;
}

// --- Mock Data ---
const MOCK_PROPERTIES: Property[] = [
  { id: 1, title: 'Villa Prestige Océan', location: 'Lomé, Baguida', type: 'Hébergement', price: '250 000 F', image: 'https://images.unsplash.com/photo-1613490493576-2f045a168583?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', status: 'En ligne', owner: 'Kodjo Mensah' },
  { id: 2, title: 'Toyota Land Cruiser Prado', location: 'Lomé, Aéroport', type: 'Voiture', price: '65 000 F', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80', status: 'En ligne', owner: 'Kodjo Mensah' },
  { id: 3, title: 'Visite Historique Ouidah', location: 'Ouidah, Bénin', type: 'Activité', price: '15 000 F', image: 'https://images.unsplash.com/photo-1596483756461-9f939223cb23?auto=format&fit=crop&w=200&q=80', status: 'En attente', owner: 'Sarah K.' },
  { id: 4, title: 'Penthouse Abidjan', location: 'Abidjan, CI', type: 'Hébergement', price: '150 000 F', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80', status: 'En attente', owner: 'Jean D.' }
];

const MOCK_BOOKINGS: Booking[] = [
    { id: 'DKR-2023-001', title: 'Sofitel Abidjan Hôtel Ivoire', location: "Abidjan, Côte d'Ivoire", dates: '12 Nov - 15 Nov 2023', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80', price: '450 000 XOF', status: 'Confirmé', type: 'stay', guestName: 'Jean Dupont', hostName: 'Accor' }
];

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'GUEST', avatar: '', status: 'Active', joinDate: '12 Oct 2023' },
  { id: 'u2', name: 'Kodjo Mensah', email: 'kodjo@host.com', role: 'HOST', avatar: '', status: 'Active', joinDate: '05 Jan 2022' },
  { id: 'u3', name: 'Sarah Koffi', email: 'sarah@host.com', role: 'HOST', avatar: '', status: 'Suspended', joinDate: '18 Mar 2023' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Data State
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES); // For current user (Host view)
  
  // Admin Global State
  const [allProperties, setAllProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    // Simulate checking local storage for session
    const storedUser = localStorage.getItem('reseva_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('reseva_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reseva_user');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFav = new Set(prev);
      if (newFav.has(id)) newFav.delete(id);
      else newFav.add(id);
      return newFav;
    });
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const addProperty = (property: Property) => {
    // Add to specific host list and global list
    setProperties(prev => [property, ...prev]);
    setAllProperties(prev => [property, ...prev]);
  };

  // Admin Actions
  const updatePropertyStatus = (id: number, status: Property['status']) => {
    setAllProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const toggleUserStatus = (email: string) => {
    setAllUsers(prev => prev.map(u => u.email === email ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      favorites, toggleFavorite, 
      bookings, addBooking,
      properties, addProperty,
      allProperties, updatePropertyStatus,
      allUsers, toggleUserStatus,
      isLoading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};