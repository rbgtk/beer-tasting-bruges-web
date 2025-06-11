<template>
  <nav class="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
    <!-- Hamburger button on mobile -->
    <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
      <!-- Hamburger icon (simple bars) -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Nav links (hidden on mobile, flex on md+) -->
    <div class="hidden md:flex space-x-4">
      <NavigationLinks />
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NavigationLinks from './NavigationLinks.vue'

const authStore = useAuthStore()
const isAdmin = computed(() => {
  return authStore.userRole === 'ADMIN'
})
</script>
