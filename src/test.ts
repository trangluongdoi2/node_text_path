import * as math from 'mathjs';
import { getRotationMatrixRatios } from './utils-svg';

// function caculateCenterOfElementText3(angle: number) {
// 	const width = 1084.4971815111887;
// 	const height = 444.04428154658814;
// 	const left = 171.2963104248047;
// 	const top = 691.8342884205006;
// 	const transformMatrix = [
//     0.9323238012155122,
//     0.36162457008209214,
//     -0.36162457008209214,
//     0.9323238012155122,
//     374.3620410225211,
//     -479.7126612315676
// 	];

// 	const halfW = width / 2;
// 	const halfH = height / 2;

// 	// We have the virtual center of the element from SVG Editor
// 	// const virtualCenter = {
// 	//   x: left + halfW,
// 	//   y: top + halfH,ß
// 	// }

// 	const virtualCenter = {
// 		x: 713.5449066162109,
// 		y: 800.877685546875,
// 	};

// 	// const virtualCenter = {
// 	// 	x: left + halfW,
// 	// 	y: top + halfH,
// 	// }

// 	const a = transformMatrix[0]; 
// 	const b = transformMatrix[1];
// 	const c = transformMatrix[2];
// 	const d = transformMatrix[3];
// 	const tx = transformMatrix[4];
// 	const ty = transformMatrix[5];

// 	const { a: a1, b: b1, c: c1, d: d1 } = getRotationMatrixRatios(angle);

// 	const m1 = math.matrix([[a, c], [b, d]]);
// 	const m2 = math.matrix([[virtualCenter.x], [virtualCenter.y]]);
// 	const m3 = math.multiply(m1, m2);
// 	const m4 = math.matrix([[tx], [ty]]);
// 	const m5 = math.add(m4, m3);

// 	return {
// 		// @ts-ignore
// 		x: m5._data[0][0],
// 		// @ts-ignore
// 		y: m5._data[1][0],
// 	}
// }

// const angle = 21.200000000000003;
// const center = caculateCenterOfElementText3(angle);
// console.log(center, '==> center...');

// const m1 = math.matrix([[0.9323, 0.3616, 374.3620410225211], [0.3616, 0.9323, -479.7126612315676], [0, 0, 1]]);
// const m2 = math.matrix([[2.7713, 0, -1263.9021], [0, 0.5758, 245.0187], [0, 0, 1]]);
// const m3 = math.matrix([[713.5449], [691.8343], [1]]);
// const m4 = math.multiply(m1, m2);
// const m5 = math.multiply(m4, m3);
// console.log(m5, '==> m5...');
// const m3 = math.multiply(m1, m2);
// console.log(m3, '==> m3...');

// const m1 = math.matrix([[1, 0, 533.3518811902636], [0, 1, -568.5237704071827], [0, 0, 1]]);
// const m2 = math.matrix([[171.2963104248047], [573.97998046875], [1]]);

// const m3 = math.multiply(m1, m2);
// console.log(m3, '==> m3...');


const x1 = 171.2963104248047;
const y1 = 573.97998046875;
const h = 1035.768594765001;
const w = 90.70368957519531;

const a = 0.9396926207859084;
const b = 0.34202014332566855;
const c = -0.34202014332566855;
const d = 0.9396926207859084;
const tx = 920.0526808382333;
const ty = -576.7398161370307;

const m1 = math.matrix([[a, c], [b, d]]);
const m2 = math.matrix([[x1 + w / 2], [y1 + h / 2]]);
const m3 = math.matrix([[tx], [ty]]);
// console.log(m3, '==> m3...');
const m4 = math.multiply(m1, m2);
const m5 = math.add(m4, m3);
console.log(m5, '==> m5...');

// const x2 = a * x1 + c * y1;
// const x3 = b * x1 + d * y1;

// console.log(x2, x3, '==> x2, x3...');
// const finalResult = {
//     x: x2 + tx,
//     y: x3 + ty,
// }

// console.log(finalResult, '==> finalResult...');


