import { JSDOM } from 'jsdom';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fabric from 'fabric';
import {
  getRotationMatrixRatios,
} from '../utils-svg.js';
import { clone } from '../utilities/index.js';

export class TextPathService {
  charsMap;
  object;
  boundingElement;
  paths;
  fontLoad;
  ITALIC_ANGLE = 15;
  constructor(options) {
    this.charsMap = options.charsMap;
    this.object = options.object;
    this.boundingElement = options.boundingElement;
    this.fontLoad = options.fontLoad;
    this.paths = [];
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
      if (transform?.isItalicStyle) {
        const italicShearXVal = fabric.util.degreesToRadians(-this.ITALIC_ANGLE);
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

  getPathWithStyles(paths, style = {}) {
    let fillStyles = style.fill ? `fill="${style.fill}"` : '';
    return `<path ${fillStyles} d="${paths}" />`;
  };

  getPathByChar(charData, lineIndex, charIndex) {
    const { cx, cy } = this.boundingElement;
    const path = this.fontLoad.getPath(charData.char, 0, 0, charData.fontSize);
    const initTransform = {
      x: 0,
      y: 0,
      isItalicStyle: charData.fontStyle === 'italic',
    }
    const caculatedPath = this.getDataPath(path, initTransform, lineIndex, charIndex);
    const { a, b, c, d } = getRotationMatrixRatios(0);
    const { left = 0, top = 0 } = charData;
    const tx = a * left + c * top + cx;
    const ty = b * left + d * top + cy;

    const matrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;

    const pathContent = `
      <g transform="${matrix}">
         ${this.getPathWithStyles(caculatedPath, { fill: charData.fill, fontStyle: charData.fontStyle })}
      </g>`;
    return pathContent;
  };

  getTextPaths() {
    const originalPaths = [];
    Object.entries(this.charsMap).forEach(([lineIndex, textLines]) => {
      Object.entries(textLines).forEach(([charIndex, charData]) => {
        const pathByChar = this.getPathByChar(charData, lineIndex, charIndex);
        originalPaths.push(pathByChar);
      });
    });
    const { a, b, c, d } = getRotationMatrixRatios(this.object.angle);
    const { x, y, cx, cy, width, height } = this.boundingElement;
    const left = -width / 2;
    const top = -height / 2;
    const tx = a * left + c * top + cx;
    const ty = b * left + d * top + cy;

    const newMatrix = `matrix(${a} ${b} ${c} ${d} ${tx} ${ty})`;
    this.paths = `
      <g transform="${newMatrix}">
        ${originalPaths.join('')}
      </g>
    `;
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
