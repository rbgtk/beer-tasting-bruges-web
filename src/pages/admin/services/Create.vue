<template>
  <h1 class="text-2xl font-bold mb-4">Add New Service</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Create Service" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useServiceStore } from '@/stores/serviceStore.js'

import Form from '@/components/admin/service/Form.vue'

const router = useRouter()
const store = useServiceStore()

async function handleSubmit(data) {
  await store.create(data)
  router.push('/dashboard/services')
}
</script>
