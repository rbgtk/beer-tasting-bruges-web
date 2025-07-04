<template>
  <div class="border rounded shadow-sm p-4 flex flex-col justify-between">
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>

      <p class="text-sm text-gray-600" v-html="messageHtml"></p>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Active From:</span>
        {{ formatDate(item.dateFrom) }}
      </p>

      <p class="text-sm text-gray-600">
        <span class="font-semibold">Active To:</span>
        {{ formatDate(item.dateTo) }}
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <router-link :to="edit" class="bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700">
        Edit
      </router-link>
      <button @click="$emit('delete', item)" class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">
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
  item: { type: Object },
  edit: { type: String },
})

const messageHtml = computed(() => {
  return md.render(props.item.message)
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>
