<template>
  <div>
    <AppHeader>
      <template #title>Monitoring</template>
    </AppHeader>

    <!-- Status row -->
    <div class="flex items-center justify-between px-4 py-2.5">
      <span class="text-neutral-900 text-sm font-semibold">Today's readings</span>
      <OfflineBadge :is-offline="isOffline" />
    </div>

    <USeparator />

    <!-- Pipe list -->
    <div class="flex flex-col gap-3 px-4 mt-3">
      <PipeReadingRow
        v-for="pipe in pipes"
        :key="pipe.pipeId"
        :pipe="pipe"
        @click="onPipeTap(pipe)"
      />
    </div>

    <!-- FAB -->
    <UButton
      icon="i-lucide-plus"
      size="xl"
      class="fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14 flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white"
      @click="onFabTap"
    />

    <!-- Water Level Dialog -->
    <WaterLevelDialog
      v-if="dialogPipe"
      v-model="dialogOpen"
      :pipe="dialogPipe"
      :initial-level="dialogPipeLatestLevel"
      @save="onDialogSave"
    />
  </div>
</template>

<script setup lang="ts">
import type { PipeContext } from '~/types/monitoring'

definePageMeta({
  layout: 'default',
})

const { pipes, isOffline, addReading, getPipeContext } = useMockData()

const dialogOpen = ref(false)
const dialogPipe = ref<PipeContext | null>(null)

const dialogPipeLatestLevel = computed(() => {
  if (!dialogPipe.value) return 0
  const pipe = pipes.value.find(p => p.pipeId === dialogPipe.value!.id)
  return pipe?.latestLevel ?? 0
})

function onPipeTap(pipe: typeof pipes.value[number]) {
  navigateTo(`/monitor/${pipe.pipeId}`)
}

function onFabTap() {
  const first = pipes.value[0]
  if (first) {
    dialogPipe.value = getPipeContext(first.pipeId)
    dialogOpen.value = true
  }
}

function onDialogSave(data: { pipeId: string; date: string; level: number }) {
  addReading(data.pipeId, data.level)
}
</script>
