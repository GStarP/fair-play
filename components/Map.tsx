import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { MapAPI, MapClickHandler, MapProps, MapSourceType } from './Map.type'
import { IS_DEV } from '@/common/const'

const MAP_CONTAINER_ID = 'map'

const Map = forwardRef<MapAPI, MapProps>(function Map(
  {
    type,
    secretKey,
    init = {
      center: {
        lng: 121.436224,
        lat: 31.191369,
      },
      zoom: 15,
    },
  },
  ref
) {
  const mapRef = useRef<any>(null)
  const clickHandler = useRef<MapClickHandler | null>(null)

  useEffect(() => {
    if (type === MapSourceType.AMAP) {
      import('@amap/amap-jsapi-loader')
        .then((AMapLoader) =>
          AMapLoader.load({
            key: secretKey,
            version: '2.0',
            plugins: [],
          })
        )
        .then((AMap) => {
          mapRef.current = new AMap.Map(MAP_CONTAINER_ID, {
            viewMode: '2D',
            center: new AMap.LngLat(init.center?.lng, init.center?.lat),
            zoom: init.zoom,
            doubleClickZoom: false,
          })
          mapRef.current.AMap = AMap

          if (IS_DEV) {
            // @ts-ignore
            window.map = mapRef.current
          }

          const onClick: MapClickHandler = (e) => {
            console.debug(e)
            clickHandler.current?.(e)
          }
          mapRef.current.on('click', onClick)
        })
        .catch((e) => {
          alert('地图加载失败')
          console.error(e)
        })

      return () => mapRef.current?.destroy()
    }
  }, [type, secretKey, init])

  useImperativeHandle(
    ref,
    () => {
      const onClick: MapAPI['onClick'] = (cb) => {
        if (cb !== undefined) {
          clickHandler.current = cb
        } else {
          clickHandler.current = null
        }
      }
      const lnglatToCoord: MapAPI['lnglatToCoord'] = (lnglat) => {
        if (!mapRef.current) throw new Error('map not ready')
        return mapRef.current.lngLatToPixel(
          [lnglat.lng, lnglat.lat],
          mapRef.current.getZoom()
        )
      }
      const coordToLnglat: MapAPI['coordToLnglat'] = (coord) => {
        if (!mapRef.current) throw new Error('map not ready')
        return mapRef.current.pixelToLngLat(
          new mapRef.current.AMap.Pixel(coord.x, coord.y),
          mapRef.current.getZoom()
        )
      }

      const setCenter: MapAPI['setCenter'] = (lnglat) => {
        if (!mapRef.current) throw new Error('map not ready')
        return mapRef.current.setCenter([lnglat.lng, lnglat.lat], true)
      }

      window.MapAPI = {
        onClick,
        lnglatToCoord,
        coordToLnglat,
        setCenter,
      }

      return window.MapAPI
    },
    // TODO: not dependent but need refresh
    [type, secretKey, init]
  )

  return <div id={MAP_CONTAINER_ID} className="flex-1 bg-gray-200"></div>
})

export default Map
