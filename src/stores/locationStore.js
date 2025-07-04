import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axios'

export const useAuthStore = defineStore('locations', () => {
  const locations = ref([])
  const isLoaded = ref(false)

  async function create(data) {
    const response = await api.post('/api/locations', data)

    if (!response.data.error) {
      locations.value.push(response.data)
    }
  }

  async function update(id, data) {
    const index = locations.value.findIndex((u) => u.id === id)

    if (index !== -1) {
      const response = await api.put(`/api/locations/${id}`, data)

      if (!response.data.error) {
        locations.value[index] = response.data
      }
    }
  }

  async function fetchAll() {
    if (!isLoaded.value) {
      const response = await api.get('/api/locations')

      if (!response.data.error) {
        locations.value = response.data
        isLoaded.value = true
      }
    }
  }

  async function deleteById(id) {
    const response = await api.delete(`/api/locations/${id}`)

    if (!response.data.error) {
      locations.value = locations.value.filter((u) => u.id !== id)
    }
  }

  return {
    locations,
    create,
    update,
    fetchAll,
    deleteById,
  }
})
