<template>
  <h1 class="text-2xl font-bold mb-4">Add New Location</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Create Location" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLocationStore } from '@/stores/locationStore.js'

import Form from '@/components/admin/location/Form.vue'

const router = useRouter()
const store = useLocationStore()

async function handleSubmit(data) {
  await store.create(data)
  router.push('/dashboard/locations')
}
</script>
