<template>
  <div class="p-4 flex flex-col justify-between">
    <div class="mb-2">
      <h3 class="text-lg font-semibold mb-2">{{ location.name }}</h3>
      <p class="text-sm text-gray-600">{{ location.description }}</p>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">Address:</span>
        {{ location.address }}
      </p>
    </div>
    <div v-html="location.mapUrl" class="flex justify-center"></div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from '@/models/location';

defineProps<{ location: Location }>();
</script>
