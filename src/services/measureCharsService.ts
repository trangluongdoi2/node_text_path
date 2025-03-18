import { BrowserPool } from "@/chromium/browserPool";
import { ChromiumHandler } from "@/chromium/chromiumHandler";
import { MeasureCharsPayload, TextStyleDeclaration } from "@/types/convert-text";

class MeasureCharsService {
  async measureChars(input: MeasureCharsPayload) {
    const { tspanContents, fontloadInfos } = input;
    // const browserPool = new BrowserPool();
    const page = await ChromiumHandler.newPage();
    try {
      const fontfaceLoadString = fontloadInfos.map(({ fontFamily, fontPath }) => {
        return `@font-face { font-family: '${fontFamily}'; src: url('${fontPath}'); }`
      });

      const htmlContent = `
        <!DOCTYPE html>
          <html>
            <head>
              <style>${fontfaceLoadString.join('')}</style>
            </head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/opentype.js/0.6.5/opentype.min.js" integrity="sha512-bRz6QInwm6Dnvgt0oVNbSjs0eyLXmAttb8t/jZWbBTTnUrs0O3HtNYE6pf3K0gO5RwUJZ50OzJcIiYi8lWj7EA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <body><canvas id="canvas"></canvas></body>
          </html>
        `;
      const configs = { ...input }
  
      await page?.setContent(htmlContent, { waitUntil: 'networkidle2', timeout: 0 });
    
      const width = await page?.evaluate(async (configs: any) => {
        // BLOCK FUNCTION
        function loadFontFace(fontFamily: string, fontPath: string) {
          return new Promise(resolve => {
            const font = new FontFace(fontFamily, `url(${fontPath})`);
            document.fonts.add(font);
            font.load().then(() => {
              resolve(fontFamily);
            }).catch(err => {
              console.error('Font loading failed:', err);
              resolve(fontFamily);
            });
          });
        }
        
        function _getFontDeclaration(
          {
            fontFamily = '',
            fontStyle = '',
            fontWeight = '',
            fontSize = '',
          }: { fontFamily: string, fontStyle: string, fontWeight: string, fontSize: string },
        ): string {
          const parsedFontFamily =
            fontFamily.includes("'") ||
            fontFamily.includes('"') ||
            fontFamily.includes(',') ||
            `"${fontFamily}"`;
          return [
            fontStyle,
            fontWeight,
            `${fontSize}px`,
            parsedFontFamily,
          ].join(' ');
        }
    
        function getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
          const lineStyle = multiStyles && multiStyles[lineIndex];
          return lineStyle ? lineStyle[charIndex] ?? {} : {};
        }
      
        function getValueOfPropertyAt(object: any, lineIndex: number, charIndex: number, field: string) {
          const charStyle = getStyleDeclaration(object.styles, lineIndex, charIndex);
          return charStyle[field] ?? object[field];
        }
      
        function _measureChar(char: string, charStyle: any, previousChar?: string, prevCharStyle?: any) {
          function validChar(char: string | undefined | null) {
            return char !== null && char !== undefined && char !== ' ';
          }
  
          const canvas = document.getElementById('canvas') as HTMLCanvasElement;
          const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    
          const fontDeclaration = _getFontDeclaration(charStyle);
          const stylesAreEqual = 
            previousChar && 
            fontDeclaration === _getFontDeclaration(prevCharStyle);
    
          ctx.save();
          ctx.font = `${fontDeclaration}`;
          ctx.textBaseline = 'alphabetic';
  
          // console.log(ctx.font, '=> ctx.font..')
    
          let width = 0;
          let kernedWidth = width = ctx.measureText(char).width;
  
          // console.log(ctx.measureText(char).width, '=> ctx.measureText..', char)
      
          if (validChar(previousChar) && validChar(char) && stylesAreEqual) {
            ctx.font = fontDeclaration;
            const coupleChar = previousChar + char;
            const coupleWidth = ctx.measureText(coupleChar).width;
            const prevAdvanceWidth = ctx.measureText(previousChar).width;
            kernedWidth = coupleWidth - prevAdvanceWidth;
          }
          ctx.restore();
      
          return {
            width,
            kernedWidth,
          };
        }
    
        let widthValue: Array<{ width: number, kernedWidth: number }[]> = [];
        const { masterElement, tspanContents, fontloadInfos } = configs;
        let fontloadMap: Record<string, any> = {};

        await Promise.all(fontloadInfos.map(({ fontFamily, fontPath }: { fontFamily: string, fontPath: string }) => {
          return loadFontFace(fontFamily, fontPath)
        }));

        let textLines: any[] = [];
        tspanContents.forEach((tspanData: any, lineIndex: number) => {
          if (widthValue[lineIndex] === undefined) {
            widthValue[lineIndex] = [];
          }
          if (!textLines[lineIndex]) {
            textLines[lineIndex] = [];
          }
          const charsEachLine = tspanData.text.split('');
          charsEachLine.forEach((char: string, charIndex: number) => {
            const fontSize = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontSize');
            const fontFamily = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontFamily');
            const fontWeight = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontWeight') || 'normal';
            const fontStyle = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontStyle') || 'normal';
            const linethrough = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'linethrough') || false;
            const overline = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'overline') || false;
            const fill = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fill') || '#000000';
            
            const prevChar = textLines[lineIndex][charIndex - 1];
    
            const stylesChar = {
              fontFamily,
              fontSize,
              fontWeight,
              fontStyle,
              linethrough,
              overline,
              fill,
            }
  
            const prevStylesChar = {
              fontFamily: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontFamily'),
              fontSize: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontSize') || '16px',
              fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontWeight') || 'normal',
              fontStyle: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontStyle') || 'normal',
              linethrough: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'linethrough') || false,
              overline: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'overline') || false,
            }
  
            textLines[lineIndex][charIndex] = {
              char,
              fill,
              fontFamily,
              fontSize,
              fontWeight,
              fontStyle,
              linethrough,
              overline,
            }
  
            const info = _measureChar(char, stylesChar, prevChar?.char, prevStylesChar);
            widthValue[lineIndex].push({
              width: info.width,
              kernedWidth: info.kernedWidth,
            });
          });
        });
        return widthValue;
      }, configs);
      return width;
    } catch (error) {
      console.log(error, '==> error');
      return [];
    } finally {
      // await browserPool.cleanup();
      await page?.close();
    }
    // try {
    //   page = await ChromiumHandler.newPage();
    //   console.log('Chromium DONE!');
    // } catch (error) {
    //   console.log(error, '==> error');
    // }

    // const styleFontFace = this.getStyleFontFace();

    // const htmlContent = `
    // <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <style></style>
    //     </head>
    //     <script src="https://cdnjs.cloudflare.com/ajax/libs/opentype.js/0.6.5/opentype.min.js" integrity="sha512-bRz6QInwm6Dnvgt0oVNbSjs0eyLXmAttb8t/jZWbBTTnUrs0O3HtNYE6pf3K0gO5RwUJZ50OzJcIiYi8lWj7EA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    //     <body><canvas id="canvas" style="width: 100px; height: 100px;"></canvas></body>
    //   </html>
    // `;
    // const configs = { ...input }

    // await page?.setContent(htmlContent);
    // const width = await page?.evaluate(async (configs) => {
    //   // BLOCK FUNCTION
    //   function getFontLoadFromUrl(fontFamily: string, fontPath: string) {
    //     return new Promise((resolve, reject) => {
    //       fetch(fontPath)
    //         .then(response => response.arrayBuffer())
    //         .then(arrayBuffer => {
    //           const font = window.opentype.parse(arrayBuffer);
    //           resolve({
    //             fontFamily,
    //             fontPath,
    //             fontload: font
    //           });
    //         })
    //         .catch(error => {
    //           reject(error);
    //         });
    //     })
    //   }

    //   function _getFontDeclaration(
    //     {
    //       fontFamily = '',
    //       fontStyle = '',
    //       fontWeight = '',
    //       fontSize = '',
    //     }: { fontFamily: string, fontStyle: string, fontWeight: string, fontSize: string },
    //   ): string {
    //     const parsedFontFamily =
    //       fontFamily.includes("'") ||
    //       fontFamily.includes('"') ||
    //       fontFamily.includes(',') ||
    //       `"${fontFamily}"`;
    //     return [
    //       fontStyle,
    //       fontWeight,
    //       `${fontSize}px`,
    //       parsedFontFamily,
    //     ].join(' ');
    //   }
  
    //   function getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    //     const lineStyle = multiStyles && multiStyles[lineIndex];
    //     return lineStyle ? lineStyle[charIndex] ?? {} : {};
    //   }
    
    //   function getValueOfPropertyAt(object: any, lineIndex: number, charIndex: number, field: string) {
    //     const charStyle = getStyleDeclaration(object.styles, lineIndex, charIndex);
    //     return charStyle[field] ?? object[field];
    //   }
    
    //   function _measureChar(char: string, charStyle: any, previousChar?: string, prevCharStyle?: any) {
    //     function validChar(char: string | undefined | null) {
    //       return char !== null && char !== undefined && char !== ' ';
    //     }

    //     const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    //     // console.log(canvas, '==> canvas...')
    //     const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  
    //     const fontDeclaration = _getFontDeclaration(charStyle);
    //     const stylesAreEqual = 
    //       previousChar && 
    //       fontDeclaration === _getFontDeclaration(prevCharStyle);
  
    //     console.log(fontDeclaration, '=> fontDeclaration..')
    //     ctx.save();
    //     ctx.font = `${fontDeclaration}`;
    //     ctx.textBaseline = 'alphabetic';

    //     console.log(ctx.font, '=> ctx.font..')
  
    //     let width = 0;
    //     let kernedWidth = width = ctx.measureText(char).width;

    //     if (char == 'y') {
    //       console.log(ctx.measureText(char), '=> ctx.measureText(char)..')
    //     }
    
    //     if (validChar(previousChar) && validChar(char) && stylesAreEqual) {
    //       ctx.font = fontDeclaration;
    //       const coupleChar = previousChar + char;
    //       const coupleWidth = ctx.measureText(coupleChar).width;
    //       const prevAdvanceWidth = ctx.measureText(previousChar).width;
    //       kernedWidth = coupleWidth - prevAdvanceWidth;
    //     }
    //     ctx.restore();
    
    //     return {
    //       width,
    //       kernedWidth,
    //     };
    //   }
  
    //   let widthValue: Array<{ width: number, kernedWidth: number }[]> = [];
    //   const { masterElement, tspanContents, fontloadInfos } = configs;
    //   const fontfaceLoadString = fontloadInfos.map(({ fontFamily, fontPath }) => {
    //     return `
    //       @font-face { font-family: "${fontFamily}"; src: url('${fontPath}');}
    //     `;
    //   });
    //   fontloadInfos.forEach(({ fontFamily, fontPath }) => {
    //     const font = new FontFace(fontFamily, `url(${fontPath})`);
    //     document.fonts.add(font);
    //   })

    //   const style = document.querySelector('style');
    //   // style?.appendChild(document.createTextNode(fontfaceLoad.join('')));
    //   // @ts-ignore
    //   style.textContent = fontfaceLoadString.join('');
    //   // const canvas = document.querySelector('canvas');
    //   // const ctx = canvas?.getContext('2d');
    //   // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    //   // const mainCtx = canvas?.getContext('2d');

    //   let fontloadMap: Record<string, any> = {};
    //   const fontLoadPromises = await Promise.all(fontloadInfos.map(({ fontFamily, fontPath }) => {
    //     return getFontLoadFromUrl(fontFamily, fontPath)
    //   }));

    //   fontLoadPromises.forEach(({ fontFamily, fontPath, fontload }: any) => {
    //     fontloadMap[fontFamily] = fontload;
    //   });

    //   let textLines: any[] = [];
    //   tspanContents.forEach((tspanData, lineIndex) => {
    //     if (widthValue[lineIndex] === undefined) {
    //       // @ts-ignore
    //       widthValue[lineIndex] = [];
    //     }
    //     if (!textLines[lineIndex]) {
    //       textLines[lineIndex] = [];
    //     }
    //     const charsEachLine = tspanData.text.split('');
    //     charsEachLine.forEach((char: string, charIndex: number) => {
    //       const fontSize = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontSize');
    //       const fontFamily = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontFamily');
    //       const prevChar = textLines[lineIndex][charIndex - 1];
  
    //       const stylesChar = {
    //         fontFamily,
    //         fontSize,
    //         fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontWeight') || 'normal',
    //         fontStyle: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontStyle') || 'normal',
    //         linethrough: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'linethrough') || false,
    //         overline: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'overline') || false,
    //       }

    //       const prevStylesChar = {
    //         fontFamily: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontFamily'),
    //         fontSize: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontSize') || '16px',
    //         fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontWeight') || 'normal',
    //         fontStyle: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontStyle') || 'normal',
    //         linethrough: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'linethrough') || false,
    //         overline: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'overline') || false,
    //       }

    //       textLines[lineIndex][charIndex] = {
    //         char,
    //         fill: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fill'),
    //         fontFamily,
    //         fontSize,
    //         fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontWeight'),
    //       }

    //       const info = _measureChar(char, stylesChar, prevChar?.char, prevStylesChar);
    //       widthValue[lineIndex].push({
    //         width: info.width,
    //         kernedWidth: info.kernedWidth,
    //       });
    //     });
    //   });
    //   return widthValue;
    // }, configs);
    // return width;
  }
}

export default new MeasureCharsService();
