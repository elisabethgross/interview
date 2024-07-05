class Trie {
  constructor() {
    this.characters = {}
    this.isWord = false
  }
  addWord(word, index = 0) {
    if (index === word.length) {
      this.isWord = true
    } else if (index < word.length) {
      var char = word[index]
      var subTrie = this.characters[char] || new Trie()
      subTrie.addWord(word, index + 1)
      this.characters[char] = subTrie
    }
    return this
  }

  findWord(word, index = 0) {
    // This function will return the node in the trie
    // which corresponds to the end of the passed in word.

    // Be sure to consider what happens if the word is not in this Trie.

    var char = word[index]
    if (index < word.length - 1 && this.characters[char]) {
      index += 1
      return this.characters[char].findWord(word, index)
    } else {
      return this.characters[char]
    }
  }
  getWords(words = [], currentWord = '') {
    // This function will return all the words which are
    // contained in this Trie.
    // it will use currentWord as a prefix,
    // since a Trie doesn't know about its parents.

    if (this.isWord) {
      words.push(currentWord)
    }
    for (let char in this.characters) {
      let nextWord = currentWord + char
      this.characters[char].getWords(words, nextWord)
    }
    return words
  }
  autoComplete(prefix) {
    let curr = this
    for (let i = 0; i < prefix.length; i++) {
      if (!curr.characters[prefix[i]]) return []
      curr = curr.characters[prefix[i]]
    }
    let words = []
    curr.getWords().forEach((subWord) => {
      let word = prefix.concat(subWord)
      words.push(word)
    })
    return words
  }
  removeWord(word) {
    let curr = this
    let prev = null
    let prevLetter = null
    for (let letter of word) {
      let chars = Object.keys(curr.characters)
      if (letter === word[word.length - 1]) {
        curr.characters[letter].isWord = false
      }
      if (chars.length > 1) {
        prevLetter = letter
        prev = curr
        curr = curr.characters[letter]
      } else {
        delete prev.characters[prevLetter]
        break
      }
    }
    return this
  }
}

// var t = new Trie()
// t.addWord('fun')
// t.addWord('fast')
// t.addWord('fat')
// t.addWord('fate')
// t.addWord('father')
// t.addWord('forget')
// t.addWord('awesome')
// t.addWord('argue')

// t.removeWord('fat')
// console.log(t.characters.f.characters.a.characters.t.isWord) // false
// console.log(t.characters.f.characters.a.characters.t.characters.e.isWord) // true

// t.removeWord('argue')

// console.log(t.characters.a.characters.r) // undefined
