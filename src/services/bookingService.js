import api from '@/axios.js'

export async function createBooking(booking) {
  // console.log('Creating booking', booking)
  const response = await api.post('/api/reservations', booking)
  return response.data
}
