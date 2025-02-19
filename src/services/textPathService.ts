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
  private filterTags: Array<{ type: string, tagUrl: string }>;
  ITALIC_ANGLE = 15;
  constructor(options: ITextPathServiceInput) {
    this.object = options.object;
    this.boundingElement = options.boundingElement;
    this.fontloadMap = options.fontloadMap;
    this.paths = '';
    this.flip = {
      x: this.object.flipX ? -1 : 1,
      y: this.object.flipY ? -1 : 1,
    }
    this.glyphsData = options.glyphsData;
    this.filterTags = options.filterTags || [];
  }

  private hasStroke() {
    const { backstage = {} } = this.object;
    if (!Object.keys(backstage)?.length) {
      return false;
    }
    const { stroke } = backstage;
    return Boolean(stroke?.enabled);
  }

  private getStroke() {
    const { backstage = {} } = this.object;
    if (!Object.keys(backstage)?.length) {
      return null;
    }
    const { stroke } = backstage;
    return stroke;
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

  // getPathByChar(charData: any, lineIndex: number, charIndex: number) {
  //   const { cx, cy } = this.boundingElement;
  //   const fontload = this.fontloadMap[this.object.fontFamily].fontload;
  //   const path = fontload.getPath(charData.char, 0, 0, charData.fontSize);
  //   const initTransform = {
  //     x: 0,
  //     y: 0,
  //     isItalicStyle: charData.fontStyle === 'italic',
  //   }
  //   const caculatedPath = this.getDataPath(path, initTransform, lineIndex, charIndex);
  //   const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
  //   const { left = 0, top = 0 } = charData;
  //   console.log('charData', charData);
  //   const tx = a * left + c * top + cx;
  //   const ty = b * left + d * top + cy;

  //   const matrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;

  //   const pathContent = `
  //     <g transform="${matrix}">
  //       ${this.getPathWithStyles(caculatedPath, { fill: charData.fill, fontStyle: charData.fontStyle })}
  //     </g>`;
  //   return pathContent;
  // }
  
  getStyleDeclaration(multiStyles: any, lineIndex: number, charIndex: number) {
    const lineStyle = multiStyles && multiStyles[lineIndex];
    return lineStyle ? lineStyle[charIndex] ?? {} : {};
  }

  getValueOfPropertyAt(lineIndex: number, charIndex: number, field: string) {
    const charStyle = this.getStyleDeclaration(this.object.styles, lineIndex, charIndex);
    return charStyle[field] ?? this.object[field];
  }

  getGlyphPaths(): { multiPaths: string, singlePath: string[] } {
    if (!this.glyphsData?.length) {
      return { multiPaths: '', singlePath: [] };
    }
    const { angle = 0, scaleX = 1, scaleY = 1 } = this.object;
    console.log(scaleX, scaleY, '==> scaleX, scaleY...');
   
    const singlePath: string[] = [];
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
        singlePath.push(this.getDataPath(clone(glyph.path), transformNotRotate, lineIndex, glyph.charIndexStart));
      }
    }
    return {
      multiPaths: multiPaths.join(''),
      singlePath,
    }
  }

  getTextPathsByGlyphs() {
    const { multiPaths, singlePath } = this.getGlyphPaths();
    return {
      path: singlePath.join(''),
      paths: multiPaths,
    }
  }

  getOriginalCombineTextTransformContent(skipFlip = false) {
    const { scaleX, scaleY } = this.object;
    const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
    const newA = a * scaleX * (skipFlip ? 1 : this.flip.x);
    const newB = b * scaleX * (skipFlip ? 1 : this.flip.x);
    const newC = c * scaleY * (skipFlip ? 1 : this.flip.y);
    const newD = d * scaleY * (skipFlip ? 1 : this.flip.y);
    const tx = this.boundingElement.cx;
    const ty = this.boundingElement.cy;
    const matrix = `matrix(${newA} ${newB} ${newC} ${newD} ${tx} ${ty})`;
    return `transform="${matrix}"`;
  }

  getSvgStylesByObject(styles: { [key: string]: string | number }) {
    const stylesContent = Object.keys(styles).map((key: string) => {
      if (styles[key]) {
        return `${key}: ${styles[key]};`
      }
    }).filter(part => part).join('');
    return `style="${stylesContent}"`;
  }

  getStrokeStyles() {
    const stroke = this.getStroke();
    if (!stroke) {
      return '';
    }
    const { color, width, opacity } = stroke;
    const styles: { [key: string]: string | number } = {
      stroke: color,
      'stroke-width': width * 2,
      'stroke-opacity': opacity / 100,
    }
    return this.getSvgStylesByObject(styles);
  }

  getStrokeContent(path: string) {
    if (!this.hasStroke()) {
      return '';
    }
    const strokeStyles = this.getStrokeStyles();
    return `
      <g ${this.getOriginalCombineTextTransformContent()} ${strokeStyles}>
        <path d="${path}" />
      </g>
    `;
  }

  getCombinePathContent(): { content: string, purePathContent: string } {
    const { path, paths } = this.getTextPathsByGlyphs();

    const filterPaths = this.filterTags?.map((filterTag: any) => {
      if (filterTag.type === 'outer_glow') {
        const { outerGlow } = this.object;
        const { color } = outerGlow;
        return `
          <g ${this.getOriginalCombineTextTransformContent()} ${filterTag.tagUrl}>
            <path d="${path}" fill="${color}" />
          </g>
        `;
      }
      if (filterTag.type === 'drop_shadow') {
        const { shadow } = this.object;
        const { color } = shadow;
        return `
          <g ${this.getOriginalCombineTextTransformContent()} ${filterTag.tagUrl}>
            <path d="${path}" fill="${color}" />
          </g>
        `;
      }
      return '';
    }).join(' ');
    const res = `
      ${filterPaths}
      ${this.getStrokeContent(path)}
      <g ${this.getOriginalCombineTextTransformContent()}>
        <path d="${path}" />
      </g>
      ${paths}
    `;
    const purePathContent = `<path d="${path}" />`;
    return {
      content: res,
      purePathContent,
    }
  }

  getPaths(callback?: Function) {
    const { content, purePathContent } = this.getCombinePathContent();
    callback && callback({
      transform: this.getOriginalCombineTextTransformContent(),
      path: purePathContent,
    })
    return content;
  }
}
