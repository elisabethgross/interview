/**
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 *
 * Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 * Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
 * The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
 */

// function mergeSortedArrs(arr1, m, arr2, n) {
//   let idx1 = 0
//   let idx2 = 0
//   while (idx2 < arr2.length) {
//     if (arr2[idx2] > arr1[idx1] || arr2[idx2] === arr1[idx1]) {
//       arr1.splice(idx1 + 1, 0, arr2[idx2])
//       idx1 += 2
//       idx2++
//     } else if (arr2[idx2] < arr1[idx1]) {
//       arr1.splice(idx1, 0, arr2[idx2])
//       idx2++
//     }
//   }
//   return arr1
// }

var mergeSortedArrs = function (nums1, m, nums2, n) {
  let i = m - 1 // last element of nums1 which is now 3
  let j = n - 1 // last element of nums2 which is now 6
  let k = m + n - 1 // last element of nums1 which is now 0

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--]
    } else {
      nums1[k--] = nums2[j--]
    }
  }
}

const testCase1 = [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3]

console.log(
  'mergeSortedArrs(testCase1)',
  mergeSortedArrs(testCase1[0], testCase1[1], testCase1[2], testCase1[3])
)
