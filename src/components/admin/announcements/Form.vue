<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input id="title" v-model="form.title" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <div>
      <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
      <textarea id="message" v-model="form.message" class="mt-1 block w-full border rounded shadow-sm p-2"></textarea>
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps(['announcement', 'onSubmit', 'submitLabel'])

const form = ref({
  title: '',
  message: '',
})

watchEffect(() => {
  if (props.location) {
    form.value = { ...props.location }
  }
})

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
