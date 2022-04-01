import { getArrSum } from '../common'

const generSob = (p1, p2, p3, counts) => {
  const [r1, r2, r3] = [Math.random(), Math.random(), Math.random()]

  if (r1 < p1) {
    counts.p1 += 1;
  }

  if (r2 < p2) {
    counts.p2 += 1;
  }

  if (r3 < p3) {
    counts.p3 += 1;
  }

  return counts
}


const n = 1000

const genersTest = (turnOnCount = 2) => {
  const p1 = 0.1
  const p2 = 0.2
  const p3 = 0.3

  const counts = {
    p1: 0,
    p2: 0,
    p3: 0,
  }

  for (let i = 0; i < turnOnCount; i++) {
    generSob(p1, p2, p3, counts)
  }

  if (counts.p1 < 2 && counts.p2 < 2 && counts.p3 < 2) {
    return 1
  } else {
    return 0
  }
}

const methodMonteCarlo = () => {
  const p1 = 0.1
  const p2 = 0.2
  const p3 = 0.3
  
  const arr = []

  for (let i = 0; i < n; i++) {
    arr.push(genersTest(5))
  }

  const resArr = getArrSum(arr) / n
  console.log(resArr)

  return [[...arr]]
}


const doverInterval = (arr, bett = 0.95) => {
  const n = arr.length
  const matO = getArrSum(arr) / n
  let moment2 = 0

  for (let i = 0; i < n; i++) {
    moment2 += arr[i] ** 2
  }

  moment2 /= n
  const disp = moment2 - matO ** 2
  const z = 1.9599639845400536
  const h = Math.sqrt(disp * z ** 2 /(n - 1))

  return[matO - h, matO + h]
}


const [ arr ] = methodMonteCarlo()
console.log(doverInterval(arr));

