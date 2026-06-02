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

interface MapField {
  id: string
  label: string
  polygon: LatLng[]
}

const props = defineProps<{
  fields: MapField[]
}>()

const emit = defineEmits<{
  'field-tap': [id: string]
}>()

const mapEl = ref<HTMLDivElement | null>(null)
const loaded = ref(false)
const error = ref<string | null>(null)

let map: google.maps.Map | null = null
const overlays: { polygons: Map<string, google.maps.Polygon>; markers: Map<string, google.maps.Marker> } = {
  polygons: new Map(),
  markers: new Map(),
}

const { loadGoogleMaps } = useGoogleMaps()

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
      zoomControl: true,
    })

    drawFields()
    fitToFields()
    loaded.value = true
  } catch (e: unknown) {
    error.value = 'Failed to load map'
  }
}

function centerOf(polygon: LatLng[]): LatLng {
  let sumLat = 0, sumLng = 0
  for (const p of polygon) { sumLat += p.lat; sumLng += p.lng }
  return { lat: sumLat / polygon.length, lng: sumLng / polygon.length }
}

function drawFields() {
  if (!map) return

  for (const poly of overlays.polygons.values()) poly.setMap(null)
  for (const m of overlays.markers.values()) m.setMap(null)
  overlays.polygons.clear()
  overlays.markers.clear()

  for (const field of props.fields) {
    if (field.polygon.length < 3) continue

    const polygon = new google.maps.Polygon({
      paths: field.polygon,
      strokeColor: '#2D5A27',
      strokeWeight: 2,
      fillColor: '#2D5A27',
      fillOpacity: 0.25,
      clickable: true,
    })
    polygon.setMap(map)
    polygon.addListener('click', () => emit('field-tap', field.id))
    overlays.polygons.set(field.id, polygon)

    const marker = new google.maps.Marker({
      position: centerOf(field.polygon),
      map,
      label: { text: field.label, color: '#1a1a1a', fontSize: '14px', fontWeight: 'bold' },
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 0, fillOpacity: 0, strokeOpacity: 0 },
    })
    marker.addListener('click', () => emit('field-tap', field.id))
    overlays.markers.set(field.id, marker)
  }
}

function fitToFields() {
  if (!map || props.fields.length === 0) {
    map?.setCenter({ lat: 14.0, lng: 108.0 })
    map?.setZoom(15)
    return
  }
  const bounds = new google.maps.LatLngBounds()
  for (const field of props.fields) {
    for (const pt of field.polygon) bounds.extend(pt)
  }
  map.fitBounds(bounds)
  google.maps.event.addListenerOnce(map, 'idle', () => {
    if (map && map.getZoom()! > 18) map.setZoom(18)
  })
}

watch(() => props.fields, () => { if (loaded.value) { drawFields(); fitToFields() } }, { deep: true })

onMounted(() => initMap())
onUnmounted(() => {
  for (const poly of overlays.polygons.values()) poly.setMap(null)
  for (const m of overlays.markers.values()) m.setMap(null)
  overlays.polygons.clear()
  overlays.markers.clear()
  map = null
})
</script>
