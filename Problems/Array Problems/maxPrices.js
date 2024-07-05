/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 */

var maxProfit = function (prices) {
  if (prices == null || prices.length <= 1) return 0
  let minBuy = prices[0]
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    minBuy = Math.min(minBuy, prices[i])
    profit = Math.max(profit, prices[i] - minBuy)
  }
  return profit
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 5
console.log(maxProfit([3, 2, 6, 5, 0, 3])) // 4
