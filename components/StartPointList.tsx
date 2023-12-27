import { geometricMedian } from '@/common/math'
import { PlanStore } from '@/store'
import { getDefaultStore, useAtom } from 'jotai'

export default function StartPointList() {
  const [positioning, setPositioning] = useAtom(PlanStore.positioning)
  const [startPoints, setStartPoints] = useAtom(PlanStore.startPoints)
  const [planning, setPlanning] = useAtom(PlanStore.planning)

  return (
    <div className="flex flex-col w-60 h-full border-r">
      <div className="border-b flex flex-row">
        <button
          className={
            'btn btn-block rounded-none no-animation' +
            (positioning ? ' !bg-red-400 !text-white' : '')
          }
          onClick={() => {
            if (!window.MapAPI) return

            setPositioning(true)
            window.MapAPI.onClick((point) => {
              const name = prompt('请输入地点名称') || '未命名'
              const marker = window.MapAPI.createMarker(point.lnglat)
              window.MapAPI.onClick()
              setStartPoints((arr) => [...arr, { ...point, name, marker }])
              setPositioning(false)
            })
          }}
          disabled={positioning}
        >
          {positioning ? '点击地图选择起点位置' : '添加起点'}
        </button>
      </div>

      <div className="divide-y flex-1 bg-gray-50">
        {startPoints.map((point) => (
          <div
            key={`${point.lnglat.lng}-${point.lnglat.lat}`}
            className="text-sm leading-[28px] p-2 pl-4 flex flex-row"
          >
            <div
              className="tooltip tooltip-right"
              data-tip={`(${point.lnglat.lng}, ${point.lnglat.lat})`}
            >
              {point.name}
            </div>
            <button
              className="hover:bg-slate-200 ml-auto rounded-full p-1"
              onClick={() => {
                point.marker.delete()
                setStartPoints(startPoints.filter((p) => p !== point))
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4218"
                width="20"
                height="20"
              >
                <path
                  d="M507.168 473.232L716.48 263.936a16 16 0 0 1 22.624 0l11.312 11.312a16 16 0 0 1 0 22.624L541.12 507.168 750.4 716.48a16 16 0 0 1 0 22.624l-11.312 11.312a16 16 0 0 1-22.624 0L507.168 541.12 297.872 750.4a16 16 0 0 1-22.624 0l-11.312-11.312a16 16 0 0 1 0-22.624l209.296-209.312-209.296-209.296a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l209.296 209.296z"
                  fill="#000000"
                  p-id="4219"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-block btn-success no-animation rounded-none mt-auto"
        disabled={planning}
        onClick={() => {
          if (!window.MapAPI) return
          setPlanning(true)
          const startPoints = getDefaultStore().get(PlanStore.startPoints)
          const coords = startPoints.map((p) =>
            window.MapAPI.lnglatToCoord(p.lnglat)
          )
          const coord = geometricMedian(coords)
          const lnglat = window.MapAPI.coordToLnglat(coord)
          window.MapAPI.setCenter(lnglat)
          window.MapAPI.createMarker(lnglat, true)
          setPlanning(false)
        }}
      >
        {planning ? '规划中...' : '规划'}
      </button>
    </div>
  )
}
