import { useCaculateTransform } from '@/helper/transform';
import { BoundingElement, GlyphData, GraphemeBBox, ISectionSettings, RenderCharInfo, TextFontData, TextPath, TextStyleDeclaration, TspanContent } from '@/types/convert-text';
import { getContentByTag, getMatrixFromTransform, getRotationMatrixRatios, getTextParentTags, isEqual } from '@/utils-svg';
import { JSDOM } from 'jsdom';
import path from 'path';
import * as math from 'mathjs';
import { Font, Glyph } from 'opentype.js';
import { useFont } from '@/composables/useFont';
import { TextPathService } from './textPathService';
import MeasureCharsService from './measureCharsService';
import { getMeasuringCanvasForLoadFont } from '@/utilities/canvas';

const { reCaculateTransform } = useCaculateTransform();
const { loadFontFromOpenTypeByUrl } = useFont();

const SPACE_CHAR_CODE = 32;
const NON_BREAKING_SPACE_CHAR_CODE = 160;

export interface TextServiceInput {
  html: { outerHTML: string, innerHTML: string },
  data: { 
    masterElement: any, 
    settings?: ISectionSettings, 
    filterTags?: Array<{ type: string, tagUrl: string }>,
    rectData: string,
  }
}

export class TextService {
  static instance: TextService | undefined;
  declare innerHTML;
  declare outerHTML;
  declare textContent: string;
  declare textParentData: any;
  declare rectData: any;
  declare textLines: { [key: string]: { [key: string]: RenderCharInfo } };
  declare textLines2: Array<RenderCharInfo[]>
  declare __charBounds;
  declare tspanContents: TspanContent[];
  declare boundingElement: BoundingElement;
  declare fontLoad: Font;
  declare _textLines: Array<string[]>;
  declare textLinesArray: string[];
  private glyphsData: Array<GlyphData[]>;
  fontloadMap: Record<string, { fontload: Font, fontPath: string }> = {};
  private textSettings: ISectionSettings;
  declare object: any;
  declare filterTags: Array<{ type: string, tagUrl: string }>;
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
  DEFAULT_FONT_PATH = 'https://www.corjl.com/cdn/assets/fonts/default/TimesNewRoman.woff';

  constructor(options: TextServiceInput) {
    this.outerHTML = options.html.outerHTML;
    this.innerHTML = options.html.innerHTML;
    this.object = { ...options.data.masterElement };
    this.rectData = this.processTextRectContent(options.data.rectData);
    this.fontloadMap = {};
    this.textLines = {};
    this.textLines2 = [];
    this.__charBounds = {};
    this.tspanContents = [];
    this.filterTags = options.data.filterTags || [];
    // @ts-ignore
    this.textSettings = { ...options.data.settings || {} };
    this.boundingElement = {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0,
    }
    this.glyphsData = [];
  }

  private async initTextData() {
    this.processTextParentContent();
    this.processTextTagContent();
    // this.processTextRectContent();
    this.getPositionOfBoundingBoxText();
    await this.loadFont();
    await this.processTspanContent();
    this.getTextLines();
  }

  private hasCharSpacing() {
    return Boolean(this.object.charSpacing)
  }

  getTextLines() {
    this.textLinesArray = this.tspanContents.map((tspanData) => tspanData.text);
    this._textLines = this.textLinesArray.map((textLine: string) => textLine.split(''));
  }

  getDeltaYOfText() {
    const { params } = this.rectData;
    const { params: params2 } = this.textTagData;
    // @ts-ignore
    return params.y - params2.y;
  }

