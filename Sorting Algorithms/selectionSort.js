/**
 * Take an array of values [10, 3, 9, 2, 7, 1]
 * Set the first el to be the min
 * Compare this item to each el of the array until you find the actual minimum
 * After you find the minimum you swap it with the last el
 */

// O(n^2)
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    // only swap if the min isn't already at i
    if (i !== minIdx) {
      let temp = arr[i]
      arr[i] = arr[minIdx]
      arr[minIdx] = temp
    }
  }
  return arr
}

console.log(selectionSort([10, 3, 9, 2, 7, 1]))
