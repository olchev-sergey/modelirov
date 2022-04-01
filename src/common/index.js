export const forF = (start, end, cbk) => {
  for (let i = start; i < end; i++) {
    cbk(i)
  }
}


export const getArrSum = (arr = []) => arr.reduce((accum, item) => accum + item, 0)

export const getIntervals = (rightV, intervalCount) => {
  const step = rightV / intervalCount

  return [...Array(intervalCount)].map((v, i) => ({
    left: step * i,
    right: step * (i + 1),
  }))
}

export const getCountInIntervals = (intervals = [], arr = []) => {
  const res = [...Array(intervals.length).fill(0)]

  arr.forEach((item) => {
    const i = intervals.findIndex(
      (interv) => item >= interv.left && item <= interv.right,
    )

    res[i] += 1
  })

  return res
}

export const normalizeArr = (arr, bins) => {
  const n = arr.length
  const max = Math.max(...arr)
  const intervals = getIntervals(max, bins)
  const counts = getCountInIntervals(intervals, arr)
  const normalize = counts.map((item, i) => item / ((intervals[i].right - intervals[i].left) * n))

  return [intervals.map((interval) => interval.right), normalize]
}