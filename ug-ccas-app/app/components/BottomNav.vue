<template>
  <nav class="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 flex justify-around py-1 z-30">
    <UButton
      v-for="tab in tabs"
      :key="tab.label"
      :to="tab.to"
      variant="ghost"
      :color="isActive(tab.to) ? 'primary' : 'neutral'"
      class="flex-col gap-0.5 py-1 px-3"
    >
      <UIcon :name="tab.icon" class="size-5" />
      <span class="text-[10px]">{{ tab.label }}</span>
    </UButton>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const tabs = [
  { to: '/home', icon: 'i-lucide-home', label: 'Home' },
  { to: '/fields', icon: 'i-lucide-layout-grid', label: 'Fields' },
  { to: '/monitor', icon: 'i-lucide-gauge', label: 'Monitor' },
  { icon: 'i-lucide-book-open', label: 'Logbook' },
]

function isActive(path?: string): boolean {
  if (!path) return false
  return route.path.startsWith(path)
}
</script>
