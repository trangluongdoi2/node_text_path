const testCases = [
  "0 4 0 4 0 4",
  "0,9.99, 0, 9.99, 0, 9.99",
  "1 3 1 3",
  "5 0 4 0 4 0 4",
  "2 2 2 2",
  "1 2 3 1 2 3",
];

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && 
		arr1.join(' ') === arr2.join(' ');
}

function findRepeatingPattern(str) {
	// Clean and convert string to array of numbers
	const values = str
		.replace(/;$/, '')
		.trim()
		.split(/[\s,]+/)
		.map(Number);

	// Find potential pattern lengths (try from 2 values up to half the array)
	const maxPatternLength = Math.floor(values.length / 2);
	
	for (let patternLength = 2; patternLength <= maxPatternLength; patternLength++) {
		// Skip if the array length isn't divisible by pattern length
		if (values.length % patternLength !== 0) {
			continue;
		};

		// Get the first pattern
		const pattern = values.slice(0, patternLength);
		console.log(pattern, '==> pattern...');
		let isRepeating = true;
		
		// Check if this pattern repeats throughout the array
		for (let i = patternLength; i < values.length; i += patternLength) {
			const chunk = values.slice(i, i + patternLength);
			if (!arraysEqual(pattern, chunk)) {
				isRepeating = false;
				break;
			}
		}

		if (isRepeating) {
			return {
				pattern,
				repetitions: values.length / patternLength
			};
		}
	}

	return null;
}

function getStrokeDasharrayValues(dasharray) {
  return dasharray.replace(/;$/, '').trim().split(/[\s,]+/).map(Number);
}

// testCases.forEach(test => {
//   const result = getStrokeDasharrayValues(test);
//   console.log(result, '==> result...');
// });


function getRowColumnIndex(columns, rows, index) {
	if (index === columns * rows) {
	  return { row: rows, col: columns };
	}
	const col = index % columns === 0 ? columns : index % columns;
	let row = 1;
	for (let i = 1; i < index; i++) {
	  if (i % columns === 0) {
		row += 1;
	  }
	}
	return { row, col };
};

const { row, col } = getRowColumnIndex(2, 2, 3);
console.log(row, col, '==> row, col...');


const fontPath = 'https://dev.korjl.com/assets/org/GD01HHDZSQWX9002TXZ25HFC8MM1/font/optimized/hk/hko14aqrnq2hdelg.woff';

const test = fontPath.split('/').pop();
console.log(test, '==> test...');