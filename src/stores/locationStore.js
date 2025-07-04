import api from '@/axios'

export async function createLocation(location) {
  const response = await api.post('/api/locations', location)
  return response.data
}

export async function fetchLocations() {
  const response = await api.get('/api/locations')
  return response.data
}

export async function fetchLocation(id) {
  const response = await api.get(`/api/locations/${id}`)
  return response.data
}

export async function updateLocation(location) {
  const response = await api.put(`/api/locations/${location.id}`, location)
  return response.data
}

export async function deleteLocation(location) {
  await api.delete(`/api/locations/${location.id}`)
}
