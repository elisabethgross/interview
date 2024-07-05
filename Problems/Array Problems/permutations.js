/**
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
 */

function backtrack(arr, set = new Set(), nums) {
  if (set.size === nums.length) {
    arr.push(Array.from(set))
  } else {
    for (let i = 0; i < nums.length; i++) {
      if (!set.has(nums[i])) {
        set.add(nums[i])
        backtrack(arr, set, nums)
        set.delete(nums[i])
      }
    }
  }
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = []
  backtrack(res, new Set(), nums)
  return res
}

function permute2(nums) {
  if (nums.length === 1) {
    return [[nums[0]]]
  }
  let result = []
  for (let i = 0; i < nums.length; i++) {
    let num = nums.shift()
    let perms = permute2(nums)
    for (let perm of perms) {
      perm.push(num)
    }
    nums.push(num)
    result.push(...perms)
  }
  return result
}

console.log(permute2([1, 2, 3])) // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute2([0, 1])) // [[0,1], [1,0]]
