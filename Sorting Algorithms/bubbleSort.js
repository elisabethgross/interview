/**
 * Take an array of values [10, 3, 9, 2, 7, 1]
 * Walk through array
 * Look at first two el's
 * If first is larger than second, swap
 * [3, 10, 9, 2, 7, 1]
 * Now look at 2 & 3rd el of array, repeat swap or no swap
 * Continue making passes at the array until it is sorted
 * In this way, we "bubble" the larger values to the top
 */

// O(n^2)
function bubbleSort(arr, comp = (a, b) => a - b) {
  for (let i = arr.length - 1; i > -1; i--) {
    // optimization, stop looping through array if it is already sorted
    let sorted = true
    for (let j = 0; j < i; j++) {
      let compVal = comp(arr[j], arr[j + 1])

      if (compVal > 0) {
        console.log('in here')
        sorted = false
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    if (sorted) {
      break
    }
  }
  return arr
}

var kitties = ['LilBub', 'Garfield', 'Heathcliff', 'Blue', 'Grumpy']

function strComp(a, b) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }
  return 0
}
console.log(bubbleSort(kitties, strComp))
console.log(bubbleSort([10, 3, 9, 2, 7, 1]))
