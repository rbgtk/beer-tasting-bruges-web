<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Announcements</h1>
      <router-link
        to="/dashboard/announcements/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Announcement
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <AnnouncementCard
        v-for="announcement in announcements"
        :key="announcement.id"
        :announcement="announcement"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAnnouncements, deleteAnnouncement } from '@/services/announcementService'
import AnnouncementCard from '@/components/admin/announcements/Card.vue'

const announcements = ref([])

onMounted(async () => {
  announcements.value = await fetchAnnouncements()
})

async function handleDelete(announcement) {
  await deleteAnnouncement(announcement)
  locations.value = await fetchAnnouncements()
}
</script>
