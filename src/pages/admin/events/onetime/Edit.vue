<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Onetime Event</h1>

    <OneTimeEventForm
      :oneTimeEvent="oneTimeEvent"
      :onSubmit="handleUpdate"
      submitLabel="Update OneTimeEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { OneTimeEvent } from '@/models/oneTimeEvent'
import { fetchOneTimeEvent, updateOneTimeEvent } from '@/services/oneTimeEventService'

import OneTimeEventForm from '@/components/admin/events/onetime/Form.vue'

const route = useRoute()
const router = useRouter()
const oneTimeEvent = ref<OneTimeEvent>(null)


onMounted(async () => {
  oneTimeEvent.value = await fetchOneTimeEvent(route.params.id)
})

async function handleUpdate(data) {
  await updateOneTimeEvent({ id: route.params.id, ...data })
  router.push('/dashboard/events/onetime')
}
</script>
