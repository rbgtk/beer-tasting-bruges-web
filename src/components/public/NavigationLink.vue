<template>
  <router-link exact-active-class="underline" class="px-3 py-2 hover:underline" :to="props.link">
    {{ props.label }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  link: { type: String, required: true },
})
</script>
