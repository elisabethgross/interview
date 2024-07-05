function binarySearch(arr, el) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let mid = Math.floor((right + left) / 2)
    if (arr[mid] < el) {
      left = mid + 1
    } else if (arr[mid] > el) {
      right = mid - 1
    } else if (arr[mid] === el) {
      return mid
    }
  }
  return 'not found'
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6], 2)) // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)) // 0
console.log(binarySearch([2, 3, 4, 5, 6], 7)) // 'not found'
