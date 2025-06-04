<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Location</h1>
    <LocationForm
      :location="location"
      :onSubmit="updateLocation"
      submitLabel="Update Location"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/axios'
import LocationForm from '@/components/admin/LocationForm.vue'

const route = useRoute()
const router = useRouter()
const location = ref<{ id: string; name: string; address: string; description: string } | null>(null)

const fetchLocation = async () => {
  try {
    const response = await api.get(`/api/locations/${route.params.id}`)
    location.value = response.data
  } catch (error) {
    console.error('Failed to fetch location:', error)
    // Optionally: redirect or show error
  }
}

const updateLocation = async (form: { name: string; address: string; description: string }) => {
  try {
    await api.put(`/api/locations/${route.params.id}`, form)
    router.push('/dashboard/locations')
  } catch (error) {
    console.error('Failed to update location:', error)
    // Optionally: show a toast or alert
  }
}

onMounted(() => {
  fetchLocation()
})
</script>

