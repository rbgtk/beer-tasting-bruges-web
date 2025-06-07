<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Recurring Event</h1>

    <RecurringEventForm :onSubmit="handleCreate" submitLabel="Create Recurring Event" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createRecurringEvent } from '@/services/recurringEventService';

import RecurringEventForm from '@/components/admin/events/recurring/Form.vue';

const router = useRouter();

async function handleCreate(data) {
  await createRecurringEvent(data);
  router.push('/dashboard/events/recurring');
}
</script>
