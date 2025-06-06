import api from '@/axios'
import type { OneTimeEvent } from '@/models/oneTimeEvent'

export async function createOneTimeEvent(
  oneTimeEvent: oneTimeEvent
): Promise<OneTimeEvent> {
  const response = await api.post('/api/events/onetime', oneTimeEvent)
  return response.data
}

export async function fetchOneTimeEvents(): Promise<OneTimeEvent[]> {
  const response = await api.get('/api/events/onetime')
  return response.data
}

export async function fetchOneTimeEvent(id: number): Promise<OneTimeEvent> {
  const response = await api.get(`/api/events/onetime/${id}`)
  return response.data
}

export async function updateOneTimeEvent(
  oneTimeEvent: OneTimeEvent
): Promise<OneTimeEvent> {
  const response = await api.put(
    `/api/events/onetime/${oneTimeEvent.id}`,
    oneTimeEvent
  )
  return response.data
}

export async function deleteOneTimeEvent(
  oneTimeEvent: OneTimeEvent
): Promise<void> {
  await api.delete(`/api/events/onetime/${oneTimeEvent.id}`)
}
