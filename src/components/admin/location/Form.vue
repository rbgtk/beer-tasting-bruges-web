<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
      <input id="address" v-model="form.address" required class="mt-1 block w-full border rounded shadow-sm p-2" />
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

    <div>
      <label for="mapUrl" class="block text-sm font-medium text-gray-700">Map URL</label>
      <textarea id="mapUrl" v-model="form.mapUrl" class="mt-1 block w-full border rounded shadow-sm p-2"></textarea>
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  item: { type: Object, required: false, default: null },
  onSubmit: { type: Function, required: true },
  submitLabel: { type: String, required: true },
})

const form = ref({
  name: '',
  address: '',
  summary: '',
  description: '',
  mapUrl: '',
})

watchEffect(() => {
  if (props.item) {
    form.value = { ...props.item }
  }
})

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
