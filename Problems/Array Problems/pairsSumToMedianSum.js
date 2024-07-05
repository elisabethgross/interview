/**
 * Given an array of integers, return the pairs that sum to the median amount
 *
 * Input: [3, 4, 6, 7, 8, 9, 9, 5, 6, 3] (median 6)
 * Output: (3, 3)
 */

testCase1 = [3, 4, 6, 7, 8, 9, 9, 5, 6, 3]
testCase2 = [1, 2, 3, 4, 5]

/**
 * Find the median of an array of integers
 * @param {array} arr array of integers to find the median of
 * @return integer the median of the array
 */
function findMedian(arr) {
  const sum = arr.reduce((acc, el) => {
    return acc + el
  }, 0)
  return sum / arr.length
}

/**
 * Find the pairs in the array that sum to the median of the integers of the array
 * @param {array} arr array of integers
 * @returns array of arrays of pairs of integers
 */
function findPairsSumToMedian(arr) {
  // sort array O(n log n)
  const sortedArr = arr.sort()
  const median = findMedian(arr)
  console.log('median', median)
  let pointer1 = 0
  let pointer2 = arr.length - 1
  const output = []
  // O(n)
  while (pointer1 < pointer2) {
    const el1 = arr[pointer1]
    const el2 = arr[pointer2]
    const sum = el1 + el2
    if (sum === median) {
      output.push([el1, el2])
      pointer1++
    } else if (sum < median) {
      pointer1++
    } else {
      pointer2--
    }
  }
  return output
}

console.log('findPairsSumToMedian test case 1', findPairsSumToMedian(testCase1)) // (3, 3)
console.log('findPairsSumToMedian test case 2', findPairsSumToMedian(testCase2)) // (1, 2)
