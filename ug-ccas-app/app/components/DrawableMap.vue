<template>
  <div class="relative">
    <div class="flex items-center justify-between px-4 mb-1">
      <p class="text-neutral-500 text-xs italic">Tap to add points</p>
      <UButton variant="ghost" color="info" size="sm" class="text-sm" @click="resetPoints">
        Reset
      </UButton>
    </div>
    <svg
      ref="svgEl"
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      class="block w-full h-[300px] fill-primary-100"
      @click="onSvgClick"
    >
      <rect width="300" height="200" class="fill-primary-100" />

      <!-- Polygon preview -->
      <polygon
        v-if="points.length >= 3"
        :points="pointsString"
        class="fill-primary-200/50 stroke-primary-300"
        stroke-width="1.5"
        stroke-dasharray="6,3"
      />

      <!-- Corner handles -->
      <circle
        v-for="(pt, i) in points"
        :key="i"
        :cx="pt.x"
        :cy="pt.y"
        r="7"
        class="fill-white stroke-primary-300 cursor-pointer"
        stroke-width="2"
        @mousedown.prevent="onDragStart(i, $event)"
        @touchstart.prevent="onDragStart(i, $event)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { Point } from '~/types'

const points = ref<Point[]>([])
const svgEl = ref<SVGSVGElement | null>(null)
const draggingIndex = ref<number | null>(null)

const pointsString = computed(() =>
  points.value.map(p => `${p.x},${p.y}`).join(' ')
)

defineExpose({ points })

function screenToSvg(clientX: number, clientY: number): Point | null {
  const svg = svgEl.value
  if (!svg) return null
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const svgPt = pt.matrixTransform(ctm.inverse())
  return { x: Math.round(svgPt.x), y: Math.round(svgPt.y) }
}

function onSvgClick(e: MouseEvent) {
  // Ignore if we just finished dragging
  if (draggingIndex.value !== null) return
  const pt = screenToSvg(e.clientX, e.clientY)
  if (pt) points.value.push(pt)
}

function onDragStart(index: number, e: MouseEvent | TouchEvent) {
  draggingIndex.value = index

  const onMove = (ev: MouseEvent | TouchEvent) => {
    if (draggingIndex.value === null) return
    const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
    const clientY = 'touches' in ev ? ev.touches[0].clientY : ev.clientY
    const pt = screenToSvg(clientX, clientY)
    if (pt) points.value[draggingIndex.value] = pt
  }

  const onEnd = () => {
    draggingIndex.value = null
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onEnd)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onEnd)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onEnd)
}

function resetPoints() {
  points.value = []
}
</script>
