<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
    <div v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'

// Markdown renderer
const md = new MarkdownIt().use(emoji)

const props = defineProps({
  item: { type: Object },
})

const renderedMarkdown = computed(() => {
  return md.render(props.item.message)
})
</script>
