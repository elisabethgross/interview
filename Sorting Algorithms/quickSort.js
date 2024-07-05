/**
 * Pick a pivot point
 * Look through array
 *    if the element is less than the pivot, put it on the left side of the pivot
 *    if the element is greater than the pivot, put it on the right side
 * Recursively do this for each side of the pivot
 */

function pivot(arr, start = 0, end = arr.length - 1) {
  let pivotIdx = start
  let pivot = arr[start]
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      pivotIdx++
      ;[arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]]
    }
  }
  ;[arr[start], arr[pivotIdx]] = [arr[pivotIdx], arr[start]]
  return pivotIdx
}

// O(nlogn) average
// O(n^2) worst case if we pick the minimum every time (and we use our strategy of picking the first el as the pivot always)
// We can solve that by picking the middle el each time or a random el each time
function quickSort(arr, left = 0, right = arr.length) {
  if (left < right) {
    const pivotIdx = pivot(arr, left, right)
    quickSort(arr, left, pivotIdx - 1)
    quickSort(arr, pivotIdx + 1, right)
  }
  return arr
}

console.log(quickSort([4, 6, 9, 1, 2, 5, 3]))
