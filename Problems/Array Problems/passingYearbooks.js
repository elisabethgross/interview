/**
 * There are n students, numbered from 1 to n, each with their own yearbook. They would like to pass their yearbooks around and get them signed by other students.
 * You're given a list of n integers arr[1..n], which is guaranteed to be a permutation of 1..n (in other words, it includes the integers from 1 to n exactly once each, in some order). The meaning of this list is described below.
 * Initially, each student is holding their own yearbook. The students will then repeat the following two steps each minute: Each student i will first sign the yearbook that they're currently holding (which may either belong to themselves or to another student), and then they'll pass it to student arr[i-1].
 * It's possible that arr[i-1] = i for any given i, in which case student i will pass their yearbook back to themselves. Once a student has received their own yearbook back, they will hold on to it and no longer participate in the passing process.
 * It's guaranteed that, for any possible valid input, each student will eventually receive their own yearbook back and will never end up holding more than one yearbook at a time.
 * You must compute a list of n integers output, whose element at i-1 is equal to the number of signatures that will be present in student i's yearbook once they receive it back.
 *
 * Example input: [2, 1]
 * Example output: [2, 2]
 *
 * 1)
 *  - student 2 signs the yearbook they are holding (theirs)
 *  - student 1 signs the yearbook they are holding (theirs)
 *  - student 2 passes the yearbook to student 1 (arr[0] === 2 - 1 = 1, passes it to student at arr[1] which is 1)
 *  - student 1 passes the yearbook to student 2 (arr[1] === 1 - 1 = 0, passes it to student at arr[0] which is 2)
 * ==> signatures = [1, 1]
 * 2)
 *  - student 2 signs the yearbook they are holding
 *  - student 1 signs the yearbook they are holding
 *  - student 2 passes the yearbook back student 1 (arr[0] === 2 - 1 = 1, passes it to student at arr[1] which is 1)
 *    - this stops the passing because student 1 now has his own yearbook again
 *  - student 1 passes the yearbook to student 2 (arr[1] === 1 - 1 = 0, passes it to student at arr[0] which is 2)
 *    - this stops the passing because student 2 now has his own yearbook again
 * ==> signatures = [2, 2]
 */

function findSignatureCounts(arr) {
  // initialize the signatures with each student having signed their own yearbook
  const signatures = Array(arr.length).fill(1)
  // loop through the array
  for (let i = 0; i < arr.length; i++) {
    let pass = i
    // while the student is not equal to itself, aka the yearbook
    // hasn't returned to the student, pass the yearbook
    while (arr[pass] !== i + 1) {
      // increment the signatures
      signatures[i]++
      // move k to the correct student to pass to
      pass = arr[pass] - 1
    }
  }
  return signatures
}

console.log(findSignatureCounts([1, 2])) // [1, 1]
console.log(findSignatureCounts([2, 1])) //  [2, 2]
console.log(findSignatureCounts([4, 3, 2, 5, 1])) // [3, 2, 2, 3, 3]
