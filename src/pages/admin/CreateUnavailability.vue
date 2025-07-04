<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Unavailability</h1>
    <UnavailabilityForm :onSubmit="handleCreate" submitLabel="Create Unavailability" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createUnavailability } from '@/services/unavailabilityService'

import UnavailabilityForm from '@/components/admin/unavailabilities/Form.vue'

const router = useRouter()

async function handleCreate(data) {
  await createUnavailability(data)
  router.push('/dashboard/unavailabilities')
}
</script>
