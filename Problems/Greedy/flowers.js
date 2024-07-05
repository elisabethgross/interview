/**
 * You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.
 * Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.
 */

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (n === 0) return true
  let p = 0
  while (p < flowerbed.length) {
    let flowerBedLeft = flowerbed[p - 1]
    let flowerBedRight = flowerbed[p + 1]
    let currFlowerbed = flowerbed[p]
    if (
      currFlowerbed === 0 &&
      (p === 0 || flowerBedLeft === 0) &&
      (p === flowerbed.length - 1 || flowerBedRight === 0)
    ) {
      flowerbed[p] = 1
      n--
      if (n === 0) return true
    }
    p++
  }
  return false
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)) // true
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)) // False
console.log(canPlaceFlowers([0, 0, 1, 0, 1], 1)) // true
console.log(canPlaceFlowers([0, 1, 0, 1, 0, 1, 0, 0], 1)) // true
console.log(canPlaceFlowers([1, 0, 1, 0, 1, 0, 1], 0)) // true
console.log(canPlaceFlowers([0, 0, 0, 0, 0, 1, 0, 0], 0)) // true