  caculateCenterOfElementText3() {
    const { 
      left, 
      top, 
      // width, 
      // height, 
      transformMatrix = [1, 0, 0, 1, 0, 0],
    } = this.object;
    // const halfW = width / 2;
    // const halfH = height / 2;

    const { params } = this.rectData;
    // console.log(params, '==> params...');
    // const { params = { x: 0, y: 0 } } = this.textTagData;
    // let x = left + params.width - this.object.width;
    // let y = top + params.height - this.object.height;

    const halfW = params.width / 2;
    const halfH = params.height / 2;

    if (this.object.resizeAsImage) {
      console.log(params.width, '==> params.width...');
      console.log(params.height, '==> params.height...');
      // console.log(params, '==> params...');
    }

    // const x = !this.object.resizeAsImage ? left : params.x;
    // const y = !this.object.resizeAsImage ? top : params.y;

    const x = left;
    const y = top;

    // We have the virtual center of the element from SVG Editor
    // const virtualCenter = {
    //   x: x + halfW,
    //   y: y + halfH,
    // };

    const virtualCenter = {
      x: x + halfW,
      y: y + halfH,
    }
    const deltaY = this.getDeltaYOfText();
    console.log(deltaY, '==> deltaY...');

    if (this.object.resizeAsImage) {
      // virtualCenter.x = 713.5449066162109;
      // virtualCenter.y = 800.2994384765625;
      // virtualCenter.x = 750.0000503998831;
      // virtualCenter.y = 636.2921806374337;
      // virtualCenter.y += deltaY / 2;
      // console.log(virtualCenter, '==> virtualCenter...');
    }

    const a = transformMatrix[0];
    const b = transformMatrix[1];
    const c = transformMatrix[2];
    const d = transformMatrix[3];
    const tx = transformMatrix[4];
    const ty = transformMatrix[5];

    const m1 = math.matrix([[a, c], [b, d]]);
    const m2 = math.matrix([[virtualCenter.x], [virtualCenter.y]]);
    const m3 = math.multiply(m1, m2);
    const m4 = math.matrix([[tx], [ty]]);
    let m5 = math.add(m4, m3);

    // const extra = {
    //   x: 0,
    //   y: -this.object.height * this.object.scaleY / 2,
    // }

    // const extra = {
    //   // x: -this.object.width * this.object.scaleX / 2,
    //   x: ((this.object.width / this.object.scaleX) - this.object.width) / 2,
    //   y: ((this.object.height / this.object.scaleY) - this.object.height) / 2,
    // }

    // const extra = {
    //   x: this.object.width - this.rectData.params.width,
    //   y: this.object.height - this.rectData.params.height,
    // }

    // const extra = {
    //   x: ((this.object.width / this.object.scaleX) - this.object.width) / 2,
    //   y: ((this.object.height / this.object.scaleY) - this.object.height) / 2,
    // }

    // const rotationExtra = {
    //   x: extra.x * a + extra.y * c,
    //   y: extra.x * b + extra.y * d,
    // }

    return {
      // @ts-ignore
      x: m5._data[0][0],
      // @ts-ignore
      y: m5._data[1][0],
    }
  }

  caculateCenter4() {
    const { transformMatrix } = this.object;
    const { params } = this.rectData;
    // console.log(params, '==> params...');
    // const { params: params2 } = this.textTagData;
    // @ts-ignore
    // return params.y - params2.y;

    // const w = this.object.width;
    // const h = this.object.height;
    const w = params.width;
    const h = params.height;
    const x1 = params.x;
    const y1 = params.y;
    // const x1 = this.object.left;
    // const y1 = this.object.top;
    const a = transformMatrix[0];
    const b = transformMatrix[1];
    const c = transformMatrix[2];
    const d = transformMatrix[3];
    const tx = transformMatrix[4];
    const ty = transformMatrix[5];

    const m1 = math.matrix([[a, c], [b, d]]);
    const m2 = math.matrix([[x1 + w / 2], [y1 + h / 2]]);
    const m3 = math.matrix([[tx], [ty]]);
    // console.log(m3, '==> m3...');
    const m4 = math.multiply(m1, m2);
    const m5 = math.add(m4, m3);
    // console.log(m5, '==> m5...');
    return {
      // @ts-ignore
      x: m5._data[0][0],
      // @ts-ignore
      y: m5._data[1][0],
    }
  }

