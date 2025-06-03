<template>
  <div class="max-w-md mx-auto mt-24 p-8 border rounded shadow">
    <h1 class="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-gray-600 focus:ring-gray-600"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-gray-600 focus:ring-gray-600"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
      >
        Login
      </button>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const error = ref<string | null>(null)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    await api.post('/api/auth/login', {
      email: email.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      error.value = 'Invalid username or password.'
    } else {
      error.value = 'An unexpected error occurred.'
    }
  }
}
</script>

