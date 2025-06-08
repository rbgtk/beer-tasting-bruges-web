<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div class="p-4">
        <h1 class="text-xl font-semibold mb-6">Admin Dashboard</h1>
        <nav class="flex flex-col gap-2">
          <router-link to="/dashboard" class="hover:bg-gray-700 rounded px-3 py-2" exact-active-class="bg-gray-700">
            Dashboard
          </router-link>
          <router-link
            to="/dashboard/locations"
            class="hover:bg-gray-700 rounded px-3 py-2"
            exact-active-class="bg-gray-700"
          >
            Locations
          </router-link>
          <router-link
            to="/dashboard/events/onetime"
            class="hover:bg-gray-700 rounded px-3 py-2"
            exact-active-class="bg-gray-700"
          >
            OneTime Events
          </router-link>
          <router-link
            to="/dashboard/events/recurring"
            class="hover:bg-gray-700 rounded px-3 py-2"
            exact-active-class="bg-gray-700"
          >
            Recurring Events
          </router-link>
          <router-link
            to="/dashboard/unavailabilities"
            class="hover:bg-gray-700 rounded px-3 py-2"
            exact-active-class="bg-gray-700"
          >
            Unavailabilities
          </router-link>
          <!-- Add more admin links as needed -->
        </nav>
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
import api from '@/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  try {
    await api.post('/api/auth/logout')
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
