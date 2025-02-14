import { useCaculateTransform } from '@/helper/transform';
import { BoundingElement, GlyphData, GraphemeBBox, ISectionSettings, RenderCharInfo, TextFontData, TextPath, TextStyleDeclaration, TspanContent } from '@/types/convert-text';
import { getContentByTag, getRotationMatrixRatios, getTextParentTags, isEqual } from '@/utils-svg';
import { JSDOM } from 'jsdom';
import path from 'path';
import * as math from 'mathjs';
import { Font, Glyph } from 'opentype.js';
import { useFont } from '@/composables/useFont';
import { TextPathService } from './textPathService';
import { getMeasuringCanvasForLoadFont } from '@/utilities/canvas';
// import fetch from 'node-fetch';

const { reCaculateTransform  }  = useCaculateTransform();

export interface TextServiceInput {
  html: { outerHTML: string, innerHTML: string },
  data: { masterElement: any, settings?: ISectionSettings, filterTags?: string[] }
}

export class TextService {
  static instance: TextService | undefined;
  declare innerHTML;
  declare outerHTML;
  declare textContent: string;
  declare textParentData: any;
  // declare rectData: any;
  declare textLines: { [key: string]: { [key: string]: RenderCharInfo } };
  declare textLines2: Array<RenderCharInfo[]>
  declare __charBounds;
  declare tspanContents: TspanContent[];
  declare boundingElement: BoundingElement;
  declare fontLoad: Font;
  declare _textLines: Array<string[]>;
  declare textLinesArray: string[];
  private glyphsData: Array<GlyphData[]>;
  _fontSizeFraction = 0.222;
  lineHeightScale = 1;
  fontloadMap: Record<string, { fontload: Font }> = {};
  fontPath = 'https://dev.korjl.com/assets/org/GD01HHDZSQWX9002TXZ25HFC8MM1/font/optimized/hk/hko14aqrnq2hdelg.woff';
  private textSettings: ISectionSettings;
  declare object: any;
  declare filterTags: string[];
  declare measuringContext: CanvasRenderingContext2D | null;
  declare textTagData: {
    content: string,
    params: Record<string, string | number>,
  }
  keyAttributesByTag: Record<string, string[]> = {
    rect: ['x', 'y', 'width', 'height'],
    tspan: ['x', 'y', 'dx', 'dy'],
    text: ['x', 'y', 'textAnchor', 'transform', 'fontFamily', 'fontSize'],
  }
  _pathContent: string;

  constructor(options: TextServiceInput) {
    this.outerHTML = options.html.outerHTML;
    this.innerHTML = options.html.innerHTML;
    this.object = { ...options.data.masterElement };
    this.fontloadMap = {};
    this.textLines = {};
    this.textLines2 = [];
    this.__charBounds = {};
    this.tspanContents = [];
    this.filterTags = options.data.filterTags || [];
    // @ts-ignore
    this.textSettings = { ...options.data.settings || {} };
    this.boundingElement = {
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
      width: 0,
      height: 0,
    }
    this.glyphsData = [];
    // this.initTextData();

    this.fontPath = 'https://dev.korjl.com/assets/org/GD01HHDZSQWX9002TXZ25HFC8MM1/font/optimized/hk/hko14aqrnq2hdelg.woff';
  }

  private async initTextData() {
    this.processTextParentContent();
    this.processTextTagContent();
    // this.processTextRectContent();
    this.getPositionOfBoundingBoxText();
    await this.getCharsData();
    this.getTextLines();
    // console.log(this.boundingElement, '==> this.boundingElement TEXT...');
  }

  private hasCharSpacing() {
    return Boolean(this.object.charSpacing)
  }

  getTextLines() {
    this.textLinesArray = this.tspanContents.map((tspanData) => tspanData.text);
    this._textLines = this.textLinesArray.map((textLine: string) => textLine.split(''));
  }

  caculateCenterOfElementText({ x, y, angle }: { x: number, y: number, angle: number }) {
    const { a, b, c, d } = getRotationMatrixRatios(angle);
    const rotationMatrix = math.matrix([[a, c], [b, d]]);
    const translateMatrix = math.matrix([[-this.object.width / 2], [-this.object.height / 2]]);
    const positionMatrix = math.matrix([[x], [y]]);
    const center = math.subtract(positionMatrix, math.multiply(rotationMatrix, translateMatrix)) as any;
    return {
      x: center._data[0][0],
      y: center._data[1][0],
    };
  }

