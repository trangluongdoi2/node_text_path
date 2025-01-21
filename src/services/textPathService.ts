import { degreesToRadians } from "@/helper/math";
import { BoundingElement, FontloadMap, GlyphData, ITextPathServiceInput, RenderCharInfo, TextFontData, TextPath, TransformPath } from "@/types/convert-text";
import { clone } from "@/utilities";
import { getRotationMatrixRatios } from "@/utils-svg";
import { Font, Glyph } from "opentype.js";

export class TextPathService {
  declare charsMap: { [key: string]: { [key: string]: RenderCharInfo } };
  declare object: any;
  declare boundingElement: BoundingElement;
  declare paths: string;
  declare fontloadMap: FontloadMap;
  declare deltaY: number;
  declare flip: {
    x: number;
    y: number;
  };
  declare textLines: string[];
  declare _textLines: Array<string[]>;
  private glyphsData: Array<GlyphData[]>;
  ITALIC_ANGLE = 15;
  constructor(options: ITextPathServiceInput) {
    // this.charsMap = options.charsMap;
    this.object = options.object;
    this.boundingElement = options.boundingElement;
    this.fontloadMap = options.fontloadMap;
    this.deltaY = options.deltaY;
    this.paths = '';
    this.flip = {
      x: this.object.flipX ? -1 : 1,
      y: this.object.flipY ? -1 : 1,
    }
    this.glyphsData = options.glyphsData;
    // this.getTextLines();
  }

  // private hasCharSpacing() {
  //   return Boolean(this.object.charSpacing)
  // }

  // getTextLines() {
  //   this._textLines = Object.entries(this.charsMap).map(([_, textLine]) => {
  //     return Object.entries(textLine).map(([_, charData]) => {
  //       return charData.char;
  //     });
  //   });
  //   this.textLines = this._textLines.map((textLine) => textLine.join(''));
  // }

  getPathContent(path: any, transform: any) {
    if (!path.commands?.length) {
      return '';
    }

    const pathContent = path.commands.map((command: any) => {      
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
      if (transform?.isItalicStyle) {
        const italicShearXVal = degreesToRadians(-this.ITALIC_ANGLE);
        if (commandMap.has('x')) {
          const x = commandMap.get('x') || 0;
          const y = commandMap.get('y') || 0;
          const newX = x + y * italicShearXVal - transform.y * Math.tan(italicShearXVal);
          commandMap.set('x', newX);
        }
        if (commandMap.get('x1')) {
          const x = commandMap.get('x1') || 0;
          const y = commandMap.get('y1') || 0;
          const newX = x + y * italicShearXVal - transform.y * Math.tan(italicShearXVal);
          commandMap.set('x1', newX);
        }
        if (commandMap.get('x2')) {
          const x = commandMap.get('x2') || 0;
          const y = commandMap.get('y2') || 0;
          const newX = x + y * italicShearXVal - transform.y * Math.tan(italicShearXVal);
          commandMap.set('x2', newX);
        }
      }
      for (const [_, val] of commandMap.entries()) {
        finalContent += `${val} `;
      }
      return finalContent;
    });
    return pathContent.join('');
  }

  getDataPath(path: any, transform: TransformPath, lineIndex: number, charIndex: number) {
    const clonePathContent = [];

    const purePath = clone(path);
    const transformPurePath = {
      x: transform.x,
      y: transform.y,
      isItalicStyle: transform.isItalicStyle,
    };
    clonePathContent.push(this.getPathContent(purePath, transformPurePath));

    return clonePathContent.join('');
  }

  getPathWithStyles(paths: any, styles: Record<string, any> = {}) {
    const fillStyles = styles.fill ? `fill="${styles.fill}"` : '';
    return `<path ${fillStyles} d="${paths}" />`;
  }

