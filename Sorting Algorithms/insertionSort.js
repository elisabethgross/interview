/**
 * Take an array of values [10, 3, 9, 2, 7, 1]
 * Call the first element of the array "sorted"
 * Look at 2nd element
 * Insert it into the sorted portion in the correct spot
 * Iterate
 *
 * Works very well if you have incoming data coming as you sort
 */

// O(n^2)
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currVal = arr[i]
    let lastIdx = i - 1
    while (lastIdx > -1 && arr[lastIdx] > currVal) {
      arr[lastIdx + 1] = arr[lastIdx]
      lastIdx--
    }
    arr[lastIdx + 1] = currVal
  }
  return arr
}

console.log(insertionSort([10, 3, 9, 2, 7, 1]))
