/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 */

// Time O(n^2)
// Space O(n * log(n)) (the .sort())
function threeSum(nums) {
  let triplets = []
  if (nums.length < 3) return triplets
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    // prevents us from getting the same triplets from different duplicate triplets in the array
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let low = i + 1
    let high = nums.length - 1
    while (high > low) {
      let target = 0 - nums[i]
      let sum = nums[low] + nums[high]
      if (sum === target) {
        triplets.push([nums[i], nums[low], nums[high]])
        let lastLowOccurrence = nums[low]
        let lastHighOccurrence = nums[high]
        // prevents us from getting the same triplets from different duplicate triplets in the array
        while (low < high && nums[low] === lastLowOccurrence) {
          low++
        }
        while (low < high && nums[high] === lastHighOccurrence) {
          high--
        }
      } else if (sum < target) low++
      else high--
    }
  }
  return triplets
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])) // [[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum([0, 1, 1])) // []
console.log(threeSum([0, 0, 0])) // [[0, 0, 0]]
console.log(threeSum([0, 0, 0, 0])) // [[0, 0, 0]]
console.log(threeSum([-2, 0, 0, 2, 2])) // [[-2, 0, 2]]
console.log(threeSum([-2, 3, 3, 2, -2, -2, -3, 0, -1, 1])) // [[-3, 0, 3], [-3. 1. 2], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]]
