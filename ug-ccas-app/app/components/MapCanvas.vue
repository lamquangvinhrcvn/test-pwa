<template>
  <div class="relative">
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      class="block w-full h-[350px] fill-primary-100"
    >
      <rect width="300" height="200" class="fill-primary-100" />
      <template v-for="field in fields" :key="field.id">
        <rect
          :x="minX(field.polygon)"
          :y="minY(field.polygon)"
          :width="width(field.polygon)"
          :height="height(field.polygon)"
          class="fill-primary-200 stroke-primary-300"
          stroke-width="1.5"
          rx="4"
          @click="$emit('field-tap', field.id)"
        />
        <circle
          :cx="centerX(field.polygon)"
          :cy="centerY(field.polygon)"
          r="5"
          class="fill-blue-400"
          @click="$emit('field-tap', field.id)"
        />
      </template>
    </svg>
    <slot name="overlay" />
  </div>
</template>

<script setup lang="ts">
import type { Point } from '~/types'

interface MapField {
  id: string
  polygon: Point[]
}

defineProps<{
  fields: MapField[]
}>()

defineEmits<{
  'field-tap': [id: string]
}>()

function minX(pts: Point[]) { return Math.min(...pts.map(p => p.x)) }
function minY(pts: Point[]) { return Math.min(...pts.map(p => p.y)) }
function maxX(pts: Point[]) { return Math.max(...pts.map(p => p.x)) }
function maxY(pts: Point[]) { return Math.max(...pts.map(p => p.y)) }
function width(pts: Point[]) { return maxX(pts) - minX(pts) }
function height(pts: Point[]) { return maxY(pts) - minY(pts) }
function centerX(pts: Point[]) { return (minX(pts) + maxX(pts)) / 2 }
function centerY(pts: Point[]) { return (minY(pts) + maxY(pts)) / 2 }
</script>
