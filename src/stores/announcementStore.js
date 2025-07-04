import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axios'

export const useAnnouncementStore = defineStore('announcements', () => {
  const announcements = ref([])
  const isLoaded = ref(false)

  async function create(data) {
    const response = await api.post('/api/announcements', data)

    if (!response.data.error) {
      announcements.value.push(response.data)
    }
  }

  async function update(id, data) {
    const index = announcements.value.findIndex((u) => u.id === id)

    if (index !== -1) {
      const response = await api.put(`/api/announcements/${id}`, data)

      if (!response.data.error) {
        announcements.value[index] = response.data
      }
    }
  }

  async function fetchAll() {
    if (!isLoaded.value) {
      const response = await api.get('/api/announcements')

      if (!response.data.error) {
        announcements.value = response.data
        isLoaded.value = true
      }
    }
  }

  async function deleteById(id) {
    const response = await api.delete(`/api/announcements/${id}`)

    if (!response.data.error) {
      announcements.value = announcements.value.filter((u) => u.id !== id)
    }
  }

  return {
    announcements,
    create,
    update,
    fetchAll,
    deleteById,
  }
})
