<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Announcement</h1>
    <LocationForm :announcement="announcement" :onSubmit="handleUpdate" submitLabel="Update Announcement" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchAnnouncement, updateAnnouncement } from '@/services/announcementService'

import AnnouncementForm from '@/components/admin/announcements/Form.vue'

const route = useRoute()
const router = useRouter()

const location = ref(null)

async function handleUpdate(data) {
  await updateAnnouncement({ id: route.params.id, ...data })
  router.push('/dashboard/announcements')
}

onMounted(async () => {
  announcement.value = await fetchAnnouncement(route.params.id)
})
</script>
