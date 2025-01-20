import { useCaculateTransform } from '@/helper/transform';
import { BoundingElement, RenderCharInfo, TextStyleDeclaration, TspanContent } from '@/types/convert-text';
import { getContentByTag, getRotationMatrixRatios, getTextParentTags, isEqual } from '@/utils-svg';
import { JSDOM } from 'jsdom';
import path from 'path';
import * as math from 'mathjs';
import { Font } from 'opentype.js';
import { useFont } from '@/composables/useFont';
import { TextPathService } from './textPathService';
import { getMeasuringContext } from '@/utilities/canvas';

const { reCaculateTransform  }  = useCaculateTransform()

export class TextService {
  static instance: TextService | undefined;
  declare innerHTML;
  declare outerHTML;
  declare textContent: string;
  declare textParentData: any;
  declare rectData: any;
  declare textLines: Record<string, Record<string, RenderCharInfo>>;
  declare __charBounds;
  declare tspanContents: TspanContent[];
  declare boundingElement: BoundingElement;
  declare fontLoad: Font;
  _fontSizeFraction = 0.222;
  lineHeightScale = 1;
  fontloadMap: Record<string, { fontload: Font }> = {};
  declare object: any;
  declare textTagData: {
    content: string,
    params: Record<string, string | number>,
  }
  keyAttributesByTag: Record<string, string[]> = {
    rect: ['x', 'y', 'width', 'height'],
    tspan: ['x', 'y', 'dx', 'dy'],
    text: ['x', 'y', 'textAnchor', 'transform', 'fontFamily', 'fontSize'],
  }

  constructor(innerHTML: string, outerHTML: string, object: any) {
    this.outerHTML = outerHTML;
    this.innerHTML = innerHTML;
    this.object = { ...object };
    this.fontloadMap = {};
    this.textLines = {};
    this.__charBounds = {};
    this.tspanContents = [];
    this.boundingElement = {
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
      width: 0,
      height: 0,
    }
    this.processTextParentContent();
    this.processTextTagContent();
    this.processTextRectContent();
    this.getPositionOfBoundingBoxText();
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
    // console.log(center, '==> center...');
    this.object.angle = originalAngle;
    this.object.flipX = originalFlipX;
    this.object.flipY = originalFlipY;
    const w = this.rectData.params.width || this.object.width;
    const h = this.rectData.params.height || this.object.height;
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
    const localPath = path.join(__dirname, '../fonts/wavsujv5preyca7l.woff');
    const fontLoad = useFont().loadFontFromOpenTypeByLocalPath(localPath);
    if (!this.fontloadMap[this.object.fontFamily]) {
      this.fontloadMap[this.object.fontFamily] = { fontload: fontLoad };
    }
  }

  getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(object: any, lineIndex: number, charIndex: number, field: string) {
    const charStyle = this.getStyleDeclaration(object.styles, lineIndex, charIndex);
    if (field === 'fontFamily') {
      // @ts-ignore
      console.log(this.object.type, '==> this.object.type...');
      console.log(this.object.elementKey, '==> this.object.elementKey...');
    }
    return charStyle[field] ?? object[field];
  }

  getTopOffset() {
    const { height } = this.boundingElement;
    return -height / 2;
  }

  getHeightOfChar(lineIndex: number, charIndex: number) {
    return this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
  }

  getHeightOfLine(lineIndex: number) {
    let maxHeight = this.getHeightOfChar(lineIndex, 0);
    for (let i = 1; i < this.tspanContents[lineIndex].text.length; i++) {
      maxHeight = Math.max(this.getHeightOfChar(lineIndex, i), maxHeight);
    }
    return maxHeight;
  }

  getAdvanceWidthOfTextLine() {
    const advanceWidths: number[] = [];
    this.tspanContents.forEach((tspanData, lineIndex) => {
      let advanceWidth = 0;
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char: string, charIndex: number) => {
        const fontSize = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
        const fontFamily = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontFamily');
        const fontload = this.fontloadMap[fontFamily].fontload;
        advanceWidth += fontload.getAdvanceWidth(char, fontSize);
      });
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
    return lineWidth;
  }

