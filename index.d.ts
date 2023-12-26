import { Coord } from '@/app/Map.type'
import { MapAPI } from './components/Map.type'

declare global {
  interface Window {
    MapAPI: MapAPI
  }
}
