<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Events</h1>
      <router-link to="/dashboard/events/create" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        + Add Event
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchEvents, deleteEvent } from '@/services/eventService'
import EventCard from '@/components/admin/events/Card.vue'

const events = ref([])

onMounted(async () => {
  events.value = await fetchEvents()
})

async function handleDelete(event) {
  await deleteEvent(event)
  events.value = await fetchEvents()
}
</script>
