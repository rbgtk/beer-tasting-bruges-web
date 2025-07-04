import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axios'

export const useAuthStore = defineStore('unavailabilities', () => {
  const unavailabilities = ref([])
  const isLoaded = ref(false)

  async function create(data) {
    const response = await api.post('/api/unavailabilities', data)

    if (!response.data.error) {
      unavailabilities.value.push(response.data)
    }
  }

  async function update(id, data) {
    const index = unavailabilities.value.findIndex((u) => u.id === id)

    if (index !== -1) {
      const response = await api.put(`/api/unavailabilities/${id}`, data)

      if (!response.data.error) {
        unavailabilities.value[index] = response.data
      }
    }
  }

  async function fetchAll() {
    if (!isLoaded.value) {
      const response = await api.get('/api/unavailabilities')

      if (!response.data.error) {
        unavailabilities.value = response.data
        isLoaded.value = true
      }
    }
  }

  async function deleteById(id) {
    const response = await api.delete(`/api/unavailabilities/${id}`)

    if (!response.data.error) {
      unavailabilities.value = unavailabilities.value.filter((u) => u.id !== id)
    }
  }

  return {
    unavailabilities,
    create,
    update,
    fetchAll,
    deleteById,
  }
})
