import type { LatLng } from '~/utils/mapCoords'

const METERS_PER_DEG_LAT = 111_320

function metersPerDegLng(lat: number): number {
  return METERS_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180)
}

function centroid(points: LatLng[]): LatLng {
  let sumLat = 0, sumLng = 0
  for (const p of points) { sumLat += p.lat; sumLng += p.lng }
  return { lat: sumLat / points.length, lng: sumLng / points.length }
}

/**
 * Convert LatLng points to local meter coordinates relative to the centroid.
 */
function toMeters(points: LatLng[]): { x: number; y: number }[] {
  const c = centroid(points)
  const mpdLng = metersPerDegLng(c.lat)
  return points.map(p => ({
    x: (p.lng - c.lng) * mpdLng,
    y: (p.lat - c.lat) * METERS_PER_DEG_LAT,
  }))
}

/**
 * Calculate polygon area in m² using the shoelace formula on meter-projected coordinates.
 * Returns 0 for fewer than 3 points.
 */
export function polygonArea(points: LatLng[]): number {
  if (points.length < 3) return 0
  const m = toMeters(points)
  let area = 0
  for (let i = 0; i < m.length; i++) {
    const j = (i + 1) % m.length
    area += m[i].x * m[j].y
    area -= m[j].x * m[i].y
  }
  return Math.abs(area) / 2
}

/**
 * Convert square meters to hectares.
 */
export function toHa(sqMeters: number): number {
  return sqMeters / 10_000
}
