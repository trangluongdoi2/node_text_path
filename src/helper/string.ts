import * as crypto from 'crypto';

export function randomString(prefixDir = false, charCount = 8): string { 
	const randomString = crypto.randomBytes(charCount).toString('hex');
	if (prefixDir === true) {
		return randomString.substring(0, 2) + '/' + randomString;
	}
	return randomString;
}

export function splitStringToChunk(content: string, chunkSize = 10000): string[] {
	const result = [];
	for (let i = 0; i < content.length; i += chunkSize) {
		result.push(content.slice(i, i + chunkSize));
	}
	return result;
}