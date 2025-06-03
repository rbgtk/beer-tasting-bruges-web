<template>
  <div>
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">Admin Dashboard</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>

    <main class="p-4">
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

