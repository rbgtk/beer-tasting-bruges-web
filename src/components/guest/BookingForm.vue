<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white shadow rounded-xl">
    <!-- Left Column: Date Picker -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Select a Date</h2>
      <VueDatePicker
        v-model="booking.date"
        inline
        auto-apply
        required
        :enable-time-picker="false"
        :allowed-dates="allowedDates"
        class="w-full"
      />
    </div>

    <!-- Middle Column: Event List -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Available Events</h2>
      <div v-if="availableEvents.length" class="space-y-3">
        <div
          v-for="event in availableEvents"
          :key="event.id"
          class="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition duration-300"
        >
          <h3 class="font-bold">{{ event.name }}</h3>
        </div>
      </div>
      <div v-else class="text-gray-500">No events available for this date.</div>
    </div>

    <!-- Right Column: User Information -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Your Information</h2>
      <div class="space-y-3">
        <input
          v-model="booking.name"
          type="text"
          placeholder="Name"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          v-model="booking.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          v-model.number="booking.guests"
          type="number"
          placeholder="Number of Guests"
          min="1"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <textarea
          v-model="booking.notes"
          placeholder="Optional notes"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
        ></textarea>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAvailableDates } from '@/services/availabilityService.js'

import VueDatePicker from '@vuepic/vue-datepicker'

const booking = ref({
  date: new Date(),
  event: null,
  name: '',
  email: '',
  guests: 1,
  notes: '',
})

const allowedDates = ref([])

const availableEvents = computed(() => {
  return []
})

onMounted(async () => {
  allowedDates.value = await fetchAvailableDates(540)
})
</script>
