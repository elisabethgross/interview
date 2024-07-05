// Given an integer array nums, find the subarray with the largest sum, and return its sum.

var maxSubArray = function (nums, hops = 2) {
  let currMax = 0
  let maxUntilNow = -Infinity
  for (let i = 0; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i])
    maxUntilNow = Math.max(maxUntilNow, currMax)
  }
  return maxUntilNow
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2])) // 6
console.log(maxSubArray([1])) // 1
console.log(maxSubArray([5, 4, -1, 7, 8])) // 23
