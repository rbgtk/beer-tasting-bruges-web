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

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { fetchLocations } from '@/services/locationService'

const props = defineProps(['event', 'onSubmit', 'submitLabel'])

const form = ref({
  name: '',
  description: '',
  locationId: 0,
  price: 10,
})

const locations = ref([])

onMounted(async () => {
  locations.value = await fetchLocations()
})

watchEffect(() => {
  if (props.event) {
    form.value = { ...props.event }
  }
})

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
