<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ announcement.title }}</h3>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Message:</span>
      </p>
      <p class="text-sm text-gray-600" v-html="messageHtml"></p>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Active From:</span>
        {{ formatDate(announcement.dateFrom) }}
      </p>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Active To:</span>
        {{ formatDate(announcement.dateTo) }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link
        :to="`/dashboard/announcements/edit/${announcement.id}`"
        class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
      >
        Edit
      </router-link>
      <button
        @click="$emit('delete', announcement)"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'

const md = new MarkdownIt().use(emoji)

const props = defineProps({
  announcement: { type: Object },
})

const messageHtml = computed(() => {
  return md.render(props.announcement.message)
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>
