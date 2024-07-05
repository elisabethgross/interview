/**
 * Pair Sums
 * Given a list of n integers arr[0..(n-1)], determine the number of different pairs of elements within it which sum to k.
 * If an integer appears in the list multiple times, each copy is considered to be different; that is, two pairs are considered different if one pair includes at least one array index which the other doesn't, even if they include the same values.
 */

const testCase1 = [[1, 2, 3, 4, 3], 6]
const testCase2 = [[1, 5, 3, 3, 3], 6]

function numberOfWays(arr, k) {
  let counter = 0
  let map = {}
  arr.forEach((num) => {
    console.log('map beginning', map)
    const diff = k - num
    if (map[num]) {
      counter += map[num]
      map[num]++
    } else {
      map[diff] = 1
    }
    console.log('map end', map)
    console.log('---------')
  })
  return counter
}

// console.log('numberOfWays(...testCase1)', numberOfWays(...testCase1)) // 2
console.log('numberOfWays(...testCase2)', numberOfWays(...testCase2)) // 4
