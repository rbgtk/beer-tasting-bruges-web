<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps(['event', 'onSubmit', 'submitLabel'])

const form = ref({
  name: '',
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
