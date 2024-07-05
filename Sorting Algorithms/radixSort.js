/**
 * Put numbers into buckets based on each digit in a number
 * Example: [1, 3, 40, 25, 100, 200]
 * First look at right most digit and put into 9 buckets of 0 - 9
 * 0: 40, 100, 200
 * 1: 1
 * 3: 3
 * 5: 25
 *
 * Them, combine --> [40, 100, 200, 1, 3, 25]
 *
 * Then, look at next digit to the left and put into buckets again
 * 0: 1, 3, 100, 200
 * 2: 25
 * 4: 40
 *
 * --> [1, 3, 100, 200, 25, 40]
 *
 * Repeat until you've exhausted all digits
 * 0: 1, 3, 25, 40
 * 1: 100
 * 2: 200
 *
 * --> [1, 3, 25, 40, 100, 200]
 */

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}

function getLengthOfNum(num) {
  return num.toString().length
}

// what is the max length of digits given a list of nums
function mostDigits(arr) {
  const lengths = arr.reduce((acc, num) => {
    acc.push(getLengthOfNum(num))
    return acc
  }, [])
  return Math.max(...lengths)
}

// O(nk) where n is length of arr and k is the length of the digits
function radixSort(arr) {
  const maxLength = mostDigits(arr)
  for (let i = 0; i < maxLength; i++) {
    const buckets = Array.from({ length: 10 }, () => [])
    for (let j = 0; j < arr.length; j++) {
      buckets[getDigit(arr[j], i)].push(arr[j])
    }
    // console.log(buckets)
    arr = buckets.reduce((acc, bucket) => {
      return acc.concat(bucket)
    }, [])
  }
  return arr
}

console.log(radixSort([1, 3, 40, 25, 100, 200]))
