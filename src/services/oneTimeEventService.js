import api from '@/axios'

export async function createOneTimeEvent(oneTimeEvent) {
  const response = await api.post('/api/events/onetime', oneTimeEvent)
  return response.data
}

export async function fetchOneTimeEvents() {
  const response = await api.get('/api/events/onetime')
  return response.data
}

export async function fetchOneTimeEvent(id) {
  const response = await api.get(`/api/events/onetime/${id}`)
  return response.data
}

export async function updateOneTimeEvent(oneTimeEvent) {
  const response = await api.put(`/api/events/onetime/${oneTimeEvent.id}`, oneTimeEvent)
  return response.data
}

export async function deleteOneTimeEvent(oneTimeEvent) {
  await api.delete(`/api/events/onetime/${oneTimeEvent.id}`)
}
