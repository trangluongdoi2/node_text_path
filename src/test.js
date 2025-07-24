// function pipe(...func) {
//   return function(initValue) {
//     return func.reduce((v, f) => f(v), initValue)
//   }
// }

// function curry(func) {
//   return curried = function(...args) {
//     if (args.length >= func.length) {
//       return func(...args)
//     } else {
//       return function(...nextArgs) {
//         console.log(args, nextArgs, 'args, nextArgs...')
//         return curried(...nextArgs, ...args)
//       } 
//     }
//   }
// }

// function sum(a, b, c) {
//   return a + b + c;
// }

// const currySum = curry(sum);
// const a = currySum(1)(2)(3)

// console.log(a, 'a currying...')

(async () => {
  const ps1 = new Promise(resolve => {
    // console.log('hehe 1');
    resolve(2)
    return;
  });
  
  const ps2 = new Promise(resolve => {
    // console.log('hehe 2');
    resolve(1);
  });
  
  console.log('before');
  const [a, b] = await Promise.all([ps1, ps2]);
  console.log('Pas..');
  console.log(a, b, 'a, b..');
})()

