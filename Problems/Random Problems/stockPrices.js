// return max profit given an array of prices where each idx represents the price of each day
const solution = (prices) => {
  let buyPrice = prices[0]
  let profit = 0
  for (const price of prices) {
    if (price < buyPrice) {
      buyPrice = price
    }
    if (price - buyPrice > profit) {
      profit = price - buyPrice
    }
  }
  return profit
}

// console.log(solution([6, 0, -1, 10])) // 11
console.log(mainFunction([6, 0, -1, 10])) // 11

8/3
