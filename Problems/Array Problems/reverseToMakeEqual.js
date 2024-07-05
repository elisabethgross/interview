/**
 * Given two arrays A and B of length N, determine if there is a way to make A equal to B by reversing any subarrays from array B any number of times.
 *
 * Input:
 * A = [1, 2, 3, 4]
 * B = [1, 4, 3, 2]
 *
 * Output: true (reversing subarray from index 1 - 3 in B yields array A)
 *
 * Approach -> if the arrays both contain the same elements, you can always make the same ordering by reversing subarrays
 * 1) Sort the two arrays and check that the elements are the same. This is O(nlogn) for the sorting algorithm
 * 2) Make a hash map of all the elements and frequencies in arr A. Then go through arr B and decrement for each element. At the end, you should have 0 for all elements. If you ever get to a negative number, you can return early. This is O(n)
 */

const testCase1A = [1, 2, 3, 4]
const testCase1B = [1, 4, 3, 2]

const testCase2A = [1, 2, 3, 4]
const testCase2B = [1, 4, 3, 3]

function areTheyEqual(a, b) {
  const tracker = {}
  for (let i = 0; i < a.length; i++) {
    const el = a[i]
    tracker[el] = tracker[el] || 0
    tracker[el]++
  }

  for (let j = 0; j < b.length; j++) {
    const el = b[j]
    if (!tracker[el]) {
      return false
    }
    tracker[el]--
    if (tracker[el] < 0) {
      return false
    }
  }

  const trackerKeys = Object.keys(tracker)
  for (let k = 0; k < trackerKeys; k++) {
    if (trackerKeys[k] !== 0) {
      return false
    }
  }
  return true
}

console.log(
  'areTheyEqual(testCase1A, testCase1B)',
  areTheyEqual(testCase1A, testCase1B)
) // true

console.log(
  'areTheyEqual(testCase2A, testCase2B)',
  areTheyEqual(testCase2A, testCase2B)
) // false
