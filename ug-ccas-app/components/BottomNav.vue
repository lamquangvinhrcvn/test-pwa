<template>
  <nav class="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 flex justify-around py-2 z-30">
    <UButton
      v-for="tab in tabs"
      :key="tab.to"
      :icon="tab.icon"
      :color="isActive(tab.to) ? 'primary' : 'neutral'"
      variant="ghost"
      :to="tab.to"
    />
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const tabs = [
  { to: '/home', icon: 'i-lucide-home' },
  { to: '/fields', icon: 'i-lucide-layout-grid' },
  { to: '/monitor', icon: 'i-lucide-gauge' },
  { to: '/logbook', icon: 'i-lucide-book-open' },
]

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}
</script>
