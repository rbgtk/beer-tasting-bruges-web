<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Locations</h1>
      <router-link
        to="/dashboard/locations/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Location
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <LocationCard
        v-for="loc in locations"
        :key="loc.id"
        :location="loc"
        @edit="handleEdit"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/axios'
import LocationCard from '@/components/admin/LocationCard.vue'

type Location = {
  id: string
  name: string
  address: string
  description: string
}

const locations = ref<Location[]>([])

const fetchLocations = async () => {
  try {
    const response = await api.get('/api/locations')
    locations.value = response.data
  } catch (error) {
    console.error('Failed to fetch locations:', error)
  }
}

const handleEdit = (location: Location) => {
  console.log('Edit location:', location)
  // open modal or navigate to edit page
}

const handleDelete = async (location: Location) => {
  const confirmed = window.confirm(`Are you sure you want to delete "${location.name}"?`)
  if (confirmed) {
    try {
      await api.delete(`/api/locations/${location.id}`)
      // Refetch or remove from local array
      locations.value = locations.value.filter(l => l.id !== location.id)
    } catch (error) {
      console.error('Failed to delete location:', error)
      // Optionally: show a toast or alert
    }
  }
}

onMounted(() => {
  fetchLocations()
})
</script>

