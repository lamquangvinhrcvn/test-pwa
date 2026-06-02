export interface LatLng {
  lat: number
  lng: number
}

export interface GeoBounds {
  north: number
  south: number
  west: number
  east: number
}

/**
 * Converts a point from pixel space (0-300 x 0-200) to geographic coordinates.
 * Performs a linear mapping within the provided bounding box.
 */
export function pixelToLatLng(
  x: number,
  y: number,
  bounds: GeoBounds,
): LatLng {
  const lng = bounds.west + (x / 300) * (bounds.east - bounds.west)
  const lat = bounds.north - (y / 200) * (bounds.north - bounds.south)
  return { lat, lng }
}

/**
 * Converts an array of pixel-space points to lat/lng points.
 */
export function pixelPolygonToLatLng(
  points: { x: number; y: number }[],
  bounds: GeoBounds,
): LatLng[] {
  return points.map((p) => pixelToLatLng(p.x, p.y, bounds))
}
