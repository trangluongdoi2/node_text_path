import * as CryptoJS from 'crypto-js';
import * as pako from 'pako';
import { TextDecoder, TextEncoder } from 'util';

const enc = new TextEncoder();
const dec = new TextDecoder();

const bufferToBase64 = (buffer: ArrayBuffer): string => Buffer.from(buffer).toString('base64');

const base64ToBuffer = (b64: string): ArrayBuffer => Buffer.from(b64, 'base64');

const zipData = (data: string): string => {
  const compressed: ArrayBuffer = pako.deflate(enc.encode(data));
  const result: string = bufferToBase64(compressed);
  return result;
};

const unzipData = (data: string): string => {
  const encrypted: ArrayBuffer = base64ToBuffer(data);
  const unzipPayload = pako.inflate(<Uint8Array>encrypted);
  const result: string = dec.decode(unzipPayload);
  return result;
};

const getSecretKey = (codingKey: string): string => {
  const secretKey: string = codingKey.split('-')[3] + codingKey.split('-')[4];
  return secretKey;
};

export const encryptData = (data: string, codingKey: string): string => {
  try {
    const key: string = getSecretKey(codingKey);
    const iv = CryptoJS.enc.Utf8.parse(codingKey);
    const zip: string = zipData(data);
    const ciphertext: string = CryptoJS.AES.encrypt(zip, key, { iv }).toString();
    return ciphertext;
  } catch (error) {
    return data;
  }
};

export const decryptData = (data: string, codingKey: string): string => {
  try {
    const key: string = getSecretKey(codingKey);
    const iv = CryptoJS.enc.Utf8.parse(codingKey);
    const resultBytes = CryptoJS.AES.decrypt(data, key, { iv });
    const resultString: string = resultBytes.toString(CryptoJS.enc.Utf8);
    const unzip: string = unzipData(resultString);
    return unzip;
  } catch (error) {
    console.error('Crypto: error occurred during decryptData(): ', error);
    return data;
  }
};
