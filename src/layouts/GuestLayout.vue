<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">Beer Tasting Bruges</h1>
      <Navigation />
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2025 Beer Tasting Bruges. All rights reserved.</p>
    </footer>
  </div>

  <!-- Announcement Modal -->
  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-80"></div>
      <div class="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-4">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800" @click="showModal = false">
          &times;
        </button>

        <Carousel
          :items="activeAnnouncements"
          :cardComponent="AnnouncementCard"
          :autoScroll="true"
          :autoScrollInterval="5000"
          :navigation="true"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAnnouncements } from '@/services/announcementService.js'

import Carousel from '@/components/Carousel.vue'
import Navigation from '@/components/guest/Navigation.vue'
import AnnouncementCard from '@/components/guest/AnnouncementCard.vue'

const announcements = ref([])
const showModal = ref(false)

// Active announcements filtered by today's date
const activeAnnouncements = computed(() => {
  const today = new Date()
  return announcements.value.filter((a) => {
    const from = new Date(a.dateFrom)
    const to = new Date(a.dateTo)
    return from <= today && to >= today
  })
})

onMounted(async () => {
  announcements.value = await fetchAnnouncements()
  /* announcements.value = [
    { title: 'test1', content: '# header with __italic__ markdown', dateFrom: '2023-08-01', dateTo: '2025-08-31' },
    { title: 'test2', content: '# header with **bold** markdown', dateFrom: '2023-08-01', dateTo: '2025-08-31' },
    {
      title: 'test3',
      content: '# header with ~~strikethrough~~ markdown',
      dateFrom: '2023-08-01',
      dateTo: '2024-08-31',
    },
  ] */

  // Wait 3 seconds, then show modal if there are active announcements
  setTimeout(() => {
    console.log('Timout over, active announcements: ', activeAnnouncements.value)

    if (activeAnnouncements.value.length > 0) {
      console.log('Active announcements: ', activeAnnouncements.value.length)
      showModal.value = true
    }
  }, 3000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
