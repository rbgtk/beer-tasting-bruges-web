<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="p-2 flex justify-between items-center">
      <div class="flex mx-4 space-x-2">
        <img src="/logo-150x150.png" alt="Logo" class="h-8 w-auto" />
        <h1 class="text-xl font-semibold">Beer Tasting Bruges</h1>
      </div>
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

  // Wait 3 seconds, then show modal if there are active announcements
  setTimeout(() => {
    if (activeAnnouncements.value.length > 0) {
      showModal.value = true
    }
  }, 3000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

header {
  background-color: #ffcc00;
}
</style>
