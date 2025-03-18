import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { Canvas, registerFont } from 'canvas';

let measuringContext: CanvasRenderingContext2D | null;

export function extractFilename(key: string): string {
  const lastSlash = key.lastIndexOf('/') + 1;
  return key.substring(lastSlash);
}

export function deleteFolderContents(path: string, recursive = false) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      if (fs.statSync(path + "/" + file).isDirectory()) {
        // recurse
        if (recursive) {
          deleteFolderContents(path + "/" + file, recursive);
        }
      } else {
        // delete file
        fs.unlinkSync(path + "/" + file);
      }
    });
  }
}

export function prepareWorkingDir(workingDir: string, clear = false) {
  if (clear && fs.existsSync(workingDir)) {
    deleteFolderContents(workingDir);
  } else if (!fs.existsSync(workingDir)) {
    fs.mkdirSync(workingDir);
  }
}

// export const getMeasuringContext = async (data: any) => {
//   if (!measuringContext) {
//     const widow = new JSDOM().window;
//     const { document } = widow;
//     const font = new FontFace(data.fontFamily, `url(${data.fontPath})`);
//     await font.load();
//     document.fonts.add(font);
//     const canvas = document.createElement('canvas');
//     measuringContext = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
//   }
//   return measuringContext;
// };

export async function fetchAndSaveFont(url: string, fileName: string) {
}

// export function randomString(prefixDir = false, charCount = 8): string { 
//   const randomString = crypto.randomBytes(charCount).toString('hex');
//   if (prefixDir === true) {
//     return randomString.substring(0, 2) + '/' + randomString;
//   }
//   return randomString;
// }

export function getFontPathInFolder(fontPath: string, fontFamily: string) {
  const fontPathInFolder = path.join(__dirname, '../fonts/ir8dpooohek1j28h.woff');
  return fontPathInFolder;
}

export const getMeasuringCanvasForLoadFont = (data: any) => {
  const { fontStyleDecalaration, fontFamily } = data;
  const fontPath = path.join(__dirname, '../fonts/ir8dpooohek1j28h.woff');

  registerFont(fontPath, { family: fontFamily });
  const canvas = new Canvas(0, 0);
  const ctx = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
  ctx.font = fontStyleDecalaration;
  ctx.textBaseline = 'alphabetic';
  return { canvas, ctx };
};
