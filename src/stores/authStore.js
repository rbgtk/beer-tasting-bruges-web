import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import api from '@/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || null)

  async function login(credentials) {
    const response = await api.post('/api/auth/login', credentials)
    user.value = response.data
  }

  async function logout() {
    await api.post('/api/auth/logout')
    user.value = null
  }

  async function fetchUser() {
    const response = await api.get('/api/auth/me')
    user.value = response.data
  }

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
    fetchUser,
  }
})
