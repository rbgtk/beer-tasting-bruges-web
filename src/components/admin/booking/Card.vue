<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ item.event.name }}</h3>
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
</script>
