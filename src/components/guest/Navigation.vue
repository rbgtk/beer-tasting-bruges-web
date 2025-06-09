<template>
  <nav class="space-x-2">
    <router-link
      to="/"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Home
    </router-link>
    <router-link
      to="/booking"
      exact
      exact-active-class="bg-gray-700"
      class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
    >
      Book Now
    </router-link>
    <router-link
      to="/about"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      About
    </router-link>
    <router-link
      to="/posts"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Articles
    </router-link>
    <router-link
      to="/contact"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Contact
    </router-link>
    <router-link
      v-if="isAdmin"
      to="/dashboard"
      exact
      exact-active-class="bg-gray-700"
      class="px-3 py-2 rounded hover:bg-gray-600 transition-colors"
    >
      Dashboard
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const isAdmin = computed(() => {
  return authStore.userRole === 'ADMIN'
})
</script>
