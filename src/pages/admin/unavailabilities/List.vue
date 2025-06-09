<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Unavailabilities</h1>
      <router-link
        to="/dashboard/unavailabilities/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Unavailability
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <UnavailabilityCard
        v-for="unavailability in unavailabilities"
        :key="unavailability.id"
        :unavailability="unavailability"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchUnavailabilities, deleteUnavailability } from '@/services/unavailabilityService'
import UnavailabilityCard from '@/components/admin/unavailabilities/Card.vue'

const unavailabilities = ref([])

onMounted(async () => {
  unavailabilities.value = await fetchUnavailabilities()
})

async function handleDelete(unavailability) {
  await deleteUnavailability(unavailability)
  unavailabilities.value = await fetchUnavailabilities()
}
</script>
