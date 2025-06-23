<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div class="mb-2">
      <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
      <div class="mb-2">
        <p class="text-sm text-gray-600">{{ item.summary }}</p>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Address:</span>
          {{ item.address }}
        </p>
      </div>
      <router-link
        :to="`booking?location=${item.id}`"
        class="bg-blue-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Book Now!
      </router-link>
    </div>
    <!--<div v-html="item.mapUrl" class="flex justify-center"></div>-->
    <!-- Iframe container with fade-in -->
    <div
      class="flex justify-center transition-opacity duration-1000 ease-in-out opacity-0"
      ref="iframeContainer"
      v-html="item.mapUrl"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const props = defineProps({
  item: { type: Object },
})

const iframeContainer = ref(null)

onMounted(async () => {
  // Wait for DOM to render iframe
  await nextTick()

  // Fade in the iframe
  if (iframeContainer.value) {
    iframeContainer.value.classList.add('opacity-100')
  }
})
</script>
