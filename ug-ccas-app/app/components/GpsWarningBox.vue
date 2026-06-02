<template>
  <div
    v-if="visible"
    class="bg-orange-50 border border-orange-400 rounded-lg p-3 flex gap-2.5"
  >
    <UIcon name="i-lucide-triangle-alert" class="text-orange-600 size-[18px] shrink-0 mt-0.5" />
    <p class="text-orange-900 text-xs leading-relaxed">
      GPS location could not be acquired. For administrative purposes, the pipe position on this screen will be configured later by an administrator.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>
