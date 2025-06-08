import api from '@/axios'

export async function createRecurringEvent(recurringEvent) {
  const response = await api.post('/api/events/recurring', recurringEvent)
  return response.data
}

export async function fetchRecurringEvents() {
  const response = await api.get('/api/events/recurring')
  return response.data
}

export async function fetchRecurringEvent(id) {
  const response = await api.get(`/api/events/recurring/${id}`)
  return response.data
}

export async function updateRecurringEvent(recurringEvent) {
  const response = await api.put(`/api/events/recurring/${recurringEvent.id}`, recurringEvent)
  return response.data
}

export async function deleteRecurringEvent(recurringEvent) {
  await api.delete(`/api/events/recurring/${recurringEvent.id}`)
}
