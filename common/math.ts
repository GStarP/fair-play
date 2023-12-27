import { Coord } from '@/components/Map.type'

/**
 * distance sum from `p` to all points in `arr`
 */
function distSum(p: Coord, arr: Coord[]) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    let dist_x = Math.abs(arr[i].x - p.x)
    let dist_y = Math.abs(arr[i].y - p.y)
    sum += Math.sqrt(dist_x * dist_x + dist_y * dist_y)
  }
  return sum
}

export function geometricMedian(
  arr: Coord[],
  min_step_multiplier = 0.01,
  init_step_multiplier = 1000
): Coord {
  const n = arr.length
  let p: Coord = { x: 0, y: 0 }

  // first becomes avg, which is always close to median
  for (let i = 0; i < n; i++) {
    p.x = p.x + arr[i].x
    p.y = p.y + arr[i].y
  }
  p.x /= n
  p.y /= n

  let min_sum = distSum(p, arr)

  const steps: Coord[] = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ]
  let step_multiplier = init_step_multiplier
  let need_convergence = true

  // when step is too small, we cannot search forever
  while (step_multiplier > min_step_multiplier) {
    need_convergence = true
    // step four directions
    for (let i = 0; i < 4; i++) {
      const new_p: Coord = {
        x: p.x + step_multiplier * steps[i].x,
        y: p.y + step_multiplier * steps[i].y,
      }
      //
      let new_sum = distSum(new_p, arr)
      if (new_sum < min_sum) {
        min_sum = new_sum
        p = new_p
        // if we can still find better answer, then just explore using current step size
        need_convergence = false
        break
      }
    }
    // step is too large, we need to explore more detailed
    if (need_convergence) step_multiplier /= 2
  }

  return p
}
