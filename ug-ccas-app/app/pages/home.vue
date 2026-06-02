<template>
  <div>
    <AppHeader>
      <template #title>Home</template>
    </AppHeader>

    <MapCanvas :fields="fields" @field-tap="onFieldTap">
      <template #overlay>
        <div class="absolute top-3 left-4 flex items-center gap-2">
          <span class="text-primary-800 text-sm font-medium">Today</span>
          <span class="bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">3 items</span>
        </div>
      </template>
    </MapCanvas>

    <div class="px-4 mt-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-neutral-900 text-sm font-semibold">Fields & Pipes</h3>
        <UButton variant="ghost" color="neutral" size="sm" class="text-neutral-500 text-sm" to="/fields">
          See all <span class="text-neutral-300 text-base">›</span>
        </UButton>
      </div>

      <div class="flex flex-col gap-3">
        <FieldPipeRow
          v-for="field in fields"
          :key="field.id"
          :field="field"
          @click="onFieldTap(field.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pixelPolygonToLatLng, type LatLng } from '~/utils/mapCoords'

definePageMeta({
  layout: 'default',
})

// Geographic bounding box for demo (Vietnam)
// Replace with your real field coordinates in production
const DEMO_BOUNDS = {
  north: 14.010,
  south: 13.990,
  west: 108.480,
  east: 108.510,
}

interface HomeField {
  id: string
  name: string
  pipes: number
  area: number
  latestLevel: number
  polygon: LatLng[]
}

const fields = ref<HomeField[]>([
  { id: 'A', name: 'Field A', pipes: 1, area: 0.8, latestLevel: 12, polygon: pixelPolygonToLatLng([{ x: 20, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 20, y: 80 }], DEMO_BOUNDS) },
  { id: 'B', name: 'Field B', pipes: 1, area: 1.2, latestLevel: 8,  polygon: pixelPolygonToLatLng([{ x: 120, y: 10 }, { x: 190, y: 10 }, { x: 190, y: 60 }, { x: 120, y: 60 }], DEMO_BOUNDS) },
  { id: 'C', name: 'Field C', pipes: 1, area: 2.3, latestLevel: 15, polygon: pixelPolygonToLatLng([{ x: 90, y: 90 }, { x: 200, y: 90 }, { x: 200, y: 150 }, { x: 90, y: 150 }], DEMO_BOUNDS) },
  { id: 'D', name: 'Field D', pipes: 1, area: 1.3, latestLevel: 6,  polygon: pixelPolygonToLatLng([{ x: 220, y: 40 }, { x: 285, y: 40 }, { x: 285, y: 130 }, { x: 220, y: 130 }], DEMO_BOUNDS) },
])

function onFieldTap(id: string) {
  navigateTo('/fields/' + id)
}
</script>
