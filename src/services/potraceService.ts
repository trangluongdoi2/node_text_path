import * as fs from 'fs';
import path from 'path';
import { Channels, Metadata } from 'sharp';
import { Browser, Page, ScreenshotClip, Viewport } from 'puppeteer-core';
import { PosterizerOptions, PotraceOptions } from 'potrace';
import { getContentByTag, getElemAttributesByText, getSvgDimensions, insertStringAt, replacePathToGroup } from '@/utils-svg';
import { SVGTextStyles } from '@/types';
export default class PotraceService {
  private WORKING_DIR = '/tmp/working';

  private workingDirTmp = '/tmp/working';
  private browserPool: any;

  constructor() {
    // console.log('===> constructor');
    // this.browserPool = new BrowserPool();
    // this.workingDirTmp = `/tmp/${randomString(false, 5)}`;
    // prepareWorkingDir(this.workingDirTmp);
  }

  private async potraceTrace(path: string, options: PotraceOptions): Promise<string> {
    const potrace = require('potrace');
    return await new Promise((resolve, reject) => {
      try {
        potrace.trace(path, options, function (error: Error | null, svg: string) {
          if (error) {
            console.warn(`Error PotracePosterize: ${JSON.stringify(error)}`);
            return reject(error);
          }
          resolve(svg);
        });
      } catch (error) {
        console.warn(`Error PotraceTrace: ${JSON.stringify(error)}`);
        return reject(error);
      }
    });
  }

  private async potracePosterize(path: string, options: PosterizerOptions): Promise<string> {
    const potrace = require('potrace');
    return await new Promise((resolve, reject) => {
      try {
        potrace.posterize(path, options, function (error: Error | null, svg: string) {
          if (error) {
            console.warn(`Error PotracePosterize: ${JSON.stringify(error)}`);
            return reject(error);
          }
          resolve(svg);
        });
      } catch (error) {
        console.warn(`Error PotracePosterize: ${JSON.stringify(error)}`);
        return reject(error);
      }
    });
  }

  private async createPageContent(content: string, viewport?: Viewport): Promise<Page> {
    const TIMEOUT: number = 10 * 60 * 1000;
    const browser: Browser = await this.browserPool.getBrowser();
    const page: Page = await browser.newPage();
    if (viewport) {
      await page.setViewport(viewport);
    }
    await page.setContent(content, {
      waitUntil: 'networkidle2',
      timeout: TIMEOUT,
    });
    return page;
  }

  private async getImagePng(file: string): Promise<Buffer> {
    const sharp = require('sharp');
    const image = sharp(file);
    const metadata = await image.metadata();
    return image
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(metadata.width, metadata.height, {
        withoutEnlargement: true,
        fit: 'cover',
      })
      .png()
      .toBuffer();
  }

  private prepareWorkingDir(fileName: string, isUnlink = false) {
    const path = `${this.WORKING_DIR}/${fileName}.png`;
    if (isUnlink && fs.existsSync(this.WORKING_DIR)) {
      fs.unlinkSync(path);
    } else if (!fs.existsSync(this.WORKING_DIR)) {
      fs.mkdirSync(this.WORKING_DIR);
    }
    return path;
  }

  private async convertTextByTrace(content: string, style: SVGTextStyles): Promise<string> {
    const path = this.prepareWorkingDir(style.id);
    const page = await this.createPageContent(content);
    await page.screenshot({ path, fullPage: true });
    await page.close();
    const svgContent = await this.potraceTrace(path, {
      threshold: 254,
      color: style.fill,
    });
    this.prepareWorkingDir(style.id, true);
    return svgContent;
  }

  private async convertTextByPosterize(
    content: string,
    style: SVGTextStyles
  ): Promise<{ png: Buffer; content: string; clip: ScreenshotClip }> {
    const path = this.prepareWorkingDir(style.id);
    const viewport = getSvgDimensions(content);
    const page = await this.createPageContent(content, viewport);
    const element = await page.$(`#${style.id}`);

    const screenshotClip: ScreenshotClip = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    if (element) {
      const elementBox = await element.boundingBox();
      if (elementBox) {
        screenshotClip.x = elementBox['x'];
        screenshotClip.y = elementBox['y'];
        screenshotClip.width = elementBox['width'];
        screenshotClip.height = elementBox['height'];
        await page.screenshot({ path, clip: screenshotClip });
      }
    }
    await page.close();
    const png = await this.getImagePng(path);
    const svgContent = await this.potracePosterize(path, {
      steps: 10,
      threshold: 251,
      turdSize: 0,
      turdPolicy: 'majority',
      rangeDistribution: 'equal',
      fillStrategy: 'mean',
    });
    this.prepareWorkingDir(style.id, true);
    return { png, content: svgContent, clip: screenshotClip };
  }

