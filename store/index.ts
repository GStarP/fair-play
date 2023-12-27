import { Marker, Point } from '@/components/Map.type'
import { atom } from 'jotai'

export type StartPoint = Point & { name: string; marker: Marker }

const positioning = atom(false)
const startPoints = atom<StartPoint[]>([])

const planning = atom(false)

export const PlanStore = {
  positioning,
  startPoints,
  planning,
}
