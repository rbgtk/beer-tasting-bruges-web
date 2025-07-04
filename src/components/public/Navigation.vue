<template>
  <nav class="px-4 py-3 flex items-center justify-between">
    <!-- Hamburger button on mobile -->
    <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
      <!-- Hamburger icon (simple bars) -->
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Nav links (hidden on mobile, flex on md+) -->
    <div class="hidden md:flex space-x-4 font-semibold">
      <NavigationLink label="Home" link="/" />
      <NavigationLink label="About" link="/about" />
      <NavigationLink label="Articles" link="/articles" />
      <NavigationLink label="Contact" link="/contact" />
      <NavigationLink label="Book Now!" link="/booking" />
      <NavigationLink label="Dashboard" link="/dashboard/bookings" v-if="authStore.isAdmin" />
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import NavigationLink from '@/components/public/NavigationLink.vue'

const authStore = useAuthStore()
</script>
