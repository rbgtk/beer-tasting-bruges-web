import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login as apiLogin, logout as apiLogout, fetchUser as apiFetchUser } from '@/services/authService.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || null)

  async function login(credentials) {
    const userData = await apiLogin(credentials)
    user.value = userData
  }

  async function logout() {
    await apiLogout()
    user.value = null
  }

  async function fetchUser() {
    const userData = await apiFetchUser()
    user.value = userData
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