  caculateCenterOfElementText({ x, y, angle }: { x: number, y: number, angle: number }) {
    const { a, b, c, d } = getRotationMatrixRatios(angle);
    const w = this.object.width;
    const h = this.object.height;
    const rotationMatrix = math.matrix([[a, c], [b, d]]);
    const translateMatrix = math.matrix([[-w / 2], [-h / 2]]);
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
    // const originalWidth = this.object.width;
    // const originalHeight = this.object.height;
    this.object.flipX = false;
    this.object.flipY = false;
    this.object.width = this.rectData.params.width;
    this.object.height = this.rectData.params.height;

    const position = reCaculateTransform(this.object);
    const center1 = this.caculateCenterOfElementText({ x: position.x, y: position.y, angle: originalAngle });
    // const center = this.caculateCenterOfElementText3();
    
    const center = this.caculateCenter4();
    // console.log(center1, '==> center1...');
    // console.log(center, '==> center...');
    this.object.angle = originalAngle;
    this.object.flipX = originalFlipX;
    this.object.flipY = originalFlipY;

    // this.boundingElement = {
    //   cx: center.x,
    //   cy: center.y,
    //   width: this.rectData.params.width,
    //   height: this.rectData.params.height,
    // };

    this.boundingElement = {
      cx: center1.x,
      cy: center1.y,
      width: this.rectData.params.width,
      height: this.rectData.params.height,
    };

    if (this.object.resizeAsImage) {
      // this.boundingElement.cy += 113.7268055103442;
      console.log(this.boundingElement, '==> RESIZE AS IMAGE this.boundingElement...');
    }

    if (!this.object.resizeAsImage) {
      // this.boundingElement.cy += 113.7268055103442;
      console.log(this.boundingElement, '==> NOT RESIZE AS IMAGE this.boundingElement...');
    }
  }

  async loadFont() {
    // @ts-ignore
    for (const [fontFamily, { fontPath = '' }] of Object.entries(this.object.fontloadMap)) {
      const fontLoad = await loadFontFromOpenTypeByUrl(fontPath) as unknown as Font;
      this.fontloadMap[fontFamily] = {
        fontload: fontLoad,
        fontPath,
      }
    }
    const defaultFontload = await loadFontFromOpenTypeByUrl(this.DEFAULT_FONT_PATH) as unknown as Font;
    this.fontloadMap['fallback'] = {
      fontload: defaultFontload,
      fontPath: this.DEFAULT_FONT_PATH,
    }
    // console.log(this.fontloadMap, '==> this.fontloadMap...');
  }

  getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(lineIndex: number, charIndex: number, field: string) {
    const charStyle = this.getStyleDeclaration(this.object.styles, lineIndex, charIndex);
    return charStyle[field] ?? this.object[field];
  }

  getAdvanceWidthOfTextLine() {
    const advanceWidths: number[] = [];
    const charSpacing = this._getWidthOfCharSpacing();

    this.tspanContents.forEach((tspanData, lineIndex) => {
      let advanceWidth = 0;
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((_, charIndex: number) => {
        advanceWidth += this.textLines2[lineIndex][charIndex].kernedWidth;
      });
      if (charSpacing !== 0) {
        advanceWidth -= charSpacing;
      }
      advanceWidths.push(advanceWidth);
    });
    return advanceWidths;
  }

  isEndOfWrapping(lineIndex: number) {
    return lineIndex === this.tspanContents.length - 1;
  }

