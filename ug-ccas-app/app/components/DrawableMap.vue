<template>
  <div class="relative">
    <div class="flex items-center justify-between px-4 mb-1">
      <p class="text-neutral-500 text-xs italic">Tap to add points</p>
      <UButton variant="ghost" color="info" size="sm" class="text-sm" @click="resetPoints">
        Reset
      </UButton>
    </div>

    <div
      v-if="!loaded && !error"
      class="flex items-center justify-center w-full h-[300px] bg-primary-100 rounded-lg"
    >
      <div class="flex flex-col items-center gap-2">
        <UIcon name="i-lucide-loader-2" class="size-5 text-primary-500 animate-spin" />
        <span class="text-primary-500 text-xs">Loading map...</span>
      </div>
    </div>

    <div
      v-if="error"
      class="flex items-center justify-center w-full h-[300px] bg-red-50 rounded-lg border border-red-200"
    >
      <span class="text-red-500 text-xs">{{ error }}</span>
    </div>

    <div
      ref="mapEl"
      class="w-full h-[300px] rounded-lg"
      :class="{ hidden: !loaded }"
    />
  </div>
</template>

<script setup lang="ts">
import type { LatLng } from '~/utils/mapCoords'

const points = ref<LatLng[]>([])
const mapEl = ref<HTMLDivElement | null>(null)
const loaded = ref(false)
const error = ref<string | null>(null)

let map: google.maps.Map | null = null
let polygonOverlay: google.maps.Polygon | null = null
const pointMarkers: google.maps.Marker[] = []

defineExpose({ points })

const { loadGoogleMaps } = useGoogleMaps()

function clearOverlays() {
  if (polygonOverlay) { polygonOverlay.setMap(null); polygonOverlay = null }
  for (const m of pointMarkers) m.setMap(null)
  pointMarkers.length = 0
}

function redraw() {
  if (!map) return
  clearOverlays()

  // Draw polygon
  if (points.value.length >= 3) {
    polygonOverlay = new google.maps.Polygon({
      paths: points.value,
      strokeColor: '#2D5A27',
      strokeWeight: 2,
      fillColor: '#2D5A27',
      fillOpacity: 0.25,
      clickable: false,
      strokeDasharray: [6, 3],
    })
    polygonOverlay.setMap(map)
  }

  // Draw draggable markers for each point
  for (let i = 0; i < points.value.length; i++) {
    const marker = new google.maps.Marker({
      position: points.value[i],
      map,
      draggable: true,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ffffff',
        fillOpacity: 1,
        strokeColor: '#2D5A27',
        strokeWeight: 2,
      },
    })
    marker.addListener('drag', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) points.value[i] = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    marker.addListener('dragend', () => {
      // Trigger reactivity by replacing the array element
      points.value = [...points.value]
    })
    pointMarkers.push(marker)
  }
}

async function initMap() {
  if (!import.meta.client) return
  try {
    await loadGoogleMaps()
    if (!mapEl.value) return

    map = new google.maps.Map(mapEl.value, {
      center: { lat: 14.0, lng: 108.0 },
      zoom: 17,
      mapTypeId: 'satellite',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
    })

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return
      points.value = [...points.value, { lat: e.latLng.lat(), lng: e.latLng.lng() }]
      redraw()
    })

    loaded.value = true
  } catch (e: unknown) {
    error.value = 'Failed to load map'
  }
}

watch(points, () => redraw(), { deep: true })

function resetPoints() {
  points.value = []
  if (map) map.setCenter({ lat: 14.0, lng: 108.0 })
}

onMounted(() => initMap())
onUnmounted(() => {
  clearOverlays()
  map = null
})
</script>
