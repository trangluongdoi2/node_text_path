import * as crypto from 'crypto';

export function randomString(prefixDir = false, charCount = 8): string { 
	const randomString = crypto.randomBytes(charCount).toString('hex');
	if (prefixDir === true) {
		return randomString.substring(0, 2) + '/' + randomString;
	}
	return randomString;
}