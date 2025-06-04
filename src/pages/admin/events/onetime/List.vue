<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Onetime Events</h1>
      <router-link
        to="/dashboard/events/onetime/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Onetime Event
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <LocationCard
        v-for="event in oneTimeEvents"
        :key="event.id"
        :event="event"
        @edit="handleEdit"
        @delete="handleDelete"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/axios'
import LocationCard from '@/components/admin/LocationCard.vue'

type OneTimeEvent = {
  id: string
  name: string
  description: string
  date: string
  locationId: string
  price: string
}

const oneTimeEvents = ref<OneTimeEvent[]>([])

const fetchOneTimeEvents = async () => {
  try {
    const response = await api.get('/api/events/onetime')
    oneTimeEvents.value = response.data
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
}

const handleDelete = async (event: OneTimeEvent) => {
  const confirmed = window.confirm(`Are you sure you want to delete "${event.name}"?`)
  if (confirmed) {
    try {
      await api.delete(`/api/events/onetime/${event.id}`)
      oneTimeEvents.value = oneTimeEvents.value.filter(e => e.id !== event.id)
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }
}

onMounted(() => {
  fetchOneTimeEvents()
})
</script>

