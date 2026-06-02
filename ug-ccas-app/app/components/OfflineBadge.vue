<template>
  <UBadge v-if="isOffline" color="warning" variant="solid">Offline</UBadge>
</template>

<script setup lang="ts">
defineProps<{
  isOffline: boolean
}>()
</script>
