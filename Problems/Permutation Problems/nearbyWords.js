/**
 * When typing on a touch screen occasionally the wrong key is registered
 *
 * Write a function that given a string, returns all nearby words
 * For a given word, get all possible nearby words
 *
 * You are given some helper methods:
 *  - get_nearby_characters(string $character): Set<string>  // for a given character, return all nearby characters
 *  - is_word(string $word): Bool  // for a given string, return true if it is a word
 *
 * Good questions to ask your interviewer:
 *  - What format is the word given to us?
 *    - assume it is given as a string
 *  - How do we define a nearby word?
 *    - if you replace one letter with a nearby character (from the get_nearby_character function) and you get a different word -> that is a nearby word
 *    - example) hello and jello because h & j are close to each other on the keyboard
 *  - Do we need to remove duplicate words in the output?
 *  - Does the output need to be sorted?
 *
 * Algorithm plan:
 *  - Get all nearby chars for each letter typed
 *  - Find all permutations of the chars returned (permutations = P(n, r) = n! / (n-r)!)
 *  - Filter out the non-words returned from the permutations
 *
 * Pseudo code:
 * function nearbyWords(string) {
 *  const letters = string.split()
 *  const possibleWords = nearbyPermutations(letters, idx)
 *  return possibleWords.filter(word => isWord(word))
 * }
 *
 * function nearbyPermutations(letters, idx) {
 *  if (idx > letters.length) {
 *    return new Set()
 * }
 *  const subWords = nearbyPermutations(letters, idx + 1)
 *  const permutations = new Set()
 *
 *  Object.keys(subWords).forEach(subWord => {
 *    subWord.split().forEach(letter => {
 *      permutations.add(`${letter}{subWord}`)
 *    })
 *  })
 *  return permutations
 * }
 *
 * Time and Space Complexity Analysis:
 * Time Big O -
 *  These functions are bound by the length of the typed string passed in (n) and the number of possible nearby characters for each letter in the typed in string (m)
 *  In this example, our str is 'gi' and each letter has 3 possible nearby chars
 *  We multiple because we have a nested loop and the big O is O(m^n) or exponential
 * Space Big O -
 *   Since we store our subwords in an intermediate data structure, our space complexity is also O(m^n) (which is also the number of permutations for the passed in str and its nearby chars)
 *
 * Possible optimizations:
 * Instead of storing our subWords in an intermediate data structure, we can store them in an iterator and get them as each one is relevant
 */

/**
 * A function to find nearby letters on the keyboard
 * @param {str} char the letter to find nearbyLetters
 * @returns arr the nearby letters
 */
function getNearbyChars(char) {
  if (char === 'g') {
    return ['g', 'h', 'f']
  } else if (char === 'i') {
    return ['i', 'o', 'k']
  }
  return []
}

/**
 * A function to check whether or not a passed in string is a word
 * @param {str} word the word to check if it is a word
 * @returns bool whether or not the word passed in is a word
 */
function isWord(word) {
  const words = ['hi', 'go']
  if (words.indexOf(word) > -1) {
    return true
  }
  return false
}

/**
 * A function to find the permutations of the nearby letters of a string
 * @param {str} letters the string of letters we are finding permutations for
 * @param {int} idx the index we are up to in the iteration
 * @returns set of permutations of letters
 */
function nearbyPermutations(letters, idx) {
  if (idx >= letters.length) {
    console.log('base case returning new set')
    return new Set([''])
  }
  const subWords = nearbyPermutations(letters, idx + 1)
  console.log('subWords', subWords)
  const nearbyLetters = getNearbyChars(letters[idx])
  console.log('nearbyLetters', nearbyLetters)
  const permutations = new Set()
  console.log('permutations', permutations)
  for (const subWord of subWords) {
    console.log('subWord', subWord)
    nearbyLetters.forEach((letter) => {
      console.log('letter', letter)
      permutations.add(`${letter}${subWord}`)
      console.log('permutations', permutations)
    })
  }
  console.log('returning permutations', permutations)
  return permutations
}

/**
 * A function to find the list of possible words from a typed str
 * @param {str} str the typed in str
 * @returns arr list of possible words that could have been meant by the user
 */
function nearbyWords(str) {
  const permutations = nearbyPermutations(str, 0)
  console.log('permutations', permutations)
  return [...permutations].reduce((acc, permutation) => {
    if (isWord(permutation)) {
      acc.push(permutation)
    }
    return acc
  }, [])
}

// console.log('nearbyWords', nearbyWords('gi'))

console.log(nearbyPermutations('gi', 0))
