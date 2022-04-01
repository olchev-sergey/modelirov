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


const n = 1000
const u = 25
const arr = generateReshetka(n)

const [barOX, barOY] = normalizeArr(arr, u)
console.log(getArrSum(arr) / arr.length)

drawBar(barOX, barOY)


const p = []
const leb = []
const xMax = Math.max(...arr)
const xMin = Math.min(...arr)

const lenU = (xMax - xMin) / u
let x = xMin
forF(0, u, (i) => {
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



