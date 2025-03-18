import { Font, load, parse } from 'opentype.js';
import fs from 'fs';
import { toArrayBuffer } from '@/common/file';

let fontsTracks: { [key: string]: Font | undefined } = {};

const DEBUG_FONTS = [
  'https://dev.korjl.com/assets/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/font/optimized/oq/oqz3kd855h5eakhs.woff',
];

export const useFont = () => {
  // const loadFontFromOpenTypeByUrl = (url: string) => {
  //   const fontUrl = url || DEBUG_FONTS[0];
  //   return new Promise((resolve, reject) => {
  //     if (fontsTracks[fontUrl]) {
  //       resolve(fontsTracks[fontUrl]);
  //       return;
  //     }
  //     load(fontUrl, (err, font) => {
  //       if (err) {
  //         console.log(`Font could not be loaded: ${err}`);
  //         reject(err);
  //       }
  //       fontsTracks[fontUrl] = font;
  //       resolve(font);
  //     });
  //   });
  // };

  const loadFontFromOpenTypeByUrl = (url: string) => {
    const fontUrl = url || DEBUG_FONTS[0];
    return new Promise((resolve, reject) => {
      if (fontsTracks[fontUrl]) {
        resolve(fontsTracks[fontUrl]);
        return;
      }
      fetch(fontUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => parse(arrayBuffer))
        .then(font => {
          fontsTracks[fontUrl] = font;
          resolve(font);
        })
    });
  };

  const loadFontFromOpenTypeByLocalPath = (path: any) => {
    const buffer = fs.readFileSync(path);
    const arrayBuffer = toArrayBuffer(buffer);
    const font = parse(arrayBuffer);
    return font;
  };

  return {
    loadFontFromOpenTypeByUrl,
    loadFontFromOpenTypeByLocalPath,
  };
};
