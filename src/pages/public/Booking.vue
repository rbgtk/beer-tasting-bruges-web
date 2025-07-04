<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Book Now!</h1>
  </div>
  <BookingForm :onSubmit="handleCreate" />
</template>

<script setup>
import { createBooking } from '@/services/bookingService.js'
import BookingForm from '@/components/guest/BookingForm.vue'

async function handleCreate(booking) {
  await createBooking(booking)
}
</script>
