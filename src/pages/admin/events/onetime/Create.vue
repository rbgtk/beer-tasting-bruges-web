<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Onetime Event</h1>

    <OneTimeEventForm :onSubmit="handleCreate" submitLabel="Create Onetime Event" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createOneTimeEvent } from '@/services/oneTimeEventService';

import OneTimeEventForm from '@/components/admin/events/onetime/Form.vue';

const router = useRouter();

async function handleCreate(data) {
  await createOneTimeEvent(data);
  router.push('/dashboard/events/onetime');
}
</script>