  getPositionOfBoundingBoxText() {
    const originalAngle = this.object.angle;
    const originalFlipX = this.object.flipX;
    const originalFlipY = this.object.flipY;
    this.object.flipX = false;
    this.object.flipY = false;
    const position = reCaculateTransform(this.object);
    const center = this.caculateCenterOfElementText({ x: position.x, y: position.y, angle: originalAngle });
    this.object.angle = originalAngle;
    this.object.flipX = originalFlipX;
    this.object.flipY = originalFlipY;
    // const w = this.rectData.params.width || this.object.width;
    // const h = this.rectData.params.height || this.object.height;
    const w = this.object.width;
    const h = this.object.height;
    this.boundingElement = {
      x: position.x,
      y: position.y,
      cx: center.x,
      cy: center.y,
      width: w,
      height: h,
    };
  }

  loadFont() {
    // const localPath = path.join(__dirname, '../fonts/font.woff');
    // const localPath = path.join(__dirname, '../fonts/font_bug.woff');
    // const localPath = path.join(__dirname, '../fonts/font_1.woff');
    // const localPath = path.join(__dirname, '../fonts/wavsujv5preyca7l.woff');
    // const localPath = path.join(__dirname, '../fonts/7cvp1ivqus133n47_glyph.woff');
    const localPath = path.join(__dirname, '../fonts/hko14aqrnq2hdelg.woff');
    const fontLoad = useFont().loadFontFromOpenTypeByLocalPath(localPath);
    if (!this.fontloadMap[this.object.fontFamily]) {
      this.fontloadMap[this.object.fontFamily] = { fontload: fontLoad };
    }
  }

  getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(lineIndex: number, charIndex: number, field: string) {
    const charStyle = this.getStyleDeclaration(this.object.styles, lineIndex, charIndex);
    return charStyle[field] ?? this.object[field];
  }

  getTopOffset() {
    const { height } = this.boundingElement;
    return -height / 2;
  }

  getHeightOfChar(lineIndex: number, charIndex: number) {
    return this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize');
  }

  getHeightOfLine(lineIndex: number) {
    let maxHeight = this.getHeightOfChar(lineIndex, 0);
    for (let i = 1; i < this.tspanContents[lineIndex].text.length; i++) {
      maxHeight = Math.max(this.getHeightOfChar(lineIndex, i), maxHeight);
    }
    return maxHeight;
  }

  // _getGraphemeBox(
  //   grapheme: string,
  //   lineIndex: number,
  //   charIndex: number,
  //   prevGrapheme?: string,
  //   skipLeft?: boolean,
  // ): GraphemeBBox {
  //   const style = this.getCompleteStyleDeclaration(lineIndex, charIndex),
  //     prevStyle = prevGrapheme
  //       ? this.getCompleteStyleDeclaration(lineIndex, charIndex - 1)
  //       : {},
  //     info = this._measureChar(grapheme, style, prevGrapheme, prevStyle);
  //   let kernedWidth = info.kernedWidth,
  //     width = info.width,
  //     charSpacing;

  //   if (this.hasCharSpacing()) {
  //     charSpacing = this._getWidthOfCharSpacing();
  //     width += charSpacing;
  //     kernedWidth += charSpacing;
  //   }

  //   const box: GraphemeBBox = {
  //     width,
  //     left: 0,
  //     height: style.fontSize,
  //     kernedWidth,
  //     deltaY: style.deltaY,
  //   };
  //   if (charIndex > 0 && !skipLeft) {
  //     const previousBox = this.__charBounds[lineIndex][charIndex - 1];
  //     box.left =
  //       previousBox.left + previousBox.width + info.kernedWidth - info.width;
  //   }
  //   return box;
  // }

