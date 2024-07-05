/**
 * You are given an array arr of N integers. For each index i, you are required to determine the number of contiguous subarrays that fulfill the following conditions:
 * - The value at index i must be the maximum element in the contiguous subarrays, and
 * - These contiguous subarrays must either start from or end on index i.
 * Input: arr = [3, 4, 1, 6, 2]
 * Output = [1, 3, 1, 5, 1]
 * Explanation:
 * For index 0 - [3] is the only contiguous subarray that starts (or ends) at index 0 with the maximum value in the subarray being 3.
 * For index 1 - [4], [3, 4], [4, 1]
 * For index 2 - [1]
 * For index 3 - [6], [6, 2], [1, 6], [4, 1, 6], [3, 4, 1, 6]
 * For index 4 - [2]
 */

const testCase1 = [3, 4, 1, 6, 2]

function countSubarrays1(arr) {
  const output = []
  for (let i = 0; i < arr.length; i++) {
    let max = arr[i]
    let k = i + 1
    let count = 1
    while (arr[k] < max && k > -1 && k < arr.length) {
      count++
      k++
    }
    let j = i - 1
    while (arr[j] < max && j > -1 && j < arr.length) {
      count++
      j--
    }
    output.push(count)
  }
  return output
}

function countSubarrays2(arr) {
  const length = arr.length
  const res = new Array(length).fill(1)
  let stack = [-1]
  // left
  for (let i = 0; i < length; i++) {
    while (stack.length > 1 && arr[stack[stack.length - 1]] < arr[i]) {
      stack.pop()
    }
    res[i] += i - stack[stack.length - 1] - 1
    stack.push(i)
  }
  // right
  stack = [length]
  for (let i = length - 1; i > -1; i--) {
    while (stack.length > 1 && arr[stack[stack.length - 1]] < arr[i]) {
      stack.pop()
    }
    res[i] += stack[stack.length - 1] - i - 1
    stack.push(i)
  }
  return res
}

console.log('countSubarrays1(testCase1)', countSubarrays1(testCase1))
console.log('countSubarrays2(testCase1)', countSubarrays2(testCase1))
