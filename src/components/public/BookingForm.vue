<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white shadow rounded-xl">
    <!-- Left Column: Date Picker -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Select a date</h2>

      <VueDatePicker
        v-model="booking.date"
        inline
        auto-apply
        required
        locale="nl-BE"
        :enable-time-picker="false"
        :allowed-dates="allowedDates"
        class="w-full"
      />
    </div>

    <!-- Middle Column: Location Filter and Event List -->
    <div>
      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Location (optional)</h2>
        <select id="location" v-model="selectedLocation" class="w-full p-2 border rounded">
          <option :value="null">All locations</option>
          <option v-for="loc in locations" :key="loc.id" :value="loc">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <h2 class="text-lg font-semibold mb-2">Available Events</h2>

        <div v-if="availableEvents.length" class="space-y-3">
          <label
            v-for="event in availableEvents"
            :key="event.id"
            class="block p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition duration-300 cursor-pointer"
          >
            <div v-for="schedule in event.schedules" :key="schedule.id" class="flex items-start gap-4">
              <input
                type="radio"
                name="selectedEvent"
                :value="schedule.id"
                v-model="selectedEventScheduleId"
                class="mt-1"
                required
              />

              <div>
                <h3 class="font-bold">{{ event.name }}</h3>
                <p>
                  <span class="font-bold">Location:</span>
                  {{ event.location.name }}
                </p>
                <p>
                  <span class="font-bold">Price:</span>
                  {{ event.price }},00 EUR
                </p>
                <p>
                  <span class="font-bold">Time:</span>
                  {{ printScheduleTime(schedule) }}
                </p>
              </div>
            </div>
          </label>
        </div>

        <div v-else class="text-gray-500">No events available for this date.</div>
      </div>
    </div>

    <!-- Right Column: User Information -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Your Information</h2>
      <div class="space-y-3">
        <input
          v-model="booking.name"
          type="text"
          placeholder="Name"
          inputmode="text"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          v-model="booking.email"
          type="email"
          placeholder="Email"
          inputmode="email"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          v-model="booking.phone"
          type="tel"
          placeholder="Phone"
          inputmode="tel"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          v-model.number="booking.guests"
          type="number"
          placeholder="Number of Guests"
          min="1"
          inputmode="numeric"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          required
        />
        <textarea
          v-model="booking.notes"
          placeholder="Optional notes"
          inputmode="text"
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchLocations } from '@/services/locationService.js'
import { fetchAvailableDates, fetchAvailableEvents } from '@/services/availabilityService.js'
import { isValidPhoneNumber } from 'libphonenumber-js'

import VueDatePicker from '@vuepic/vue-datepicker'

const route = useRoute()

const locations = ref([])
const selectedLocation = ref(null)
const allowedDates = ref([])
const availableEvents = ref([])
const selectedEventScheduleId = ref(null)

const booking = ref({
  date: new Date(),
  event: null,
  name: '',
  email: '',
  phone: '',
  guests: 1,
  notes: '',
})

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
})

onMounted(async () => {
  locations.value = await fetchLocations()

  const locationIdFromQuery = route.query.location
  if (locationIdFromQuery) {
    const location = locations.value.find((l) => l.id === parseInt(locationIdFromQuery))
    if (location) {
      selectedLocation.value = location
    }
  }

  await updateAvailableDates()
  await updateAvailableEvents()
})

watch(
  () => booking.value.date,
  async () => {
    await updateAvailableEvents()
  }
)

watch(selectedLocation, async () => {
  await updateAvailableDates()
  await updateAvailableEvents()
})

watch(selectedEventScheduleId, () => {
  applySelectedScheduleTime()
})

async function updateAvailableDates() {
  allowedDates.value = await fetchAvailableDates(540, selectedLocation.value?.id)
}

async function updateAvailableEvents() {
  const isoDate = new Date(booking.value.date).toISOString().split('T')[0]
  availableEvents.value = await fetchAvailableEvents(isoDate, selectedLocation.value?.id)
}

function printScheduleTime(schedule) {
  if (schedule.type === 'ONE_TIME') {
    return new Date(schedule.date).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
  } else if (schedule.type === 'RECURRING') {
    return schedule.time
  }
}

function applySelectedScheduleTime() {
  const selected = availableEvents.value
    .flatMap((e) =>
      e.schedules.map((s) => ({
        schedule: s,
        event: e,
      }))
    )
    .find((pair) => pair.schedule.id === selectedEventScheduleId.value)

  if (!selected) return

  if (selected.schedule.type === 'RECURRING') {
    const [hourStr, minuteStr] = selected.schedule.time.split(':')
    const dateWithTime = new Date(booking.value.date)

    dateWithTime.setHours(parseInt(hourStr))
    dateWithTime.setMinutes(parseInt(minuteStr))
    dateWithTime.setSeconds(0)
    dateWithTime.setMilliseconds(0)

    booking.value.date = dateWithTime
  } else if (selected.schedule.type === 'ONE_TIME') {
    // Trust the full datetime from the schedule itself
    booking.value.date = new Date(selected.schedule.date)
  }
}

async function handleSubmit() {
  const selected = availableEvents.value
    .flatMap((e) =>
      e.schedules.map((s) => ({
        schedule: s,
        event: e,
      }))
    )
    .find((pair) => pair.schedule.id === selectedEventScheduleId.value)

  if (!selected) {
    return alert('Please select an event')
  }

  if (!isValidPhoneNumber(booking.value.phone, 'BE')) {
    return alert('Please enter a valid phone number')
  }

  try {
    await props.onSubmit({
      date: booking.value.date.toISOString(),
      eventId: selected.event.id,
      scheduleId: selected.schedule.id,
      name: booking.value.name,
      email: booking.value.email,
      phone: booking.value.phone,
      guests: booking.value.guests,
      notes: booking.value.notes,
    })
  } catch (error) {
    console.error('Booking failed:', error)
    alert('Something went wrong. Please try again.')
  }
}
</script>
