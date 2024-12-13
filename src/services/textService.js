import { JSDOM } from 'jsdom';
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


// const mockObject = {
//   "elementKey": "d8ea13",
//   "sectionIndex": 1,
//   "originalText": "Nguyen\nTanVinh",
//   "left": 256.7923278808594,
//   "fontSize": 160.53473751868012,
//   "width": 1085.146691010979,
//   "height": 156.27610342843195,
//   "top": 903.3069343404106,
//   "type": "textbox",
//   "fill": "#FFC0C0",
//   "asset": {
//       "selected": "AF01J3PFV429770TKBA751TP04AC",
//       "available": [
//           "AF01J3PFV429770TKBA751TP04AC"
//       ]
//   },
//   "transformMatrix": [
//       1,
//       0,
//       0,
//       1,
//       -256.7922968894336,
//       -896.4917831533284
//   ],
//   "fontFamily": "font-ptlxvvrkph",
//   "styles": {
//       "1": {
//           "3": {
//               "fill": "#C0D1FF"
//           },
//           "4": {
//               "fill": "#C0D1FF"
//           }
//       }
//   },
//   "backstage": {
//       "corjl1Styles": {}
//   },
//   "scaleX": 1,
//   "scaleY": 1,
//   "cropX": 0,
//   "cropY": 0,
//   "originX": "left",
//   "originY": "top",
//   "flipX": false,
//   "flipY": false,
//   "opacity": 1,
//   "angle": 0,
//   "skewX": 0,
//   "skewY": 0,
//   "selectable": true,
//   "visible": true,
//   "isMakeClippingMask": false,
//   "crossOrigin": "anonymous",
//   "outsideArtboard": false,
//   "textAlign": "center",
//   "resizeAsImage": false,
//   "lineHeight": 1,
//   "placeholder": "Enter Text Here",
//   "charSpacing": 0,
//   "wrapText": false,
//   "text": "Nguyen\nTanVinh",
//   "strokeWidth": 0,
//   "canReplaceImage": false,
//   "lockSize": false,
//   "lockStyle": false,
//   "selectionStart": 10,
//   "selectionEnd": 12
// }

// const textTagContent = `
// <text id="eafacd_canvas_text_d8ea13" font-family="&quot;font-ptlxvvrkph&quot;, 'Times', 'Arial'" x="799.3656733863489" y="903.3069343404106" fill="#ffc0c0" font-size="160.53473751868012px" letter-spacing="0" family="&quot;font-ptlxvvrkph&quot;, 'Times', 'Arial'" size="160.53473751868012px" text-anchor="middle" transform="matrix(1,0,0,1,0,0)" data-svg-origin="799.3656733863489 897.466552734375" style="translate: none; rotate: none; scale: none; transform-origin: 0px 0px;"><tspan id="SvgjsTspan1869" x="799.3656733863489" dy="142.54512703990224">Nguyen</tspan><tspan id="SvgjsTspan1870" x="799.3656733863489" dy="160.53473751868012">Tan<tspan style="fill: rgb(192, 209, 255);">Vi</tspan>nh<tspan></tspan></tspan></text>
// `;

// const mockObject2 = {
//     "elementKey": "d8ea13",
//     "sectionIndex": 1,
//     "originalText": "Nguyen\nTa nV \ninh",
//     "left": 256.7923278808594,
//     "fontSize": 168.875,
//     "width": 1141.5233255864966,
//     "height": 156.27610342843195,
//     "top": 903.3069343404106,
//     "type": "textbox",
//     "fill": "#FFC0C0",
//     "asset": {
//         "selected": "AF01J3PFV429770TKBA751TP04AC",
//         "available": [
//             "AF01J3PFV429770TKBA751TP04AC"
//         ]
//     },
//     "transformMatrix": [
//         1,
//         0,
//         0,
//         1,
//         -284.98061417719236,
//         -896.4917831533284
//     ],
//     "fontFamily": "font-ptlxvvrkph",
//     "styles": {
//         "0": {
//             "2": {
//                 "fontSize": 218.875,
//                 "fill": "#BF2121"
//             },
//             "3": {
//                 "fontSize": 218.875,
//                 "fill": "#BF2121"
//             }
//         },
//         "1": {
//             "3": {
//                 "fontWeight": "bold",
//                 "fontStyle": "italic"
//             },
//             "4": {
//                 "fontWeight": "bold",
//                 "fontStyle": "italic"
//             },
//             "5": {
//                 "fontWeight": "bold",
//                 "fontStyle": "italic"
//             }
//         }
//     },
//     "backstage": {
//         "corjl1Styles": {}
//     },
//     "scaleX": 1,
//     "scaleY": 1,
//     "cropX": 0,
//     "cropY": 0,
//     "originX": "left",
//     "originY": "top",
//     "flipX": false,
//     "flipY": false,
//     "opacity": 1,
//     "angle": 0,
//     "skewX": 0,
//     "skewY": 0,
//     "selectable": true,
//     "visible": true,
//     "isMakeClippingMask": false,
//     "crossOrigin": "anonymous",
//     "outsideArtboard": false,
//     "textAlign": "center",
//     "resizeAsImage": false,
//     "lineHeight": 1,
//     "placeholder": "Enter Text Here",
//     "charSpacing": 0,
//     "wrapText": false,
//     "text": "Nguyen\nTa nV \ninh",
//     "strokeWidth": 0,
//     "canReplaceImage": false,
//     "lockSize": false,
//     "lockStyle": false
// }

