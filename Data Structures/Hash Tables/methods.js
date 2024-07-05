// simple hash function that works for strings
/**
 * Simple hash function
 * @param {str} key string to hash
 * @param {int} arrLength length of the array we are storing hash of string in
 * @return int the hash of the string
 */
// not good because, O(n), not very random and only works for strings
function hash(key, arrLength) {
  let total = 0
  let char = str[i]
  for (let i = 0; i < str.length; i++) {
    let value = char.charCodeAt(0) - 96
    total = (total + value) % arrLength
  }
  return total
}

// using a prime number length array, makes a HUGE difference in reducing the number of collisions

// better version of a hash function
function betterHash(key, arrLength) {
  let total = 0
  let WERID_PRIME = 31
  // Improvement 1
  // Only loop over and hash first 100 chars in key if its larger than 100 chars (good enough for hashing)
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i]
    let value = char.charCodeAt(0) - 96
    // add in the WEIRD_PRIME to the equation to get a further random total
    let total = (total * WERID_PRIME + value) % arrLength
  }
  return total
}

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size)
  }
  _hash(key) {
    let total = 0
    let WERID_PRIME = 31
    // Improvement 1
    // Only loop over and hash first 100 chars in key if its larger than 100 chars (good enough for hashing)
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i]
      let value = char.charCodeAt(0) - 96
      // add in the WEIRD_PRIME to the equation to get a further random total
      total = (total * WERID_PRIME + value) % this.keyMap.length
    }
    return total
  }
  // O(1)
  set(key, value) {
    let hashedKey = this._hash(key)
    if (!this.keyMap[hashedKey]) {
      this.keyMap[hashedKey] = []
    }
    // uses separate chaining
    this.keyMap[hashedKey].push([key, value])
  }
  // O(1)
  get(key) {
    let hashedKey = this._hash(key)
    let values = this.keyMap[hashedKey]
    if (values) {
      for (let i = 0; i < values.length; i++) {
        let [valKey, value] = values[i]
        if (valKey === key) return value
      }
    }
    return undefined
  }
  keys() {
    let ret = []
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!ret.includes(this.keyMap[i][j][0])) {
            ret.push(this.keyMap[i][j][0])
          }
        }
      }
    }
    return ret
  }
  values() {
    let ret = []
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!ret.includes(this.keyMap[i][j][1])) {
            ret.push(this.keyMap[i][j][1])
          }
        }
      }
    }
    return ret
  }
}

let hashTable = new HashTable(4)
hashTable.set('hello', 'goodbye')
hashTable.set('shalom', 'yo')
hashTable.set('olah', 'yo')
console.log(hashTable.keyMap)

console.log(hashTable.values())
