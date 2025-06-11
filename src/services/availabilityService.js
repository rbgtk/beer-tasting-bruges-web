import api from '@/axios.js'

export async function fetchAvailableDates(days) {
  const response = await api.get(`/api/availabilities/available-dates?days=${days}`)
  return response.data
}
