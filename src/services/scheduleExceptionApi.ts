import api from '@/axios'
import type { ScheduleException } from '@/models/scheduleException'

export async function createScheduleException(
  scheduleException: ScheduleException
): Promise<ScheduleException> {
  const response = await api.post('/api/exceptions', scheduleException)
  return response.data
}

export async function fetchScheduleExceptions(): Promise<ScheduleException[]> {
  const response = await api.get('/api/exceptions')
  return response.data
}

export async function updateScheduleException(
  scheduleException: ScheduleException
): Promise<ScheduleException> {
  const response = await api.put(
    `/api/exeptions/${scheduleException.id}`,
    scheduleException
  )
  return response.data
}

export async function deleteScheduleException(
  scheduleException: ScheduleException
): Promise<void> {
  await api.delete(`/api/exceptions/${scheduleException.id}`)
}
