import * as fs from 'fs';
import { Channels, Metadata } from 'sharp';
import { Browser, Page, ScreenshotClip, Viewport } from 'puppeteer-core';
import { PosterizerOptions, PotraceOptions } from 'potrace';
import { getContentByTag, getElemAttributesByText, getSizeContent, getSvgDimensions, getTextParentTags, insertStringAt, replacePathToGroup } from '@/utils-svg';
import { MasterElement, SVGTextStyles } from '@/types';
import { prepareWorkingDir, writeBufferWithProgress } from '@/helper/file';
import { randomString } from '@/helper/string';
import { ChromiumHandler } from '@/chromium/chromiumHandler';
// import * as potrace from 'potrace';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { MultiStyleTextService } from './multiStyleTextService';
import { BrowserPool } from '@/chromium/browserPool';
// import path from 'path';

export default class PotraceService {
  private WORKING_DIR = '/tmp/working';

  private workingDirTmp = '/tmp/working';
  private browserPool: any;

  constructor() {
    this.workingDirTmp = `/tmp/${randomString(false, 5)}`;
    prepareWorkingDir(this.workingDirTmp);
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

  // async createPageContent(browserPool: BrowserPool, content: string, viewport?: Viewport): Promise<Page> {
  //   const TIMEOUT: number = 10 * 60 * 1000;
  //   // let page: Page | undefined = undefined;
  //   const browser: Browser = await browserPool.getBrowser();
  //   const page: Page = await browser.newPage();
  //   try {
  //     // page = await ChromiumHandler.newPage();
  //     console.log('Chromium DONE!');
  //     if (!page) {
  //       throw new Error('Failed to create page');
  //     }
      
  //     // Set memory limits and performance optimizations for large content
  //     // await page.setCacheEnabled(false);
  //     // await page.setRequestInterception(true);
      
  //     // Block unnecessary resources to save memory
  //     // page.on('request', (req) => {
  //     //   if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
  //     //     req.abort();
  //     //   } else {
  //     //     req.continue();
  //     //   }
  //     // });

  //     // Set larger memory limits
  //     // Maybe cause bug
  //     // await page.evaluateOnNewDocument(() => {
  //     //   // Increase memory limits for large content
  //     //   (window as any).__LARGE_CONTENT_MODE__ = true;
  //     // });

  //     if (viewport) {
  //       await page.setViewport(viewport);
  //     }

  //     const sizeContent = getSizeContent(content);
  //     console.log(sizeContent, 'sizeContent..');

  //     // For very large content, use appropriate handling method
  //     // if (content.length > 100 * 1024 * 1024) { // 100MB threshold - use file-based approach
  //     //   // console.log('Case 1');
  //     //   console.log('Extremely large content detected, using file-based approach...');
  //     //   await this.handleLargeContentViaFile(page, content, TIMEOUT);
  //     // } else if (content.length > 50 * 1024 * 1024) { // 50MB threshold - use streaming approach
  //     //   // console.log('Case 2');
  //     //   console.log('Large content detected, using streaming approach...');
  //     //   await this.handleLargeContentStreaming(page, content, TIMEOUT);
  //     // } else if (content.length > 10 * 1024 * 1024) { // 10MB threshold - use chunked approach
  //     //   // console.log('Case 3');
  //     //   console.log('Medium-large content detected, using chunked loading...');
  //     //   await this.setLargeContentChunked(page, content, TIMEOUT);
  //     // } else {
  //     //   console.log('Case 4');
  //     // }
  //     await page.setContent(content, {
  //       waitUntil: ['load', 'networkidle0'],
  //       timeout: TIMEOUT,
  //     });

  //     await new Promise(resolve => setTimeout(resolve, 100));

  //     // Monitor memory usage
  //     // const metrics = await page.metrics();
  //     // const heapUsed = metrics.JSHeapUsedSize ? Math.round(metrics.JSHeapUsedSize / 1024 / 1024) : 0;
  //     // const heapTotal = metrics.JSHeapTotalSize ? Math.round(metrics.JSHeapTotalSize / 1024 / 1024) : 0;
  //     // console.log(`Memory usage - JSHeapUsedSize: ${heapUsed}MB, JSHeapTotalSize: ${heapTotal}MB`);

  //   } catch (error) {
  //     console.error('Error in createPageContent:', error);
  //     if (page) {
  //       await page.close().catch(console.error);
  //     }
  //     throw error;
  //   }
    
  //   return page;
  // }

  private async createPageContent(browserPool: BrowserPool, content: string, viewport?: Viewport): Promise<Page> {
    const TIMEOUT: number = 10 * 60 * 1000;
    const browser: Browser = await browserPool.getBrowser();
    const page: Page = await browser.newPage();
    if (viewport) {
      await page.setViewport(viewport);
    }
    // await page.setContent(content, {
    //   waitUntil: 'networkidle2',
    //   timeout: TIMEOUT,
    // });
    await page.setContent(content, {
      waitUntil: ['load', 'networkidle0', 'networkidle2'],
      timeout: TIMEOUT,
    });
    await new Promise(resolve => setTimeout(resolve, 200));
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

  async writeBufferWithProgress(buffer: any, filePath: string) {
    const totalSize = buffer.length;
    let bytesWritten = 0;

    // Create readable stream from buffer
    const readable = new Readable({
      read(size) {
        const chunk = buffer.slice(bytesWritten, bytesWritten + size);
        bytesWritten += chunk.length;
        
        // Log progress
        const progress = Math.round((bytesWritten / totalSize) * 100);
        process.stdout.write(`\rProgress: ${progress}%`);
        
        this.push(chunk.length > 0 ? chunk : null);
      }
    });
    
    // Create writable stream
    const writable = fs.createWriteStream(filePath);

    try {
      await pipeline(readable, writable);
      console.log('\nBuffer written successfully with progress tracking');
    } catch (err) {
      console.error('\nError writing buffer:', err);
      throw err;
    }
  }

  private async convertTextByTrace(content: string, style: SVGTextStyles): Promise<string> {
    const path = this.prepareWorkingDir(style.id);
    const browserPool = new BrowserPool();
    const page = await this.createPageContent(browserPool, content);
    await page.screenshot({ path, fullPage: true });
    await page.close();
    const svgContent = await this.potraceTrace(path, {
      threshold: 254,
      color: style.fill,
    });
    this.prepareWorkingDir(style.id, true);
    await browserPool.cleanup();
    return svgContent;
  }

  // async convertTextByTrace(content: string, style: SVGTextStyles, key?: string): Promise<string> {
  //   const fileName = `${style.id}`;
  //   const path = this.prepareWorkingDir(fileName);
  //   const browserPool = new BrowserPool();
  //   const page = await this.createPageContent(browserPool, content);
  //   const buffer = await page.screenshot({ path, fullPage: true });
  //   const filePNGName = `temp/${fileName}.png`;
  //   await page.close();
  //   await this.writeBufferWithProgress(buffer, filePNGName);
  //   const svgContent = await this.potraceTrace(path, {
  //     threshold: 254,
  //     color: style.fill,
  //   });
  //   this.prepareWorkingDir(fileName, true);
  //   await browserPool.cleanup();
  //   fs.writeFileSync('temp/svgContent.svg', svgContent);
  //   return svgContent;
  // }

  // async converTextByTraceNew(contentsData: Array<{ content: string, styles: SVGTextStyles }>) {
  //   const browserPool = new BrowserPool();
  //   const results: any[] = [];
  //   const TIMEOUT: number = 10 * 60 * 1000;
  //   const page = await ChromiumHandler.newPage();
  //   for (const contentData of contentsData) {
  //     const fileName = `${contentData.styles.id}_${randomString()}`;
  //     const path = this.prepareWorkingDir(fileName);
  //     await page?.setContent(contentData.content, {
  //       waitUntil: ['load', 'networkidle0'],
  //       timeout: TIMEOUT,
  //     });
  //     await page.screenshot({ path, fullPage: true, optimizeForSpeed: true });
  //     const svgContent = await this.potraceTrace(path, {
  //       threshold: 254,
  //       color: contentData.styles.fill,
  //     });
  //     results.push(svgContent);
  //     this.prepareWorkingDir(fileName, true);
  //   }
  //   await page.close();
  //   await browserPool.cleanup();
  //   return results;
  // }

  async converTextByTraceNew(contentsData: Array<{ content: string, styles: SVGTextStyles, index: number }>) {
    console.log('converTextByTraceNew()');
    const browserPool = new BrowserPool();
    const results: any[] = [];
    const TIMEOUT: number = 10 * 60 * 1000;
    const browser: Browser = await browserPool.getBrowser();
    const page: Page = await browser.newPage();
    for (const contentData of contentsData) {
      const fileName = `${contentData.styles.id}_${randomString()}`;
      const path = this.prepareWorkingDir(fileName);

      await page?.setContent(contentData.content, {
        waitUntil: ['load', 'networkidle0'],
        timeout: TIMEOUT,
      });
      const buffer = await page.screenshot({
        path,
        fullPage: true,
      });
      this.writeBufferWithProgress(buffer, `${contentData.index}.png`)
      results.push(this.potraceTrace(path, {
        threshold: 254,
        color: contentData.styles.fill,
      }).then(content => {
        this.prepareWorkingDir(fileName, true);
        return content;
      }));
    }
    await page.close();
    await browserPool.cleanup();
    return await Promise.all(results);
  }

  private async convertTextByPosterize(
    content: string,
    style: SVGTextStyles
  ): Promise<{ png: Buffer; content: string; clip: ScreenshotClip }> {
    const browserPool = new BrowserPool();
    const path = this.prepareWorkingDir(style.id);
    const viewport = getSvgDimensions(content);
    // fs.writeFileSync('temp/convertTextByPosterize.svg', content);
    // TODO: Need refactor
    const page = await this.createPageContent(browserPool, content, viewport);

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
    await browserPool.cleanup();
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
    return hex
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

  public async convertTextByPotrace(textHtml: string, innerHTML: string, styles?: string[]): Promise<string> {
    const index: number = [...(textHtml.match(/<svg(.*?)>/g) ?? [])][0].length;

    textHtml = insertStringAt(textHtml, styles?.join('') || '', index);
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
      const multiStylesTextService = new MultiStyleTextService(content, text, style);
      const textPath = await multiStylesTextService.getPathByPotrace();
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

  isMultiSyles(element?: MasterElement) {
    if (!element) {
      return false;
    }
    if (element.type !== 'textbox') {
      return false;
    }
    const { styles = {} } = element as any;
    return Object.keys(styles)?.length >= 1;
  }

  public async converTextByPotraceNew(content: { textHTML: string, innerHTML: string }, convertData: {
    styles?: string[],
    element?: MasterElement,
  }) {
    let { textHTML = '', innerHTML = '' } = content;
    const { styles = [''], element } = convertData;

    const index: number = [...(textHTML.match(/<svg(.*?)>/g) ?? [])][0].length;

    textHTML = insertStringAt(textHTML, styles?.join('') || '', index);
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
      const content = this.replaceOnlyText(textHTML, text).replace(/#ffffff/g, '#fdfdfd');

      let textPath;
      if (this.isMultiSyles(element)) {
        console.log('Case 1');
        const multiStylesTextService = new MultiStyleTextService(content, text, style);
        textPath = await multiStylesTextService.getPathByPotrace();
      } else {
        console.log('Dont have multi styles..');
        const svg = await this.convertTextByTrace(content, style);
        textPath = svg.match(/<path(.*?)\/>/g) || [];
      }

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

  public async convertTextClipPathByPotrace(textHtml: string, innerHTML: string, styles?: string[]): Promise<string> {
    function removeOpacityStylesInParentTextTag(content: string) {
      const parentTextTags = getTextParentTags(content) as string[];
      const newParentTextTags = parentTextTags.map((textTag: string, index: number) => {
        content = content.replace(textTag, `##textTag${index}##`);
        return textTag.replace(/opacity:\s*[^;]*;?\s*/g, '');
      });
      newParentTextTags.forEach((textTag: string, index: number) => {
        content = content.replace(`##textTag{${index}##`, textTag);
      });
      return content;
    }

    const index: number = [...(textHtml.match(/<svg(.*?)>/g) ?? [])][0].length;
    textHtml = insertStringAt(textHtml, (styles || [''])?.join(''), index);

    const element = innerHTML.match(/<g(.*?)>/g) || [];
    innerHTML = removeOpacityStylesInParentTextTag(innerHTML);
    // fs.writeFileSync('temp/innerHTML.txt', innerHTML);
    const style = getElemAttributesByText(String(element[0]));
    const result = await this.convertTextByPosterize(textHtml, style);
    const fileName = `${randomString(false, 5)}`;
    // fs.writeFileSync(`temp/ClipPathByPotrace-${fileName}.png`, result.png);
    // fs.writeFileSync(`temp/ClipPathByPotrace-${fileName}-1.svg`, result.content);
    let svg = this.getSolidSvg(result.content);
    // fs.writeFileSync(`temp/ClipPathByPotrace-${fileName}-2.svg`, svg);
    svg = await this.getColorizedSvg(svg, result.png);
    svg = await this.getOptimizedSvg(svg);
    // fs.writeFileSync(`temp/ClipPathByPotrace-${fileName}-3.svg`, svg);
    // fs.writeFileSync(`temp/ClipPathByPotrace-${fileName}-4.txt`, innerHTML);
    let pathGroup = `<g transform="matrix(1,0,0,1,${result.clip.x},${result.clip.y})">`;
    const textPath: string[] = svg.match(/<path(.*?)\/>/g) || [];
    pathGroup += textPath.join('');
    pathGroup += '</g>';
    return replacePathToGroup(innerHTML, pathGroup);
  }

  public async cleanup() {
    try {
      await this.browserPool.cleanup();
      // if (this.workingDirTmp && fs.existsSync(this.workingDirTmp)) {
      //   const files = fs.readdirSync(this.workingDirTmp);
      //   for (const file of files) {
      //     const filePath = path.join(this.workingDirTmp, file);
      //     fs.unlinkSync(filePath);
      //   }
      //   fs.rmdirSync(this.workingDirTmp);
      //   console.log(`Successfully cleaned up temporary directory: ${this.workingDirTmp}`);
      // }
    } catch (error) {
      console.error(`Error cleaning up temporary directory ${this.workingDirTmp}:`, error);
    }
  }

  private async setLargeContentChunked(page: Page, content: string, timeout: number): Promise<void> {
    const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB chunks
    const chunks = [];
    
    for (let i = 0; i < content.length; i += CHUNK_SIZE) {
      chunks.push(content.slice(i, i + CHUNK_SIZE));
    }

    console.log(`Content split into ${chunks.length} chunks`);

    // Set up the page structure first
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Large Content</title>
        </head>
        <body>
          <div id="content-container"></div>
        </body>
      </html>
    `, {
      waitUntil: 'domcontentloaded',
      timeout: timeout / 2,
    });

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Injecting chunk ${i + 1}/${chunks.length}`);
      
      await page.evaluate((chunk, index) => {
        const container = document.getElementById('content-container');
        if (!container) {
          throw new Error('Content container not found');
        }
        if (index === 0) {
          container.innerHTML = chunk;
        } else {
          container.innerHTML += chunk;
        }
        
        // Force garbage collection if available
        if ((window as any).gc) {
          (window as any).gc();
        }
      }, chunks[i], i);

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: timeout / 2 });
  }

  private async handleLargeContentStreaming(page: Page, content: string, timeout: number): Promise<void> {
    const STREAM_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil(content.length / STREAM_CHUNK_SIZE);
    
    console.log(`Streaming large content: ${totalChunks} chunks of ${STREAM_CHUNK_SIZE / 1024 / 1024}MB each`);

    // Set up streaming infrastructure
    await page.evaluateOnNewDocument(() => {
      (window as any).__STREAMING_MODE__ = true;
      (window as any).__CONTENT_CHUNKS__ = [];
    });

    // Stream chunks with memory monitoring
    for (let i = 0; i < totalChunks; i++) {
      const start = i * STREAM_CHUNK_SIZE;
      const end = Math.min(start + STREAM_CHUNK_SIZE, content.length);
      const chunk = content.slice(start, end);

      console.log(`Processing chunk ${i + 1}/${totalChunks}`);

      await page.evaluate((chunkData, chunkIndex) => {
        (window as any).__CONTENT_CHUNKS__[chunkIndex] = chunkData;
        
        if ((window as any).gc) {
          (window as any).gc();
        }
      }, chunk, i);

      // Monitor memory usage every few chunks
      // if (i % 5 === 0) {
      //   const metrics = await page.metrics();
      //   const heapUsed = metrics.JSHeapUsedSize ? Math.round(metrics.JSHeapUsedSize / 1024 / 1024) : 0;
      //   console.log(`Memory usage at chunk ${i}: ${heapUsed}MB`);
        
      //   // If memory usage is too high, force garbage collection
      //   if (heapUsed > 6000) { // 6GB threshold
      //     console.log('High memory usage detected, forcing garbage collection...');
      //     await page.evaluate(() => {
      //       if ((window as any).gc) {
      //         (window as any).gc();
      //       }
      //     });
      //   }
      // }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    await page.evaluate(() => {
      const combinedContent = (window as any).__CONTENT_CHUNKS__.join('');
      document.body.innerHTML = combinedContent;
      
      delete (window as any).__CONTENT_CHUNKS__;
      
      if ((window as any).gc) {
        (window as any).gc();
      }
    });

    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: timeout / 2 });
  }

  private async handleLargeContentViaFile(page: Page, content: string, timeout: number): Promise<void> {
    const tempFile = `/tmp/large-content-${Date.now()}.html`;
    
    try {
      // Write content to temporary file
      await fs.promises.writeFile(tempFile, content, 'utf8');
      console.log(`Large content written to temporary file: ${tempFile}`);

      // Load content from file
      await page.goto(`file://${tempFile}`, {
        waitUntil: ['load', 'networkidle0'],
        timeout: timeout,
      });

    } catch(error) {
      console.log(error, 'Eror when load image...');
    } finally {
      // Clean up temporary file
      try {
        await fs.promises.unlink(tempFile);
      } catch (error) {
        console.warn('Failed to clean up temporary file:', error);
      }
    }
  }
}