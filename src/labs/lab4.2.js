import { drawBar, drawBarLine } from "../chart/chart"
import { forF, getArrSum, normalizeArr } from "../common"

const k = 1000
const u = 25

const MO = 2
const DISP = 0.2

const arrX = []
const arrY = []

forF(0, k, () => {
  const r1 = Math.random()
  const r2 = Math.random()
  const a = Math.sqrt(-2 * Math.log(r1))
  let x = a * Math.cos(2 * Math.PI * r2)
  let y = a * Math.sin(2 * Math.PI * r2)
  x = MO + Math.sqrt(DISP) * x
  y = MO + Math.sqrt(DISP) * y

  arrX.push(x)
  arrY.push(y)
})

const doLab = (arr) => {
  let i = 0
  let x = 0

  let matO = getArrSum(arr) / k

  let moment2 = 0
  let moment3 = 0

  forF(0, k, (i) => {
    moment2 += arr[i] ** 2
    moment3 += arr[i] ** 3
  })

  moment2 = moment2 / k
  moment3 = moment3 / k

  const disp = moment2 - matO ** 2

  console.log("Математическое ожидание: ", matO)
  console.log("Дисперсия: ", disp)

  const plotn = (x) => (
    Math.exp(-((x - MO) ** 2 / (2 * DISP))) / (Math.sqrt(DISP * 2 * Math.PI))
  )

  const raspredel = (a, b) => {
    const delta = (b - a) / 1000
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

  x = xMin
  const xs = []
  const ys = []

  forF(0, u, () => {
    xs.push(x)
    ys.push(plotn(x))
    x += lenU
  })

  const [barOX, barOY] = normalizeArr(arr, 25)
  drawBarLine({ ox: barOX, oy: barOY }, { ox: xs, oy: ys })

  const p = []
  const leb = []

  x = xMin

  forF(0, u, (i) => {
    p.push(0)

    forF(0, k, (j) => {
      if (arr[j] <= x) {
        p[i] += 1
      }
    })

    p[i] /= arr.length
    x += lenU
    leb.push(x)
  })

  drawBar(leb, p)

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
  
      pt.push(raspredel(x, xLenU))
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
}

doLab(arrX)
doLab(arrY)