import { Coord } from '@/components/Map.type'
import circumcircle from 'circumcircle'

export function computerCenterCoord(coords: Coord[]): Coord {
  if (coords.length === 1) {
    return coords[0]
  } else if (coords.length === 2) {
    return {
      x: (coords[0].x + coords[1].x) / 2,

      y: (coords[0].y + coords[1].y) / 2,
    }
  } else if (coords.length === 3) {
    return circumcircle(coords.map((c) => [c.x, c.y]))
  }
  return coords[0]
}
