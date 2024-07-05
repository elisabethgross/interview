/**
 * create a function that runs on a server that returns all the anagrams of a word
 * input: rates
 * output: aster, stare, taser, tears
 */

/**
 * Keys points:
 * Because it runs on a server, we can have access to things like databases and caching
 * A server also allows us to pre-compute
 * All the anagrams sort to aerst
 * So before we run our algorithm, we can pre-sort all the dictionary words with a mapping to what words they
 * actually map to
 */
