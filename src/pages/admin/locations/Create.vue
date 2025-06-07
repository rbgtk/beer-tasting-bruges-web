<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Location</h1>

    <LocationForm :onSubmit="handleCreate" submitLabel="Create Location" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createLocation } from '@/services/locationService';

import LocationForm from '@/components/admin/locations/Form.vue';

const router = useRouter();

async function handleCreate(data) {
  await createLocation(data);
  router.push('/dashboard/locations');
}
</script>
