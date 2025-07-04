<template>
  <h1 class="text-2xl font-bold mb-4">Edit Announcement</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Update Announcement" :item="item" />
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnnouncementStore } from '@/stores/announcementStore.js'

import Form from '@/components/admin/announcement/Form.vue'

const route = useRoute()
const router = useRouter()

const store = useAnnouncementStore()
const item = ref(null)

async function handleSubmit(data) {
  await store.update(Number(route.params.id), data)
  router.push('/dashboard/announcements')
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
