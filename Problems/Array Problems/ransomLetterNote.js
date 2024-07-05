/**
 * Given a note, n, and a magazine, m, determine if you can build n from the letters in m.
 *
 * Solution -> build a hash table of all the letters that appear in the magazine and frequencies of them. Do the same for the letters in the note.
 * If there are enough letters from the magazine for the note, return true.
 *
 * Make sure you modularize!
 *
 * function getHashTable(str) {}
 *
 * function compareFrequencies(hashtableA, hashtableB) {}
 *
 * function ransomNote(n, m) {
 *  hashtableN = getHashTable(n)
 *  hashtableM = getHashTable(m)
 *
 *  return compareFrequencies(hashtableN, hashtableM)
 * }
 */
