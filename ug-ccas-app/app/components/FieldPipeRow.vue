<template>
  <div class="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer" @click="$emit('click')">
    <div class="flex-1">
      <p class="text-neutral-900 text-base font-medium">{{ field.name }}</p>
      <p class="text-neutral-500 text-xs mt-0.5">{{ field.pipes }} pipe{{ field.pipes > 1 ? 's' : '' }} · {{ field.area }} ha</p>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-blue-500 text-lg font-bold">{{ field.latestLevel }} cm</span>
      <span class="text-neutral-300 text-lg">›</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  field: {
    id: string
    name: string
    pipes: number
    area: number
    latestLevel: number
  }
}>()

defineEmits<{
  click: []
}>()
</script>
