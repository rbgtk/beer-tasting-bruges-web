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
        v-for="location in locations"
        :key="location.id"
        :location="location"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchLocations, deleteLocation } from '@/services/locationService'
import LocationCard from '@/components/admin/locations/Card.vue'

const locations = ref([])

onMounted(async () => {
  locations.value = await fetchLocations()
})

async function handleDelete(location) {
  await deleteLocation(location)
  locations.value = await fetchLocations()
}
</script>
