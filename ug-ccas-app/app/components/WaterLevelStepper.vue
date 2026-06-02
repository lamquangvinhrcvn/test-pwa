<template>
  <div class="bg-blue-100 rounded-xl p-3 flex items-center justify-between gap-4">
    <UButton
      icon="i-lucide-minus"
      color="neutral"
      variant="outline"
      class="size-9 rounded-full border-blue-300 !text-blue-800 flex items-center justify-center"
      :disabled="modelValue <= min"
      @click="decrement"
    />
    <div class="flex items-baseline gap-1">
      <span class="text-blue-800 text-3xl font-bold tabular-nums">{{ modelValue }}</span>
      <span class="text-blue-800 text-sm">cm</span>
    </div>
    <UButton
      icon="i-lucide-plus"
      color="neutral"
      variant="outline"
      class="size-9 rounded-full border-blue-300 !text-blue-800 flex items-center justify-center"
      :disabled="modelValue >= max"
      @click="increment"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
}>(), {
  min: 0,
  max: 999,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>
