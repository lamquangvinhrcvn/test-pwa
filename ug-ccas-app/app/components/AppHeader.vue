<template>
  <header class="bg-primary-500 h-14 flex items-center justify-between px-4">
    <div class="w-10">
      <slot name="back">
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          class="text-white"
        />
      </slot>
    </div>

    <div class="text-white text-lg font-bold truncate">
      <slot name="title" />
    </div>

    <div class="w-10 flex justify-end">
      <slot name="action" />
    </div>
  </header>
</template>
