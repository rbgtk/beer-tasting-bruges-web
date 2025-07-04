<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Bookings</h1>
      <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Import</button>
    </div>

    <List :store="store" :card="Card" edit="/dashboard/bookings/edit" />
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/bookingStore.js'

import List from '@/components/shared/CardList.vue'
import Card from '@/components/admin/booking/Card.vue'

const store = useBookingStore()
</script>
