import { degreesToRadians } from "@/helper/math";
import { FontloadMap, ITextPathServiceInput, TransformPath } from "@/types/convert-text";
import { clone } from "@/utilities";
import { getRotationMatrixRatios } from "@/utils-svg";

export class TextPathService {
  charsMap;
  object;
  boundingElement;
  declare paths: any;
  fontloadMap: FontloadMap;
  deltaY: number;
  ITALIC_ANGLE = 15;
  constructor(options: ITextPathServiceInput) {
    this.charsMap = options.charsMap;
    this.object = options.object;
    this.boundingElement = options.boundingElement;
    this.fontloadMap = options.fontloadMap;
    this.deltaY = options.deltaY;
    this.paths = [];
  }

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
    const tx = a * left + c * top + cx;
    const ty = b * left + d * top + cy - this.deltaY / 2;

    const matrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;

    const pathContent = `
      <g transform="${matrix}">
        ${this.getPathWithStyles(caculatedPath, { fill: charData.fill, fontStyle: charData.fontStyle })}
      </g>`;
    return pathContent;
  }
  
  getGlyphPaths() {
    console.log('===> getGlyphPaths 999');
  }

  getTextPaths() {
    const originalPaths: any = [];
    Object.entries(this.charsMap).forEach(([lineIndex, textLines]) => {
      // @ts-ignore
      Object.entries(textLines).forEach(([charIndex, charData]) => {
        const pathByChar = this.getPathByChar(charData, Number(lineIndex), Number(charIndex));
        originalPaths.push(pathByChar);
      });
    });
    this.paths = originalPaths.join('');

    const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
    console.log(this.deltaY, '==> this.deltaY...');
    const { cx, cy, width, height } = this.boundingElement;
    const left = -width / 2;
    const top = -height / 2 - this.deltaY;
    const tx = a * left + c * top + cx;
    const ty = b * left + d * top + cy;

    const newMatrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;
    return `
      <g transform="${newMatrix}">
        ${originalPaths.join('')}
      </g>
    `;
  }

  getPaths() {
    this.getTextPaths();
    return this.paths;
  }
}
