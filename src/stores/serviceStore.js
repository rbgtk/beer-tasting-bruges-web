import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axios'

export const useAuthStore = defineStore('services', () => {
  const services = ref([])
  const isLoaded = ref(false)

  async function create(data) {
    const response = await api.post('/api/services', data)

    if (!response.data.error) {
      services.value.push(response.data)
    }
  }

  async function update(id, data) {
    const index = services.value.findIndex((u) => u.id === id)

    if (index !== -1) {
      const response = await api.put(`/api/services/${id}`, data)

      if (!response.data.error) {
        services.value[index] = response.data
      }
    }
  }

  async function fetchAll() {
    if (!isLoaded.value) {
      const response = await api.get('/api/services')

      if (!response.data.error) {
        services.value = response.data
        isLoaded.value = true
      }
    }
  }

  async function deleteById(id) {
    const response = await api.delete(`/api/services/${id}`)

    if (!response.data.error) {
      services.value = services.value.filter((u) => u.id !== id)
    }
  }

  return {
    services,
    create,
    update,
    fetchAll,
    deleteById,
  }
})
