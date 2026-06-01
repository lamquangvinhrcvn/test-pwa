<template>
  <div class="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer" @click="$emit('click')">
    <div class="flex-1">
      <p class="text-neutral-900 text-base font-medium">{{ field.name }}</p>
      <p class="text-neutral-500 text-xs mt-0.5">{{ field.area }} ha · {{ field.pipeCount }} pipe{{ field.pipeCount > 1 ? 's' : '' }}</p>
    </div>
    <span class="text-neutral-300 text-lg">›</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  field: {
    id: string
    name: string
    area: number
    pipeCount: number
  }
}>()

defineEmits<{
  click: []
}>()
</script>
