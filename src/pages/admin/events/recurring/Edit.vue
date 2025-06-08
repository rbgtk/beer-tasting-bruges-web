<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Recurring Event</h1>

    <RecurringEventForm
      :recurringEvent="recurringEvent"
      :onSubmit="handleUpdate"
      submitLabel="Update Recurring Event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RecurringEvent } from '@/models/recurringEvent'
import { fetchRecurringEvent, updateRecurringEvent } from '@/services/recurringEventService'

import RecurringEventForm from '@/components/admin/events/recurring/Form.vue'

const route = useRoute()
const router = useRouter()
const recurringEvent = ref<RecurringEvent | null>(null)

onMounted(async () => {
  recurringEvent.value = await fetchRecurringEvent(route.params.id)
})

async function handleUpdate(data) {
  await updateRecurringEvent({ id: route.params.id, ...data })
  router.push('/dashboard/events/recurring')
}
</script>
