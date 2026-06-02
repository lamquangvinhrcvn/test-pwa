<template>
  <UDrawer v-model:open="isOpen">
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-neutral-900 text-base font-bold">Enter Water Level</h3>
          <p class="text-neutral-500 text-[13px] mt-0.5">
            {{ pipe.name }} · {{ pipe.fieldName }}
          </p>
        </div>
        <UButton
          icon="i-lucide-x"
          variant="ghost"
          color="neutral"
          size="sm"
          class="text-neutral-500 -mt-1 -mr-1"
          @click="onCancel"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-5">
        <!-- Date -->
        <div>
          <p class="text-neutral-500 text-xs mb-1.5">Date</p>
          <div class="relative">
            <UIcon name="i-lucide-calendar" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 size-4 z-10" />
            <input
              v-model="selectedDate"
              type="date"
              class="w-full h-12 pl-10 pr-3 border border-neutral-200 rounded-lg text-neutral-900 text-sm bg-white focus:outline-none focus:border-primary-500"
            />
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
    </template>

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
          variant="solid"
          block
          class="flex-1 !bg-primary-500 hover:!bg-primary-600 text-white"
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

const todayStr = () => new Date().toISOString().slice(0, 10)
const selectedDate = ref(todayStr())

function onCancel() {
  isOpen.value = false
}

function onSave() {
  emit('save', {
    pipeId: props.pipe.id,
    date: selectedDate.value,
    level: waterLevel.value,
  })
  isOpen.value = false
}
</script>
