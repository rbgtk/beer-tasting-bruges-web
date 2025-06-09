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
      <button type="submit" class="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Login</button>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const error = ref(null)
const router = useRouter()

async function handleLogin() {
  await authStore.login({
    email: email.value,
    password: password.value,
  })
  router.push('/dashboard')
}
</script>
