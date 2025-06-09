import api from '@/axios'

export async function fetchAnnouncements() {
  const response = await api.get('/api/announcements')
  return response.data
}
