<template>
  <router-link exact-active-class="bg-gray-700" class="px-3 py-2 rounded hover:bg-gray-600 transition-colors" to="/">
    Home
  </router-link>
  <router-link
    exact-active-class="bg-gray-700"
    class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    to="/about"
  >
    About
  </router-link>
  <router-link
    exact-active-class="bg-gray-700"
    class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    to="/posts"
  >
    Posts
  </router-link>
  <router-link exact-active-class="bg-gray-700" class="px-3 py-2 rounded hover:bg-gray-600 transition-colors" to="/faq">
    FAQ
  </router-link>
  <router-link
    exact-active-class="bg-gray-700"
    class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    to="/contact"
  >
    Contact
  </router-link>
  <router-link
    exact-active-class="bg-blue-600"
    class="px-3 py-2 rounded bg-blue-600 hover:bg-blue-400 transition-colors"
    to="/booking"
  >
    Book Now!
  </router-link>
  <router-link
    exact-active-class="bg-gray-700"
    class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    to="/dashboard"
    v-if="isAdmin"
  >
    Dashboard
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const isAdmin = computed(() => {
  return authStore.userRole === 'ADMIN'
})
</script>
