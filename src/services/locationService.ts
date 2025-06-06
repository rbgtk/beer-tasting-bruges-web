import api from '@/axios'
import type { Location } from '@/models/location'

export async function createLocation(location: Location): Promise<Location> {
  const response = await api.post('/api/locations', location)
  return response.data
}

export async function fetchLocations(): Promise<Location[]> {
  const response = await api.get('/api/locations')
  return response.data
}

export async function fetchLocation(id: number): Promise<Location> {
  const response = await api.get(`/api/locations/${id}`)
  return response.data
}

export async function updateLocation(location: Location): Promise<Location> {
  const response = await api.put(`/api/locations/${location.id}`, location)
  return response.data
}

export async function deleteLocation(location: Location): Promise<void> {
  await api.delete(`/api/locations/${location.id}`)
}
