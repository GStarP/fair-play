import { Point } from '@/components/Map.type'
import { atom } from 'jotai'

export type StartPoint = Point & { name: string }

const positioning = atom(false)
const startPoints = atom<StartPoint[]>([])

export const PlanStore = {
  positioning,
  startPoints,
}
