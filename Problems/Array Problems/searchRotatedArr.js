/**
 * There is an integer array nums sorted in ascending order (with distinct values).
 * Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
 *
 * Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 */

var findPivot = function (arr) {
  if (arr.length === 1) return 0
  let left = 0
  let right = arr.length - 1
  if (arr[left] < arr[right]) return 0
  while (left <= right) {
    // there was no el after mid or there was no el before mid
    if (left === right) return left
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] < arr[mid - 1] && arr[mid] <= arr[mid + 1]) {
      return mid
    } else if (arr[mid] < arr[right]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
}

var search = function (arr, target) {
  let pivotIdx = findPivot(arr)
  let left, right
  if (target === arr[pivotIdx]) return pivotIdx
  if (target <= arr[arr.length - 1]) {
    left = pivotIdx
    right = arr.length - 1
  } else {
    left = 0
    right = pivotIdx
  }
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] < target) {
      left = mid + 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

console.log(search([3, 1], 1)) // 1
console.log(search([1, 3], 1)) // 0
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)) // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 1)) // 5
console.log(search([6, 7, 8, 1, 2, 3, 4, 5], 7)) // 1
console.log(search([1], 0)) // -1
console.log(search([4, 5, 6, 7, 1, 2, 3], 4)) // 0
console.log(search([9, 10, 11, 1, 2, 3, 4, 5, 6], 6)) // 8
