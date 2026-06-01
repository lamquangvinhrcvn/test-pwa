<template>
  <div class="bg-white border border-neutral-200 rounded-2xl p-4 flex justify-between">
    <div>
      <p class="text-neutral-500 text-xs">Field Name</p>
      <p class="text-neutral-900 text-base font-semibold">{{ name }}</p>
    </div>
    <div class="text-right">
      <p class="text-neutral-500 text-xs">Area</p>
      <p class="text-neutral-900 text-base font-semibold">{{ area }} ha</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  area: number
}>()
</script>
