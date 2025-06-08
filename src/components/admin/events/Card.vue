<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ event.name }}</h3>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Location:</span>
        {{ event.location.name }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Price:</span>
        {{ event.price }} EUR
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Description:</span>
        {{ event.description }}
      </p>
      <div v-if="event.schedules.length > 0">
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Schedules:</span>
        </p>

        <ul>
          <li v-for="schedule in event.schedules" :key="schedule.id">
            <span v-if="schedule.type === 'ONE_TIME'">{{ schedule.date }}</span>
            <span>Every {{ schedule.weekday }} at {{ schedule.time }}</span>
          </li>
        </ul>
      </div>
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

<script setup lang="ts">
defineProps(['event'])
</script>