  measureLine(lineIndex: number) {
    const lineWidth = this.getAdvanceWidthOfTextLine()[lineIndex];
    return lineWidth;
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

  _measureChar(char: string, charStyle: any, previousChar: string | undefined, prevCharStyle: any) {
    function validChar(char: string | undefined | null) {
      return char !== null && char !== undefined && char !== ' ';
    }

    const fontDeclaration = this._getFontDeclaration(charStyle);
    const stylesAreEqual = 
      previousChar && 
      fontDeclaration === this._getFontDeclaration(prevCharStyle);

    const fontSize = (charStyle?.fontSize || this.object.fontSize);
    const fontFamily = (charStyle?.fontFamily || this.object.fontFamily);
    const fontPath = this.fontloadMap[fontFamily]?.fontPath;
    const data = {
      fontPath,
      fontSize,
      fontFamily,
      fontStyleDecalaration: fontDeclaration,
    }
    const { ctx } = getMeasuringCanvasForLoadFont(data);
    let width = 0;
    let kernedWidth = width = ctx.measureText(char).width;

    if (validChar(previousChar) && validChar(char) && stylesAreEqual) {
      const coupleChar = previousChar + char;
      const coupleWidth = ctx.measureText(coupleChar).width;
      const prevAdvanceWidth = ctx.measureText(previousChar).width;
      kernedWidth = coupleWidth - prevAdvanceWidth;
    }

    return {
      width,
      kernedWidth,
    };
  }

  _getLeftOffset() {
    return (-this.boundingElement.width) / 2 || 0;
  }

  _getLineLeftOffset(lineIndex: number) {
    // console.log(this.boundingElement.width, '==> this.boundingElement.width.');
    const lineWidth = this.measureLine(lineIndex);
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

  async onCaculateCharWidth() {
    const handleFontLoad = Object.entries(this.fontloadMap).map(([fontFamily, { fontPath }]) => {
      return {
        fontFamily,
        fontPath,
      }
    });

    const payload = {
      masterElement: this.object,
      tspanContents: this.tspanContents,
      fontloadInfos: handleFontLoad,
    }

    return await MeasureCharsService.measureChars(payload);
  }

  async handleTspanContent2() {
    let top = -this.boundingElement.height / 2;
    // let top = 0;
    this.tspanContents.forEach((tspanData, lineIndex) => {
      // RELATIVE
      top += Number(tspanData.dy) + Number(tspanData.dy) * (this.object.scaleY - 1);
      if (!this.textLines2[lineIndex]) {
        this.textLines2[lineIndex] = [];
      }
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char: string, charIndex: number) => {
        const fontSize = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize');
        const fontFamily = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontFamily');
        const fontWeight = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontWeight');
        const fontStyle = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontStyle') || 'normal';
        const linethrough = this.getValueOfPropertyAt(lineIndex, charIndex, 'linethrough') || false;
        const overline = this.getValueOfPropertyAt(lineIndex, charIndex, 'overline') || false;
        const uppercase = this.getValueOfPropertyAt(lineIndex, charIndex, 'uppercase') || false;

        let prevChar = this.textLines2[lineIndex][charIndex - 1];

        const stylesChar = {
          fontFamily,
          fontSize,
          fontWeight,
          fontStyle,
          linethrough,
          overline,
          uppercase,
        }

        const prevStylesChar = {
          fontFamily: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontFamily'),
          fontSize: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontSize'),
          fontWeight: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontWeight'),
          fontStyle: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'fontStyle') || 'normal',
          linethrough: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'linethrough') || false,
          overline: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'overline') || false,
          uppercase: this.getValueOfPropertyAt(lineIndex, charIndex - 1, 'uppercase') || false,
        }

        if (stylesChar.uppercase) {
          char = char.toUpperCase();
        }

        const info = this._measureChar(char, stylesChar, prevChar?.char, prevStylesChar);
        // TODO: Need recaculate this function!
        // const info = dataWidth[lineIndex][charIndex];

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

  processTextRectContent(content: string) {
    return {
      content,
      params: this.getElementArributes(content, this.keyAttributesByTag['rect']),
    }
  }

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
      // space or non-breaking space
      if (textLine.length === 0 || textLine.every(char => [SPACE_CHAR_CODE, NON_BREAKING_SPACE_CHAR_CODE].includes(char.charCodeAt(0)))) {
        console.log('Case Breadk??')
        return;
      }
      let currentString = '';
      let currentFontFamily = this.getValueOfPropertyAt(lineIndex, 0, 'fontFamily') as string;
      for (let i = 0; i < textLine.length; i++) {
        const fontFamily = this.getValueOfPropertyAt(lineIndex, i, 'fontFamily') as string;
        const uppercase = this.getValueOfPropertyAt(lineIndex, i, 'uppercase') as boolean;
        const char = uppercase ? textLine[i].toUpperCase() : textLine[i];
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
        let path = glyphs[0].getPath(0, 0, fontSize) as TextPath;
        if (['.notdef', '.null'].includes(glyphs[0].name as string)) {
          console.log('case notdef or null');
          path = this.fontloadMap['fallback'].fontload.stringToGlyphs(text)[0].getPath(0, 0, fontSize) as TextPath;
        }
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