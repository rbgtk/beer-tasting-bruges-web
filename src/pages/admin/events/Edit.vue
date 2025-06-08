<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Event</h1>
    <EventForm :event="event" :onSubmit="handleUpdate" submitLabel="Update Event" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchEvent, updateEvent } from '@/services/eventService'

import EventForm from '@/components/admin/events/Form.vue'

const route = useRoute()
const router = useRouter()

const event = ref(null)

async function handleUpdate(data) {
  await updateEvent({ id: route.params.id, ...data })
  router.push('/dashboard/events')
}

onMounted(async () => {
  event.value = await fetchEvent(route.params.id as number)
})
</script>
