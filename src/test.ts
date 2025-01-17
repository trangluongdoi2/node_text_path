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


const a = -100 / 2 || 0;
console.log(a, '== a');