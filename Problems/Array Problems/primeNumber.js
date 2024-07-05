/**
 * How to check if an integer is a prime number aka only divisible by 1 and itself?
 * If the number is less than 1, toss it out (prime numbers are positive)
 * Numbers greater than 1, use a for loop to iterate through the positive numbers to check if the number
 * entered by the user is divisible by positive numbers
 * number % i == 0 checks if the number is divisible by numbers other than 1 and itself
 * https://www.programiz.com/javascript/examples/prime-number
 */

// program to check if a number is prime or not

function isPrime(num) {
  let isPrime = true

  // check if numb is equal to 1
  if (num === 1) {
    console.log('1 is neither prime nor composite number.')
  }

  // check if num is greater than 1
  else if (num > 1) {
    // looping through 2 to num - 1
    for (let i = 2; i < num; i++) {
      if (num % i == 0) {
        isPrime = false
        break
      }
    }

    if (isPrime) {
      console.log(`${num} is a prime number`)
    } else {
      console.log(`${num} is a not prime number`)
    }
  }
  // check if number is less than 1
  else {
    console.log('The number is not a prime number.')
  }
}

isPrime(29)
