<template>
  <div class="flex">
    <form @submit.prevent="handleSubmit" class="w-full max-w-4xl p-4 bg-white rounded shadow space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 space-y-2">
        <!-- Left column (date picker) -->
        <VueDatePicker
          v-model="form.daterange"
          time-picker-inline
          inline
          is-24
          auto-apply
          range
          no-hours-overlay
          no-minutes-overlay
        ></VueDatePicker>

        <!-- Right column (form fields) -->
        <div class="space-y-4">
          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700">Reason</label>
            <input id="reasen" v-model="form.reason" required class="mt-1 block w-full border rounded shadow-sm p-2" />
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <select id="location" v-model="form.locationId" class="mt-1 block w-full border rounded shadow-sm p-2">
              <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
            </select>
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

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { fetchLocations } from '@/services/locationService.js'

const props = defineProps(['unavailability', 'onSubmit', 'submitLabel'])

const locations = ref([])

const form = ref({
  daterange: [Date.now(), Date.now + 24 * 60 * 60 * 1000],
  reason: '',
  locationId: 0,
})

onMounted(async () => {
  locations.value = await fetchLocations()
})

watchEffect(() => {
  if (props.unavailability) {
    form.value = { daterange: [props.unavailability.dateFrom, props.unavailability.dateTo], ...props.unavailability }
  }
})

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
