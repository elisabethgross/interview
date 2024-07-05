/**
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
 *
 * Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
 *
 * Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
 *
 * Return k.
 */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let ans = 0
  let idx = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      let temp = nums[idx]
      nums[idx] = nums[i]
      nums[i] = temp
      idx++
      ans++
    } else {
      nums[i] = '_'
    }
  }
  console.log(nums)
  return ans
}

console.log(removeElement([3, 2, 2, 3], 3)) // 2, [2,2,_,_]
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)) // 5, [0,1,3,0,4,_,_,_]
