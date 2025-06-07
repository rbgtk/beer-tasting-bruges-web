<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Onetime Events</h1>
      <router-link
        to="/dashboard/events/recurring/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Recurring Event
      </router-link>
    </div>

    <div class="flex flex-wrap gap-4">
      <RecurringEventCard
        v-for="recurringEvent in recurringEvents"
        :key="recurringEvent.id"
        :recurringEvent="recurringEvent"
        @delete="deleteRecurringEvent"
        class="flex-1 min-w-[15%] max-w-[20%]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchRecurringEvents, deleteRecurringEvent } from '@/services/recurringEventService'
import RecurringEventCard from '@/components/admin/events/recurring/Card.vue'
import type { RecurringEvent } from '@/models/recurringEvent'

const recurringEvents = ref<RecurringEvent[]>([])

onMounted(async () => {
  recurringEvents.value = await fetchRecurringEvents()
})
</script>
