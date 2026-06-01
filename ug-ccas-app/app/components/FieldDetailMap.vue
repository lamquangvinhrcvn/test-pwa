<template>
  <div class="relative">
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      class="block w-full h-[200px] fill-primary-100"
    >
      <rect width="300" height="200" class="fill-primary-100" />
      <rect
        :x="minX(field.polygon)"
        :y="minY(field.polygon)"
        :width="width(field.polygon)"
        :height="height(field.polygon)"
        class="fill-primary-200 stroke-primary-300"
        stroke-width="1.5"
        rx="4"
      />
      <circle
        v-for="(pipe, i) in field.pipes"
        :key="pipe.id"
        :cx="pipeDotX(field.polygon, i, field.pipes.length)"
        :cy="pipeDotY(field.polygon, i, field.pipes.length)"
        r="5"
        class="fill-blue-400"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { Point } from '~/types'

interface DetailField {
  polygon: Point[]
  pipes: { id: string }[]
}

defineProps<{
  field: DetailField
}>()

function minX(pts: Point[]) { return Math.min(...pts.map(p => p.x)) }
function minY(pts: Point[]) { return Math.min(...pts.map(p => p.y)) }
function maxX(pts: Point[]) { return Math.max(...pts.map(p => p.x)) }
function maxY(pts: Point[]) { return Math.max(...pts.map(p => p.y)) }
function width(pts: Point[]) { return maxX(pts) - minX(pts) }
function height(pts: Point[]) { return maxY(pts) - minY(pts) }

function pipeDotX(pts: Point[], index: number, total: number) {
  const cx = (minX(pts) + maxX(pts)) / 2
  if (total === 1) return cx
  const offset = (index - (total - 1) / 2) * 20
  return cx + offset
}
function pipeDotY(pts: Point[], _index: number, _total: number) {
  return (minY(pts) + maxY(pts)) / 2
}
</script>
