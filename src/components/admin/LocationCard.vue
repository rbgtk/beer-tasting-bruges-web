<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ location.name }}</h3>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Address:</span>
        {{ location.address }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Summary:</span>
        {{ location.summary }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link
        :to="`/dashboard/locations/edit/${location.id}`"
        class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Edit
      </router-link>
      <button
        @click="$emit('delete', location)"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['location'])
</script>