  getAdvanceWidthOfTextLine() {
    const advanceWidths: number[] = [];
    const charSpacing = this._getWidthOfCharSpacing();

    this.tspanContents.forEach((tspanData, lineIndex) => {
      let advanceWidth = 0;
      // if (lineIndex === 0) {
      //   console.log(tspanData.text.split('').length, 'LENGTH OF TEXT..');
      // }
      tspanData.text.split('').forEach((char: string, charIndex: number) => {
        // if (lineIndex === 0) {
        //   console.log(this.textLines2[lineIndex][charIndex].kernedWidth, char, `==>  this.textLines2[${lineIndex}][${charIndex}]}`);
        // }
        advanceWidth += this.textLines2[lineIndex][charIndex].kernedWidth - charSpacing;
      });
      // advanceWidth += widthSpacing;
      advanceWidths.push(advanceWidth);
    });
    return advanceWidths;
  }

  _getSafeLineHeight() {
    return this.lineHeightScale || 0.001;
  }

  isEndOfWrapping(lineIndex: number) {
    return lineIndex === this.tspanContents.length - 1;
  }

  measureLine(lineIndex: number) {
    const lineWidth = this.getAdvanceWidthOfTextLine()[lineIndex];
    // if (lineIndex === 0) {
    //   console.log(lineWidth, '==> lineWidth..');
    // }
    return lineWidth;
  }

  createCanvasElement() {
    const { window } = new JSDOM();
    const canvas = window.document.createElement('canvas');
    return canvas
  }

  getMeasuringContext() {
    if (!this.measuringContext) {
      const canvas = this.createCanvasElement();
      this.measuringContext = canvas.getContext('2d');
    }
    return this.measuringContext;
  }

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

  _measureChar(
    _char: string,
    charStyle: any,
    previousChar: string | undefined,
    prevCharStyle: any | Record<string, never>,
  ) {
    const ctx = this.getMeasuringContext()!;
    const fontDeclaration = this._getFontDeclaration(charStyle);
    // console.log(fontDeclaration, '==> fontDeclaration..');
    const stylesAreEqual = 
      previousChar && 
      fontDeclaration === this._getFontDeclaration(prevCharStyle);
    
    // Set the text styles for measurement
    // this._setTextStyles(ctx, charStyle, true);
    
    // Measure current character
    const charWidth = ctx.measureText(_char).width;

    // If no previous character or styles are different, return without kerning
    if (!previousChar || !stylesAreEqual) {
      return {
        width: charWidth,
        kernedWidth: charWidth,
      };
    }
    
    // Measure the character pair to calculate kerning
    const coupleWidth = ctx.measureText(previousChar + _char).width;
    const previousWidth = ctx.measureText(previousChar).width;
    const kernedWidth = coupleWidth - previousWidth;
    
    return {
      width: charWidth,
      kernedWidth: kernedWidth,
    };
  }

  _measureChar2(char: string, stylesChar: any, prevChar: string | undefined, prevStylesChar: any) {
    const fontload = this.fontloadMap[stylesChar?.fontFamily]?.fontload;
    const prevFontload = this.fontloadMap[prevStylesChar?.fontFamily]?.fontload;
    const glyphId = fontload.charToGlyphIndex(char);
    const prevGlyphId = prevChar ? prevFontload.charToGlyphIndex(prevChar) : null;
    const glyph = fontload.glyphs.get(glyphId);
    // @ts-ignore
    const advanceWidth = glyph.advanceWidth * (stylesChar?.fontSize || this.object.fontSize) / fontload.unitsPerEm;
    let kerning = 0;
    if (prevGlyphId) {
      kerning = prevFontload.getKerningValue(prevGlyphId, glyphId) * (prevStylesChar?.fontSize || this.object.fontSize) / prevFontload.unitsPerEm;
    }
    
    return {
      width: advanceWidth,
      kernedWidth: advanceWidth + kerning,
    }
  }

