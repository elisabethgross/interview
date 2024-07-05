// A function to merge 2 sorted arrays
function merge(arr1, arr2) {
  const ret = []
  let p1 = 0
  let p2 = 0
  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] <= arr2[p2]) {
      ret.push(arr1[p1])
      p1++
    } else if (arr1[p1] > arr2[p2]) {
      ret.push(arr2[p2])
      p2++
    }
  }
  while (p1 < arr1.length) {
    ret.push(arr1[p1])
    p1++
  }
  while (p2 < arr2.length) {
    ret.push(arr2[p2])
    p2++
  }
  return ret
}

// console.log(merge([1, 2, 4, 5], [3, 7]))
// console.log(merge([1, 2, 3, 4, 5], [3, 7]))

// O(nlogn) (split the arr until you get to array's of length 1 is logn and then multiple by the merge function which is n)
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr
  }
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

console.log(mergeSort([5, 8, 4, 6, 7, 9, 10]))
