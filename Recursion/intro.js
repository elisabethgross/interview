function rangeSum(num) {
  if (num === 1) return 1
  return num + rangeSum(num - 1)
}

// console.log(rangeSum(5))

// 5 + rangeSum(4) 10 + 5 = 15
// 4 + rangeSum(3) 6 + 4 = 10
// 3 + rangeSum(2) 3 + 3 = 6
// 2 + rangeSum(1) --> 1 + 2 = 3

// factorial iteratively
function iterativeFactorial(num) {
  let ret = 1
  for (i = 2; i <= num; i++) {
    ret *= i
  }
  return ret
}

// console.log(iterativeFactorial(5))

// recursive factorial
function recursiveFactorial(num) {
  if (num === 1) return 1
  return num * recursiveFactorial(num - 1)
}

// recursiveFactorial(4)
// 4 * recursiveFactorial(3) 6 * 4 = 24
// 3 * recursiveFactorial(2) 2 * 3 = 6
// 2 * recursiveFactorial(1) 2 * 1 = 2
