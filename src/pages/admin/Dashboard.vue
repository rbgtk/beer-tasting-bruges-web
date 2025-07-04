<template>
  <div>You have {{ announcementStore.items.length }} announcements.</div>
  <div>You have {{ locationStore.items.length }} locations.</div>
  <div>You have {{ serviceStore.items.length }} services.</div>
  <div>You have {{ unavailabilityStore.items.length }} unavailabilities.</div>
  <div>You have {{ bookingStore.items.length }} bookings.</div>
</template>

<script setup>
import { useAnnouncementStore } from '@/stores/announcementStore.js'
import { useLocationStore } from '@/stores/locationStore'
import { useServiceStore } from '@/stores/serviceStore.js'
import { useUnavailabilityStore } from '@/stores/unavailabilityStore.js'
import { useBookingStore } from '@/stores/bookingStore.js'

const announcementStore = useAnnouncementStore()
const locationStore = useLocationStore()
const serviceStore = useServiceStore()
const unavailabilityStore = useUnavailabilityStore()
const bookingStore = useBookingStore()
</script>
