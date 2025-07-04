<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div class="p-4">
        <h1 class="text-xl font-semibold mb-6">Admin Dashboard</h1>
        <navigation></navigation>
      </div>

      <!-- Logout button at the bottom -->
      <div class="p-4">
        <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 w-full py-2 rounded">Logout</button>
      </div>
    </aside>

    <!-- Main content area -->
    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/authStore.js'
import { useAnnouncementStore } from '@/stores/announcementStore.js'
import { useLocationStore } from '@/stores/locationStore'
import { useServiceStore } from '@/stores/serviceStore.js'
import { useUnavailabilityStore } from '@/stores/unavailabilityStore.js'
import { useBookingStore } from '@/stores/bookingStore.js'

import Navigation from '@/components/admin/Navigation.vue'

const authStore = useAuthStore()
const bookingStore = useBookingStore()
const serviceStore = useServiceStore()
const locationStore = useLocationStore()
const announcementStore = useAnnouncementStore()
const unavailabilityStore = useUnavailabilityStore()

const router = useRouter()

async function handleLogout() {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

onMounted(async () => {
  await authStore.fetchUser()
  await announcementStore.fetchAll()
  await locationStore.fetchAll()
  await serviceStore.fetchAll()
  await unavailabilityStore.fetchAll()
  await bookingStore.fetchAll()
})
</script>
