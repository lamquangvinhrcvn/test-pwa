<template>
  <div>
    <AppHeader>
      <template #back>
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          class="text-white"
          @click="navigateTo('/fields')"
        />
      </template>
      <template #title>New Field</template>
      <template #action>
        <UButton
          variant="ghost"
          class="text-white font-semibold"
          :disabled="!canSave"
          @click="onSave"
        >
          Save
        </UButton>
      </template>
    </AppHeader>

    <DrawableMap ref="drawableMapRef" />

    <div class="px-4 mt-5 space-y-4">
      <div>
        <label class="block text-xs text-neutral-500 mb-1.5">Field Name</label>
        <UInput
          v-model="fieldName"
          color="primary"
          size="xl"
          class="w-full"
          :ui="{ input: 'h-16' }"
          placeholder="e.g. Field D"
        />
      </div>

      <div>
        <label class="block text-xs text-neutral-500 mb-1.5">Field Note</label>
        <UInput
          v-model="fieldNote"
          color="primary"
          size="xl"
          class="w-full"
          :ui="{ input: 'h-16' }"
          placeholder="Optional note..."
        />
      </div>

      <div>
        <label class="block text-xs text-neutral-500 italic mb-1.5">Area (auto-calculated)</label>
        <div class="h-12 flex items-center justify-end px-3 bg-neutral-50 border border-neutral-200 rounded-lg">
          <span class="text-neutral-900 text-base font-semibold">{{ formattedArea }} ha</span>
        </div>
      </div>

      <UButton
        size="lg"
        block
        class="h-[52px] rounded-xl !bg-primary-500 hover:!bg-primary-600 text-white"
        :disabled="!canSave"
        @click="onSave"
      >
        Save Field
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { polygonArea, pixelToHa } from '~/utils/geometry'

definePageMeta({
  layout: 'default',
})

const drawableMapRef = ref<{ points: { x: number; y: number }[] } | null>(null)
const fieldName = ref('')
const fieldNote = ref('')

const points = computed(() => drawableMapRef.value?.points ?? [])

const calculatedArea = computed(() => {
  if (points.value.length < 3) return 0
  return pixelToHa(polygonArea(points.value))
})

const formattedArea = computed(() => calculatedArea.value.toFixed(2))

const canSave = computed(() => fieldName.value.length > 0 && points.value.length >= 3)

function onSave() {
  if (!canSave.value) return
  navigateTo('/fields')
}
</script>
