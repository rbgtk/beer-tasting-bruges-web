<template>
  <div class="flex items-center w-full" @mouseenter="pauseAutoScroll" @mouseleave="resumeAutoScroll">
    <button
      v-if="showNavigation"
      @click.stop="prev"
      class="bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 hover:text-gray-900 rounded-full p-2 shadow transition"
    >
      <!-- Left arrow icon -->
      <span>&larr;</span>
    </button>

    <!-- The row of cards -->
    <div class="overflow-hidden flex-1">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="(item, index) in items" :key="index" class="flex-shrink-0 w-full">
          <component :is="cardComponent" :item="item" v-bind="cardProps" />
        </div>
      </div>
    </div>

    <button
      v-if="showNavigation"
      @click.stop="next"
      class="bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 hover:text-gray-900 rounded-full p-2 shadow transition"
    >
      <!-- Right arrow icon -->
      <span>&rarr;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  cardComponent: { type: Object, required: true },
  cardProps: { type: Object },
  navigation: { type: Boolean, default: true },
  autoScroll: { type: Boolean, default: true },
  autoScrollInterval: { type: Number, default: 4000 }, // 4 seconds default
})

const currentIndex = ref(0)
let intervalId = null

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

// Start auto-scroll
function startAutoScroll() {
  if (props.autoScroll) {
    intervalId = setInterval(next, props.autoScrollInterval)
  }
}

function pauseAutoScroll() {
  if (intervalId) clearInterval(intervalId)
}

function resumeAutoScroll() {
  startAutoScroll()
}

function showNavigation() {
  return props.navigation && props.items.length > 1
}

onMounted(() => {
  startAutoScroll()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
