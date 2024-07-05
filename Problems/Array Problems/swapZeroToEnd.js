/**
 * Given an array of ints with 0's, return the number of swaps it takes to bubble the 0's to the end in place
 */

// Time: O(n^2)
// Space: O(n)
function swaps(nums) {
  let p1 = 0
  let p2 = 1
  let swaps = 0
  while (p2 < nums.length) {
    if (nums[p1] === 0) {
      // prevent p2 from going out of bounds
      while (nums[p2] === 0 && p2 < nums.length) {
        // if nums[p1] is 0 and nums[p2] is 0 and its at the end of the array, there are no more swaps to be made
        if (p2 === nums.length - 1) return swaps
        p2++
      }
      nums[p1] = nums[p2]
      nums[p2] = 0
      swaps++
    }
    p1++
    p2++
  }
  return swaps
}

console.log(swaps([1, 0, 2, 0, 0, 2, 1])) // 3
console.log(swaps([1, 2, 3, 0, 0])) // 0
console.log(swaps([0, 1])) // 1
console.log(swaps([1, 2, 3])) // 0
console.log(swaps([1, 0, 2, 0, 3])) // 2
