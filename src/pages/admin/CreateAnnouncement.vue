<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Announcement</h1>
    <AnnouncementForm :onSubmit="handleCreate" submitLabel="Create Announcement" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createAnnouncement } from '@/services/announcementService'

import AnnouncementForm from '@/components/admin/announcements/Form.vue'

const router = useRouter()

async function handleCreate(data) {
  await createAnnouncement(data)
  router.push('/dashboard/announcements')
}
</script>
