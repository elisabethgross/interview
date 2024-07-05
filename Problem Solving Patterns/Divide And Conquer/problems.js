// find number of zeroes in a sorted array of 1's and 0's (1's then 0's)
// O(logn)
function countZeroes(arr) {
  if (arr[0] === 0) return arr.length
  if (arr[arr.length - 1] === 1) return 0

  let left = 0,
    right = arr.length - 1,
    firstZero
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (mid === 0 || (arr[mid] === 0 && arr[mid - 1] === 1)) {
      firstZero = mid
      break
    }
  }
  return arr.length - firstZero
}

// console.log(countZeroes([1, 1, 1, 1, 0, 0])) // 2
// console.log(countZeroes([1, 0, 0, 0, 0])) // 4
// console.log(countZeroes([1, 1, 0, 0, 0])) // 3
// console.log(countZeroes([1, 1, 1, 1, 0])) // 1
// console.log(countZeroes([0, 0, 0])) // 3
// console.log(countZeroes([1, 1, 1, 1])) // 0

// count frequency of el in sorted arr
function binarySearch(arr, left, right, el) {
  if (right < left) return -1

  var mid = left + Math.floor((right - left) / 2)

  // If the element is present at the middle
  // itself
  if (arr[mid] === el) return mid

  // If element is smaller than mid, then
  // it can only be present in left subarray
  if (arr[mid] > el) return binarySearch(arr, left, mid - 1, el)

  // Else the element can only be present
  // in right subarray
  return binarySearch(arr, mid + 1, right, el)
}

// Returns number of times x occurs in sorted arr[0..n-1]
function sortedFrequency1(arr, el) {
  let len = arr.length
  var ind = binarySearch(arr, 0, len - 1, el)

  // If element is not present
  if (ind == -1) return 0

  // Count elements on left side.
  let count = 1
  let left = ind - 1
  while (left >= 0 && arr[left] === el) count++, left--

  // Count elements on right side.
  let right = ind + 1
  while (right < len && arr[right] === el) count++, right++

  return count
}

function sortedFrequency2(arr, el) {
  let left = 0,
    right = arr.length - 1

  if (arr[left] === el && arr[right === el]) return arr.length
  if (arr[left] > el || arr[right] < el) return 0

  let firstEl
  // find first el
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (mid === 0 || (arr[mid] === el && arr[mid - 1] !== el)) {
      firstEl = mid
      break
    } else if (arr[mid] < el) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  left = 0
  right = arr.length - 1
  let lastEl
  // find last el
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (mid === arr.length - 1 || (arr[mid] === el && arr[mid + 1] !== el)) {
      lastEl = mid
      break
    } else if (arr[mid] > el) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return lastEl - firstEl + 1
}

// console.log(sortedFrequency1([1, 2, 2, 2, 2, 3, 4, 7, 8, 8], 2))
// console.log(sortedFrequency2([1, 1, 2, 2, 2, 2, 3], 2)) // 4
// console.log(sortedFrequency2([1, 1, 2, 2, 2, 2, 3], 3)) // 1
// console.log(sortedFrequency2([1, 1, 2, 2, 2, 2, 3], 1)) // 2
// console.log(sortedFrequency2([1, 1, 2, 2, 2, 2, 3], 4)) // 0
