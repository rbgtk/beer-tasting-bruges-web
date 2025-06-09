<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Event</h1>
    <EventForm :onSubmit="handleCreate" submitLabel="Create Event" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createEvent } from '@/services/eventService'

import EventForm from '@/components/admin/events/Form.vue'

const router = useRouter()

async function handleCreate(data) {
  await createEvent(data)
  router.push('/dashboard/events')
}
</script>
