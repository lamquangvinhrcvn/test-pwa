<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2.5">
      <h3 class="text-neutral-900 text-sm font-semibold">Daily readings</h3>
      <span class="text-neutral-500 text-xs">30d</span>
    </div>

    <USeparator />

    <!-- Rows -->
    <div class="flex flex-col gap-3 px-4 mt-3">
      <div
        v-for="reading in readings"
        :key="reading.id"
        class="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between text-sm"
      >
        <span class="text-neutral-900 text-base">{{ reading.label }}</span>
        <div class="flex items-center gap-3">
          <span class="text-blue-500 text-[22px] font-bold">{{ reading.level }}</span>
          <span class="text-blue-500 text-sm">cm</span>
          <UButton
            icon="i-lucide-pencil"
            variant="ghost"
            color="neutral"
            size="xs"
            class="text-neutral-400"
            @click="$emit('edit', reading)"
          />
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            color="neutral"
            size="xs"
            class="text-red-400"
            @click="$emit('delete', reading)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DailyReading } from '~/types/monitoring'

defineProps<{
  readings: DailyReading[]
}>()

defineEmits<{
  'edit': [reading: DailyReading]
  'delete': [reading: DailyReading]
}>()
</script>
