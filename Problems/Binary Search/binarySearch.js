function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      left = mid
    } else if (arr[mid] > target) {
      right = mid
    }
  }
  return -1
}

function binarySearchRecursive(arr, target, left, right) {
  let middle
  if (left < right) {
    middle = Math.floor((left + right) / 2)
    if (arr[middle] === target) {
      return middle
    } else if (arr[middle] < target) {
      return binarySearchRecursive(arr, target, middle, right)
    } else if (arr[middle] > target) {
      return binarySearchRecursive(arr, target, left, middle)
    }
  } else {
    return -1
  }
}

const testCase1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(
  'binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 6',
  binarySearch(testCase1, 6)
)
console.log(
  'binarySearchRecursive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 6',
  binarySearchRecursive(testCase1, 6, 0, testCase1.length - 1)
)
