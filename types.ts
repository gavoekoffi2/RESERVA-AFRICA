export enum UserRole {
  GUEST = 'GUEST',
  HOST = 'HOST',
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface Reservation {
  id: string;
  title: string;
  location: string;
  dates: string;
  image: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: string;
  type: 'Hotel' | 'Car' | 'Activity';
}