  _measureChar3(char: string, charStyle: any, previousChar: string | undefined, prevCharStyle: any) {
    const fontload = this.fontloadMap[charStyle?.fontFamily]?.fontload;
    const prevFontload = this.fontloadMap[prevCharStyle?.fontFamily]?.fontload;
    const fontDeclaration = this._getFontDeclaration(charStyle);
    const stylesAreEqual = 
      previousChar && 
      fontDeclaration === this._getFontDeclaration(prevCharStyle);

    if (!fontload) {
      return { width: 0, kernedWidth: 0 };
    }
    const fontSize = charStyle?.fontSize || this.object.fontSize;
    const fontFamily = charStyle?.fontFamily || this.object.fontFamily;
    const data = {
      fontPath: this.fontPath,
      fontSize,
      fontFamily,
      fontStyleDecalaration: fontDeclaration,
    }
    const { ctx } = getMeasuringCanvasForLoadFont(data);
    // console.log(ctx, '==> ctx...');
    let width = 0;
    // let kernedWidth = width = fontload.getAdvanceWidth(char, fontSize, { kerning: true });
    // let kernedWidth = width = fontload.getAdvanceWidth(char, fontSize);
    let kernedWidth = width = ctx.measureText(char).width;

    function validChar(char: string | undefined | null) {
      return char !== null && char !== undefined && char !== ' ';
    }

    if (validChar(previousChar) && validChar(char) && stylesAreEqual) {
      const coupleChar = previousChar + char;
      // const prevAdvanceWidth = prevFontload.getAdvanceWidth(previousChar, fontSize);
      // const coupleWidth = fontload.getAdvanceWidth(coupleChar, fontSize);
      const coupleWidth = ctx.measureText(coupleChar).width;
      const prevAdvanceWidth = ctx.measureText(previousChar).width;
      // console.log(coupleWidth, width, prevAdvanceWidth, char, '==> coupleWidth, width, prevAdvanceWidth...');

      kernedWidth = coupleWidth - prevAdvanceWidth;
    }

    return {
      width,
      kernedWidth,
    };
  }

  _getLeftOffset() {
    return -this.boundingElement.width / 2 || 0;
  }

  _getLineLeftOffset(lineIndex: number) {
    const lineWidth = this.measureLine(lineIndex);
    console.log(lineWidth, '==> lineWidth...');
    const lineDiff = this.boundingElement.width - lineWidth;
    let textAlign = 'justify';
    const textAnchor = this.textTagData.params.textAnchor;
    switch (textAnchor) {
      case 'middle':
        textAlign = 'center';
        break;
      case 'start':
        textAlign = 'left';
        break;
      case 'end':
        textAlign = 'right';
        break;
    }
    if (textAlign === 'justify' || (textAlign === 'justify-left' && !this.isEndOfWrapping(lineIndex))) {
      return 0;
    }
    let leftOffset = 0;
    if (textAlign === 'center') {
      leftOffset = lineDiff / 2;
    }
    if (textAlign === 'right') {
      leftOffset = lineDiff;
    }
    return leftOffset;
  }

  _getWidthOfCharSpacing() {
    return this.object?.charSpacing || 0;
  }

  // TODO: Need recaculate this function!
  // handleTspanContent() {
  //   let top = -this.boundingElement.height / 2;
  //   console.log(this.tspanContents, '==> this.tspanContents..');
  //   this.tspanContents.forEach((tspanData, lineIndex) => {
  //     // RELATIVE
  //     top += Number(tspanData.dy);
  //     if (!this.textLines[lineIndex]) {
  //       this.textLines[lineIndex] = {};
  //     }
  //     const charsEachLine = tspanData.text.split('');
  //     charsEachLine.forEach((char: string, charIndex: number) => {
  //       if (!this.textLines[lineIndex][charIndex]) {
  //         this.textLines[lineIndex][charIndex] = {} as RenderCharInfo;
  //       }
  //       const fontSize = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize');
  //       const fontFamily = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontFamily');
  //       const prevChar = this.textLines[lineIndex][charIndex - 1];

  //       const stylesChar = {
  //         fontFamily, 
  //         fontSize,
  //       }
  //       const prevStylesChar = {
  //         fontFamily: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontFamily'),
  //         fontSize: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontSize'),
  //       }
        
  //       const info = this._measureChar2(char, stylesChar, prevChar?.char, prevStylesChar);
  //       let width = info.width,
  //       kernedWidth = info.kernedWidth,
  //       charSpacing = 0;
  //       if (this.object.charSpacing !== 0) {
  //         charSpacing = this._getWidthOfCharSpacing(this.object.charSpacing);
  //       }
  //       width = width + charSpacing;
  //       kernedWidth = kernedWidth + charSpacing;
        
