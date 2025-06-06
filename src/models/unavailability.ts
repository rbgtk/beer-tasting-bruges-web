import type Location from '@/models/location'

export type Unavailability = {
  id: number
  date: Date
  location?: Location
  reason?: string
}
