import { JSDOM } from 'jsdom';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getContentByTag,
  getMatrixFromTransform,
  getTextParentTags,
  getRotationMatrixRatios,
} from './utils-svg.js';
import { useFont } from './composables/useFont.js';
import { clone } from './utilities/index.js';
import { useCaculateTransform } from './useCaculateTransform.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { reCaculateTransform } = useCaculateTransform();

export class TextPathService {
  instance;
  elementTag;
  outerHTML;
  textLinesData;
  textLinesArray;
  keyAttributesByTag = {
    rect: ['x', 'y', 'width', 'height'],
    tspan: ['x', 'y', 'dx', 'dy'],
    text: ['x', 'y', 'textAnchor', 'transform', 'fontFamily', 'fontSize'],
  }
  object1;
  object2;
  textParentContent;
  textTagContent;
  rectTagContent;
  textParentParams;
  textTagParams;
  rectTagParams;
  fontLoad;
  boundingElement;
  constructor(elementTag, outerHTML, object1, object2) {
    this.elementTag = elementTag;
    this.outerHTML = outerHTML;
    this.object1 = object1;
    this.object2 = object2;
    this.rectTagParams = {};
    this.textTagParams = {};
    this.textParentParams = {};
    this.textLinesData = {};
    // this.textLinesArray = [];
    this.boundingElement = {};
    this.textLinesArray = this.object1.originalText.split('\n');
    console.log(this.textLinesArray, '==> this.textLinesArray...');
  }

  getInstance() {
    if (!TextPathService.instance) {
      TextPathService.instance = new TextPathService(this.elementTag, this.outerHTML, this.object1, this.object2);
    }
    return TextPathService.instance;
  }

  async loadFonts() {
    const localPath = path.join(__dirname, './fonts/font_1.woff');
    this.fontLoad = await useFont().loadFontFromOpenTypeByUrl(localPath);
  }

  getRectContent() {
    this.rectTagContent = getContentByTag(this.elementTag, 'rect');
    if (!Object.keys(this.rectTagParams).length) {
      this.rectTagParams = this.getElementArributes(this.rectTagContent, this.keyAttributesByTag['rect']);
    }
    return this.rectTagContent;
  }
  
  getTextContent() {
    this.textTagContent = getContentByTag(this.elementTag, 'text')?.[0] || '';
    if (!Object.keys(this.textTagParams).length) {
      this.textTagParams = this.getElementArributes(this.textTagContent, this.keyAttributesByTag['text']);
    }
    return this.textTagContent;
  }

  getTextParentContent() {
    this.textParentContent = getTextParentTags(this.outerHTML)?.[0] || '';
    if (!Object.keys(this.textParentParams).length) {
      this.textParentParams = this.getElementArributes(this.textParentContent, this.keyAttributesByTag['text']);
    }
    return this.textParentContent;
  }

  getGroupMatrix() {
    const textPrarentTransform = getMatrixFromTransform(this.textParentParams.transform);
    return textPrarentTransform;
  }