  //       let left = 0;
  //       if (prevChar) {
  //         left = prevChar.left + prevChar.width + info.kernedWidth - info.width;
  //       }
  //       this.textLines[lineIndex][charIndex] = {
  //         char,
  //         fill: this.getValueOfPropertyAt(lineIndex, charIndex, 'fill'),
  //         fontFamily,
  //         fontSize,
  //         fontWeight: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontWeight'),
  //         fontStyle: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontStyle'),
  //         x: Number(tspanData.x),
  //         dy: Number(tspanData.dy),
  //         top,
  //         left,
  //         width,
  //       }
  //     });
  //   });

  //   const letfOffset = this._getLeftOffset();

  //   Object.keys(this.textLines).forEach((lineIndex: string) => {
  //     const line = this.textLines[lineIndex];
  //     const leftLineOffset = this._getLineLeftOffset(Number(lineIndex));
  //     Object.keys(line).forEach((charIndex) => {
  //       const char = line[charIndex];
  //       char.left += letfOffset + leftLineOffset;
  //     });
  //   });
  // }

  async handleTspanContent2() {
    // console.log(this.tspanContents, '==> this.tspanContents...');
    // const test = await fetch('/measure-chars', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.tspanContents),
    // });
    // console.log(test, '==> test...');

    try {
      const res = await fetch('http://localhost:3000/measure-chars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.tspanContents),
      })
      const data = await res.json();
      console.log(data, '==> data test...');
    } catch (error) {
      console.log(error, '==> error...');
    }

    let top = -this.boundingElement.height / 2;

    this.tspanContents.forEach((tspanData, lineIndex) => {
      // RELATIVE
      top += Number(tspanData.dy);
      if (!this.textLines2[lineIndex]) {
        this.textLines2[lineIndex] = [];
      }
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char: string, charIndex: number) => {
        const fontSize = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize');
        const fontFamily = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontFamily');
        const prevChar = this.textLines2[lineIndex][charIndex - 1];

        const stylesChar = {
          fontFamily,
          fontSize,
          fontWeight: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontWeight'),
          fontStyle: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontStyle') || 'normal',
          linethrough: this.getValueOfPropertyAt(lineIndex, charIndex, 'linethrough') || false,
          overline: this.getValueOfPropertyAt(lineIndex, charIndex, 'overline') || false,
        }
        const prevStylesChar = {
          fontFamily: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontFamily'),
          fontSize: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontSize'),
          fontWeight: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontWeight'),
          fontStyle: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontStyle') || 'normal',
          linethrough: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'linethrough') || false,
          overline: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'overline') || false,
        }
        
        // const info = this._measureChar2(char, stylesChar, prevChar?.char, prevStylesChar);
        const info = this._measureChar3(char, stylesChar, prevChar?.char, prevStylesChar);

        // TODO: Need recaculate this function!
        // const info = data[lineIndex][charIndex];

        let width = info.width,
        kernedWidth = info.kernedWidth,
        charSpacing = 0;
        if (this.hasCharSpacing()) {
          charSpacing = this._getWidthOfCharSpacing();
        }
        width = width + charSpacing;
        kernedWidth = kernedWidth + charSpacing;
        
