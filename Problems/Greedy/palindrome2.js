/**
 * Given a string s, return true if the s can be palindrome after deleting at most one character from it.
 */

/*
Solution:

1. Use two pointers, one initialised to 0 and the other initialised to end of string. Check if characters at each index
are the same. If they are the same, shrink both pointers. Else, we have two possibilities: one that neglects character
at left pointer and the other that neglects character at right pointer. Hence, we check if s[low+1...right] is a palindrome
or s[low...right-1] is a palindrome. If one of them is a palindrome, we know that we can form a palindrome with one deletion and return true. Else, we require more than one deletion, and hence we return false.
*/

var isPalindrome = function (s, low, high) {
  while (low < high) {
    if (s[low] !== s[high]) return false
    low++
    high--
  }
  return true
}
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let left = 0
  let right = s.length - 1
  let removed = 0
  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      )
    } else {
      left++
      right--
    }
  }
  return true
}

console.log(validPalindrome('abca')) // true
console.log(validPalindrome('abc')) // false
console.log(validPalindrome('bddb')) // true
console.log(validPalindrome('ebcbbececabbacecbbcbe')) // true
