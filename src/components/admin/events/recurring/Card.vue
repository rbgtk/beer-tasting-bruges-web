<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ recurringEvent.name }}</h3>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Schedule:</span>
        {{ recurringEvent.weekday }} {{ recurringEvent.time }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Location:</span>
        {{ recurringEvent.location.name }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Description:</span>
        {{ recurringEvent.description }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Price:</span>
        {{ recurringEvent.price }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link
        :to="`/dashboard/events/recurring/edit/${recurringEvent.id}`"
        class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Edit
      </router-link>
      <button
        @click="$emit('delete', recurringEvent)"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecurringEvent } from '@/models/recurringEvent'

defineProps<{
  recurringEvent: RecurringEvent
}>()
</script>
