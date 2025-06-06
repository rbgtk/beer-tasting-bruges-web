<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Location</h1>
    <LocationForm :onSubmit="createLocation" submitLabel="Create Location" />
  </div>
</template>

<script setup lang="ts">
import LocationForm from '@/components/admin/locations/Form.vue'
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

