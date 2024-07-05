/**
 * Given two strings s and t of length N, find the maximum number of possible matching pairs in strings s and t after swapping exactly two characters within s.
 * A swap is switching s[i] and s[j], where s[i] and s[j] denotes the character that is present at the ith and jth index of s, respectively.
 * The matching pairs of the two strings are defined as the number of indices for which s[i] and t[i] are equal.
 * Note: This means you must swap two characters at different indices.
 *
 * Logic:
 * - if we find a pair like s-{a,b} t-{b,a} swapping will increase match by 2.
 * - if we find a pair like s-{a,t} t-{t,b} swapping will increase match by 1.
 * - if there is any repeated character in s like s-{a,a} or pair like s-{a,b} t-{c,d} then swapping will not change matching count.
 * - at this point, all you can do is swap already matched pair so swapping will decrease matching by 2 but cant be negative.
 */

const testCase1 = ['abcd', 'adcb']
const testCase2 = ['mno', 'mno']
const testCase3 = ['aabc', 'baca']
const testCase4 = ['aabc', 'defg']

function matchingPairs(s, t) {
  console.log('s', s)
  console.log('t', t)
  // set containing unique letters in s where swapping has no effect
  const countSet = new Set()
  // set containing chars in s that don't match chars in t
  const misMatchSetS = new Set()
  // set containing chars in t that don't match chars in s
  const misMatchSetT = new Set()
  // whether or not a char is repeated in s
  let isRepeated = false
  // count of matching letters in s & t
  let matching = 0
  // keep track of letters that can be swapped
  const set = new Set()
  for (let i = 0; i < s.length; i++) {
    const ch1 = s[i]
    const ch2 = t[i]
    if (ch1 !== ch2) {
      set.add(`${ch1}${ch2}`)
      misMatchSetS.add(ch1)
      misMatchSetT.add(ch2)
    } else {
      // ex 'abcd' & 'adcb', a in s and a in t are one match
      // add all matching characters without swaps to match count
      matching++
    }

    if (!isRepeated) {
      if (countSet.has(ch1)) {
        isRepeated = true
      } else {
        countSet.add(ch1)
      }
    }
  }

  console.log('countSet', countSet)
  console.log('misMatchSetS', misMatchSetS)
  console.log('misMatchSetT', misMatchSetT)
  console.log('set', set)
  console.log('isRepeated', isRepeated)
  console.log('matching', matching)

  for (let pair of set) {
    const reverse = `${pair[1]}${pair[0]}`

    // signifies a pair like s-{a,b} t-{b,a} swapping will increase match by 2.
    if (set.has(reverse)) {
      return matching + 2
    }
  }
  for (let ch of misMatchSetS) {
    // signifies a pair like s-{a,t} t-{t,b} swapping will increase match by 1.
    if (misMatchSetT.has(ch)) {
      return matching + 1
    }
  }
  // signifies any repeated character in s like s-{a,a} or pair like s-{a,b} t-{c,d} so swapping will not change matching count.
  if (isRepeated || set.size >= 2) {
    console.log('in here')
    return matching
  }

  // at this point, all you can do is swap already matched pair so swapping will decrease matching by 2 but cant be negative.
  return matching <= 2 ? 0 : matching - 2
}

// console.log('matchingPairs(...testCase1)', matchingPairs(...testCase1)) // 4
// console.log('matchingPairs(...testCase2)', matchingPairs(...testCase2)) // 1
// console.log('matchingPairs(...testCase3)', matchingPairs(...testCase3)) // 2
console.log('matchingPairs(...testCase4)', matchingPairs(...testCase4)) // 2