// const textTagContent2 = `
// <text id="dfbdba_canvas_text_d8ea13" font-family="&quot;font-ptlxvvrkph&quot;, 'Times', 'Arial'" x="827.5539906741077" y="903.3069343404106" fill="#ffc0c0" font-size="168.875px" letter-spacing="0" family="&quot;font-ptlxvvrkph&quot;, 'Times', 'Arial'" size="168.875px" text-anchor="middle" transform="matrix(1,0,0,1,0,0)" data-svg-origin="827.5539906741077 895.1221923828125" style="translate: none; rotate: none; scale: none; transform-origin: 0px 0px;"><tspan id="SvgjsTspan2338" x="827.5539906741077" dy="194.34774780273438">Ng<tspan style="font-size: 218.875px; fill: rgb(191, 33, 33);">uy</tspan>en<tspan></tspan></tspan><tspan id="SvgjsTspan2339" x="827.5539906741077" dy="168.875">Ta <tspan style="font-style: italic; font-weight: bold;">nV </tspan></tspan><tspan id="SvgjsTspan2340" x="827.5539906741077" dy="168.875">inh</tspan></text>
// `;

const { reCaculateTransform } = useCaculateTransform();

export class TextService {
  innerHTML;
  outerHTML;
  textContent;
  textParentData;
  rectData;
  textLines;
  tspanContents;
  boundingElement;
  _fontSizeFraction = 0.222;
  lineHeightScale = 1;
  keyAttributesByTag = {
    rect: ['x', 'y', 'width', 'height'],
    tspan: ['x', 'y', 'dx', 'dy'],
    text: ['x', 'y', 'textAnchor', 'transform', 'fontFamily', 'fontSize'],
  }
  constructor(innerHTML, outerHTML, object) {
    this.outerHTML = outerHTML;
    this.innerHTML = innerHTML;
    this.object = object;
    this.textLines = {};
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

  getPositionOfBoundingBoxText() {
    const originalAngle = this.object.angle;
    const originalFlipX = this.object.flipX;
    const originalFlipY = this.object.flipY;
    this.object.flipX = false;
    this.object.flipY = false;
    const position = reCaculateTransform(this.object);
    this.object.angle = originalAngle;
    this.object.flipX = originalFlipX;
    this.object.flipY = originalFlipY;
    this.boundingElement = {
      x: position.x,
      y: position.y,
      cx: position.x + this.object.width / 2,
      cy: position.y + this.object.height / 2,
      width: this.object.width,
      height: this.object.height,
    };
  }

  async loadFont() {
    const localPath = path.join(__dirname, '../fonts/font_1.woff');
    this.fontLoad = await useFont().loadFontFromOpenTypeByUrl(localPath);
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

  handleTspanContent() {
    const leftRelative = this.getRelativeLeftOfTextLine();
    let lineHeights = 0;
    const safeLineHeight = this._getSafeLineHeight();
    const deltaY = this.getDeltaBetweenTextTagAndBoundingBox();
    this.tspanContents.forEach((tspanData, lineIndex) => {
      const heightOfLine = this.getHeightOfLine(lineIndex);
      const maxHeight = heightOfLine / safeLineHeight;
      let top = this.getTopOffset() + lineHeights + maxHeight;
      top -= (heightOfLine * this._fontSizeFraction) / this.lineHeightScale + deltaY;
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
        } else {
          left = leftRelative[lineIndex];
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
          top,
          left,
          width,
        }
      });
      lineHeights += heightOfLine;
    });
    // console.log(this.textLines, '==> this.textLines...');
  }

  processTspanContent() {
    const { window } = new JSDOM(this.textTagData.content);
    // console.log(this.textTagData.content, '==> this.textTagData.content...');
    const textElement = window.document.getElementsByTagName('text')[0];
    // console.log(textElement, '==> textElement...');
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
    // console.log(this.innerHTML, '==> this.innerHTML...');
    const content = getContentByTag(this.innerHTML, 'text')[0];
    this.textTagData = {
      content,
      params: this.getElementArributes(content, this.keyAttributesByTag['text']),
    }
  }

  getDeltaBetweenTextTagAndBoundingBox() {
    const { y } = this.textTagData.params;
    const { y: boundingBoxY } = this.rectData.params;
    console.log(y, boundingBoxY, '==> y, boundingBoxY...');
    return boundingBoxY - y;
  }

  async exportPath() {
    // console.log(this.object, '==> this.object...');
    const res = await this.getCharsData();
    // console.log(res, '==> res...');
    const newData = {
      // charsMap: await this.getCharsData(),
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