        let left = 0;
        if (prevChar) {
          left = prevChar.left + prevChar.width + info.kernedWidth - info.width;
        }
        this.textLines2[lineIndex].push({
          char,
          fill: this.getValueOfPropertyAt(lineIndex, charIndex, 'fill'),
          fontFamily,
          fontSize,
          fontWeight: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontWeight'),
          fontStyle: this.getValueOfPropertyAt(lineIndex, charIndex, 'fontStyle'),
          x: Number(tspanData.x),
          dy: Number(tspanData.dy),
          top,
          left,
          width,
          kernedWidth,
        });
      });
    });

    const letfOffset = this._getLeftOffset();
    console.log(letfOffset, '==> letfOffset..');
    
    this.textLines2.forEach((line, lineIndex) => {
      const leftLineOffset = this._getLineLeftOffset(lineIndex);
      line.forEach(char => {
        char.left += letfOffset + leftLineOffset;
      });
    });
  }

  async processTspanContent() {
    const { window } = new JSDOM(this.textTagData.content);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    if (textElement) {
      this.tspanContents = this.getTagElements(textElement);
      // this.handleTspanContent();
      await this.handleTspanContent2();
    }
  }

  getTagElements(element: any) {
    const spanEls = element.childNodes;
    const results = [];
    for (const child of spanEls) {
      if (!child.textContent) {
        continue;
      }
      if (child.nodeName === 'TSPAN') {
        const tagData: any = {
          text: child.textContent,
          x: child.getAttribute('x'),
          dy: child.getAttribute('dy'),
          style: child.getAttribute('style') || {},
          children: this.getTagElements(child),
        };
        results.push(tagData);
      }
    }
    return results;
  }

  async getCharsData() {
    this.loadFont();
    await this.processTspanContent();
    return this.textLines;
  }

  getElementArributes(content: string | string[], keyAttributes: string[]) {
    const attributes: Record<string, number | string> = {};
    const numberAttributes = ['x', 'y', 'dx', 'dy', 'width', 'height'];
    const regex = /[\s\r\t\n]*([a-z0-9\-_]+)[\s\r\t\n]*=[\s\r\t\n]*(['"])((?:\\\2|(?!\2).)*)\2/gi;
    let match = null;
    while ((match = regex.exec(content as any))) {
      let attribute = match[1];
      const value = match[3];
      const index = attribute.indexOf('-');

      if (index !== -1) {
        attribute = attribute.replace('-', '');
        attribute = attribute.split('') as string[] as any;
        // @ts-ignore
        attribute[index] = attribute[index].toUpperCase();
        // @ts-ignore
        attribute = attribute.join('');
      }
  
      if (keyAttributes.includes(attribute)) {
        attributes[attribute] = numberAttributes.includes(attribute) ? Number(value) : value;
      }
    }
    return attributes;
  }

  // processTextRectContent() {
  //   const content = getContentByTag(this.innerHTML, 'rect');
  //   this.rectData = {
  //     content,
  //     params: this.getElementArributes(content, this.keyAttributesByTag['rect']),
  //   }
  // }

  processTextParentContent() {
    const content = getTextParentTags(this.outerHTML)?.[0] || '';
    this.textParentData = {
      content,
      params: this.getElementArributes(content, this.keyAttributesByTag['text']),
    }
  }

  processTextTagContent() {
    const content = getContentByTag(this.innerHTML, 'text')[0];
    this.textTagData = {
      content,
      params: this.getElementArributes(content, this.keyAttributesByTag['text']),
    }
  }

  // getDeltaBetweenTextTagAndBoundingBox() {
  //   const { y } = this.textTagData.params;
  //   const { y: boundingBoxY } = this.rectData.params;
  //   const deltaY = Number(y) - boundingBoxY;
  //   return deltaY;
  // }

  _getStyleDeclaration(
    lineIndex: number,
    charIndex: number,
  ): TextStyleDeclaration {
    const lineStyle = this.object.styles && this.object.styles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  _getLignatureEachLineByGlyphs(text: string, font: Font): TextFontData[] {
    if (this.hasCharSpacing()) {
      const result = text.split('').map((char: string) => {
        return {
          text: char,
          fontload: font,
        };
      });
      return result;
    }
    const singleGlyphs: Array<string> = [];
    const lignatureGlyphs: Array<string> = [];
    const result: TextFontData[] = [];
    let glyphs: Glyph[] = [];
    try {
      glyphs = font.stringToGlyphs(text);
    } catch (error) {
      console.log(error, '===> error');
      glyphs = [];
    }
    glyphs.forEach((glyph: Glyph) => {
      lignatureGlyphs.push(glyph.name as string);
    });

    font.forEachGlyph(text, 0, 0, undefined, undefined, (glyph: Glyph) => {
      singleGlyphs.push(glyph.name as string);
    });
    let currentLignature = '';
    let start = 0;
    let end = 1;
    while (end <= text.length) {
      currentLignature = text.slice(start, end);
      const tempLignatureGlyphs = font.stringToGlyphs(currentLignature);
      const flag = tempLignatureGlyphs.length === 1 && tempLignatureGlyphs[0].name === lignatureGlyphs[0];
      if (flag) {
        result.push({
          text: currentLignature,
          fontload: font,
        });
        start = end;
        lignatureGlyphs.shift();
      }
      end += 1;
    }
    return result;
  }

  preProcessFontData(): Array<TextFontData[]> {
    const result: Array<TextFontData[]> = [];
    this._textLines.forEach((textLine: string[], lineIndex: number) => {
      result[lineIndex] = [];
      let currentString = '';
      let currentFontFamily = this.getValueOfPropertyAt(lineIndex, 0, 'fontFamily') as string;
      for (let i = 0; i < textLine.length; i++) {
        const char = textLine[i];
        const fontFamily = this.getValueOfPropertyAt(lineIndex, i, 'fontFamily') as string;
        if (fontFamily === currentFontFamily) {
          currentString += char;
        } else {
          result[lineIndex].push({
            text: currentString,
            fontload: this.fontloadMap[currentFontFamily].fontload || this.fontloadMap[this.object.fontFamily].fontload,
          });
          currentFontFamily = fontFamily;
          currentString = char;
        }
        if (i === textLine.length - 1) {
          result[lineIndex].push({
            text: currentString,
            fontload: this.fontloadMap[currentFontFamily].fontload || this.fontloadMap[this.object.fontFamily].fontload,
          });
        }
      }
    });
    return result;
  }

  handleRelativePositionOfGlyphs() {
    const lignatureGlyphs = this.getLignatureByGlyphs();
    let glyphsData: Array<GlyphData[]> = [];
    for (const [lineIndex, lignature] of lignatureGlyphs.entries()) {
      if (lignature.length === 0) {
        continue;
      }
      let i = 0;
      glyphsData[lineIndex] = [];

      lignature.forEach((lignature: TextFontData, index: number) => {
        const { text, fontload } = lignature;
        const glyphs = fontload.stringToGlyphs(text) as Glyph[];
        const fontSize = this.getValueOfPropertyAt(lineIndex, i, 'fontSize') as number;
        const fill = this.getValueOfPropertyAt(lineIndex, i, 'fill') as string;
        const fontStyle = this.getValueOfPropertyAt(lineIndex, i, 'fontStyle') as string;
        // const fontFamily = this.getValueOfPropertyAt(lineIndex, i, 'fontFamily') as string;
        let path = glyphs[0].getPath(0, 0, fontSize) as TextPath;
        // if (['.notdef', '.null'].includes(glyphs[0].name as string)) {
        //   path = this.getPathFromFontLoad(text, fontSize) as TextPath;
        // }
        const charIndexStart = i;
        const charIndexEnd = i + text.length;
        glyphsData[lineIndex].push({
          top: this.textLines2[lineIndex][charIndexStart]?.top || 0,
          left: this.textLines2[lineIndex][charIndexStart]?.left || 0,
          charIndexStart,
          charIndexEnd,
          path,
          fill,
          fontStyle,
          fontSize,
          name: glyphs[0].name as string,
          glyph: glyphs[0],
          text: text,
        });
        i += text.length;
      });
    }
    glyphsData = glyphsData.filter(data => Boolean(data));
    return glyphsData;
  }

  getLignatureByGlyphs(): Array<TextFontData[]> {
    const textLinesData = this.preProcessFontData();
    const result: Array<TextFontData[]> = [];
    const tempResult: Array<Array<TextFontData[]>> = [];
    for (const [lineIndex, textLine] of textLinesData.entries()) {
      result[lineIndex] = [];
      tempResult[lineIndex] = [];
      textLine.forEach(({ text, fontload }) => {
        const lignature = this._getLignatureEachLineByGlyphs(text, fontload);
        tempResult[lineIndex].push(lignature);
      });
      result[lineIndex] = tempResult[lineIndex].flat();
    }
    return result;
  }

  getGlyphsData() {
    return this.handleRelativePositionOfGlyphs();
  }

  async exportPath(callback?: Function) {
    if (!this.object) {
      return {
        type: 'TEXT',
        elementTag: this.innerHTML,
        path: '',
      };
    }
    // this.getCharsData();
    await this.initTextData();
    this.glyphsData = this.getGlyphsData();
    const newData = {
      boundingElement: this.boundingElement,
      object: this.object,
      fontloadMap: this.fontloadMap,
      glyphsData: this.glyphsData,
      filterTags: this.filterTags,
    }
    const textPathService = new TextPathService(newData);
    const path = textPathService.getPaths((res: any) => {
      callback && callback(res);
    });
    return {
      type: 'TEXT',
      elementTag: this.innerHTML,
      path,
    }
  }
}