import api from '@/axios'
import type { RecurringEvent } from '@/models/recurringEvent'

export async function createRecurringEvent(
  recurringEvent: RecurringEvent
): Promise<RecurringEvent> {
  const response = await api.post('/api/events/recurring', recurringEvent)
  return response.data
}

export async function fetchRecurringEvents(): Promise<RecurringEvent[]> {
  const response = await api.get('/api/events/recurring')
  return response.data
}

export async function updateRecurringEvent(
  recurringEvent: RecurringEvent
): Promise<RecurringEvent> {
  const response = await api.put(
    `/api/events/recurring/${recurringEvent.id}`,
    recurringEvent
  )
  return response.data
}

export async function deleteRecurringEvent(
  recurringEvent: RecurringEvent
): Promise<void> {
  await api.delete(`/api/events/recurring/${recurringEvent.id}`)
}