  _setTextStyles(
    ctx: CanvasRenderingContext2D,
    charStyle?: any,
    forMeasuring?: boolean,
  ) {
    ctx.textBaseline = 'alphabetic';
    console.log(charStyle, '==> charStyle...');
    // ctx.font = this._getFontDeclaration(charStyle, forMeasuring);
  }

  // _measureChar(char: string, stylesChar: any, prevChar: string | undefined, styleChar: any) {
  //   // let width: number | undefined,
  //   // coupleWidth: number | undefined,
  //   // previousWidth: number | undefined,
  //   // kernedWidth: number | undefined;
  //   // const couple = prevChar + char;

  //   // const stylesAreEqual = prevChar && isEqual(stylesChar, styleChar);
  //   // kernedWidth = width = this.ctx.measureText(char).width;

  //   // if (width === undefined ||
  //   //   previousWidth === undefined ||
  //   //   coupleWidth === undefined
  //   // ) {
  //   //   if (previousWidth === undefined && stylesAreEqual && prevChar) {
  //   //     previousWidth = this.ctx.measureText(prevChar).width;
  //   //   }
  
  //   //   if (stylesAreEqual && coupleWidth === undefined) {
  //   //     coupleWidth = this.ctx.measureText(couple).width;
  //   //     kernedWidth = coupleWidth - previousWidth!;
  //   //   }
  //   // }
  //   const fontload = this.fontloadMap[styleChar.fontFamily].fontload;
  //   // @ts-ignore
  //   const prevFontload = this.fontloadMap[prevChar?.fontFamily as string].fontload;
  //   console.log(fontload, prevFontload, '==> fontload, prevFontload...');

  //   const glyphId = fontload.charToGlyphIndex(char);
  //   const prevGlyphId = prevChar ? prevFontload.charToGlyphIndex(prevChar) : null;

    
  //   return {
  //     width: 0,
  //     kernedWidth: 0,
  //   }
  // }

  _measureChar2(char: string, stylesChar: any, prevChar: string | undefined, prevStylesChar: any) {
    const fontload = this.fontloadMap[stylesChar?.fontFamily]?.fontload;
    const prevFontload = this.fontloadMap[prevStylesChar?.fontFamily]?.fontload;
    const glyphId = fontload.charToGlyphIndex(char);
    const prevGlyphId = prevChar ? prevFontload.charToGlyphIndex(prevChar) : null;
    console.log(glyphId, prevGlyphId, '==> glyphId, prevGlyphId...');
    const glyph = fontload.glyphs.get(glyphId);
    // @ts-ignore
    const advanceWidth = glyph.advanceWidth * (stylesChar?.fontSize || this.object.fontSize) / fontload.unitsPerEm;
    let kerning = 0;
    if (prevGlyphId) {
      console.log(prevFontload.getKerningValue(prevGlyphId, glyphId));
      // console.log(prevStylesChar?.fontSize || this.object.fontSize, '==> prevStylesChar?.fontSize || this.object.fontSize..');
      // console.log(prevFontload.unitsPerEm, '==> prevFontload.unitsPerEm..');
      // const prevGlyph = prevFontload.glyphs.get(prevGlyphId) as any;
      kerning = prevFontload.getKerningValue(prevGlyphId, glyphId) * (prevStylesChar?.fontSize || this.object.fontSize) / prevFontload.unitsPerEm;
    }
    
    return {
      width: advanceWidth,
      kernedWidth: advanceWidth + kerning,
    }
  }

  _getLeftOffset() {
    return -this.boundingElement.width / 2 || 0;
  }

