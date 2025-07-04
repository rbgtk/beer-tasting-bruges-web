<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ formatDate(item.dateFrom) }} - {{ formatDate(item.dateTo) }}</h3>

      <p class="text-sm text-gray-600" v-if="item.location">
        <span class="font-semibold">Location:</span>
        {{ item.location.name }}
      </p>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Reason:</span>
        {{ item.reason }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link :to="edit" class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700">
        Edit
      </router-link>
      <button @click="$emit('delete', item)" class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object },
  edit: { type: String },
})

function formatDate(dateString) {
  const date = new Date(datestring)
  return date.toLocaleString()
}
</script>
