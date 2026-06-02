<template>
  <div>
    <AppHeader v-if="field">
      <template #back>
        <UButton
          icon="i-lucide-chevron-left"
          variant="ghost"
          class="text-white"
          @click="navigateTo('/fields')"
        />
      </template>
      <template #title>{{ field.name }}</template>
    </AppHeader>

    <div v-if="field">
      <FieldDetailMap :field="field" />

      <div class="px-4 mt-4">
        <FieldInfoRow :name="field.name" :area="field.area" />
      </div>

      <div class="px-4 mt-5">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-900 text-sm font-semibold">Pipes</h3>
          <span class="text-neutral-500 text-sm">{{ field.pipes.length }}</span>
        </div>

        <div class="flex flex-col gap-3">
          <PipeListRow
            v-for="pipe in field.pipes"
            :key="pipe.id"
            :pipe="pipe"
          />
        </div>

        <UButton
          variant="solid"
          class="mt-5 h-12 rounded-xl bg-primary-500 hover:bg-primary-600 text-white"
          block
          @click="navigateTo('/pipes/new?fieldId=' + field.id)"
        >
          + Add Pipe
        </UButton>
      </div>
    </div>

    <div v-else class="px-4 mt-20 text-center">
      <p class="text-neutral-500 text-base">Field not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pixelPolygonToLatLng, type LatLng } from '~/utils/mapCoords'

definePageMeta({
  layout: 'default',
})

const route = useRoute()

const DEMO_BOUNDS = {
  north: 14.010,
  south: 13.990,
  west: 108.480,
  east: 108.510,
}

interface FieldPipe {
  id: string
  name: string
  lastLevel: number
  lastDate: string
}

interface FieldDetail {
  id: string
  name: string
  area: number
  polygon: LatLng[]
  pipes: FieldPipe[]
}

const fields: FieldDetail[] = [
  {
    id: 'A', name: 'Field A', area: 0.84,
    polygon: pixelPolygonToLatLng([{ x: 40, y: 30 }, { x: 260, y: 30 }, { x: 260, y: 170 }, { x: 40, y: 170 }], DEMO_BOUNDS),
    pipes: [
      { id: 'A-1', name: 'Pipe A-1', lastLevel: 12, lastDate: 'today' },
      { id: 'A-2', name: 'Pipe A-2', lastLevel: 16, lastDate: 'yesterday' },
    ],
  },
  {
    id: 'B', name: 'Field B', area: 0.52,
    polygon: pixelPolygonToLatLng([{ x: 30, y: 20 }, { x: 270, y: 20 }, { x: 270, y: 180 }, { x: 30, y: 180 }], DEMO_BOUNDS),
    pipes: [
      { id: 'B-1', name: 'Pipe B-1', lastLevel: 8, lastDate: '2 days ago' },
      { id: 'B-2', name: 'Pipe B-2', lastLevel: 10, lastDate: 'today' },
    ],
  },
  {
    id: 'C', name: 'Field C', area: 1.23,
    polygon: pixelPolygonToLatLng([{ x: 20, y: 25 }, { x: 280, y: 25 }, { x: 280, y: 175 }, { x: 20, y: 175 }], DEMO_BOUNDS),
    pipes: [
      { id: 'C-1', name: 'Pipe C-1', lastLevel: 15, lastDate: 'today' },
      { id: 'C-2', name: 'Pipe C-2', lastLevel: 14, lastDate: '3 days ago' },
      { id: 'C-3', name: 'Pipe C-3', lastLevel: 11, lastDate: 'yesterday' },
    ],
  },
]

const field = computed(() => fields.find(f => f.id === route.params.id) ?? null)
</script>
