'use client'

import { useRef } from 'react'
import Map from '../../components/Map'
import { MapAPI, MapSourceType } from '../../components/Map.type'
import StartPointList from '../../components/StartPointList'

export default function Home({ params }: { params: { secretKey: string } }) {
  const mapRef = useRef<MapAPI>(null)

  return (
    <div className="h-full flex flex-row">
      <StartPointList />
      <Map
        ref={mapRef}
        type={MapSourceType.AMAP}
        secretKey={params.secretKey}
      />
    </div>
  )
}
