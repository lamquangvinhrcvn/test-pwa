<template>
  <div v-if="pipe">
    <AppHeader>
      <template #back>
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          class="text-white"
          @click="navigateTo('/monitor')"
        />
      </template>
      <template #title>{{ pipe.pipeName }}</template>
      <template #action>
        <UButton
          icon="i-lucide-ellipsis"
          variant="ghost"
          class="text-white"
        />
      </template>
    </AppHeader>

    <!-- Today Summary -->
    <div class="px-4 py-4">
      <div class="bg-white border border-neutral-200 rounded-2xl p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-500 text-xs">{{ pipe.fieldName }}</p>
            <p class="text-neutral-900 text-lg font-bold">{{ pipe.pipeName }}</p>
            <p v-if="pipe.note" class="text-neutral-400 text-xs">{{ pipe.note }}</p>
          </div>
          <div class="text-right shrink-0 ml-4">
            <p class="text-neutral-500 text-xs mb-0.5">Today</p>
            <template v-if="todayLevel !== null">
              <span class="text-blue-500 text-[22px] font-bold">{{ todayLevel }}</span>
              <span class="text-blue-500 text-sm"> cm</span>
            </template>
            <p v-else class="text-neutral-400 text-base">—</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Readings Table -->
    <DailyReadingsTable
      :readings="readings"
      @edit="onEditReading"
      @delete="onDeleteReading"
    />

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
      :initial-level="editLevel"
      @save="onDialogSave"
    />
  </div>

  <!-- Not found -->
  <div v-else class="px-4 mt-20 text-center">
    <p class="text-neutral-500 text-base">Pipe not found</p>
  </div>
</template>

<script setup lang="ts">
import type { PipeContext, DailyReading } from '~/types/monitoring'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const pipeId = route.params.pipeId as string

const {
  pipes,
  getPipeReadings,
  getTodayLevel,
  getPipeContext,
  addReading,
  deleteReading,
} = useMockData()

const pipe = computed(() => {
  const p = pipes.value.find(p => p.pipeId === pipeId)
  return p ?? null
})

const readings = ref<DailyReading[]>(getPipeReadings(pipeId))
const todayLevel = computed(() => getTodayLevel(pipeId))

const dialogOpen = ref(false)
const dialogPipe = ref<PipeContext | null>(null)
const editLevel = ref<number | null>(null)

function openDialog(pipeContext: PipeContext, level?: number | null) {
  dialogPipe.value = pipeContext
  editLevel.value = level ?? pipe.value?.latestLevel ?? 0
  dialogOpen.value = true
}

function onFabTap() {
  const ctx = getPipeContext(pipeId)
  if (ctx) openDialog(ctx)
}

function onEditReading(reading: DailyReading) {
  const ctx = getPipeContext(pipeId)
  if (ctx) {
    dialogPipe.value = ctx
    editLevel.value = reading.level
    dialogOpen.value = true
  }
}

function onDeleteReading(reading: DailyReading) {
  deleteReading(pipeId, reading.id)
  readings.value = getPipeReadings(pipeId)
}

function onDialogSave(data: { pipeId: string; date: string; level: number }) {
  addReading(data.pipeId, data.level)
  readings.value = getPipeReadings(pipeId)
}
</script>