  private replaceOnlyText(textHtml: string, text: string) {
    const texts = getContentByTag(textHtml, 'text') as string[];
    for (const element of texts) {
      if (element !== text) {
        textHtml = textHtml.replace(element, '');
      }
    }
    return textHtml;
  }

  private hexify(color: string) {
    const values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    const a = parseFloat(values[3] || '1');
    const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
    const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
    const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
  }

  private combineOpacity(a: number, b: number) {
    return 1 - (1 - a) * (1 - b);
  }

  private getSolidSvg(svg: string) {
    svg = svg.replace(/fill="black"/g, '');
    const matches = svg.match(/fill-opacity="[\d.]+"/gi);
    const colors = Array.from(new Set(matches))
      .map((fillOpacity) => ({
        fillOpacity,
        opacity: Number([...(fillOpacity.match(/[\d.]+/) ?? [])][0]),
      }))
      .sort((a, b) => b.opacity - a.opacity)
      .map(({ fillOpacity, opacity }, index, array) => {
        const lighterColors = array.slice(index);
        const trueOpacity = lighterColors.reduce((acc, cur) => this.combineOpacity(acc, cur.opacity), 0);
        const hex = this.hexify(`rgba(0, 0, 0, ${trueOpacity})`);
        return {
          trueOpacity,
          fillOpacity,
          opacity,
          hex,
        };
      });
    for (const color of colors) {
      const pattern = `${color.fillOpacity}`;
      svg = svg.replace(new RegExp(pattern, 'g'), `fill="${color.hex}"`);
    }
    return svg;
  }

  private async getPixels(input: Buffer): Promise<any> {
    const sharp = require('sharp');
    let image = null;
    let metadata = null;
    try {
      image = sharp(input);
      metadata = (await image.metadata()) as Metadata;
    } catch (error) {
      console.warn(`Error getPixels: ${JSON.stringify(error)}`);
      image = sharp(input, { unlimited: true });
      metadata = (await image.metadata()) as Metadata;
    }
    const channels = metadata.channels as Channels;
    const raw = await image.raw().toBuffer();
    const pixels: number[][] = [];
    for (let i = 0; i < raw.length; i = i + channels) {
      const pixel = [];
      for (let j = 0; j < channels; j++) {
        pixel.push(raw.readUInt8(i + j));
      }
      pixels.push(pixel);
    }
    return { pixels, ...metadata };
  }

  private hexToRgb(hex: string) {
    return hex // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      ? // @ts-ignore
        hex
          .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
          .substring(1)
          .match(/.{2}/g)
          .map((x) => parseInt(x, 16))
      : [0, 0, 0];
  }

  private async getColorizedSvg(svg: string, original: Buffer) {
    const quantize = require('quantize');
    const NearestColor = require('nearest-color');
    const hexRegex = /#([a-f0-9]{3}){1,2}\b/gi;
    const matches = svg.match(hexRegex);
    const colors = Array.from(new Set(matches));
    const pixelIndexesOfNearestColors: any = {};
    colors.forEach((color) => (pixelIndexesOfNearestColors[color] = []));
    const svgPixels = await this.getPixels(Buffer.from(svg));
    const nearestColor = NearestColor.from(colors);

    svgPixels.pixels.forEach((pixel: number[], index: string) => {
      // curly braces for scope https://stackoverflow.com/a/49350263
      switch (svgPixels.channels) {
        case 3: {
          const [r, g, b] = pixel;
          const rgb = `rgb(${r}, ${g}, ${b})`;
          const hex = this.hexify(rgb);
          pixelIndexesOfNearestColors[nearestColor(hex)].push(index);
          break;
        }
        case 4: {
          const [r, g, b, a] = pixel;
          const rgba = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
          const hex = this.hexify(rgba);
          pixelIndexesOfNearestColors[nearestColor(hex)].push(index);
          break;
        }
        default:
          throw new Error('Unsupported number of channels');
      }
    });
    const originalPixels = await this.getPixels(original);
    const pixelsOfNearestColors = pixelIndexesOfNearestColors;
    Object.keys(pixelsOfNearestColors).forEach((hexKey) => {
      pixelsOfNearestColors[hexKey] = pixelsOfNearestColors[hexKey].map((pixelIndex: any) => {
        const pixel = originalPixels.pixels[pixelIndex];
        if (pixel) {
          switch (originalPixels.channels) {
            case 3: {
              const [r, g, b] = pixel;
              const rgb = `rgb(${r}, ${g}, ${b})`;
              return this.hexify(rgb);
            }
            case 4: {
              const [r, g, b, a] = pixel;
              const rgba = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
              return this.hexify(rgba);
            }
            default:
              throw new Error('Unsupported number of channels');
          }
        }
      });
    });
    const colorsToReplace = pixelsOfNearestColors;
    Object.keys(pixelsOfNearestColors).forEach((hexKey) => {
      const pixelArray = colorsToReplace[hexKey].map(this.hexToRgb);
      const colorMap = quantize(pixelArray, 5);
      if (typeof colorMap === 'object') {
        const [r, g, b] = colorMap.palette()[0];
        const rgb = `rgb(${r}, ${g}, ${b})`;
        colorsToReplace[hexKey] = this.hexify(rgb);
      }
    });
    Object.entries(colorsToReplace).forEach(([oldColor, newColor]) => {
      const pattern = `${oldColor}`;
      svg = svg.replace(new RegExp(pattern, 'g'), `${newColor}`);
    });
    return svg;
  }

