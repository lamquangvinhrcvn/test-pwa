<template>
  <div class="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer" @click="$emit('click')">
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <p class="text-neutral-900 text-base font-medium truncate">{{ pipe.pipeName }}</p>
        <UIcon
          v-if="pipe.isPendingSync"
          name="i-lucide-clipboard-list"
          class="text-neutral-400 size-[18px] shrink-0"
        />
      </div>
      <p class="text-neutral-500 text-xs mt-0.5">{{ pipe.fieldName }}</p>
    </div>
    <div class="text-right shrink-0 ml-4">
      <template v-if="pipe.latestLevel !== null">
        <span class="text-blue-500 text-[22px] font-bold">{{ pipe.latestLevel }}</span>
        <span class="text-blue-500 text-sm"> cm</span>
      </template>
      <span v-else class="text-neutral-300 text-lg">—</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PipeReading } from '~/types/monitoring'

defineProps<{
  pipe: PipeReading
}>()

defineEmits<{
  click: []
}>()
</script>
