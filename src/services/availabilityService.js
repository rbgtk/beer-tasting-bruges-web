import api from '@/axios.js'

export async function fetchAvailableDates(days, location) {
  const response = await api.get('/api/availabilities/available-dates', {
    params: {
      days,
      ...(location && { location }),
    },
  })
  return response.data
}

export async function fetchAvailableEvents(date, location) {
  const response = await api.get('/api/availabilities/available-events', {
    params: {
      date,
      ...(location && { location }),
    },
  })
  return response.data
}
