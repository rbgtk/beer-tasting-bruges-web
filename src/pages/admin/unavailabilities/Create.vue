<template>
  <h1 class="text-2xl font-bold mb-4">Add New Unavailability</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Create Unavailability" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUnavailabilityStore } from '@/stores/unavailabilityStore.js'

import Form from '@/components/admin/unavailability/Form.vue'

const router = useRouter()
const store = useUnavailabilityStore()

async function handleSubmit(data) {
  await store.create(data)
  router.push('/dashboard/unavailabilities')
}
</script>
