<template>
  <div class="flex">
    <form @submit.prevent="handleSubmit" class="w-full max-w-4xl p-4 bg-white rounded shadow space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 space-y-2">
        <!-- Left column (date picker) -->
        <VueDatePicker
          v-model="form.date"
          :six-weeks="append"
          time-picker-inline
          inline
          is-24
          auto-apply
          no-hours-overlay
          no-minutes-overlay
        ></VueDatePicker>

        <!-- Right column (form fields) -->
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" v-model="form.name" required class="mt-1 block w-full border rounded shadow-sm p-2" />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows="4"
              v-model="form.description"
              class="mt-1 block w-full border rounded shadow-sm p-2"
            ></textarea>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <select v-model="form.locationId" class="mt-1 block w-full border rounded shadow-sm p-2">
              <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
            </select>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              required
              v-model="form.price"
              min="10.00"
              step="0.50"
              class="mt-1 block w-full border rounded shadow-sm p-2"
            />
          </div>
        </div>
      </div>

      <!-- Submit button centered -->
      <div class="flex justify-end">
        <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          {{ submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import type { OneTimeEvent } from '@/models/oneTimeEvent';
import type { Location } from '@/models/location';
import { fetchLocations } from '@/services/locationService';

const props = defineProps<{
  oneTimeEvent?: OneTimeEvent;
  onSubmit: (data: {}) => void;
  submitLabel?: string;
}>();

const form = ref({
  name: '',
  description: '',
  date: new Date(),
  locationId: '',
  price: 10,
});

const locations = ref<Location[]>([]);

function handleSubmit() {
  props.onSubmit(form.value);
}

watchEffect(() => {
  if (props.oneTimeEvent) {
    form.value = { ...props.oneTimeEvent };
  }
});

onMounted(async () => {
  locations.value = await fetchLocations();
});
</script>
