export type MapProps = {
  type: MapSourceType
  secretKey: string

  init?: {
    center?: LngLat
    zoom?: number
  }
}

export type MapAPI = {
  onClick: (cb?: MapClickHandler) => void
  lnglatToCoord: (lnglat: LngLat) => Coord
  coordToLnglat: (cord: Coord) => LngLat
  setCenter: (lnglat: LngLat) => void
  createMarker: (lnglat: LngLat, red?: boolean) => Marker
}

export type MapClickHandler = (event: Point) => void

export type Point = {
  lnglat: LngLat
}

export type LngLat = {
  lng: number
  lat: number
}

export type Coord = {
  x: number
  y: number
}

export type Marker = {
  delete: () => void
}

// TODO should support multiple source
export enum MapSourceType {
  AMAP, // 高德
  TENCENT, // 腾讯
}
