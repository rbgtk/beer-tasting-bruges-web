<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Unavailability Location</h1>
    <UnavailabilityForm :unavailability="unavailability" :onSubmit="handleUpdate" submitLabel="Update Unavailability" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchUnavailability, updateUnavailability } from '@/services/unavailabilityService'

import UnavailabilityForm from '@/components/admin/unavailabilities/Form.vue'

const route = useRoute()
const router = useRouter()

const unavailability = ref(null)

async function handleUpdate(data) {
  await updateUnavailability({ id: route.params.id, ...data })
  router.push('/dashboard/unavailabilities')
}

onMounted(async () => {
  unavailability.value = await fetchUnavailability(route.params.id)
})
</script>
