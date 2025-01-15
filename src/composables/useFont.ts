import { Font, load, parse } from 'opentype.js';
import fs from 'fs';

let fontsTracks: { [key: string]: Font | undefined } = {};

const DEBUG_FONTS = [
  'https://dev.korjl.com/assets/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/font/optimized/oq/oqz3kd855h5eakhs.woff',
];

export const useFont = () => {
  const loadFontFromOpenTypeByUrl = (url: string) => {
    return new Promise((resolve, reject) => {
      if (fontsTracks[url]) {
        resolve(fontsTracks[url]);
        return;
      }
      load(url, (err, font) => {
        if (err) {
          console.log(`Font could not be loaded: ${err}`);
          reject(err);
        }
        fontsTracks[url] = font;
        resolve(font);
      });
    });
  };

  const loadFontFromOpenTypeByLocalPath = async (path: any) => {
    const buffer = await fs.promises.readFile(path);
    console.log(buffer, '==> buffer...');
    const font = parse(buffer);
    return font;
    // return new Promise(async (resolve, reject) => {
    //   parse(buffer, (err, font) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(font);
    //   });
    // });
  };

  return {
    loadFontFromOpenTypeByUrl,
    loadFontFromOpenTypeByLocalPath,
  };
};
