// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

/**
 * 2 ^ 4
 * 2 * 2 * 2 * 2
 */
function power(num, pow) {
  if (pow === 0) {
    return 1
  }
  return num * power(num, pow - 1)
}

// console.log(power(3, 3)) // 27

// factorial(3) // 6
// factorial(4) // 24
function factorial(num) {
  if (num <= 1) {
    return 1
  }
  return num * factorial(num - 1)
}

// console.log(factorial(4)) // 24

// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60

function productOfArray(arr) {
  if (arr.length === 0) {
    return 1
  }
  return arr[0] * productOfArray(arr.slice(1))
}

// console.log(productOfArray([1, 2, 3, 10])) // 60

// recursiveRange(6) // 21
// recursiveRange(10) // 55

function recursiveRange(num) {
  if (num === 1) {
    return 1
  }
  return num + recursiveRange(num - 1)
}

// console.log(recursiveRange(10)) // 55

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465

function fib(num) {
  if (num === 1 || num === 2) {
    return 1
  }
  return fib(num - 1) + fib(num - 2)
}

// console.log(fib(10)) // 55

// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

function reverse(str) {
  if (str.length === 0) {
    return ''
  }
  return str[str.length - 1] + reverse(str.slice(0, str.length - 1))
}

// console.log(reverse('awesome')) //emosewa

// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(str) {
  if (str.length === 1 || str.length === 0) {
    return true
  }
  if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, str.length - 1))
  } else {
    return false
  }
}

// console.log(isPalindrome('awesome')) // false
// console.log(isPalindrome('tacocat')) // true

// Write a recursive function called someRecursive which accepts an array and a callback. The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.

// someRecursive([1,2,3,4], isOdd) // true
// someRecursive([4,6,8,9], isOdd) // true
// someRecursive([4,6,8], isOdd) // false
// someRecursive([4,6,8], val => val > 10); // false

const isOdd = (val) => val % 2 !== 0

function someRecursive(arr, cb) {
  if (arr.length === 0) {
    return false
  }
  if (cb(arr[0])) {
    return true
  } else {
    return someRecursive(arr.slice(1), cb)
  }
}

// console.log(someRecursive([1, 2, 3, 4], isOdd)) // true
// console.log(someRecursive([4, 6, 8], isOdd)) // false
// console.log(someRecursive([4, 6, 8], (val) => val > 10)) // false
// console.log(someRecursive([4, 6, 8, 11], (val) => val > 10)) // true

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3

function flatten(arr) {
  var ret = []
  for (var i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      ret.push(arr[i])
    } else {
      ret.push(...flatten(arr[i]))
    }
  }
  return ret
}

// console.log(flatten([1, 2, 3, [4, 5]])) // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]

// capitalizeFirst(['car', 'taco', 'banana']) // ['Car','Taco','Banana']

function capitalizeFirst(arr) {
  if (arr.length === 0) {
    return []
  }
  const ret = []
  const upperCasedFirst = arr[0][0].toUpperCase()
  const upperCased = `${upperCasedFirst}${arr[0].slice(1)}`
  ret.push(upperCased)
  return ret.concat(capitalizeFirst(arr.slice(1)))
}

// console.log(capitalizeFirst(['car', 'taco', 'banana'])) // ['Car','Taco','Banana']

// Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.

function nestedEvenSum(obj) {
  let sum = 0
  for (let [key, value] of Object.entries(obj)) {
    if (Number.isInteger(value)) {
      if (value % 2 === 0) {
        sum += value
      }
    } else if (typeof value === 'object') {
      sum += nestedEvenSum(value)
    }
  }
  return sum
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: 'yup',
    },
  },
}

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
}

// console.log(nestedEvenSum(obj1)) // 6
// console.log(nestedEvenSum(obj2)) // 10

function capitalizeWords(arr) {
  if (arr.length === 0) {
    return []
  }
  let capitalized = ''
  for (let i = 0; i < arr[0].length; i++) {
    capitalized = capitalized.concat(arr[0][i].toUpperCase())
  }
  return [capitalized].concat(capitalizeWords(arr.slice(1)))
}

function capitalizeWords2(array) {
  if (array.length === 1) {
    return [array[0].toUpperCase()]
  }
  let res = capitalizeWords(array.slice(0, -1))
  res.push(array.slice(array.length - 1)[0].toUpperCase())
  return res
}

let words = ['i', 'am', 'learning', 'recursion']
console.log(capitalizeWords2(words)) // ['I', 'AM', 'LEARNING', 'RECURSION']

// stringify all numbers in nested object
function stringifyNumbers(obj) {
  let ret
  if (Array.isArray(obj)) {
    ret = []
  } else if (typeof obj === 'object') {
    ret = Object.assign({}, obj)
  }

  for (let [key, value] of Object.entries(obj)) {
    if (Number.isInteger(value)) {
      ret[key] = `${value}`
    } else if (Array.isArray(value)) {
      ret[key] = stringifyNumbers(value)
    } else if (typeof value === 'object') {
      ret = Object.assign(ret, { [key]: stringifyNumbers(value) })
    } else {
      ret[key] = value
    }
  }
  return ret
}

let obj = {
  num: 1,
  test: [1, true],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
}

// console.log(stringifyNumbers(obj))

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

// Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string

function collectStrings(obj) {
  const ret = []

  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      ret.push(value)
    } else {
      ret.push(...collectStrings(value))
    }
  }
  return ret
}

const obj3 = {
  stuff: 'foo',
  data: {
    val: {
      thing: {
        info: 'bar',
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: 'baz',
          },
        },
      },
    },
  },
}

// console.log(collectStrings(obj3)) // ["foo", "bar", "baz"])
