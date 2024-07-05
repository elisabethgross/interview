/**
 * Given a list of people with their birth and death years, find the year with the highest population
 *
 * Questions for your interviewer / ambiguities:
 * - What if there is a tie between years? Return either year
 * - Is someone considered to be alive during the year they died? Example if someone is born in 2010 and dies in 2010 were they alive in 2010? The answer is yes
 *
 * Brute force:
 * Go through each year and see how many people are alive each year
 * Return the year with the highest number of people alive
 * What would that runtime be?
 * Get min birth year O(P)
 * Get max death year O(P)
 * Walk through each year, Y (where Y is the range between the min birth year and the max death year) and for each of those years, check how many people are alive, P -> O(Y*P)
 * ==> O(PY)
 *
 * Optimized approach:
 * Check each birth year and see how many people are alive in each year
 * No need to check duplicate years, if you put this in a hash table you can skip duplicates you already checked
 *
 * Walk through each person and for each unique year, check how many people are alive -> O(U*P) (Where U is unique years alive and P is people alive)
 *
 * We can do better
 *
 * The highest population will only be in birth years, the death years are actually irrelevant. This doesn't change the run time but might shave off a few seconds
 *
 * Draw a timeline between min birth year and max death year
 * Then add each persons time alive to the timeline
 * Look for the thing that intersects the most on the timeline
 *
 * Observation -> it doesn't matter who died when. Birth increments and death actually just decrement
 *
 * Draw a timeline and add births as plus 1 and death as minus 1 => This is linear time!! O(P)
 */
const testCase1 = [
  {
    birth: 2001,
    death: 2001,
  },
  {
    birth: 2001,
    death: 2002,
  },
]

const testCase2 = [
  {
    birth: 2000,
    death: 2010,
  },
  {
    birth: 1975,
    death: 2005,
  },
  {
    birth: 1975,
    death: 2003,
  },
  {
    birth: 1803,
    death: 1809,
  },
  {
    birth: 1750,
    death: 1869,
  },
  {
    birth: 1840,
    death: 1935,
  },
  {
    birth: 1803,
    death: 1921,
  },
  {
    birth: 1894,
    death: 1921,
  },
]

/**
 *
 * @param {obj} people the object with the people's birth and death years
 * @returns int highest population year
 */
function highestPopulation(people) {
  // get deltas
  const deltas = getDeltas(people)

  // compute and return year of peak
  return getYearOfPeak(deltas)
}

/**
 *
 * @param {obj} deltas
 * @param {int} year the year to add delta
 * @param {int} int what to add to the year
 */
function addDelta(deltas, year, int) {
  deltas[year] += int
}

/**
 *
 * @param {obj} people the object with the people's birth and death years
 * @returns obj of deltas
 */
function getDeltas(people) {
  const deltas = {}
  for (let person of people) {
    const deathYear = person.death + 1
    deltas[person.birth] = deltas[person.birth] || 0
    deltas[deathYear] = deltas[deathYear] || 0
    addDelta(deltas, person.birth, 1)
    // decrement the year AFTER the death year because someone is considered alive the year they died
    addDelta(deltas, deathYear, -1)
  }
  console.log('deltas', deltas)
  return deltas
}

/**
 *
 * @param {obj} deltas the deltas of the people alive per year
 * @returns int the running sum of people alive
 */
function getYearOfPeak(deltas) {
  let runningSum = 0
  let maxRunningSum = 0
  let yearOfPeak = 0
  Object.keys(deltas).forEach((year) => {
    runningSum += deltas[year]
    if (runningSum > maxRunningSum) {
      maxRunningSum = runningSum
      yearOfPeak = year
    }
  })
  return yearOfPeak
}

console.log('test case 1', highestPopulation(testCase1)) // 2001
console.log('test case 2', highestPopulation(testCase2)) // 1803
console.log('test case 3', highestPopulation(testCase3))
