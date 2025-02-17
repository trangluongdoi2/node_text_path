import { ChromiumHandler } from "@/chromium/chromiumHandler";
import { MeasureCharsPayload, TextStyleDeclaration } from "@/types/convert-text";
import { Page } from "puppeteer-core";

class MeasureCharsService {
  private fontloadMap: any;
  private object: any;
  // private fontPath: any;
  private fontPath = 'https://dev.korjl.com/assets/org/GD01HHDZSQWX9002TXZ25HFC8MM1/font/optimized/hk/hko14aqrnq2hdelg.woff'

  _getFontDeclaration(
    {
      fontFamily = this.object.fontFamily,
      fontStyle = this.object.fontStyle,
      fontWeight = this.object.fontWeight,
      fontSize = this.object.fontSize,
    }: Partial<
      Pick<
        TextStyleDeclaration,
        'fontFamily' | 'fontStyle' | 'fontWeight' | 'fontSize'
      >
    > = {},
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

  // getStyleFontFace(input: any) {
  //   let styleFontFace = '';
  //   for (const item of input) {
  //     const { fontFamily = '', fontStyle = '', fontWeight = '', fontSize = '' } = item;
  //     styleFontFace += `
  //       @font-face {
  //         font-family: ${fontFamily};
  //         src: url(${item.fontPath});
  //       }
  //     `;
  //   }
  //   return styleFontFace;
  // }

  async measureChars(input: MeasureCharsPayload) {
    const { tspanContents, fontloadInfos } = input;
    let page: Page | undefined = undefined;
    try {
      page = await ChromiumHandler.newPage();
      console.log('Chromium DONE!');
    } catch (error) {
      console.log(error, '==> error');
    }

    // const styleFontFace = this.getStyleFontFace();

    const htmlContent = `
    <!DOCTYPE html>
      <html>
        <head>
          <style></style>
        </head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/opentype.js/0.6.5/opentype.min.js" integrity="sha512-bRz6QInwm6Dnvgt0oVNbSjs0eyLXmAttb8t/jZWbBTTnUrs0O3HtNYE6pf3K0gO5RwUJZ50OzJcIiYi8lWj7EA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <body><canvas id="canvas" style="width: 100px; height: 100px;"></canvas></body>
      </html>
    `;
    const configs = { ...input }

    await page?.setContent(htmlContent);
    const width = await page?.evaluate(async (configs) => {
      // BLOCK FUNCTION
      function getFontLoadFromUrl(fontFamily: string, fontPath: string) {
        return new Promise((resolve, reject) => {
          fetch(fontPath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
              const font = window.opentype.parse(arrayBuffer);
              resolve({
                fontFamily,
                fontPath,
                fontload: font
              });
            })
            .catch(error => {
              reject(error);
            });
        })
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
        console.log(canvas, '==> canvas...')
        const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  
        const fontDeclaration = _getFontDeclaration(charStyle);
        const stylesAreEqual = 
          previousChar && 
          fontDeclaration === _getFontDeclaration(prevCharStyle);
  
        ctx.save();
        ctx.font = `${fontDeclaration}`;
        ctx.textBaseline = 'alphabetic';
  
        let width = 0;
        let kernedWidth = width = ctx.measureText(char).width;
    
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
      const fontfaceLoad = fontloadInfos.map(({ fontFamily, fontPath }) => {
        return `
          @font-face {
            font-family: "${fontFamily}";
            src: url(${fontPath});
          }
        `;
      });
      fontloadInfos.forEach(({ fontFamily, fontPath }) => {
        const font = new FontFace(fontFamily, `url(${fontPath})`);
        document.fonts.add(font);
      })

      const style = document.querySelector('style');
      style?.appendChild(document.createTextNode(fontfaceLoad.join('')));
      // const canvas = document.querySelector('canvas');
      // const ctx = canvas?.getContext('2d');
      // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      // const mainCtx = canvas?.getContext('2d');

      let fontloadMap: Record<string, any> = {};
      const fontLoadPromises = await Promise.all(fontloadInfos.map(({ fontFamily, fontPath }) => {
        return getFontLoadFromUrl(fontFamily, fontPath)
      }));

      fontLoadPromises.forEach(({ fontFamily, fontPath, fontload }: any) => {
        fontloadMap[fontFamily] = fontload;
      });

      let textLines: any[] = [];
      tspanContents.forEach((tspanData, lineIndex) => {
        if (widthValue[lineIndex] === undefined) {
          // @ts-ignore
          widthValue[lineIndex] = [];
        }
        if (!textLines[lineIndex]) {
          textLines[lineIndex] = [];
        }
        const charsEachLine = tspanData.text.split('');
        charsEachLine.forEach((char: string, charIndex: number) => {
          const fontSize = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontSize');
          const fontFamily = getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontFamily');
          const prevChar = textLines[lineIndex][charIndex - 1];
  
          const stylesChar = {
            fontFamily,
            fontSize,
            fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontWeight'),
            fontStyle: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontStyle') || 'normal',
            linethrough: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'linethrough') || false,
            overline: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'overline') || false,
          }

          const prevStylesChar = {
            fontFamily: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontFamily'),
            fontSize: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontSize'),
            fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontWeight'),
            fontStyle: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'fontStyle') || 'normal',
            linethrough: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'linethrough') || false,
            overline: getValueOfPropertyAt(masterElement, lineIndex, charIndex - 1, 'overline') || false,
          }

          textLines[lineIndex][charIndex] = {
            char,
            fill: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fill'),
            fontFamily,
            fontSize,
            fontWeight: getValueOfPropertyAt(masterElement, lineIndex, charIndex, 'fontWeight'),
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
  }
}

export default new MeasureCharsService();
