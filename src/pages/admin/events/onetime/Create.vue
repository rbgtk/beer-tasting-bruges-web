<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add a OneTime Event</h1>
    <LocationForm :onSubmit="createLocation" submitLabel="Create OneTime Event" />
  </div>
</template>

<script setup lang="ts">
import LocationForm from '@/components/admin/LocationForm.vue'
import api from '@/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const createLocation = async (form: { name: string; address: string; description: string }) => {
  try {
    await api.post('/api/locations', form)
    router.push('/dashboard/locations')
  } catch (error) {
    console.error('Failed to create location:', error)
    // Optionally: show a toast or alert
  }
}
</script>

