<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ event.name }}</h3>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Location:</span>
        {{ event.location.name }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Description:</span>
        {{ event.description }}
      </p>
      <div v-if="event.schedules.length > 0">
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Schedules:</span>
        </p>

        <ul class="px-4">
          <li v-for="schedule in event.schedules" :key="schedule.id" class="list-disc text-sm">
            <span v-if="schedule.type === 'ONE_TIME'">
              On {{ formatDate(schedule.date) }} at {{ formatTime(schedule.date) }}
            </span>
            <span v-else-if="schedule.type === 'RECURRING'">Every {{ schedule.weekday }} at {{ schedule.time }}</span>
          </li>
        </ul>
      </div>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Price:</span>
        {{ event.price }} EUR
      </p>
    </div>

    <div class="mt-4 flex gap-2">
      <router-link
        :to="`/dashboard/events/edit/${event.id}`"
        class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Edit
      </router-link>
      <button @click="$emit('delete', event)" class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: { type: Object, required: true },
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  })
}
</script>
