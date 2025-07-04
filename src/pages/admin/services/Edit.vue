<template>
  <h1 class="text-2xl font-bold mb-4">Edit Service</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Update Service" :item="item" />
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServiceStore } from '@/stores/serviceStore.js'

import Form from '@/components/admin/service/Form.vue'

const route = useRoute()
const router = useRouter()

const store = useServiceStore()
const item = ref(null)

async function handleSubmit(data) {
  await store.update(Number(route.params.id), data)
  router.push('/dashboard/services')
}

watchEffect(() => {
  if (store.items.length > 0 && !item.value) {
    item.value = store.items.find((i) => i.id === Number(route.params.id))
  }
})

onMounted(async () => {
  await store.fetchAll()
})
</script>
