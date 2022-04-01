import { drawBar, drawBarLine } from '../chart/chart'

console.clear()

const app = document.querySelector('#app')

const chart1ID = '#canv1'
const chart2ID = '#canv2'

const k = 256
const n = 1000
const u = 25

const _z1 = []

for (let i = 0; i < k; i++) {
  _z1.push(Math.random())
}

const rand = () => {
  const g1 = Math.random()
  const g2 = Math.random()
  const M = Math.floor(g2 * k)
  const res = _z1[M]
  _z1[M] = g1

  return res
}

const ar = [...Array(n)].map(() => rand())
const obratR = (r) => {
  const x1 = Math.log10((0.2 + r) / 0.2)
  const x2 = (r + 0.25) / 1.5
  const x3 = r / 0.25 - 2.5

  if (x1 >= 0 && x1 < 0.3) {
    return x1
  } else if (x2 >= 0.3 && x2 < 0.7) {
    return x2
  } else if (x3 >= 0.7 && x3 <= 1.5) {
    return x3
  }

  return 0
}

const raspred = (x) => {
  if (0 <= x && x < 0.3) {
    return 0.2 * Math.pow(10, x) - 0.2
  } else {
    if (0.3 <= x && x < 0.7) {
      return 1.5 * x - 0.25
    } else {
      if (0.7 <= x && x <= 1.5) {
        return 0.25 * x + 0.625
      }
    }
  }
}

const plotn = (x) => {
  if (0 <= x && x < 0.3) {
    return 0.2 * Math.pow(10, x) * Math.log(10)
  } else {
    if (0.3 <= x && x < 0.7) {
      return 1.5
    } else {
      if (0.7 <= x && x <= 1.5) {
        return 0.25
      }
    }
  }
}

const arx = ar.map((v, i) => obratR(v))

//----graphics

const xmax = Math.max(...arx)
const xmin = Math.min(...arx)

const lenU = (xmax - xmin) / u
let x = lenU
const xs = []
const ys = []

for (let i = 0; i < u; i++) {
  xs.push(x)
  ys.push(plotn(x))
  x += lenU
}

const intervals = 25
const right = 1.5

const getIntervals = (rightV, intervalCount) => {
  const step = rightV / intervalCount

  return [...Array(intervalCount)].map((v, i) => ({
    left: step * i,
    right: step * (i + 1),
  }))
}

const getCountInIntervals = (intervals = [], arr = []) => {
  const res = [...Array(intervals.length).fill(0)]

  arr.forEach((item) => {
    const i = intervals.findIndex(
      (interv) => item >= interv.left && item <= interv.right,
    )

    res[i] += 1
  })

  return res
}

const inter = getIntervals(1.5, 25)
const counts = getCountInIntervals(inter, arx)
const normalize = counts.map(
  (item, i) => item / ((inter[i].right - inter[i].left) * n),
)

drawBarLine(
  chart1ID,
  { ox: inter.map((int) => int.right), oy: normalize },
  { ox: xs, oy: ys },
)

//second graphics
let u2 = 25
const p = []
const leb = []
const lenU2 = (xmax - xmin) / u2

let x2 = lenU2

for (let i = 0; i < u2; i++) {
  p.push(0)
  for (let j = 0; j < n; j++) {
    if (ar[j] <= raspred(x2)) {
      p[i] += 1
    }
  }
  p[i] = p[i] / n
  x2 += lenU2
  leb.push(x2)
}

const xs2 = []
const ys2 = []
let x3 = lenU2

for (let i = 0; i < u; i++) {
  xs2.push(x3)
  ys2.push(raspred(x3))
  x3 += lenU2
}

drawBarLine(chart2ID, { ox: leb, oy: p }, { ox: xs2, oy: ys2 })

const n2 = arx.length
const matO = arx.reduce((accum, v) => accum + v, 0) / n2
let mom2 = 0
let mom3 = 0

for (let i = 0; i < n2; i++) {
  mom2 += arx[i] ** 2
  mom3 += arx[i] ** 3
}

mom2 = mom2 / n2
mom3 = mom3 / n2
let disp = mom2 - matO ** 2

console.log('Математическое ожидание: ', matO)
console.log('Дисперсия: ', disp)
console.log('Второй начальный момент: ', mom2)
console.log('Третий начальный момент: ', mom3)

const getPirs = () => {
  const u = 25
  const lenU = 1 / u
  const p = []
  const leb = []
  let x = 0
  const pt = []

  for (let i = 0; i < u; i++) {
    p.push(0)
    let xLenU = x + lenU

    for (let j = 0; j < n; j++) {
      if (x <= arx[j] && arx[j] < xLenU) {
        p[i] += 1
      }
    }

    pt.push(raspred(xLenU) - raspred(x))
    x += lenU
    leb.push(x)
  }

  let xi2 = 0

  for (let i = 0; i < u; i++) {
    xi2 += (p[i] - n * pt[i]) ** 2 / (n * pt[i])
  }

  console.log('Хи-квадрат', xi2)
}

getPirs()
