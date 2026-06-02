<template>
  <div>
    <AppHeader>
      <template #title>Fields</template>
    </AppHeader>

    <FieldMap :fields="fields" @field-tap="onFieldTap" />

    <div class="px-4 mt-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-neutral-900 text-sm font-semibold">All Fields</h3>
        <span class="text-neutral-500 text-sm">{{ fields.length }} ›</span>
      </div>

      <div class="flex flex-col gap-3">
        <FieldListRow
          v-for="field in fields"
          :key="field.id"
          :field="field"
          @click="onFieldTap(field.id)"
        />
      </div>
    </div>

    <UButton
      icon="i-lucide-plus"
      class="fixed bottom-24 right-5 rounded-full shadow-lg z-40 size-14 flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white"
      @click="navigateTo('/fields/new')"
    />
  </div>
</template>

<script setup lang="ts">
import { pixelPolygonToLatLng, type LatLng } from '~/utils/mapCoords'

definePageMeta({
  layout: 'default',
})

const DEMO_BOUNDS = {
  north: 14.010,
  south: 13.990,
  west: 108.480,
  east: 108.510,
}

interface FieldsTopField {
  id: string
  label: string
  name: string
  area: number
  pipeCount: number
  polygon: LatLng[]
}

const fields = ref<FieldsTopField[]>([
  { id: 'A', label: 'A', name: 'Field A', area: 0.8, pipeCount: 2, polygon: pixelPolygonToLatLng([{ x: 20, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 20, y: 80 }], DEMO_BOUNDS) },
  { id: 'B', label: 'B', name: 'Field B', area: 0.5, pipeCount: 2, polygon: pixelPolygonToLatLng([{ x: 120, y: 10 }, { x: 190, y: 10 }, { x: 190, y: 60 }, { x: 120, y: 60 }], DEMO_BOUNDS) },
  { id: 'C', label: 'C', name: 'Field C', area: 1.2, pipeCount: 3, polygon: pixelPolygonToLatLng([{ x: 90, y: 90 }, { x: 200, y: 90 }, { x: 200, y: 150 }, { x: 90, y: 150 }], DEMO_BOUNDS) },
])

function onFieldTap(id: string) {
  navigateTo('/fields/' + id)
}
</script>
