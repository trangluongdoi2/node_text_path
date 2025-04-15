// function pipe(...func) {
//   return function(x) {
//     return func.reduce((v, f) => {
//       return f(v)
//     }, x);
//   }
// }

// const test1 = s => s + '1';
// const test2 = s => s + '2';

// const result = pipe(test1, test2)('aaa');
// console.log(result, 'result...')


const str = 'aabbaa';
const a = str.replace('aa', 'cc');
console.log(a, 'a...')