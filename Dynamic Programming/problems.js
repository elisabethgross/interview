// O(2^n)
function fibRecursive(n) {
  if (n <= 2) return 1
  return fibRecursive(n - 1) + fibRecursive(n - 2)
}

// O(n)
// top-down (we begin with fib(n) and work down to fib(2))
// space complexity O(2^n) because we still make all of the recursive calls
function fibMemo(n, memo = []) {
  if (memo[n]) return memo[n]
  if (n <= 2) return 1
  let sum = fibMemo(n - 1, memo) + fibMemo(n - 2, memo)
  memo[n] = sum
  return sum
}

// bottom-up tabulation (dynamic programming)
// time complexity O(n)
// space complexity = O(n)
function fibTabulation(n) {
  let fibs = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2]
  }
  return fibs[n]
}

// console.log(fibMemo(6)) // 8
// console.log(fibRecursive(3)) // 2
// console.log(fibTabulation(6))

/**
 * Write a function called coinChange which accepts two parameters: an array of denominations and a value.The function should return the number of ways you can obtain the value from the given collection of denominations.
 *
 */

function coinChange(coins, total) {
  let matrix = []
  for (let i = 0; i <= coins.length; i++) {
    matrix.push([])
    for (let j = 0; j <= total; j++) {
      matrix[i] = matrix[i] || []
      if (j === 0) matrix[i].push(1)
      else matrix[i].push(0)
    }
  }
  for (let coin = 1; coin <= coins.length; coin++) {
    for (let num = 1; num <= total; num++) {
      let prevChangeRemainder = num - coins[coin - 1]
      let prevChange
      if (prevChangeRemainder < 0) {
        prevChange = 0
      } else {
        prevChange = matrix[coin][prevChangeRemainder]
      }
      matrix[coin][num] = matrix[coin - 1][num] + prevChange
    }
  }
  console.log(matrix)
  return matrix[coins.length][total]
}

const denominations = [1, 5, 10, 25]

// console.log(coinChange(denominations, 1)) // 1
// console.log(coinChange(denominations, 2)) // 1
// console.log(coinChange(denominations, 5)) // 2
console.log(coinChange(denominations, 10)) // 4
// console.log(coinChange(denominations, 25)) // 13
// console.log(coinChange(denominations, 45)) // 39
// console.log(coinChange(denominations, 100)) // 242
// console.log(coinChange(denominations, 145)) // 622
// console.log(coinChange(denominations, 1451)) // 425663
// console.log(coinChange(denominations, 14511)) // 409222339

// Write a function to return the minimum amount of coins needed to make change
// Note: this is a greedy algorithm, take the first best option available
function minCoinChange(coins, amount) {
  let coinChange = []
  let i = coins.length - 1
  let found = false
  let start = coins.length - 1
  let remainderChange = amount
  while (i > -1 && !found) {
    let coin = coins[i]
    // while there is still change left over
    while (remainderChange > 0) {
      // using this coin will make remainder change < 0
      if (remainderChange < coin) {
        break
      }
      // subtract another coin from the remainder change
      remainderChange -= coin
      // add to the coins used
      coinChange.push(coin)
    }
    // if using all the largest coins brings us to 0, we have found min coin change
    if (remainderChange === 0) {
      found = true
      break
    }
    // if we've cycled through all the coins and not reached 0, we must try to make change with combinations of the lower denominations
    if (i === 0) {
      // reset remainder change
      remainderChange = amount
      // reset coins
      coinChange = []
      // start at the next lowest denomination
      start--
      // start i at new start
      i = start
    } else {
      i--
    }
  }
  if (remainderChange > 0) return []
  return coinChange
}

// console.log(minCoinChange([3, 7, 8], 9)) // [3, 3, 3]
// console.log(minCoinChange([1, 5], 11)) // [5, 5, 1]
// console.log(minCoinChange([1, 5, 10, 25], 85)) // [25, 25, 25, 10]
// console.log(minCoinChange([1, 3, 9], 11)) // [9, 1, 1]
