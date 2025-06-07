import type Location from '@/models/location';

export type OneTimeEvent = {
  id: number;
  name: string;
  description: string;
  date: Date;
  location: Location;
  price: number;
};
