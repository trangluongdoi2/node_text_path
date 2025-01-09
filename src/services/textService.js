import { JSDOM } from 'jsdom';
import * as math from 'mathjs';
import { TextPathService } from './textPathService.js';
import {
  getContentByTag,
  getMatrixFromTransform,
  getTextParentTags,
  getRotationMatrixRatios,
} from '../utils-svg.js';
import { useFont } from '../composables/useFont.js';
import { useCaculateTransform } from '../useCaculateTransform.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { reCaculateTransform } = useCaculateTransform();

export class TextService {
  innerHTML;
  outerHTML;
  textContent;
  textParentData;
  rectData;
  textLines;
  __charBounds;
  tspanContents;
  boundingElement;
  _fontSizeFraction = 0.222;
  lineHeightScale = 1;
  fontloadMap = {};
  keyAttributesByTag = {
    rect: ['x', 'y', 'width', 'height'],
    tspan: ['x', 'y', 'dx', 'dy'],
    text: ['x', 'y', 'textAnchor', 'transform', 'fontFamily', 'fontSize'],
  }
  constructor(innerHTML, outerHTML, object) {
    this.outerHTML = outerHTML;
    this.innerHTML = innerHTML;
    this.object = { ...object };
    this.fontloadMap = {};
    this.textLines = {};
    this.__charBounds = {};
    this.tspanContents = [];
    this.boundingElement = {};
    this.processTextParentContent();
    this.processTextTagContent();
    this.processTextRectContent();
    this.getPositionOfBoundingBoxText();
  }

  getInstance() {
    if (!TextService.instance) {
      TextService.instance = new TextService(this.innerHTML, this.outerHTML, this.object);
    }
    return TextService.instance;
  }

