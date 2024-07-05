/**
 * Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

* countUniqueValues([1,1,1,1,1,2]) // 2
* countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
* countUniqueValues([]) // 0
* countUniqueValues([-2,-1,-1,0,1]) // 4
 */

// Time Complexity - O(n)
// Space Complexity - O(1)
function countUniqueValues(arr) {
  if (arr.length === 0) {
    return 0
  }
  let i = 0

  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++
      arr[i] = arr[j]
    }
  }
  return i + 1
}

// console.log(countUniqueValues([-2, -1, -1, 0, 1]))

function areThereDuplicates(...args) {
  const sorted = args.sort()

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === sorted[i + 1]) {
      return true
    }
  }
  return false
}

// console.log(areThereDuplicates(1, 2, 3)) // false
// console.log(areThereDuplicates(1, 2, 3, 2)) // true
// console.log(areThereDuplicates('a', 'b', 'c', 'a')) // true

// Given a target average, return true if 2 elements in the array have the target average. Array is sorted
function averagePair(arr, targetAvg) {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2
    if (avg < targetAvg) {
      left++
    } else if (avg > targetAvg) {
      right--
    } else if (avg === targetAvg) {
      return true
    }
  }
  return false
}
// console.log(averagePair([1, 2, 3], 2.5)) // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)) // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)) // false
// console.log(averagePair([], 4)) // false

// Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string.
function isSubsequence(str1, str2) {
  let pointer1 = 0
  let pointer2 = 0

  while (pointer2 < str2.length) {
    if (str1[pointer1] === str2[pointer2]) {
      pointer1++
    }

    pointer2++

    if (pointer1 === str1.length) {
      return true
    }
  }
  return false
}

// console.log(isSubsequence('hello', 'hello world')) // true
// console.log(isSubsequence('sing', 'sting')) // true
// console.log(isSubsequence('abc', 'abracadabra')) // true
// console.log(isSubsequence('abc', 'acb')) // false

// Function to count pairs in a sorted array that sum to 0
function sumToZeroPairs(arr) {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    const leftEl = arr[left]
    const rightEl = arr[right]
    const sum = leftEl + rightEl
    if (sum === 0) {
      return [leftEl, rightEl]
    } else if (sum < 0) {
      left++
    } else {
      right--
    }
  }
}

// console.log(sumToZeroPairs([-3, -2, -1, 0, 1, 2, 3]))
// console.log(sumToZeroPairs([-4, -2, 0, 1, 2, 3, 4]))
// console.log(sumToZeroPairs([-2, 0, 1, 3]))
