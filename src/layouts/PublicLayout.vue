<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="p-2 flex justify-between items-center">
      <div class="flex mx-4 space-x-2">
        <img src="/logo-150x150.png" alt="Logo" class="h-8 w-auto" />
        <h1 class="text-xl font-semibold">Beer Tasting Bruges</h1>
      </div>
      <Navigation />
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2025 Beer Tasting Bruges. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { useAuthStore } from '@/stores/authStore.js'
import { useAnnouncementStore } from '@/stores/announcementStore.js'
import { useLocationStore } from '@/stores/locationStore'
import { useServiceStore } from '@/stores/serviceStore.js'
import { useUnavailabilityStore } from '@/stores/unavailabilityStore.js'
import { useBookingStore } from '@/stores/bookingStore.js'

import Navigation from '@/components/public/Navigation.vue'

const authStore = useAuthStore()
const bookingStore = useBookingStore()
const serviceStore = useServiceStore()
const locationStore = useLocationStore()
const announcementStore = useAnnouncementStore()
const unavailabilityStore = useUnavailabilityStore()

onMounted(async () => {
  await authStore.fetchUser()
  await announcementStore.fetchAll()
  await locationStore.fetchAll()
  await serviceStore.fetchAll()
  await unavailabilityStore.fetchAll()
  await bookingStore.fetchAll()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

header {
  background-color: #ffcc00;
}
</style>
