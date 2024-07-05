/**
 * A peak element is an element that is strictly greater than its neighbors.
 * Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
 * An element is always considered to be strictly greater than a neighbor that is outside the array.
 * You must write an algorithm that runs in O(log n) time.
 *
 * Input: nums = [1,2,3,1]
 * Output: 2
 * Explanation: 3 is a peak element and your function should return the index number
 *
 * Input: nums = [1,2,1,3,5,6,4]
 * Output: 5
 * Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let n = nums.length
  if (n === 1) return 0
  if (nums[0] > nums[1]) return 0
  if (nums[n - 1] > nums[n - 2]) return n - 1
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] > nums[mid + 1] && nums[mid] > nums[mid - 1]) {
      return mid
    } else if (nums[mid] <= nums[mid + 1]) {
      left = mid
    } else if (nums[mid] <= nums[mid - 1]) {
      right = mid
    }
  }
}

console.log(findPeakElement([3, 4, 3, 2, 1])) // 1
console.log(findPeakElement([1, 2, 3, 1])) // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])) // 5 or 1
console.log(findPeakElement([1, 2, 2, 3, 1, 1])) // 3
