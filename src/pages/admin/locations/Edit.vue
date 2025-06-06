<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Location</h1>

    <LocationForm
      :location="location"
      :onSubmit="handleUpdate"
      submitLabel="Update Location"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Location } from '@/models/location'
import { fetchLocation, updateLocation } from '@/services/locationApi'

import LocationForm from '@/components/admin/locations/Form.vue'

const route = useRoute()
const router = useRouter()

const location = ref<Location>()

async function handleUpdate(data) {
  const updatedLocation = {
    id: route.params.id,
    name: data.name,
    address: data.address,
    description: data.description,
    mapUrl: data.mapUrl
  }

  await updateLocation(updatedLocation)
  router.push('/dashboard/locations')
}

onMounted(async () => {
  location.value = await fetchLocation(route.params.id as number)
})
</script>
