/**
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
 * Each element in the result must be unique and you may return the result in any order.
 */

var intersection = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  let p1 = 0
  let p2 = 0
  let intersection = []
  while (p1 < nums1.length && p2 < nums2.length) {
    if (
      nums1[p1] === nums2[p2] &&
      nums1[p1] !== intersection[intersection.length - 1]
    ) {
      intersection.push(nums1[p1])
      p1++
      p2++
    } else if (nums1[p1] < nums2[p2]) {
      p1++
    } else {
      p2++
    }
  }
  return intersection
}

console.log(intersection([1, 2, 2, 1], [2, 2])) // [2]
console.log(intersection([9, 4, 9, 8, 4], [4, 9, 5])) // [4, 9]
console.log(intersection([1, 2], [2, 1])) // [1, 2]