  _getLineLeftOffset(lineIndex: number) {
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

  _getWidthOfCharSpacing(charSpacing: number) {
    if (this.object?.charSpacing !== 0) {
      return (this.object.fontSize * charSpacing) / 1000;
    }
    return 0;
  }

  // TODO: Need recaculate this function!
  handleTspanContent() {
    let lineHeights = 0;
    const safeLineHeight = this._getSafeLineHeight();
    let dyNew = 0;
    this.tspanContents.forEach((tspanData, lineIndex) => {
      const heightOfLine = this.getHeightOfLine(lineIndex);
      const maxHeight = heightOfLine / safeLineHeight;
      dyNew = dyNew + Number(tspanData.dy);

      const top = -this.boundingElement.height / 2 + dyNew;

      if (!this.textLines[lineIndex]) {
        this.textLines[lineIndex] = {};
      }
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char: string, charIndex: number) => {
        if (!this.textLines[lineIndex][charIndex]) {
          this.textLines[lineIndex][charIndex] = {} as RenderCharInfo;
        }
        const fontSize = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
        const fontFamily = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontFamily');
        const prevFontFamily = this.textLines[lineIndex][charIndex - 1]?.fontFamily;
        const fontload = this.fontloadMap[fontFamily].fontload;
        const prevChar = this.textLines[lineIndex][charIndex - 1];

        // const styleChar = this._getStyleDeclaration(lineIndex, charIndex);

        const stylesChar = {
          fontFamily, 
          fontSize,
        }
        const prevStylesChar = {
          fontFamily: this.getValueOfPropertyAt(this.object, lineIndex, charIndex - 1, 'fontFamily'),
          fontSize: this.getValueOfPropertyAt(this.object, lineIndex, charIndex - 1, 'fontSize'),
        }
        
        const info = this._measureChar2(char, stylesChar, prevChar?.char, prevStylesChar);
        let width = info.width,
        kernedWidth = info.kernedWidth,
        charSpacing = 0;
        if (this.object.charSpacing !== 0) {
          charSpacing = this._getWidthOfCharSpacing(this.object.charSpacing);
        }
        width = width + charSpacing;
        kernedWidth = kernedWidth + charSpacing;
        
        let left = 0;
        if (prevChar) {
          left = prevChar.left + prevChar.width + info.kernedWidth - info.width;
        }
        this.textLines[lineIndex][charIndex] = {
          char,
          fill: this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fill'),
          fontFamily,
          fontSize,
          fontWeight: this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontWeight'),
          fontStyle: this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontStyle'),
          x: Number(tspanData.x),
          dy: Number(tspanData.dy),
          y: dyNew,
          top,
          left,
          width,
          dyNew,
        }
      });
      lineHeights += heightOfLine;
    });

    const letfOffset = this._getLeftOffset();

    Object.keys(this.textLines).forEach((lineIndex: string) => {
      const line = this.textLines[lineIndex];
      const leftLineOffset = this._getLineLeftOffset(Number(lineIndex));
      Object.keys(line).forEach((charIndex) => {
        const char = line[charIndex];
        char.left += letfOffset + leftLineOffset;
      });
    });
  }

  processTspanContent() {
    const { window } = new JSDOM(this.textTagData.content);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    if (textElement) {
      this.tspanContents = this.getTagElements(textElement);
      this.handleTspanContent();
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
          children: this.getTagElements(child,),
        };
        results.push(tagData);
      }
    }
    return results;
  }

  getCharsData() {
    this.loadFont();
    this.processTspanContent();
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

  processTextRectContent() {
    const content = getContentByTag(this.innerHTML, 'rect');
    this.rectData = {
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

  getDeltaBetweenTextTagAndBoundingBox() {
    const { y } = this.textTagData.params;
    const { y: boundingBoxY } = this.rectData.params;
    const deltaY = Number(y) - boundingBoxY;
    return deltaY;
  }

  _getStyleDeclaration(
    lineIndex: number,
    charIndex: number,
  ): TextStyleDeclaration {
    const lineStyle = this.object.styles && this.object.styles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  exportPath(callback?: Function) {
    const res = this.getCharsData();
    const newData = {
      charsMap: res,
      boundingElement: this.boundingElement,
      object: this.object,
      fontloadMap: this.fontloadMap,
      deltaY: this.getDeltaBetweenTextTagAndBoundingBox(),
    }
    const textPathService = new TextPathService(newData);
    const path = textPathService.getPaths();
    callback && callback({ ...this.boundingElement, y: this.boundingElement.y - this.getDeltaBetweenTextTagAndBoundingBox() });
    return {
      type: 'TEXT',
      elementTag: this.innerHTML,
      path,
    }
  }
}