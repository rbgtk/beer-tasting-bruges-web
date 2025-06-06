import type Location from '@/models/location'

export type ScheduleException = {
  id: number
  date: Date
  location?: Location
  reason?: string
}
