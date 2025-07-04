<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Locations</h1>
      <router-link
        to="/dashboard/locations/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add
      </router-link>
    </div>

    <List :store="store" :card="Card" edit="/dashboard/locations/edit" />
  </div>
</template>

<script setup>
import { useLocationStore } from '@/stores/locationStore.js'

import List from '@/components/shared/CardList.vue'
import Card from '@/components/admin/location/Card.vue'

const store = useLocationStore()
</script>
