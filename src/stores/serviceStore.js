import api from '@/axios'

export async function createEvent(event) {
  const response = await api.post('/api/events', event)
  return response.data
}

export async function fetchEvents() {
  const response = await api.get('/api/events')
  return response.data
}

export async function fetchEvent(id) {
  const response = await api.get(`/api/events/${id}`)
  return response.data
}

export async function updateEvent(event) {
  const response = await api.put(`/api/events/${event.id}`, event)
  return response.data
}

export async function deleteEvent(event) {
  await api.delete(`/api/events/${event.id}`)
}
