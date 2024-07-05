/**
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 */

/**
 * @param {number} n number of stairs
 * @param {number} hops max number of stairs you can take per hop
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 2) {
    return 1
  }

  let firstStep = 1
  let secondStep = 1
  let thirdStep = 0

  for (let i = 2; i <= n; i++) {
    thirdStep = firstStep + secondStep
    firstStep = secondStep
    secondStep = thirdStep
  }
  return thirdStep
}

console.log(climbStairs(2)) // 2
console.log(climbStairs(3)) // 3
console.log(climbStairs(5, 3)) // 6
