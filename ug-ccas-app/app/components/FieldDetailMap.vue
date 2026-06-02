<template>
  <div class="relative">
    <div
      v-if="!loaded && !error"
      class="flex items-center justify-center w-full h-[350px] bg-primary-100 rounded-lg"
    >
      <div class="flex flex-col items-center gap-2">
        <UIcon name="i-lucide-loader-2" class="size-5 text-primary-500 animate-spin" />
        <span class="text-primary-500 text-xs">Loading map...</span>
      </div>
    </div>

    <div
      v-if="error"
      class="flex items-center justify-center w-full h-[350px] bg-red-50 rounded-lg border border-red-200"
    >
      <span class="text-red-500 text-xs">{{ error }}</span>
    </div>

    <div
      ref="mapEl"
      class="w-full h-[350px] rounded-lg"
      :class="{ hidden: !loaded }"
    />
  </div>
</template>

<script setup lang="ts">
import type { LatLng } from '~/utils/mapCoords'

interface DetailField {
  polygon: LatLng[]
  pipes: { id: string }[]
}

const props = defineProps<{
  field: DetailField
}>()

const mapEl = ref<HTMLDivElement | null>(null)
const loaded = ref(false)
const error = ref<string | null>(null)

let map: google.maps.Map | null = null
let polygonOverlay: google.maps.Polygon | null = null
const pipeMarkers: google.maps.Marker[] = []

const { loadGoogleMaps } = useGoogleMaps()

function centerOf(polygon: LatLng[]): LatLng {
  if (polygon.length < 3) return polygon[0]
  const bounds = new google.maps.LatLngBounds()
  for (const pt of polygon) bounds.extend(pt)
  return { lat: (bounds.getNorthEast().lat + bounds.getSouthWest().lat) / 2, lng: (bounds.getNorthEast().lng + bounds.getSouthWest().lng) / 2 }
}

function pipePositions(polygon: LatLng[], total: number): LatLng[] {
  if (total === 0) return []
  const c = centerOf(polygon)
  if (total === 1) return [c]
  // Spread pipes along a horizontal line centered on the field
  const offset = 0.00005 // ~5m spacing
  const start = c.lng - ((total - 1) / 2) * offset
  return Array.from({ length: total }, (_, i) => ({ lat: c.lat, lng: start + i * offset }))
}

function drawField() {
  if (!map || props.field.polygon.length < 3) return

  if (polygonOverlay) polygonOverlay.setMap(null)
  for (const m of pipeMarkers) m.setMap(null)
  pipeMarkers.length = 0

  polygonOverlay = new google.maps.Polygon({
    paths: props.field.polygon,
    strokeColor: '#2D5A27',
    strokeWeight: 2,
    fillColor: '#2D5A27',
    fillOpacity: 0.25,
    clickable: false,
  })
  polygonOverlay.setMap(map)

  const positions = pipePositions(props.field.polygon, props.field.pipes.length)
  for (const pos of positions) {
    const marker = new google.maps.Marker({
      position: pos,
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#60a5fa',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
    })
    pipeMarkers.push(marker)
  }
}

async function initMap() {
  if (!import.meta.client) return
  try {
    await loadGoogleMaps()
    if (!mapEl.value) return
    map = new google.maps.Map(mapEl.value, {
      mapTypeId: 'satellite',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
    })
    drawField()
    if (props.field.polygon.length >= 3) {
      const bounds = new google.maps.LatLngBounds()
      for (const pt of props.field.polygon) bounds.extend(pt)
      map.fitBounds(bounds)
      google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map && map.getZoom()! > 18) map.setZoom(18)
      })
    }
    loaded.value = true
  } catch (e: unknown) {
    error.value = 'Failed to load map'
  }
}

watch(() => props.field, () => { if (loaded.value) drawField() }, { deep: true })

onMounted(() => initMap())
onUnmounted(() => {
  if (polygonOverlay) polygonOverlay.setMap(null)
  for (const m of pipeMarkers) m.setMap(null)
  pipeMarkers.length = 0
  map = null
})
</script>
