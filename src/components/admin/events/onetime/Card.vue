<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ oneTimeEvent.name }}</h3>
      <p class="text-sm text-gray-600"><span class="font-semibold">Date:</span> {{ oneTimeEvent.date }}</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Location:</span> {{ oneTimeEvent.location.name }}</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Description:</span> {{ oneTimeEvent.description }}</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Price:</span> {{ oneTimeEvent.price }}</p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link :to="`/dashboard/events/onetime/edit/${oneTimeEvent.id}`"
         class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700">
        Edit
      </router-link>
      <button @click="$emit('delete', oneTimeEvent)"
         class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OneTimeEvent } from '@/models/oneTimeEvent'

defineProps<{
  oneTimeEvent: OneTimeEvent
}>()
</script>