  caculateCenterOfElementText({ x, y, angle }) {
    const { a, b, c, d } = getRotationMatrixRatios(angle);
    const rotationMatrix = math.matrix([[a, c], [b, d]]);
    const translateMatrix = math.matrix([[-this.object.width / 2], [-this.object.height / 2]]);
    const positionMatrix = math.matrix([[x], [y]]);
    const center = math.subtract(positionMatrix, math.multiply(rotationMatrix, translateMatrix));
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

  async loadFont() {
    const localPath = path.join(__dirname, '../fonts/font_1.woff');
    this.fontLoad = await useFont().loadFontFromOpenTypeByUrl(localPath);
    this.fontloadMap = {};
    // Need add multi styles
  }

  getStyleDeclaration(multiStyles, lineIndex, charIndex) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(object, lineIndex, charIndex, field) {
    const charStyle = this.getStyleDeclaration(object.styles, lineIndex, charIndex);
    return charStyle[field] ?? object[field];
  }

  getTopOffset() {
    const { height } = this.boundingElement;
    return -height / 2;
  }

  getHeightOfChar(lineIndex, charIndex) {
    return this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
  }

  getHeightOfLine(lineIndex) {
    let maxHeight = this.getHeightOfChar(lineIndex, 0);
    for (let i = 1; i < this.tspanContents[lineIndex].length; i++) {
      maxHeight = Math.max(this.getHeightOfChar(lineIndex, i), maxHeight);
    }
    return maxHeight;
  }

  getAdvanceWidthOfTextLine() {
    const advanceWidths = [];
    this.tspanContents.forEach((tspanData, lineIndex) => {
      let advanceWidth = 0;
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char, charIndex) => {
        const fontSize = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
        advanceWidth += this.fontLoad.getAdvanceWidth(char, fontSize);
      });
      advanceWidths.push(advanceWidth);
    });
    return advanceWidths;
  }

  getRelativeLeftOfTextLine() {
    const advanceWidths = this.getAdvanceWidthOfTextLine();
    const result = advanceWidths.map((advanceWidth) => -advanceWidth / 2);
    return result;
  }
  _getSafeLineHeight() {
    return this.lineHeightScale || 0.001;
  }

  // getLineWidth(lineIndex) {
  //   const lineWidth = this.getAdvanceWidthOfTextLine()[lineIndex];
  //   return lineWidth;
  // }

  // _getLineLeftOffset(lineIndex) {
  //   const lineWidth = this.getLineWidth(lineIndex),
  //     lineDiff = this.width - lineWidth,
  //     textAlign = this.textAlign,
  //     direction = this.direction,
  //     isEndOfWrapping = this.isEndOfWrapping(lineIndex);
  //   let leftOffset = 0;
  //   if (
  //     textAlign === JUSTIFY ||
  //     (textAlign === JUSTIFY_CENTER && !isEndOfWrapping) ||
  //     (textAlign === JUSTIFY_RIGHT && !isEndOfWrapping) ||
  //     (textAlign === JUSTIFY_LEFT && !isEndOfWrapping)
  //   ) {
  //     return 0;
  //   }
  //   if (textAlign === CENTER) {
  //     leftOffset = lineDiff / 2;
  //   }
  //   if (textAlign === RIGHT) {
  //     leftOffset = lineDiff;
  //   }
  //   if (textAlign === JUSTIFY_CENTER) {
  //     leftOffset = lineDiff / 2;
  //   }
  //   if (textAlign === JUSTIFY_RIGHT) {
  //     leftOffset = lineDiff;
  //   }
  //   if (direction === 'rtl') {
  //     if (
  //       textAlign === RIGHT ||
  //       textAlign === JUSTIFY ||
  //       textAlign === JUSTIFY_RIGHT
  //     ) {
  //       leftOffset = 0;
  //     } else if (textAlign === LEFT || textAlign === JUSTIFY_LEFT) {
  //       leftOffset = -lineDiff;
  //     } else if (textAlign === CENTER || textAlign === JUSTIFY_CENTER) {
  //       leftOffset = -lineDiff / 2;
  //     }
  //   }
  //   return leftOffset;
  // }

  isEndOfWrapping(lineIndex) {
    return lineIndex === this.tspanContents.length - 1;
  }

  measureLine(lineIndex) {
    const lineWidth = this.getAdvanceWidthOfTextLine()[lineIndex];
    return lineWidth;
  }

  _getLeftOffset() {
    return -this.boundingElement.width / 2 || 0;
  }

  _getLineLeftOffset(lineIndex) {
    const lineWidth = this.measureLine(lineIndex);
    const lineDiff = this.boundingElement.width - lineWidth;
    const textAlign = this.object.textAlign;
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

  handleTspanContent() {
    let lineHeights = 0;
    const safeLineHeight = this._getSafeLineHeight();
    const deltaY = this.getDeltaBetweenTextTagAndBoundingBox();
    let dyNew = 0;
    this.tspanContents.forEach((tspanData, lineIndex) => {
      const heightOfLine = this.getHeightOfLine(lineIndex);
      const maxHeight = heightOfLine / safeLineHeight;
      dyNew = dyNew + Number(tspanData.dy);
      const leftLineOffset = this._getLineLeftOffset(lineIndex);
      const top = dyNew - this.boundingElement.height / 2 - deltaY;
      if (!this.textLines[lineIndex]) {
        this.textLines[lineIndex] = {};
      }
      const charsEachLine = tspanData.text.split('');
      charsEachLine.forEach((char, charIndex) => {
        if (!this.textLines[lineIndex][charIndex]) {
          this.textLines[lineIndex][charIndex] = {};
        }
        const fontSize = this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontSize');
        const width = this.fontLoad.getAdvanceWidth(char, fontSize);
        const prevChar = this.textLines[lineIndex][charIndex - 1];
        let left = 0;
        if (prevChar) {
          left = prevChar.left + prevChar.width;
        }
        this.textLines[lineIndex][charIndex] = {
          char,
          fill: this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fill'),
          fontFamily: this.getValueOfPropertyAt(this.object, lineIndex, charIndex, 'fontFamily'),
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

    Object.keys(this.textLines).forEach((lineIndex) => {
      const line = this.textLines[lineIndex];
      const leftLineOffset = this._getLineLeftOffset(lineIndex);
      Object.keys(line).forEach((charIndex) => {
        const char = line[charIndex];
        char.left += letfOffset + leftLineOffset;
      });
    });
  }

  processTspanContent() {
    const { window } = new JSDOM(this.textTagData.content);
    const textElement = window.document.getElementsByTagName('text')[0];
    if (textElement) {
      this.tspanContents = this.getTagElements(textElement);
      this.handleTspanContent();
    }
  }

  getTagElements(element) {
    const spanEls = element.childNodes;
    const results = [];
    for (const child of spanEls) {
      if (!child.textContent) {
        continue;
      }
      if (child.nodeName === 'TSPAN') {
        const tagData = {
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

  async getCharsData() {
    await this.loadFont();
    this.processTspanContent();
    return this.textLines;
  }

  getElementArributes(content, keyAttributes) {
    const attributes = {};
    const numberAttributes = ['x', 'y', 'dx', 'dy', 'width', 'height'];
    const regex = /[\s\r\t\n]*([a-z0-9\-_]+)[\s\r\t\n]*=[\s\r\t\n]*(['"])((?:\\\2|(?!\2).)*)\2/gi;
    let match = null;
    while ((match = regex.exec(content))) {
      let attribute = match[1];
      const value = match[3];
      const index = attribute.indexOf('-');

      if (index !== -1) {
        attribute = attribute.replace('-', '');
        attribute = attribute.split('');
        attribute[index] = attribute[index].toUpperCase();
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
    return y - boundingBoxY;
  }

  // caculateBaseLine(opts) {
  //   const { ascender, descender, unitsPerEm, fontSize } = opts;
  //   const fontScale = 1 / unitsPerEm;
  //   const ascenderRatio = ascender * fontScale * fontSize;
  //   const descenderRatio = Math.abs(descender) * fontScale * fontSize;
  //   const padding = (ascenderRatio + descenderRatio - this.lineHeightScale * fontSize) / 2;
  //   return ascenderRatio - padding;
  // }

  async exportPath() {
    const res = await this.getCharsData();
    const newData = {
      charsMap: res,
      boundingElement: this.boundingElement,
      object: this.object,
      fontLoad: this.fontLoad,
    }
    const textPathService = new TextPathService(newData);
    const path = textPathService.getPaths();
    return {
      type: 'TEXT',
      elementTag: this.innerHTML,
      path,
    }
  }
}