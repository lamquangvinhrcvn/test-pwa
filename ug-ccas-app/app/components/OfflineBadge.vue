<template>
  <UBadge v-if="isOffline" color="warning" variant="solid">Offline</UBadge>
  <UBadge v-else color="success" variant="solid">Online</UBadge>
</template>

<script setup lang="ts">
defineProps<{
  isOffline: boolean
}>()
</script>
