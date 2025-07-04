import api from '@/axios'

export async function createAnnouncement(announcement) {
  const response = await api.post('/api/announcements', announcement)
  return response.data
}

export async function fetchAnnouncements() {
  const response = await api.get('/api/announcements')
  return response.data
}

export async function fetchAnnouncement(id) {
  const response = await api.get(`/api/announcements/${id}`)
  return response.data
}

export async function updateAnnouncement(announcement) {
  const response = await api.put(`/api/announcements/${announcement.id}`, announcement)
  return response.data
}

export async function deleteAnnouncement(announcement) {
  await api.delete(`/api/announcements/${announcement.id}`)
}
