function pipe(...func) {
  return function(initValue) {
    return func.reduce((v, f) => f(v), initValue)
  }
}

function curry(func) {
  return curried = function(...args) {
    if (args.length >= func.length) {
      return func(...args)
    } else {
      return function(...nextArgs) {
        console.log(args, nextArgs, 'args, nextArgs...')
        return curried(...nextArgs, ...args)
      } 
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

const currySum = curry(sum);
const a = currySum(1)(2)(3)

console.log(a, 'a currying...')