<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">
        {{ formatDate(unavailability.dateFrom) }} - {{ formatDate(unavailability.dateTo) }}
      </h3>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Reason:</span>
        {{ unavailability.reason }}
      </p>
      <p v-if="unavailability.location" class="text-sm text-gray-600">
        <span class="font-semibold">Location:</span>
        {{ unavailability.location.name }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link
        :to="`/dashboard/unavailabilities/edit/${unavailability.id}`"
        class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Edit
      </router-link>
      <button
        @click="$emit('delete', unavailability)"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  unavailability: { type: Object },
})

function formatDate(datestring) {
  const date = new Date(datestring)
  return date.toLocaleString()
}
</script>
