// const mat1 = calcRotateMatrix({ angle: 13 });
// const mat2 = calcTranslateMatrix({ x: -674.9304336458374, y: -431.9554775333359 });
// const center = { x: 1200, y: 1200 };
// // console.log(mat1, mat2, '==> mat1, mat2...');
// const newMat1 = math.matrix([[mat1[0], mat1[2]], [mat1[1], mat1[3]]]);
// const newMat2 = math.matrix([[-674.9304336458374], [-431.9554775333359]]);
// // const matCenter = math.matrix([[center.x], [center.y]]);
// // const newMat = math.multiply(newMat1, newMat2);
// // const resultMath = math.add(newMat, matCenter);
// // console.log(newMat, '==> newMat...');
// // console.log(resultMath, '==> resultMath...');

// const positionMatrix = math.matrix([[332.5307041694384], [66.33973670186208]]);
// const result2 = math.subtract(positionMatrix, math.multiply(newMat1, newMat2));

// console.log(result2, '==> result2...');

// const w = 1085.146691010979
// const h = 316.5347900390625
// const top = 536.9351612255139
// const left = 528.2675360752617 

// const mat1 = calcRotateMatrix({ angle: 52 });
// console.log(mat1, '==> mat1...');
// const mat2 = calcTranslateMatrix({ x: -w / 2, y: -h / 2 });
// const newMat1 = math.matrix([[mat1[0], mat1[2]], [mat1[1], mat1[3]]]);
// const newMat2 = math.matrix([[-w / 2], [-h / 2]]);
// const positionMatrix = math.matrix([[left], [top]]);
// const result2 = math.subtract(positionMatrix, math.multiply(newMat1, newMat2));

// console.log(result2, '==> result2...');


// while (i  1e9) {
//   i++;
//   if (i % 1e6 === 0) {
//     console.log(i, '==> i...');
//   }
// }


// while (i)

// let i = 0;
// console.time('count');
// function count1() {
//   do {
//     i++;
//   } while (i % 1e6 !== 0);
//   if (i === 2e9) {
//     console.log(i, 'end..');
//     console.timeEnd('count');
//     return;
//   } else {
//     setTimeout(count1);
//   }
// }

// function count2() {
//   console.time('count2');
//   for (let i = 0; i < 2e9; i++) {
//     i++;
//   }
//   console.timeEnd('count2');
// }

// // count1();
// count2();


const count1 = async () => {
  // return new Promise((resolve, reject) => {
  //   for (let i = 0; i < 1e5; i++) {
  //     console.log(i, '==> i...');
  //   }
  // }).then(() => {
  //   console.log('==> count1...');
  // });
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 1e10; i++) {
      console.log(i, '==> i...');
    }
    resolve(1);
  });
}

// async function executeWithTimeout(fn, timeout = 5000) {
//   const timeOutPromise = new Promise((_, reject) => setTimeout(() => {
//     console.log('======> timeout...');
//     reject(new Error('Timeout'));
//   }, timeout)); 
//   return Promise.race([fn, timeOutPromise]).then((result) => {
//     console.log(result, 'then ==> Promise.race...');
//     clearTimeout(timeOutPromise);
//   });
// }

// try {
//   const result = await executeWithTimeout(count1, 100);
//   console.log(result, '==> result...');
// } catch (error) {
//   console.log(error, '==> error...');
// }

// const res1 = await executeWithTimeout(count1(), 100);
// console.log(res1, '==> res1...');
const psLoop = new Promise((resolve, reject) => {
   for (let i = 0; i < 1e10; i++) {
    // console.log(i, '==> i 99...');
    }
    resolve(true)
})

const ps1 = new Promise(async (resolve, reject) => {
  let test1 = false;
  // const t = setTimeout(() => {
  //   console.log('Log timeout...');
  //   test1 = true;
  //   resolve(1);
  // }, 1000)
  setTimeout(() => {
    console.log('Log timeout...');
    test1 = true;
    // resolve(1);
    throw new Error('error')
  }, 1000)
  await psLoop
  // clearTimeout(t);
  resolve(1);
});

// await ps1;

async function excute() {
  await ps1;
}

excute()
