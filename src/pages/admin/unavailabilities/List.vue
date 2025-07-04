<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Unavailabilities</h1>
      <router-link
        to="/dashboard/unavailabilities/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add
      </router-link>
    </div>

    <List :store="store" :card="Card" edit="/dashboard/unavailabilities/edit" />
  </div>
</template>

<script setup>
import { useUnavailabilityStore } from '@/stores/unavailabilityStore.js'

import List from '@/components/shared/CardList.vue'
import Card from '@/components/admin/unavailability/Card.vue'

const store = useUnavailabilityStore()
</script>