  getPathByChar(charData: any, lineIndex: number, charIndex: number) {
    const { cx, cy } = this.boundingElement;
    const fontload = this.fontloadMap[this.object.fontFamily].fontload;
    const path = fontload.getPath(charData.char, 0, 0, charData.fontSize);
    const initTransform = {
      x: 0,
      y: 0,
      isItalicStyle: charData.fontStyle === 'italic',
    }
    const caculatedPath = this.getDataPath(path, initTransform, lineIndex, charIndex);
    const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
    const { left = 0, top = 0 } = charData;
    const newTop = top;
    const tx = a * left + c * newTop + cx;
    const ty = b * left + d * newTop + cy;

    const matrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;

    const pathContent = `
      <g transform="${matrix}">
        ${this.getPathWithStyles(caculatedPath, { fill: charData.fill, fontStyle: charData.fontStyle })}
      </g>`;
    return pathContent;
  }
  
  getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(lineIndex: number, charIndex: number, field: string) {
    const charStyle = this.getStyleDeclaration(this.object.styles, lineIndex, charIndex);
    return charStyle[field] ?? this.object[field];
  }


  getGlyphPaths(): { multiPaths: string, singlePaths: string[] } {
    if (!this.glyphsData?.length) {
      return { multiPaths: '', singlePaths: [] };
    }
    const { angle = 0, scaleX = 1, scaleY = 1 } = this.object;
   
    const singlePaths: string[] = [];
    const multiPaths: string[] = [];
    for (const [lineIndex, textLine] of this.glyphsData.entries()) {
      for (const glyph of textLine) {
        const { top, left, fill, fontStyle } = glyph;
        const initTransform = {
          x: 0,
          y: 0,
          isItalicStyle: fontStyle === 'italic',
        }
        const caculatedPath = this.getDataPath(glyph.path, initTransform, lineIndex, glyph.charIndexStart);
        const { a, b, c, d } = getRotationMatrixRatios(angle);
        const newA = a * scaleX * this.flip.x;
        const newB = b * scaleX * this.flip.x;
        const newC = c * scaleY * this.flip.y;
        const newD = d * scaleY * this.flip.y;
        const relativeLeft = newA * left + newC * top;
        const relativeTop = newB * left + newD * top;
        const tx = this.boundingElement.cx + relativeLeft;
        const ty = this.boundingElement.cy + relativeTop;
        const matrix = `matrix(${newA} ${newB} ${newC} ${newD} ${tx} ${ty})`;
        multiPaths.push(
          `<g transform="${matrix}">
            ${this.getPathWithStyles(caculatedPath, { fill, fontStyle })}
          </g>`
        );

        // Get single path
        const relativeLeftNotRotate = left * Math.cos(0) - top * Math.sin(0);
        const relativeTopNotRotate = left * Math.sin(0) + top * Math.cos(0);
        const transformNotRotate = {
          x: relativeLeftNotRotate,
          y: relativeTopNotRotate,
          isItalicStyle: fontStyle === 'italic',
        };
        singlePaths.push(this.getDataPath(clone(glyph.path), transformNotRotate, lineIndex, glyph.charIndexStart));
      }
    }
    return {
      multiPaths: multiPaths.join(''),
      singlePaths,
    }
  }

  // getTextPaths() {
  //   const originalPaths: any = [];
  //   Object.entries(this.charsMap).forEach(([lineIndex, textLines]) => {
  //     Object.entries(textLines).forEach(([charIndex, charData]) => {
  //       const pathByChar = this.getPathByChar(charData, Number(lineIndex), Number(charIndex));
  //       originalPaths.push(pathByChar);
  //     });
  //   });
  //   this.paths = originalPaths.join('');

  //   const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
  //   const { cx, cy, width, height } = this.boundingElement;
  //   const left = -width / 2;
  //   const top = -height / 2;
  //   const tx = a * left + c * top + cx;
  //   const ty = b * left + d * top + cy;

  //   const newMatrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;
  //   return `
  //     <g transform="${newMatrix}">
  //       ${originalPaths.join('')}
  //     </g>
  //   `;
  // }

  getTextPathsByGlyphs() {
    const originalPaths: string[] = [];
    const { multiPaths, singlePaths } = this.getGlyphPaths();
    originalPaths.push(multiPaths);
    return {
      path: originalPaths.join(''),
      paths: singlePaths,
    }
  }

  getPaths() {
    // this.getTextPaths();
    const res = this.getTextPathsByGlyphs();
    const { path, paths } = res;
    return path;
  }
}
