import { drawBar, drawBarLine } from "../chart/chart"
import { forF, getArrSum, normalizeArr } from "../common"

const k = 1000
const u = 25

const MO = 2
const DISP = 0.2

const arr = []

forF(0, 1000, () => {
  let s = 0

  forF(0, 12, () => {
    s += Math.random()
  })

  let x = s - 6
  x = MO + Math.sqrt(DISP) * x

  arr.push(x)
})

console.log(arr);

const matO = getArrSum(arr) / k
let moment2 = 0
let moment3 = 0

forF(0, k, (i) => {
  moment2 += arr[i] ** 2
  moment3 += arr[i] ** 3
}) 

moment2 = moment2 / k
moment3 = moment3 / k
let disp = moment2 - matO ** 2

console.log('Математическое ожидание', matO)
console.log('Дисперсия: ', disp)

const plotn = (x) => {
  return Math.exp(-((x - MO) ** 2 / (2 * DISP))) / (Math.sqrt(DISP * 2 * Math.PI))
}

const raspr = (a, b) => {
  let delta = (b - a) / 1000
  let s = 0
  let x = a

  while (x < b) {
    s += plotn(x) * delta
    x += delta
  }

  return s
}

const xMax = Math.max(...arr)
const xMin = Math.min(...arr)
const lenU = (xMax - xMin) / u

let x = xMin
const xs = []
const ys = []

forF(0, u, () => {
  xs.push(x)
  ys.push(plotn(x))
  x += lenU
})

const canv1ID = '#canv1'
const canv2ID = '#canv2'

const [barOX, barOY] = normalizeArr(arr, 25)
console.log(barOX);
console.log(barOY);


drawBarLine(
  canv1ID,
  { ox: barOX, oy: barOY },
  {
    ox: xs,
    oy: ys,
  },
)

const statisticFunc = () => {
  const p = []
  const leb = []
  const xMax = Math.max(...arr)
  const xMin = Math.min(...arr)
  const lenU = (xMax - xMin) / u
  let x = xMin

  forF(0, u, (i) => {
    p.push(0)

    forF(0, k, (j) => {
      if (arr[j] <= x) {
        p[i] += 1
      }
    })

    p[i] = p[i] / arr.length
    x += lenU
    leb.push(x)
  })

  console.log(leb);
  console.log(p);

  // drawBar(canv2ID, [1, 2, 3], [10, 20, 30])
  drawBar(canv2ID, leb, p)
}

statisticFunc()

const pirson = () => {
  const lenU = 1 / u
  const p = []
  const leb = []
  let x = 0
  const pt = []

  forF(0, u, (i) => {
    p.push(0)
    let xLenU = x + lenU

    forF(0, arr.length, (j) => {
      if (x <= arr[j] && arr[j] < xLenU) {
        p[i] += 1
      }
    })

    pt.push(raspr(x, xLenU))
    x += lenU
    leb.push(x)
  })

  let xi2 = 0

  forF(0, u, (i) => {
    xi2 += (p[i] - arr.length * pt[i]) ** 2 / (arr.length * pt[i])
  })

  console.log('Хи-квадрат', xi2);
}

pirson()