import type Location from '@/models/location';

export type RecurringEvent = {
  id: number;
  name: string;
  description: string;
  weekday: number;
  time: string;
  location: Location;
  price: number;
};
