<template>
  <div class="flex">
    <form @submit.prevent="handleSubmit" class="w-full max-w-4xl p-4 bg-white rounded shadow space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 space-y-2 gap-4">
        <!-- Left column (date picker) -->
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows="4"
              v-model="form.description"
              class="mt-1 block w-full border rounded shadow-sm p-2"
            ></textarea>
          </div>
        </div>

        <!-- Right column (form fields) -->
        <div class="space-y-4">
          <div>
            <label for="weekday" class="block text-sm font-medium text-gray-700">Weekday</label>
            <select v-model="form.weekday" class="mt-1 block w-full border rounded shadow-sm p-2">
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>

          <div>
            <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
            <input type="time" id="time" v-model="form.time" class="mt-1 block w-full border rounded shadow-sm p-2" />
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <select v-model="form.locationId" class="mt-1 block w-full border rounded shadow-sm p-2">
              <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
            </select>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              required
              v-model="form.price"
              min="10.00"
              step="0.50"
              class="mt-1 block w-full border rounded shadow-sm p-2"
            />
          </div>
        </div>
      </div>

      <!-- Submit button centered -->
      <div class="flex justify-end">
        <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          {{ submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { RecurringEvent } from '@/models/recurringEvent'
import type { Location } from '@/models/Location'
import { fetchLocations } from '@/services/locationService'

const props = defineProps<{
  recurringEvent?: RecurringEvent
  onSubmit: (data: {}) => void
  submitLabel?: string
}>()

const form = ref({
  name: '',
  description: '',
  weekday: '',
  time: '',
  locationId: '',
  price: 10,
})

const locations = ref<Location[]>([])

function handleSubmit() {
  props.onSubmit(form.value)
}

watchEffect(() => {
  if (props.recurringEvent) {
    form.value = { ...props.recurringEvent }
  }
})

onMounted(async () => {
  locations.value = await fetchLocations()
})
</script>
