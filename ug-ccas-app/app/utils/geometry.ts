import type { Point } from '~/types'

/**
 * Shoelace formula — tính diện tích polygon từ tọa độ (px²).
 * Kết quả luôn dương, không phụ thuộc vào chiều (CW/CCW).
 */
export function polygonArea(pts: Point[]): number {
  if (pts.length < 3) return 0
  let area = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    area += pts[i].x * pts[j].y
    area -= pts[j].x * pts[i].y
  }
  return Math.abs(area) / 2
}

/** Hằng số scale tạm: 1 px² = 0.01 ha (cho mock data) */
const PX2_PER_HA = 0.01

/**
 * Chuyển đổi pixel² → hectares dùng scale factor.
 */
export function pixelToHa(pxArea: number): number {
  return pxArea * PX2_PER_HA
}