  private async getOptimizedSvg(svg: string) {
    const svgo = require('svgo');
    return svgo.optimize(svg).data;
  }

  public async convertTextByPotrace(textHtml: string, innerHTML: string, styles: string[]): Promise<string> {
    const index: number = [...(textHtml.match(/<svg(.*?)>/g) ?? [])][0].length;

    textHtml = insertStringAt(textHtml, styles.join('') || '', index);
    const texts = getContentByTag(innerHTML, 'text') as string[];
    let pathGroup = '<g>';
    for (const text of texts) {
      const style = getElemAttributesByText(text);
      if (style.filter || style.stroke) {
        const strokeWidth = style.strokeWidth ?? 0;
        const strokeOpacity = style.strokeOpacity ?? 0;
        const textPath = `<path d="" fill-rule="evenodd" fill="${style.fill}" stroke="${style.stroke}" stroke-width="${strokeWidth}" stroke-opacity="${strokeOpacity}" />`;
        pathGroup = `${pathGroup}<g filter="${style.filter}">${textPath}</g>`;
        continue;
      }

      const content = this.replaceOnlyText(textHtml, text).replace(/#ffffff/g, '#fdfdfd');
      const svg = await this.convertTextByTrace(content, style);
      const textPath = svg.match(/<path(.*?)\/>/g) || [];
      pathGroup = `${pathGroup}<g>${textPath.join('')}</g>`;
    }

    pathGroup = `${pathGroup}</g>`;
    const d = pathGroup.match(/d="M.*?"/g) || [];
    const pathShadows = pathGroup.match(/<path (d="".*?)\/>/g) || [];
    if (d.length > 0 && pathShadows.length > 0) {
      for (let index = 0; index < pathShadows.length; index++) {
        pathGroup = pathGroup.replace(pathShadows[index], pathShadows[index].replace('d=""', `${d[0]}`));
      }
    }
    return replacePathToGroup(innerHTML, pathGroup);
  }

  public async convertTextClipPathByPotrace(textHtml: string, innerHTML: string, styles: string[]): Promise<string> {
    const index: number = [...(textHtml.match(/<svg(.*?)>/g) ?? [])][0].length;
    textHtml = insertStringAt(textHtml, styles.join(''), index);

    const element = innerHTML.match(/<g(.*?)>/g) || [];
    const style = getElemAttributesByText(String(element[0]));
    const result = await this.convertTextByPosterize(textHtml, style);
    let svg = this.getSolidSvg(result.content);
    svg = await this.getColorizedSvg(svg, result.png);
    svg = await this.getOptimizedSvg(svg);
    let pathGroup = `<g transform="matrix(1,0,0,1,${result.clip.x},${result.clip.y})">`;
    const textPath: string[] = svg.match(/<path(.*?)\/>/g) || [];
    pathGroup += textPath.join('');
    pathGroup += '</g>';
    return replacePathToGroup(innerHTML, pathGroup);
  }

  // public async cleanup() {
  //   try {
  //     await this.browserPool.cleanup();
  //     if (this.workingDirTmp && fs.existsSync(this.workingDirTmp)) {
  //       const files = fs.readdirSync(this.workingDirTmp);
  //       for (const file of files) {
  //         const filePath = path.join(this.workingDirTmp, file);
  //         fs.unlinkSync(filePath);
  //       }
  //       fs.rmdirSync(this.workingDirTmp);
  //       console.log(`Successfully cleaned up temporary directory: ${this.workingDirTmp}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error cleaning up temporary directory ${this.workingDirTmp}:`, error);
  //   }
  // }
}