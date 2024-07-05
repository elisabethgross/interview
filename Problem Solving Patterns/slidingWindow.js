/**
 * Find the longest string of unique characters
 *
 * Example:
 *
 * longestString('hellothere') // 6 ('other')
 */

function longestString(str) {
  if (str.length < 1) {
    return 0
  }

  let max = 0

  // two pointers at the beginning of the string
  // track length
  // update max
  // move 2nd pointer forward
  // if 2nd pointer reaches unique letter
  // continue moving 2nd pointer forward
  // if 2nd pointer reaches repeat letter
  // update max
  // move 2nd pointer forward until you get a unique letter
  // move 1st pointer to 2nd pointer location

  let pointer1 = 0
  let pointer2 = 1
  let tracker = new Set()
  tracker.add(str[pointer1])

  while (pointer2 < str.length) {
    if (tracker.has(str[pointer2])) {
      max = Math.max(max, tracker.size)
      while (tracker.has(str[pointer2])) {
        pointer2++
      }
      pointer1 = pointer2--
      tracker.clear()
    } else {
      tracker.add(str[pointer2])
      pointer2++
    }
  }
  return max
}

// console.log(longestString('hellothere')) // 6
// console.log(longestString('hellotherpqwl')) // 9
// console.log(longestString('hellol')) // 3

/**
 * Calculate the max consecutive sum of n elements in an array of integers
 *
 * Examples:
 *
 * maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) // 10
 * maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) // 17
 */

// O(n)
function maxSubarraySum(arr, n) {
  if (n > arr.length) {
    return null
  }

  let maxSum = 0
  let tempSum = 0
  for (let i = 0; i < n; i++) {
    tempSum += arr[i]
  }

  maxSum = tempSum

  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum + arr[i] - arr[i - n]
    maxSum = Math.max(maxSum, tempSum)
  }
  return maxSum
}

// console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)) // 10

// Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.

function maxSubarraySum(arr, n) {
  if (arr.length < n) {
    return null
  }

  let max = -Infinity

  let pointer1 = 0
  let sum = arr[pointer1]
  for (let pointer2 = 1; pointer2 < n; pointer2++) {
    sum += arr[pointer2]
  }

  max = Math.max(max, sum)

  for (let pointer2 = n; pointer2 < arr.length; pointer2++) {
    sum = sum + arr[pointer2] - arr[pointer1]
    max = Math.max(max, sum)
    pointer1++
  }
  return max
}

// console.log(maxSubarraySum([100, 200, 300, 400], 2)) // 700
// console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)) // 39
// console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)) // 5
// console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)) // 5
// console.log(maxSubarraySum([2, 3], 3)) // null

// Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.
// This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function.
// If there isn't one, return 0 instead.

function minSubArrayLen(arr, int) {
  let pointer1 = 0
  let pointer2 = 1

  let min = Infinity
  let sum = arr[pointer1]
  while (pointer1 < arr.length && pointer2 <= arr.length) {
    if (sum >= int) {
      min = Math.min(min, pointer2 - pointer1)
      sum -= arr[pointer1]
      pointer1++
    } else if (sum < int) {
      sum += arr[pointer2]
      if (pointer2 <= arr.length) {
        pointer2++
      }
    }
  }
  if (min === Infinity) return 0
  return min
}

// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)) // 2 -> because [4,3] is the smallest subarray
// console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)) // 2 -> because [5,4] is the smallest subarray
// console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)) // 1 -> because [62] is greater than 52
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)) // 3
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)) // 5
// console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)) // 2
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)) // 0

// Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.
function findLongestSubstring(str) {
  if (str.length === 0) {
    return 0
  }

  const idxTracker = {}
  let j = 0
  let max = 0
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (idxTracker[char]) {
      j = Math.max(idxTracker[char], j)
    }
    max = Math.max(i - j + 1, max)
    idxTracker[char] = i + 1
  }
  return max
}

console.log(findLongestSubstring('')) // 0
console.log(findLongestSubstring('rithmschool')) // 7
console.log(findLongestSubstring('thisisawesome')) // 6
console.log(findLongestSubstring('thecatinthehat')) // 7
console.log(findLongestSubstring('bbbbbb')) // 1
console.log(findLongestSubstring('longestsubstring')) // 8
console.log(findLongestSubstring('thisishowwedoit')) // 6
