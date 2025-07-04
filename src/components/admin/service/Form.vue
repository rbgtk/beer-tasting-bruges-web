<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <div>
      <label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
      <input id="summary" v-model="form.summary" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        class="mt-1 block w-full border rounded shadow-sm p-2"
      ></textarea>
    </div>

    <!-- Events Section -->
    <div>
      <h3 class="text-lg font-medium text-gray-800">Events</h3>

      <div v-for="(event, index) in form.events" :key="index" class="flex items-center gap-2 border p-2 rounded mt-2">
        <div>
          <select id="location" v-model="event.locationId" class="border rounded p-1">
            <option v-for="location in locationStore.items" :key="location.id" :value="location.id">
              {{ location.name }}
            </option>
          </select>
        </div>

        <div>
          <input id="price" type="number" min="10" step="1" v-model="event.price" required class="border rounded p-1" />
        </div>

        <select v-model="event.type" class="border rounded p-1">
          <option value="SINGLE">One-time</option>
          <option value="RECURRING">Recurring</option>
        </select>

        <!-- Dynamic Fields -->
        <div v-if="event.type === 'SINGLE'" class="flex-1">
          <Datepicker
            v-model="event.date"
            enable-time-picker
            time-picker-inline
            text-input
            auto-apply
            is-24
            locale="nl-BE"
            format="yyyy-MM-dd HH:mm"
            class="w-full"
          />
        </div>

        <div v-else class="flex items-center gap-2 flex-1">
          <select v-model="event.weekday" class="border rounded p-1">
            <option v-for="day in daysOfWeek" :key="day" :value="day">{{ day }}</option>
          </select>

          <input type="time" v-model="event.time" class="border rounded p-1 w-full" />
        </div>

        <button type="button" @click="removeEvent(index)" class="text-red-500 font-bold text-lg hover:text-red-700">
          &times;
        </button>
      </div>

      <button type="button" @click="addEvent" class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">
        Add Event
      </button>
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useLocationStore } from '@/stores/locationStore.js'

import Datepicker from '@vuepic/vue-datepicker'

const locationStore = useLocationStore()

const props = defineProps({
  item: { type: Object },
  onSubmit: { type: Function },
  submitLabel: { type: String },
})

const form = ref({
  name: '',
  summary: '',
  description: '',
  events: [],
})

const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

watchEffect(() => {
  if (props.item) {
    form.value = { ...props.item }
  }
})

function addEvent() {
  const defaultLocationId = locationStore.items.length > 0 ? locationStore.items[0].id : null

  form.value.events.push({
    locationId: defaultLocationId,
    price: 32.0,
    type: 'SINGLE',
    date: new Date(),
    weekday: 'MONDAY',
    time: '12:00',
  })
}

function removeEvent(index) {
  form.value.events.splice(index, 1)
}

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
