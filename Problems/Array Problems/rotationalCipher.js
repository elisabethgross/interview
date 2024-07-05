/**
 * One simple way to encrypt a string is to "rotate" every alphanumeric character by a certain amount.
 * Rotating a character means replacing it with another character that is a certain number of steps away in normal alphabetic or numerical order.
 * For example, if the string "Zebra-493?" is rotated 3 places, the resulting string is "Cheud-726?".
 * Every alphabetic character is replaced with the character 3 letters higher (wrapping around from Z to A), and every numeric character replaced with the character 3 digits higher (wrapping around from 9 to 0). Note that the non-alphanumeric characters remain unchanged.
 * Given a string and a rotation factor, return an encrypted string.
 *
 * Example 1
 * input = Zebra-493?
 * rotationFactor = 3
 * output = Cheud-726?
 *
 * Example 2
 * input = abcdefghijklmNOPQRSTUVWXYZ0123456789
 * rotationFactor = 39
 * output = nopqrstuvwxyzABCDEFGHIJKLM9012345678
 */

const testCase1 = ['Zebra-493?', 3]
const testCase2 = ['abcdefghijklmNOPQRSTUVWXYZ0123456789', 39]

function createAlphaHashMap() {
  const idxToAlphaMap = {}
  const alphaToIdxMap = {}
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  alphabet.forEach((letter, i) => {
    idxToAlphaMap[i] = letter
    alphaToIdxMap[letter] = i
  })
  return [idxToAlphaMap, alphaToIdxMap]
}

function createNumsMap() {
  const idxToNumMap = {}
  const numToIdxMap = {}
  const nums = '0123456789'.split('')
  nums.forEach((num, i) => {
    idxToNumMap[i] = num
    numToIdxMap[num] = i
  })
  return [idxToNumMap, numToIdxMap]
}

function isUpperCase(char) {
  if (char == char.toUpperCase()) {
    return true
  }
}

function isInt(char) {
  return /\d/.test(char)
}

function isAlphaNumeric(char) {
  return /[a-zA-Z0-9]/.test(char)
}

function findModRotation(idx, rotationFactor, totalLength) {
  return (idx + rotationFactor) % totalLength
}

function rotationalCipher(input, rotationFactor) {
  const [idxToAlphaMap, alphaToIdxMap] = createAlphaHashMap()
  const [idxToNumMap, numToIdxMap] = createNumsMap()
  let output = ''
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    const charInt = isInt(char)
    if (charInt) {
      const modRotation = findModRotation(numToIdxMap[char], rotationFactor, 10)
      output += idxToNumMap[modRotation]
    } else if (isAlphaNumeric(char)) {
      if (isUpperCase(char)) {
        const modRotation = findModRotation(
          alphaToIdxMap[char.toLowerCase()],
          rotationFactor,
          26
        )
        output += idxToAlphaMap[modRotation].toUpperCase()
      } else {
        const modRotation = findModRotation(
          alphaToIdxMap[char],
          rotationFactor,
          26
        )
        output += idxToAlphaMap[modRotation]
      }
    } else {
      output += char
    }
  }
  return output
}

console.log('rotationalCipher(...testCase1)', rotationalCipher(...testCase1)) // "Cheud-726?"
console.log('rotationalCipher(...testCase2)', rotationalCipher(...testCase2)) // "nopqrstuvwxyzABCDEFGHIJKLM9012345678"
