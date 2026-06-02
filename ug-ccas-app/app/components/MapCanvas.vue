<template>
  <div class="relative">
    <!-- Loading skeleton -->
    <div
      v-if="!loaded && !error"
      class="flex items-center justify-center w-full h-[250px] bg-primary-100 rounded-lg"
    >
      <div class="flex flex-col items-center gap-2">
        <UIcon name="i-lucide-loader-2" class="size-6 text-primary-500 animate-spin" />
        <span class="text-primary-500 text-xs">Loading map...</span>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      class="flex items-center justify-center w-full h-[250px] bg-red-50 rounded-lg border border-red-200"
    >
      <div class="flex flex-col items-center gap-2 px-4">
        <UIcon name="i-lucide-triangle-alert" class="size-6 text-red-500" />
        <span class="text-red-600 text-xs text-center">{{ error }}</span>
      </div>
    </div>

    <!-- Map container (hidden until loaded) -->
    <div
      ref="mapEl"
      class="w-full h-[250px] rounded-lg"
      :class="{ hidden: !loaded }"
    />

    <!-- Overlay slot -->
    <slot name="overlay" />
  </div>
</template>

<script setup lang="ts">
import type { LatLng } from '~/utils/mapCoords'

interface MapField {
  id: string
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
const polygonOverlays = new Map<string, google.maps.Polygon>()

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

    drawPolygons()
    fitToFields()

    loaded.value = true
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    if (msg.includes('ApiNotActivatedMapError') || msg.includes('InvalidKeyMapError')) {
      error.value = 'Google Maps API key is invalid or not activated. Check your .env file.'
    } else {
      error.value = `Failed to load map: ${msg}`
    }
  }
}

function drawPolygons() {
  if (!map) return

  // Clear existing overlays
  for (const poly of polygonOverlays.values()) {
    poly.setMap(null)
  }
  polygonOverlays.clear()

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

    polygon.addListener('click', () => {
      emit('field-tap', field.id)
    })

    polygonOverlays.set(field.id, polygon)
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
    for (const pt of field.polygon) {
      bounds.extend(pt)
    }
  }
  map.fitBounds(bounds)

  google.maps.event.addListenerOnce(map, 'idle', () => {
    if (map && map.getZoom()! > 18) {
      map.setZoom(18)
    }
  })
}

watch(
  () => props.fields,
  () => {
    if (loaded.value) {
      drawPolygons()
      fitToFields()
    }
  },
  { deep: true },
)

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  for (const poly of polygonOverlays.values()) {
    poly.setMap(null)
  }
  polygonOverlays.clear()
  map = null
})
</script>
