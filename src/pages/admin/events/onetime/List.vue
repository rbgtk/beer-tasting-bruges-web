<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Onetime Events</h1>
      <router-link to="/dashboard/events/onetime/create" 
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Add Onetime Event</router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <OneTimeEventCard v-for="oneTimeEvent in oneTimeEvents" :key="oneTimeEvent.id" :oneTimeEvent="oneTimeEvent" @delete="deleteOneTimeEvent"
                    class="flex-1 min-w-[15%] max-w-[20%]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchOneTimeEvents, deleteOneTimeEvent } from '@/services/oneTimeEventService'
import OneTimeEventCard from '@/components/admin/events/onetime/Card.vue'
import type { OneTimeEvent } from '@/models/oneTimeEvent'

const oneTimeEvents = ref<OneTimeEvent[]>([])

onMounted(async () => {
  oneTimeEvents.value = await fetchOneTimeEvents()
})
</script>
