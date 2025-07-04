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

    <div>
      <label for="dateRange" class="block text-sm font-medium text-gray-700">Date range</label>
      <Datepicker
        v-model="form.dateFrom"
        enable-time-picker
        time-picker-inline
        text-input
        auto-apply
        is-24
        format="yyyy-MM-dd HH:mm"
        class="w-full"
      />
    </div>

    <div>
      <label for="dateTo" class="block text-sm font-medium text-gray-700">End date</label>
      <Datepicker
        v-model="form.dateTo"
        enable-time-picker
        time-picker-inline
        text-input
        auto-apply
        is-24
        format="yyyy-MM-dd HH:mm"
        class="w-full"
      />
    </div>

    <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'

const props = defineProps(['announcement', 'onSubmit', 'submitLabel'])

const form = ref({
  title: '',
  message: '',
  dateFrom: Date.now(),
  dateTo: new Date(Date.now() + 24 * 60 * 60 * 1000),
})

watchEffect(() => {
  if (props.announcement) {
    form.value = { ...props.announcement }
  }
})

function handleSubmit() {
  props.onSubmit(form.value)
}
</script>
