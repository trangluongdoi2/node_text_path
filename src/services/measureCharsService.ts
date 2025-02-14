import { ChromiumHandler } from "@/chromium/chromiumHandler";
import { TextStyleDeclaration } from "@/types/convert-text";
import { Page } from "puppeteer-core";

class MeasureCharsService {
  private fontloadMap: any;
  private object: any;
  private fontPath: any;

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

  // _measureChar3(char: string, charStyle: any, previousChar: string | undefined, prevCharStyle: any) {
  //   const fontload = this.fontloadMap[charStyle?.fontFamily]?.fontload;
  //   const prevFontload = this.fontloadMap[prevCharStyle?.fontFamily]?.fontload;
  //   const fontDeclaration = this._getFontDeclaration(charStyle);
  //   const stylesAreEqual = 
  //     previousChar && 
  //     fontDeclaration === this._getFontDeclaration(prevCharStyle);

  //   if (!fontload) {
  //     return { width: 0, kernedWidth: 0 };
  //   }
  //   const fontSize = charStyle?.fontSize || this.object.fontSize;
  //   const fontFamily = charStyle?.fontFamily || this.object.fontFamily;
  //   const data = {
  //     fontPath: this.fontPath,
  //     fontSize,
  //     fontFamily,
  //     fontStyleDecalaration: fontDeclaration,
  //   }
  //   const { ctx } = getMeasuringCanvasForLoadFont(data);
  //   let width = 0;
  //   let kernedWidth = width = ctx.measureText(char).width;

  //   function validChar(char: string | undefined | null) {
  //     return char !== null && char !== undefined && char !== ' ';
  //   }

  //   if (validChar(previousChar) && validChar(char) && stylesAreEqual) {
  //     const coupleChar = previousChar + char;
  //     const coupleWidth = ctx.measureText(coupleChar).width;
  //     const prevAdvanceWidth = ctx.measureText(previousChar).width;

  //     kernedWidth = coupleWidth - prevAdvanceWidth;
  //   }

  //   return {
  //     width,
  //     kernedWidth,
  //   };
  // }

  getContentHTML(input: any) {
    // return JSON.stringify(input);
    // const htmlContent = input.map((item: any) => {
  }

  getStyleFontFace(input: any) {
    let styleFontFace = '';
    for (const item of input) {
      const { fontFamily = '', fontStyle = '', fontWeight = '', fontSize = '' } = item;
      styleFontFace += `
        @font-face {
          font-family: ${fontFamily};
          src: url(${item.fontPath});
        }
      `;
    }
    return styleFontFace;
  }


  async measureChars(tspanContents: any) {
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
        <body><canvas id="canvas" style="width: 100%; height: 100%;"></canvas></body>
      </html>
    `;
    await page?.setContent(htmlContent);
    const width = await page?.evaluate(() => {
      return document.querySelector('canvas')?.getBoundingClientRect().width;
    });
    console.log(width, '==> width...');
    return JSON.stringify(tspanContents);
  }
}

export default new MeasureCharsService();
