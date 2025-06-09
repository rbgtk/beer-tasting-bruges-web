<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        class="mt-1 block w-full border rounded shadow-sm p-2"
      ></textarea>
    </div>

    <div>
      <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
      <select id="location" v-model="form.locationId" class="mt-1 block w-full border rounded shadow-sm p-2">
        <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
      </select>
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
      <input
        id="price"
        type="number"
        min="10"
        step="1"
        v-model="form.price"
        required
        class="mt-1 block w-full border rounded shadow-sm p-2"
      />
    </div>

    <!-- Schedules Section -->
    <div>
      <h3 class="text-lg font-medium text-gray-800">Schedules</h3>

      <div
        v-for="(schedule, index) in form.schedules"
        :key="index"
        class="flex items-center gap-2 border p-2 rounded mt-2"
      >
        <select v-model="schedule.type" class="border rounded p-1">
          <option value="ONE_TIME">One-time</option>
          <option value="RECURRING">Recurring</option>
        </select>

        <!-- Dynamic Fields -->
        <div v-if="schedule.type === 'ONE_TIME'" class="flex-1">
          <Datepicker
            v-model="schedule.date"
            enable-time-picker
            time-picker-inline
            text-input
            auto-apply
            is-24
            format="yyyy-MM-dd HH:mm"
            class="w-full"
          />
        </div>

        <div v-else class="flex items-center gap-2 flex-1">
          <select v-model="schedule.day" class="border rounded p-1">
            <option v-for="day in daysOfWeek" :key="day" :value="day">{{ day }}</option>
          </select>

          <!--<Datepicker v-model="schedule.time" time-picker text-input auto-apply is-24 format="HH:mm" class="w-full" />-->
          <input type="time" v-model="schedule.time" class="border rounded p-1 w-full" />
        </div>

        <button type="button" @click="removeSchedule(index)" class="text-red-500 font-bold text-lg hover:text-red-700">
          &times;
        </button>
      </div>

      <button
        type="button"
        @click="addSchedule"
        class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
      >
        + Add Schedule
      </button>
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import { fetchLocations } from '@/services/locationService'

const props = defineProps(['event', 'onSubmit', 'submitLabel'])

const form = ref({
  name: '',
  description: '',
  locationId: 0,
  price: 10,
  schedules: [],
})

const locations = ref([])
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

onMounted(async () => {
  locations.value = await fetchLocations()
})

watchEffect(() => {
  if (props.event) {
    form.value = { ...props.event }
  }
})

function addSchedule() {
  form.value.schedules.push({
    type: 'ONE_TIME',
    date: new Date(),
    day: 'Monday',
    time: '12:00',
  })
}

function removeSchedule(index) {
  form.value.schedules.splice(index, 1)
}

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
