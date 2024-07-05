/**
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b)
  let n = nums.length
  return nums[Math.floor(n / 2)]
}

console.log(majorityElement([1, 2, 1, 3, 2, 2, 2])) // 2
console.log(majorityElement([3, 1, 3, 4])) // 3
