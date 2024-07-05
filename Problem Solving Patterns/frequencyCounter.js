/**
 * Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.
 *
 * Examples:

 * validAnagram('', '') // true
 * validAnagram('aaz', 'zza') // false
 * validAnagram('anagram', 'nagaram') // true
 * validAnagram("rat","car") // false) // false
 * validAnagram('awesome', 'awesom') // false
 * validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana') // false
 * validAnagram('qwerty', 'qeywrt') // true
 * validAnagram('texttwisttime', 'timetwisttext') // true
 */

// O(n)
function validAnagram(str1, str2) {
  const tracker = {}
  for (let char of str1) {
    tracker[char] = tracker[char] || 0
    tracker[char]++
  }
  for (let char of str2) {
    if (!tracker[char]) {
      return false
    }
    tracker[char]--
  }
  for (let [key, value] of Object.entries(tracker)) {
    if (value !== 0) {
      return false
    }
  }
  return true
}

// console.log(validAnagram('', '')) // true
// console.log(validAnagram('aaz', 'zza')) // false
// console.log(validAnagram('anagram', 'nagaram')) // true
// console.log(validAnagram('rat', 'car')) // false)) // false
// console.log(validAnagram('awesome', 'awesom')) // false
// console.log(validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana')) // false
// console.log(validAnagram('qwerty', 'qeywrt')) // true
// console.log(validAnagram('texttwisttime', 'timetwisttext')) // true

function sameFrequency(int1, int2) {
  const tracker = {}
  const str1 = String(int1)
  const str2 = String(int2)
  for (let i = 0; i < str1.length; i++) {
    tracker[str1[i]] = tracker[str1[i]] || 0
    tracker[str1[i]]++
  }
  for (let i = 0; i < str2.length; i++) {
    if (!tracker[str2[i]]) {
      return false
    } else {
      tracker[str2[i]]--
    }
  }
  for (let [key, value] of Object.entries(tracker)) {
    if (value !== 0) {
      return false
    }
  }
  return true
}

// console.log(sameFrequency(123, 231))
// console.log(sameFrequency(123, 2314))

/**
 * Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n.This function should return true if the pair exists or false if it does not.
 *
 * Part 1 -
 * Time Complexity Requirement - O(n)
 * Space Complexity Requirement - O(n)
 *
 * Part 2 -
 * Time Complexity Requirement - O(n log n)
 * Space Complexity Requirement - O(1)
 */

function findPair(arr, diff) {
  let tracker = {}
  for (let num of arr) {
    let pair = num - diff
    tracker[pair] = true
  }
  for (let num of arr) {
    if (tracker[num]) return true
  }
  return false
}

// doesn't work with negative numbers
function findPairnlogn(arr, target) {
  let size = arr.length
  let p1 = 0
  let p2 = 1
  arr = arr.sort((a, b) => a - b)

  while (p1 < size && p2 < size) {
    let diff = arr[p2] - arr[p1]
    if (p1 === p2) {
      p1 = p1 + 1
      p2 = p2 + 2
    } else if (diff === target) {
      return true
    } else if (diff < target) {
      p2++
    } else if (diff > target) {
      p1++
    }
  }
  return false
}

console.log(findPair([6, 1, 4, 10, 2, 4], 2)) // true
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)) // true
console.log(findPair([4, -2, 3, 10], -6)) // true
console.log(findPair([6, 1, 4, 10, 2, 4], 22)) // false
console.log(findPair([1, 3, 5, -9, -8], 10)) // true
console.log(findPair([5, 5], 0)) // true
console.log(findPair([-4, 4], -8)) // true
console.log(findPair([-4, 4], 8)) // true
console.log(findPair([1, 3, 4, 6], -2)) // true
console.log(findPair([0, 1, 3, 4, 6], -2)) // true



let freq = {
  t: -1,
  e: 0,
  a: 0,
  m: 0
}

console.log(validAnagram('team', 'teamt')) // true
