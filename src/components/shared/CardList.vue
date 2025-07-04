<template>
  <div class="flex flex-wrap gap-4">
    <component
      v-for="item in store.items"
      :is="card"
      :key="item.id"
      :item="item"
      :edit="edit"
      class="flex-1 min-w-[15%] max-w-[20%]"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
defineProps({
  store: { type: Object, required: true },
  card: { type: Object, required: true },
  edit: { type: String, required: true },
})

async function handleDelete(item) {
  await store.deleteById(item.id)
}
</script>
