import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axios'

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref([])
  const isLoaded = ref(false)

  async function create(data) {
    const response = await api.post('/api/bookings', data)

    if (!response.data.error) {
      bookings.value.push(response.data)
    }
  }

  async function update(id, data) {
    const index = bookings.value.findIndex((u) => u.id === id)

    if (index !== -1) {
      const response = await api.put(`/api/bookings/${id}`, data)

      if (!response.data.error) {
        bookings.value[index] = response.data
      }
    }
  }

  async function fetchAll() {
    if (!isLoaded.value) {
      const response = await api.get('/api/bookings')

      if (!response.data.error) {
        bookings.value = response.data
        isLoaded.value = true
      }
    }
  }

  async function deleteById(id) {
    const response = await api.delete(`/api/bookings/${id}`)

    if (!response.data.error) {
      bookings.value = bookings.value.filter((u) => u.id !== id)
    }
  }

  return {
    bookings,
    create,
    update,
    fetchAll,
    deleteById,
  }
})