  getAllSpanContent() {
    const leftRelative = this.getRelativeLeftOfTextLine();
    const tspanContents = getContentByTag(this.elementTag, 'tspan');
    tspanContents.forEach((tspanContent, lineIndex) => {
      const { window } = new JSDOM(tspanContent);
      const { document } = window;
      const textContent = document.body.textContent;
      const textLines = textContent.split('');
      const textLineAttrs = this.getElementArributes(tspanContent, this.keyAttributesByTag['tspan']);
      textLines.forEach((char, charIndex) => {
        if (!this.textLinesData[lineIndex]) {
          this.textLinesData[lineIndex] = {};
        }
        if (!this.textLinesData[lineIndex][charIndex]) {
          this.textLinesData[lineIndex][charIndex] = {};
        }
        const fontSize = Number(this.textTagParams.fontSize.replace('px', ''));
        const prevChar = this.textLinesData[lineIndex][charIndex - 1];
        const width = this.fontLoad.getAdvanceWidth(char, fontSize);
        let left = 0;
        let top = -fontSize / 2 + textLineAttrs.dy;
        if (prevChar) {
          left = prevChar.left + prevChar.width;
        } else {
          left = leftRelative[lineIndex];
        }
        top = lineIndex * fontSize;
        this.textLinesData[lineIndex][charIndex] = {
          ...textLineAttrs,
          char,
          fontSize,
          top,
          left,
          width,
        };
        // console.log(this.textLinesData[lineIndex][charIndex], '==> this.textLinesData[lineIndex][charIndex]...');
      });
    });
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

  getStyleDeclaration(multiStyles, lineIndex, charIndex) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(object, lineIndex, charIndex, field) {
    const charStyle = this.getStyleDeclaration(object.styles, lineIndex, charIndex);
    return charStyle[field] ?? object[field];
  }

  getPathContent(path, transform) {
    if (!path.commands?.length) {
      return '';
    }

    const pathContent = path.commands.map((command) => {      
      const commandMap = new Map();
      let finalContent = `${command.type} `;

      if (typeof command.x1 !== 'undefined') {
        command.x1 += transform.x;
        commandMap.set('x1', command.x1);
      }
      if (typeof command.y1 !== 'undefined') {
        command.y1 += transform.y;
        commandMap.set('y1', command.y1);
      }
      if (typeof command.x2 !== 'undefined') {
        command.x2 += transform.x;
        commandMap.set('x2', command.x2);
      }
      if (typeof command.y2 !== 'undefined') {
        command.y2 += transform.y;
        commandMap.set('y2', command.y2);
      }
      if (typeof command.x !== 'undefined') {
        command.x += transform.x;
        commandMap.set('x', command.x);
      }
      if (typeof command.y !== 'undefined') {
        command.y += transform.y;
        commandMap.set('y', command.y);
      }
      for (const [_, val] of commandMap.entries()) {
        finalContent += `${val} `;
      }
      return finalContent;
    });
    return pathContent.join('');
  };

  getDataPath(path, transform, lineIndex, charIndex) {
    const clonePathContent = [];

    const purePath = clone(path);
    const transformPurePath = {
      x: transform.x,
      y: transform.y,
      isItalicStyle: transform.isItalicStyle,
    };

    clonePathContent.push(this.getPathContent(purePath, transformPurePath));

    return clonePathContent.join('');
  };

  getPathByChar(charData, lineIndex, charIndex) {
    const path = this.fontLoad.getPath(charData.char, 0, 0, charData.fontSize);
    // const advanceWidth = this.fontLoad.getAdvanceWidth(charData.char, charData.fontSize);
    // const advanceWidths = this.getAdvanceWidthOfTextLine();
    // const maxAdvanceWidth = Math.max(...advanceWidths);
    // const deltaLeft = (this.rectTagParams.width - maxAdvanceWidth) / 2;
    const transform = {
      x: charData.left,
      y: charData.top,
      isItalicStyle: charData?.fontStyle === 'italic',
    };
    const caculatedPath = this.getDataPath(path, transform, lineIndex, charIndex);
    const matrix = `matrix(1 0 0 1 0 0)`;
    const pathContent = `
      <g transform="${matrix}">
        <path d="${caculatedPath}" />
      </g>`;
    return pathContent;
  };

  getTextPaths() {
    this.getPositionOfBoundingBoxText();
    const originalPaths = [];
    this.textLinesArray.forEach((textLines, lineIndex) => {
      const charsOfTextLine = textLines.split('');
      charsOfTextLine.forEach((_, charIndex) => {
        const pathByChar = this.getPathByChar(this.textLinesData[lineIndex][charIndex], lineIndex, charIndex);
        originalPaths.push(pathByChar);
      });
    });
    const advanceWidths = this.getAdvanceWidthOfTextLine();
    const maxAdvanceWidth = Math.max(...advanceWidths);
    const deltaLeft = (this.rectTagParams.width - maxAdvanceWidth) / 2;
    const { a, b, c, d } = getRotationMatrixRatios(this.object1.angle);
    console.log(a, b, c , d, '===> rotationMatrixRatios...');
    const { x, y, cx, cy, width, height } = this.boundingElement;
    const left = -width / 2;
    const top = -height / 2;
    const tx = a * left + c * top + cx + deltaLeft;
    const ty = b * left + d * top + cy;

    console.log(tx, ty, '===> tx, ty...');
    console.log(x, y, '===> x, y...');
    
    const newMatrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;
    return `
      <g transform="${newMatrix}">
        ${originalPaths.join('')}
      </g>
    `;
  }

  getPositionOfBoundingBoxText() {
    const originalAngle = this.object1.angle;
    const originalFlipX = this.object1.flipX;
    const originalFlipY = this.object1.flipY;
    this.object1.flipX = false;
    this.object1.flipY = false;
    const position = reCaculateTransform(this.object1);
    this.object1.angle = originalAngle;
    this.object1.flipX = originalFlipX;
    this.object1.flipY = originalFlipY;
    this.boundingElement = {
      x: position.x,
      y: position.y,
      cx: position.x + this.object1.width / 2,
      cy: position.y + this.object1.height / 2,
      width: this.object1.width,
      height: this.object1.height,
    };
  }

  getRelativeLeftOfTextLine() {
    const advanceWidths = this.getAdvanceWidthOfTextLine();
    const { width: rectWidth } = this.rectTagParams;
    const result = advanceWidths.map((advanceWidth) => -advanceWidth / 2);
    return result;
  }

  getAdvanceWidthOfTextLine() {
    const fontSize = Number(this.textTagParams.fontSize.replace('px', ''));
    // this.textLinesArray.forEach((textLines) => {
    //   const advanceWidth = textLines.split('').map((char) => this.fontLoad.getAdvanceWidth(char, fontSize)).reduce((prev, curr) => prev + curr, 0);
    //   console.log(advanceWidth, '==> advanceWidth...');
    // });
    const result = this.textLinesArray.map((textLines) => this.fontLoad.getAdvanceWidth(textLines, fontSize));
    // console.log(result, '==> result...');
    return result;
  }

  getTextLines() {
    const { originalText } = this.object1;
    this.textLinesArray = originalText.split('\n');
  }

  async exportPath() {
    this.textLinesArray = [];
    this.textLinesData = {};
   
    await this.loadFonts();

    this.getTextLines();
    this.getPositionOfBoundingBoxText();
    this.getTextParentContent();
    this.getTextContent();
    this.getRectContent();
    this.getAllSpanContent();
    const resultPath = this.getTextPaths();
    return {
      type: 'TEXT',
      elementTag: this.elementTag,
      path: resultPath,
    }
  }
}