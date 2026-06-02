<template>
  <UDrawer v-model:open="isOpen">
    <template #header>
      <div>
        <h3 class="text-neutral-900 text-base font-bold">Enter Water Level</h3>
        <p class="text-neutral-500 text-[13px] mt-0.5">
          {{ pipe.name }} · {{ pipe.fieldName }}
        </p>
      </div>
    </template>

    <div class="px-4 space-y-5 pb-4">
      <!-- Date -->
      <div>
        <p class="text-neutral-500 text-xs mb-1.5">Date</p>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-calendar" class="text-neutral-500 size-4" />
          <span class="text-neutral-900 text-sm font-medium">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- Water Level -->
      <div>
        <p class="text-neutral-500 text-xs mb-1.5">Water Level</p>
        <WaterLevelStepper v-model="waterLevel" />
      </div>

      <!-- Footer note -->
      <p class="text-neutral-400 text-xs italic">
        * Always offline, form saved on device &rarr; syncs automatically to server policy
      </p>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          variant="ghost"
          color="neutral"
          block
          class="flex-1"
          @click="onCancel"
        >
          Cancel
        </UButton>
        <UButton
          color="primary"
          variant="solid"
          block
          class="flex-1"
          :disabled="waterLevel === null"
          @click="onSave"
        >
          Save
        </UButton>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import type { PipeContext } from '~/types/monitoring'

const props = defineProps<{
  pipe: PipeContext
  initialLevel?: number | null
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'save': [data: { pipeId: string; date: string; level: number }]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const waterLevel = ref(props.initialLevel ?? 0)

const formattedDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' (Today)'
})

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function onCancel() {
  isOpen.value = false
}

function onSave() {
  emit('save', {
    pipeId: props.pipe.id,
    date: todayStr(),
    level: waterLevel.value,
  })
  isOpen.value = false
}
</script>
