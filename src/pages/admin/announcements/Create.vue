<template>
  <h1 class="text-2xl font-bold mb-4">Add New Announcement</h1>

  <Form :onSubmit="handleSubmit" submitLabel="Create Announcement" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAnnouncementStore } from '@/stores/announcementStore.js'

import Form from '@/components/admin/announcement/Form.vue'

const router = useRouter()
const store = useAnnouncementStore()

async function handleSubmit(data) {
  await store.create(data)
  router.push('/dashboard/announcements')
}
</script>
