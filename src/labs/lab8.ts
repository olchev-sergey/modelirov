import { drawBar } from "../chart/chart"
import { forF, getArrSum, normalizeArr } from "../common"

const M = 10

const generSob = (p) => {
  const r = Math.random()
  
  if (r < p) {
    return 1
  }

  if (p < r && r < 2 * p) {
    return 2
  }

  if (p * 2 < r && r < 3 * p) {
    return 3
  }

  if (p * 3 < r && r < 4 * p) {
    return 4
  }

  if (p * 4 < r && r < 5 * p) {
    return 5
  }

  if (r > 5 * p) {
    return 6
  }
}

const reshetka = (m, p) => {
  let x = 0
  let y = 0
  let z = 0

  let b = 1

  for (let i = 0; i < m; i++) {
    const a = generSob(p)

    switch (a) {
      case 1:
        x += 1
        break;
      case 2:
        y += 1
        break;
      case 3:
        z += 1
        break;
      case 4:
        x -= 1
        break;
      case 5:
        y -= 1
        break;
      case 6:
        z -= 1
        break;
    }
  }

  return [x, y, z]
}

const generateReshetka = (n) => {
  let x, y, z
  const M = 10
  const P = 1 / 6
  const arr = []

  for (let i = 0; i < n; i++) {
    [x, y, z] = reshetka(M, P)
    const R = Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    arr.push(R)
  }

  return arr
}

const getDisper = (arr) => {
  const n2 = arr.length
  const matO = arr.reduce((accum, v) => accum + v, 0) / n2
  let mom2 = 0
  let mom3 = 0

  for (let i = 0; i < n2; i++) {
    mom2 += arr[i] ** 2
    mom3 += arr[i] ** 3
  }

  mom2 = mom2 / n2
  mom3 = mom3 / n2
  return mom2 - matO ** 2
}


const n = 1000
const k = 25
const t = 1.96
const d = 0.05
const b = 0.95

const arr = generateReshetka(n)
console.log("Среднее расстояние для 1 выборки", getArrSum(arr) / arr.length)
const disper = getDisper(arr)

console.log("Дисперсия для 1 выборки", disper)

const n2 = Math.ceil((t ** 2 * disper) / (d ** 2))
const n3 = Math.ceil(1 + (2 * t ** 2) / ((d / disper) ** 2))

console.log(
  "Объем выборки 2",
  n2)

console.log("Объем выборки 3", n3)

const arr2 = generateReshetka(n2)
const arr3 = generateReshetka(n3)

console.log("Среднее расстояние для 2 выборки",getArrSum(arr2)/arr2.length)
console.log("Среднее расстояние для 3 выборки",getArrSum(arr3)/arr3.length)

const drawBarGr = (arr) => {
  const [barOX, barOY] = normalizeArr(arr, k)
  drawBar(barOX, barOY)
}

const drawStatFuncGr = (arr) => {
  const p = []
  const leb = []
  const xMax = Math.max(...arr)
  const xMin = Math.min(...arr)
  
  const lenU = (xMax - xMin) / k
  let x = xMin
  forF(0, k, (i) => {
    p.push(0)
  
    forF(0, n, (j) => {
      if (arr[j] <= x) {
        p[i] += 1
      }
    })
  
    p[i] = p[i] / arr.length
    x += lenU
    leb.push(x)
  })
  
  drawBar(leb, p)
}


drawBarGr(arr2)
drawStatFuncGr(arr2)
drawBarGr(arr3)
drawStatFuncGr(arr3)




