import fs from 'fs';
import sharp from 'sharp';
import { MasterElement, SVGElement } from './types/index'

import {
  getContentByTag,
  getContentByPoint,
  getBackgroundTag,
  getShapeRectanglesTag,
  getElemAttributesByImage,
  getFilterGradientTags,
  getMatrixFromTransform,
  getShapeClipPathTags,
  getClipPathId,
  removeDOCTYPE,
  getTextRectanglesTag,
  getImageParentTags,
  getElemAttributesByImageWithRegex,
} from './utils-svg';
import PotraceService from './services/potraceService';

type OptionsExportSVG = {
  groupElementFilePathTmp: string[],
  elementsFilePathTmp: Map<string, string[]>,
}

type PartialElement = {
  outerHTML: string,
  innerHTML: string,
}

class HandlerSVGContent {
  private svgContent: string;
  private backupSvgContent: string;
  private potraceService = new PotraceService();
  private background: string;
  private shapeRectangles: string[];
  private elements: PartialElement[];
  private groupElement: PartialElement;
  private configs: Record<string, any>;
  private data: any;
  private filterGradientTags: string[];
  private shapeClipPaths: string[];
  private shapeClipPathsByText: string[];
  private shapeClipPathsExluceText: string[];
  private textRectangles: string[];
  private styles: string[];
  private replacementMap = new Map<string, string>();
  private elementsFilePathTmp = new Map<string, string[]>;
  private groupElementFilePathTmp: string[];

  constructor(svgContent: string, styles: any, data: any, options: OptionsExportSVG) {
    this.styles = styles;
    this.potraceService = new PotraceService();
    this.configs = {
      pageColumns: 1,
      pageRows: 1,
      sectionIndex: 1,
    }
    console.log('By pass 1');
    svgContent = svgContent.replace(/\s+/g, ' ');
    console.log('By pass 2');
    this.background = getBackgroundTag(svgContent);
    console.log('By pass 3');
    this.shapeRectangles = getShapeRectanglesTag(svgContent);
    console.log('By pass 4');
    this.filterGradientTags = getFilterGradientTags(svgContent) as string[];
    console.log('By pass 5');
    const defsContent = getContentByTag(svgContent, 'defs')?.[0] || '';
    console.log('By pass 6');
    this.shapeClipPaths = getShapeClipPathTags(defsContent) as string[];
    console.log('By pass 7');
    this.shapeClipPathsExluceText = this.shapeClipPaths.filter((shapeClipPath) => !shapeClipPath.includes('text'));
    console.log('By pass 8');
    this.shapeClipPathsByText = this.shapeClipPaths.filter((shapeClipPath) => shapeClipPath.includes('text'));
    console.log('By pass 9');
    this.textRectangles = getTextRectanglesTag(svgContent);
    console.log('By pass 10');
    this.data = data;
    if (this.filterGradientTags?.length) {
      this.filterGradientTags.forEach((filterGradient, index) => {
        this.replacementMap.set(filterGradient, `##filterGradient${index}##`);
      });
    }

    if (this.background) {
      this.replacementMap.set(this.background, '##background##');
      this.data = this.data.filter((item: any) => item.type !== 'background');
    }

    if (this.shapeRectangles?.length) {
      this.shapeRectangles.forEach((shapeRectangle, index) => {
        this.replacementMap.set(shapeRectangle, `##shapeRectangles${index}##`);
      });
    }

    if (this.shapeClipPathsByText?.length) {
      this.shapeClipPathsByText.forEach((shapeClipPath, index) => {
        this.replacementMap.set(shapeClipPath, `##shapeClipPathsByText${index}##`);
      });
    }
      
    if (this.shapeClipPathsExluceText?.length) {
      this.shapeClipPathsExluceText.forEach((shapeClipPath, index) => {
        this.replacementMap.set(shapeClipPath, `##shapeClipPathsExluceText${index}##`);
      });
    }

    // Apply all replacements at once
    for (const [key, value] of this.replacementMap.entries()) {
      svgContent = svgContent.replace(key, value);
    }
    console.log('By pass 11');
    this.replacementMap.clear();
    svgContent = svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    this.svgContent = svgContent;
    this.backupSvgContent = svgContent;
    this.elements = [];
    this.groupElement = {
      outerHTML: '',
      innerHTML: '',
    };
    this.elementsFilePathTmp = options.elementsFilePathTmp;
    this.groupElementFilePathTmp = options.groupElementFilePathTmp;

    // this.initGroupElementContent();
    // this.initElementsContent();
    // this.removeFileTemp();
  }

  private chunkSize(content: string, callback: Function): Promise<void> {
    return new Promise(resolve => {
      const CHUNK_SIZE = 1024 * 1024 * 5;
      const totalChunks = Math.ceil(content.length / CHUNK_SIZE);
      let nextChunk = 0;
      function sendNextChunk() {
        if (nextChunk >= totalChunks) {
          resolve();
        }
        let start = CHUNK_SIZE * nextChunk;
        let end = Math.min(start + CHUNK_SIZE, content.length);
        const subContent = content.substring(start, end);
        callback(subContent);
        nextChunk++;
        setTimeout(sendNextChunk, 0);
      }
      sendNextChunk();
    })
  }

  private async initGroupElementContent() {
    this.groupElement = {
      outerHTML: '',
      innerHTML: '',
    };

    // this.groupElementFilePathTmp.forEach((fileTemp: string, index: number) => {
    //   if (index === 0) {
    //     const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
    //     this.groupElement.outerHTML = this.chunkSize(content, this.groupElement.outerHTML);
    //   } else {
    //     const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
    //     this.groupElement.innerHTML = this.chunkSize(content, this.groupElement.innerHTML);
    //   }
    // });
    // const ps1 = this.groupElementFilePathTmp.map((fileTemp: string, index: number) => {

    // })
    const content1 = fs.readFileSync(this.groupElementFilePathTmp[0], { encoding: 'utf8' });
    const content2 = fs.readFileSync(this.groupElementFilePathTmp[1], { encoding: 'utf8' });
    const ps1 = [
      this.chunkSize(content1, (data: string) => { this.groupElement.outerHTML += data }),
      this.chunkSize(content2, (data: string) => { this.groupElement.innerHTML += data }),
    ];
    await Promise.all(ps1);
    this.groupElementFilePathTmp = [];
  }

  private async initElementsContent() {
    this.elements = [];
    // this.elementsFilePathTmp.get('innerHTML')?.forEach((fileTemp: string, index: number) => {
    //   if (!this.elements[index]) {
    //     this.elements[index] = { outerHTML: '', innerHTML: '' };
    //   }
    //   const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
    //   // this.elements[index].innerHTML = content;
    //   this.elements[index].innerHTML = this.chunkSize(content, this.elements[index].innerHTML);
    // });

    // this.elementsFilePathTmp.get('outerHTML')?.forEach((fileTemp: string, index: number) => {
    //   const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
    //   // this.elements[index].outerHTML = content;
    //   this.elements[index].outerHTML = this.chunkSize(content, this.elements[index].outerHTML);
    // });

    const ps1 = this.elementsFilePathTmp.get('innerHTML')?.map((fileTemp: string, index: number) => {
      if (!this.elements[index]) {
        this.elements[index] = { outerHTML: '', innerHTML: '' };
      }
      const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
      return this.chunkSize(content, (data: string) => {
        this.elements[index].innerHTML += data;
      });
    }) as any[];
    await Promise.all(ps1);

    const ps2 = this.elementsFilePathTmp.get('outerHTML')?.map((fileTemp: string, index: number) => {
      const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
      return this.chunkSize(content, (data: string) => {
        this.elements[index].outerHTML += data;
      });
    }) as any[];
    await Promise.all(ps2);
    console.log('By pass load elements...')
    this.elementsFilePathTmp.clear();
  }

  private removeFileTemp() {
    try {
      // Remove group element temp files
      this.groupElementFilePathTmp.forEach((fileTemp: string) => {
        try {
          if (fs.existsSync(fileTemp)) {
            fs.unlinkSync(fileTemp);
            console.log(`Removed group temp file: ${fileTemp}`);
          }
        } catch (error) {
          console.warn(`Failed to remove group temp file ${fileTemp}:`, error);
        }
      });

      // Remove elements temp files
      for (const [_, filePaths] of this.elementsFilePathTmp.entries()) {
        filePaths.forEach((fileTemp: string) => {
          try {
            if (fs.existsSync(fileTemp)) {
              fs.unlinkSync(fileTemp);
              console.log(`Removed element temp file: ${fileTemp}`);
            }
          } catch (error) {
            console.warn(`Failed to remove element temp file ${fileTemp}:`, error);
          }
        });
      }

      // Try to remove the temp directory if it's empty
      // try {
      //   const tempDir = 'temp';
      //   if (fs.existsSync(tempDir)) {
      //     const files = fs.readdirSync(tempDir);
      //     if (files.length === 0) {
      //       fs.rmdirSync(tempDir);
      //       console.log('Removed empty temp directory');
      //     } else {
      //       console.log(`Temp directory still contains ${files.length} files`);
      //     }
      //   }
      // } catch (error) {
      //   console.warn('Failed to remove temp directory:', error);
      // }

      console.log('Temp file cleanup completed successfully!');
    } catch (error) {
      console.error('Error during temp file cleanup:', error);
    }
  }

  getFileTempById(index: number, tag: string, format = 'txt') {
    return `temp/element-${index}-${tag}.${format}`;
  }

  getContentWithFileTemp(index: number, tag: string) {
    const fileTmp = this.getFileTempById(index, tag);
    return fs.readFileSync(fileTmp, { encoding: 'utf8' });
  }

  getContentGroupWithTemp(tag: string) {
    let fileTmp = 'temp/groupOuterHTML.txt';
    if (tag === 'innerHTML') {
      fileTmp = 'temp/groupInnerHTML.txt';
    }
    return fs.readFileSync(fileTmp, { encoding: 'utf8' });
  }

  isTextElement(elementHtml: string) {
    return getContentByTag(elementHtml, 'text').length > 0
  }

  isImageElement(elementHtml: string) {
    return getContentByTag(elementHtml, 'image').length > 0;
  }

  isClipPath(elementHtml: string) {
    const clipPathId = getClipPathId(elementHtml);
    if (clipPathId) {
      return clipPathId.includes('canvas_clip_path');
    }
    return false;
  }

  hasClipPath(index: number) {
    return this.isClipPath(this.elements[index + 1]?.outerHTML ?? '');
  }

  hasAdobe(elementHtml: string) {
    return elementHtml.indexOf('&ns_extend') !== -1 || elementHtml.indexOf('&ns_ai') !== -1 || elementHtml.indexOf('&ns_graphs') !== -1;
  }

  hasFilter(elementHtml: string) {
    return elementHtml.indexOf('filter') !== -1;
  }

  private isCurvedText(content: string) {
    return content.match('<textPath');
  }

  async convertSvgToPng(file: string) {
    try {
      const pngBuffer = await sharp(Buffer.from(file))
        .toFormat('png')
        .toBuffer();
      return `data:image/png;base64,${pngBuffer.toString('base64')}`;
    } catch (error) {
      return file;
    }
  }

  async convertImage(elementTag: string) {
    const imageElements = getContentByTag(elementTag, 'image');
    const svgImages = [];
    
    for (let imageElement of imageElements) {
      const imageStyles = getElemAttributesByImage(imageElement);
      // @ts-ignore
      let imageContent = imageStyles?.href as any;
      if (!imageContent) {
        continue;
      }
      
      if (imageContent.startsWith('data:image/svg+xml')) {
        imageContent = decodeURIComponent(imageContent.split(',')[1]);
        if (imageContent.indexOf('svg_has_been_converted') !== -1) {
          console.log('Case svg uncode3')
          const xml = '<?xml version="1.0"?>';
          imageContent = imageContent.replace(xml, '');
          svgImages.push({ imageElement, imageContent: this.removeMetadata(imageContent) });
          continue;
        }

        const classSvg = `svg-${imageStyles.id}`.replace(/_/g, '-');
        const styles = getContentByTag(imageContent, 'style');
        
        // Process styles in a single iteration where possible
        let tmpContent = imageContent;
        for (const style of styles) {
          const allStyle = style.replace(/<style[^>]*>/g, '').match(/.(.*?){(.*?)}/g) || [];
          let tmpStyle = style;
          
          // Build modified style string in one go
          const modifiedStyles = allStyle.map(item => `.${classSvg} ${item}`).join('');
          tmpStyle = tmpStyle.replace(allStyle.join(''), modifiedStyles);
          tmpContent = tmpContent.replace(style, tmpStyle);
        }
        imageContent = tmpContent;
  
        const imageStylesBySvg = getElemAttributesByImage(imageContent);
        imageContent = imageContent.replace(/<\/svg>/g, '').replace(/<svg[^>]*>/g, '');
        imageContent = removeDOCTYPE(imageContent);
        imageContent = this.removeMetadata(imageContent);
        
        // Build SVG content using template string (more efficient)
        imageContent = `
          <g filter="${imageStyles.filter || ''}">
            <svg
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="${imageStylesBySvg.viewBox}"
              width="${imageStyles.width}"
              height="${imageStyles.height}"
              x="${imageStyles.x}"
              y="${imageStyles.y}"
              fill="${imageStylesBySvg.fill || ''}"
              preserveAspectRatio="${imageStyles.preserveAspectRatio || ''}"
              class="${classSvg} svg_has_been_converted"
              style="${imageStyles.style || ''}"
            >
              ${imageContent}
            </svg>
          </g>
        `;
      } else {
        imageContent = imageElement.replace(/xlink:href="([^"]*)"/, `xlink:href="${imageContent}"`);
      }
      svgImages.push({ imageElement, imageContent });
    }
    
    return {
      elementTag,
      path: '',
      type: 'IMAGE',
      svgImages,
    };
  }

  private async convertTextByPosterize(elementTag: string, outerHTML: string, element?: MasterElement): Promise<SVGElement> {
    const groupElementContent = this.getContentGroupWithTemp('innerHTML') || '';
    const currentOnlyTextHtml = this.backupSvgContent.replace(groupElementContent, outerHTML);

    // const path = await this.potraceService.convertTextByPotrace(currentOnlyTextHtml, elementTag, this.styles);
    const path = await this.potraceService.converTextByPotraceNew({
        textHTML: currentOnlyTextHtml,
        innerHTML: elementTag,
      },
      {
      styles: this.styles,
      element,
    });
    console.log(elementTag.slice(0, 200), 'elementTag Text...');
    fs.writeFileSync('temp/test.txt', elementTag);
    console.log(path.slice(0, 200), 'path Text...');
    return {
      type: 'TEXT',
      elementTag,
      path,
    };
  }

  private async convertTextClippingMaskByPosterize(index: number, elementTag: string, outerHTML: string): Promise<SVGElement> {
    // const outerHtmlByClipPath: string = this.elements[index + 1].outerHTML || '';
    const outerHtmlByClipPath = this.getContentWithFileTemp(index + 1, 'outerHTML');
    const clippingMaskTag = this.isClipPath(outerHtmlByClipPath) ? outerHtmlByClipPath : '';
    console.log(clippingMaskTag.slice(-100), 'slice 100');

    const imageClipPathTag = getContentByTag(clippingMaskTag, 'image')?.[0] || '';
    const styleImageClipPathTag = getElemAttributesByImage(imageClipPathTag);
    const displayNone = [
      'display: none',
      'visibility: hidden',
      'opacity: 0',
    ];

    if (displayNone.some((style: string) => (styleImageClipPathTag?.style || '').includes(style))) {
      this.elements.splice(index + 1, 1);
      return this.convertTextByPosterize(elementTag, outerHTML);
    }

    // const groupElementContent = this.groupElement?.innerHTML || '';
    const groupElementContent = this.getContentGroupWithTemp('innerHTML') || '';
    const currentOnlyTextHtml = this.svgContent.replace(groupElementContent, `${outerHTML}${clippingMaskTag}`);
    const path = await this.potraceService.convertTextClipPathByPotrace(currentOnlyTextHtml, elementTag, this.styles);
    return {
      elementTag,
      path,
      clippingMaskTag,
      type: 'TEXT_CLIP_PATH',
    };
  }

  convertShape(svgContent: string) {
    const replacements = new Map<string, string>();
    
    this.shapeClipPathsByText.forEach((shapeClipPath, index) => {
      replacements.set(`##shapeClipPathsByText${index}##`, shapeClipPath);
    });

    this.shapeClipPathsExluceText.forEach((shapeClipPath, index) => {
      replacements.set(`##shapeClipPathsExluceText${index}##`, shapeClipPath);
    });

    this.shapeRectangles.forEach((shapeRectangle, index) => {
      replacements.set(`##shapeRectangles${index}##`, shapeRectangle);
    });

    for (const [key, value] of replacements.entries()) {
      svgContent = svgContent.replace(key, value);
    }
    replacements.clear();
    return svgContent;
  }

  convertBackground(svgContent: string) {
    if (!this.background) {
      return svgContent;
    }
    return svgContent.replace('##background##', this.background);
  }

  convertFillTransparent(svgContent: string) {
    svgContent = svgContent
      .replace(/fill="transparent"/g, 'fill="none"')
      .replace(/fillColor&quot;:&quot;transparent&quot;/g, "fillColor&quot;:&quot;none&quot;");
    return svgContent;
  }

  fixAdobeTag(svgContent: string) {
    if (!this.hasAdobe(svgContent)) {
      return svgContent;
    }

    const pgfs = getContentByPoint(svgContent, '<i:pgf ', '</i:pgf>');
    const pgfRefs = getContentByPoint(svgContent, '<i:pgfRef ', '</i:pgfRef>');

    let result = svgContent;
    [...pgfs, ...pgfRefs].forEach(tag => {
      result = result.replace(tag, '');
    });

    result = result.replace('<svg', `<svg xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"`);
    result = `<!DOCTYPE svg [
      <!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">
      <!ENTITY ns_ai "http://ns.adobe.com/AdobeIllustrator/10.0/">
      <!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">
      ]>
      ${result}
    `;
    return result;
  }

  removeMetadata(svgContent: string) {
    return svgContent.replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/g, '');
  }

  removeInkscapeAttributes(svgContent: string) {
    return svgContent.replace(/\s+inkscape:[^=]*="[^"]*"/g, '');
  }

  removeSodipodiNamedview(svgContent: string) {
    return svgContent.replace(/<sodipodi:namedview[^>]*\/?>/g, '');
  }

  getBleedSize() {
    return 37.5;
  }

  updateTransformClippingPathWithBleedSize(outerHTML: string, {
    col = 1,
    row = 1,
    bleedSize = 0,
  }) {
    const clipPathId = getClipPathId(outerHTML);
    let selectClipPath = this.shapeClipPathsExluceText.find(shapeClipPath => shapeClipPath.match(clipPathId)) as string;
    const selectClipPathIndex = this.shapeClipPathsExluceText.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    
    if (selectClipPath && selectClipPathIndex !== -1) {
      // @ts-ignore
      const transform = getMatrixFromTransform(selectClipPath.match(/transform="[^"]*"/)?.[0]);
      const translateX = 0;
      const translateY = 0;
      transform[4] = transform[4] + translateX;
      transform[5] = transform[5] + translateY;
      selectClipPath = selectClipPath.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
      // Store the replacement instead of modifying svgContent directly
      this.replacementMap.set(`##shapeClipPathsExluceText${selectClipPathIndex}##`, selectClipPath);
    }
  }

  getMasterElement(innerHTML: string) {
    return this.data.find((item: any) => innerHTML.includes(item.elementKey));
  }

  getTextRectByElementKey(key: string) {
    return this.textRectangles.find((textRectangle) => textRectangle.match(key));
  }

  private getClipPathId(html: string): string {
    const regex = /clip-path="url\(#([^)]+)\)"/;
    const match = html.match(regex);
    return match ? match[1] : '';
  }

  getNewClippingPathTagsContent(input: any) {
    const { elementKey } = input;
    let { clipPath, path } = input;
    const idPath = `clipingText_path_${elementKey}`;
    const textTag = getContentByTag(clipPath, 'text')?.[0] || '';
    const contentClipPathTag = `
      <use
        width="100%"
        height="100%"
        xlink:href="#${idPath}"
      />
    `;
    clipPath = clipPath.replace(textTag, contentClipPathTag);
    clipPath = clipPath.replace(/transform="[^"]*"/, '');
    path = path.replace('<path', `<path id="${idPath}"`).replace(/fill="[^"]*"/g, 'fill="none"');
    return [clipPath, path].join('');
  }

  // async convertClippingPathText(index: number, elementTag: string, outerHTML: string) {
  //   console.log('convertClippingPathText() ====> NEW');
  //   const outerHtmlByClipPath: string = this.elements[index + 1]?.outerHTML || '';
  //   const clippingMaskTag = this.isClipPath(outerHtmlByClipPath) ? outerHtmlByClipPath : '';
  //   const imageClipPathTag = getContentByTag(clippingMaskTag, 'image')?.[0] || '';
  //   const styleImageClipPathTag = getElemAttributesByImage(imageClipPathTag);
  //   const displayNone = [
  //     'display: none',
  //     'visibility: hidden',
  //     'opacity: 0',
  //   ];
    
  //   let newTransform = '';
  //   let pureContentPath = '';
  //   const masterElement = this.getMasterElement(elementTag);
  //   const textStyleTags = (getTextStylesContent(elementTag) || []) as string[];
  //   const filterTags = textStyleTags.map((textStyleTag) => {
  //     return {
  //       type: getTypeFiltersFromFilterTag(textStyleTag) as string,
  //       tagUrl: getFilterUrls(textStyleTag),
  //     }
  //   });
    
  //   const textPathService = new TextService({
  //     html: { innerHTML: elementTag, outerHTML },
  //     // @ts-ignore
  //     data: { masterElement: masterElement as MasterElement, settings: this.textPathSettings, filterTags }
  //   });
    
  //   const res = await textPathService.exportPath((res: ClippathTagsOutput) => {
  //     pureContentPath = res.path;
  //     newTransform = res.transform;
  //   });
    
  //   if (displayNone.some((style: string) => (styleImageClipPathTag?.style || '').includes(style))) {
  //     this.elements.splice(index + 1, 1);
  //     return res;
  //   }

  //   const clipPathId = this.getClipPathId(outerHtmlByClipPath);
  //   let selectClipPath = this.shapeClipPathsByText.find(shapeClipPath => shapeClipPath.match(clipPathId));
  //   const selectClipPathIndex = this.shapeClipPathsByText.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    
  //   if (selectClipPath && selectClipPathIndex !== -1) {
  //     selectClipPath = this.getNewClippingPathTagsContent({
  //       elementKey: masterElement?.elementKey || '',
  //       transform: newTransform,
  //       clipPath: selectClipPath,
  //       path: pureContentPath,
  //     });
  //     // Store the replacement instead of modifying svgContent directly
  //     this.replacementMap.set(`##shapeClipPathsByText${selectClipPathIndex}##`, selectClipPath);
  //   }

  //   return {
  //     ...res,
  //     clippingMaskTag,
  //     elementTag,
  //     type: 'TEXT_CLIP_PATH',
  //   }
  // }

  // async convertClippingPathCurvedText(index: number, elementTag: string, outerHTML: string) {
  //   const outerHtmlByClipPath: string = this.elements[index + 1]?.outerHTML || '';
  //   const clippingMaskTag = this.isClipPath(outerHtmlByClipPath) ? outerHtmlByClipPath : '';
  //   const imageClipPathTag = getContentByTag(clippingMaskTag, 'image')?.[0] || '';
  //   const styleImageClipPathTag = getElemAttributesByImage(imageClipPathTag);
  //   const displayNone = [
  //     'display: none',
  //     'visibility: hidden',
  //     'opacity: 0',
  //   ];
    
  //   let newTransform = '';
  //   const masterElement = this.getMasterElement(elementTag);
  //   const res = await this.convertTextByPosterize(elementTag, outerHTML);
    
  //   if (displayNone.some((style: string) => (styleImageClipPathTag?.style || '').includes(style))) {
  //     this.elements.splice(index + 1, 1);
  //     return res;
  //   }
    
  //   const clipPathId = this.getClipPathId(outerHtmlByClipPath);
  //   let selectClipPath = this.shapeClipPathsByText.find(shapeClipPath => shapeClipPath.match(clipPathId));
  //   const selectClipPathIndex = this.shapeClipPathsByText.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    
  //   if (selectClipPath && selectClipPathIndex !== -1) {
  //     selectClipPath = this.getNewClippingPathTagsContent({
  //       elementKey: masterElement?.elementKey || '',
  //       transform: newTransform,
  //       clipPath: selectClipPath,
  //       path: res.path,
  //     });
  //     // Store the replacement instead of modifying svgContent directly
  //     this.replacementMap.set(`##shapeClipPathsByText${selectClipPathIndex}##`, selectClipPath);
  //   }
    
  //   return {
  //     ...res,
  //     clippingMaskTag,
  //     elementTag,
  //     type: 'CURVED_TEXT_CLIP_PATH',
  //   }
  // }

  // Process elements in smaller chunks to reduce memory pressure
  // private async processBatch(batch: Element[], startIndex: number) {
  //   const results = [];
    
  //   for (let i = 0; i < batch.length; i++) {
  //     const element = batch[i];
  //     const { outerHTML, innerHTML } = element;
  //     const index = startIndex + i;
      
  //     if (this.isTextElement(innerHTML)) {
  //       if (this.hasClipPath(index)) {
  //         results.push(this.convertClippingPathText(index, innerHTML, outerHTML));
  //       } else {
  //         results.push(this.convertTextByPosterize(innerHTML, outerHTML));
  //       }
  //     } else if (this.isImageElement(innerHTML)) {
  //       this.updateTransformClippingPathWithBleedSize(outerHTML, { col: 1, row: 1, bleedSize: this.getBleedSize() });
  //       results.push(this.convertImage(innerHTML));
  //     }
  //   }
    
  //   return await Promise.all(results);
  // }

  // clearAllData() {
  //   this.shapeRectangles = [];
  //   this.filterGradientTags = [];
  //   this.shapeClipPaths = [];
  //   this.shapeClipPathsByText = [];
  //   this.shapeClipPathsExluceText = [];
  //   this.textRectangles = [];
  //   this.elements = [];
  //   this.replacementMap.clear();
  // }

  public async cleanup() {
    try {
      await this.potraceService.cleanup();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // async export() {
  //   const batchSize = 3;
  //   const elementsResult = [];
  //   let batchResult = [];
  //   for (let i = 0; i < this.elements.length; i += batchSize) {
  //     const batch = this.elements.slice(i, i + batchSize);
  //     batchResult = await this.processBatch(batch, i);
  //     elementsResult.push(...batchResult);
  //   }
  //   batchResult.length = 0;

  //   for (const element of elementsResult) {
  //     if (!element) {
  //       continue;
  //     }
  
  //     const { elementTag, clippingMaskTag, path } = element as any;
     
  //     switch (element.type) {
  //       case 'TEXT': {
  //         this.replacementMap.set(elementTag, path);
  //         break;
  //       }
  //       case 'TEXT_CLIP_PATH': {
  //         this.replacementMap.set(elementTag, path);
  //         this.replacementMap.set(clippingMaskTag || '', '');
  //         break;
  //       }
  //       case 'IMAGE': {
  //         // @ts-ignore
  //         for (const item of element.svgImages || []) {
  //           this.replacementMap.set(item.imageElement, item.imageContent);
  //         }
  //         break;
  //       }
  //     }
  //   }
    
  //   // for (const [key, value] of this.replacementMap.entries()) {
  //   //   this.svgContent = this.svgContent.replace(key, value);
  //   // }

  //   // this.replacementMap.clear();
  //   // this.svgContent = this.svgContent.replace(/&nbsp;/g, ' ');
  //   // this.svgContent = pipe(
  //   //   (content: string) => this.convertBackground(content),
  //   //   (content: string) => this.convertShape(content),
  //   //   (content: string) => this.convertFillTransparent(content),
  //   //   (content: string) => this.fixAdobeTag(content),
  //   // )(this.svgContent);

  //   this.svgContent = this.svgContent.replace(/&nbsp;/g, ' ');
  //   this.svgContent = this.convertBackground(this.svgContent);
  //   this.svgContent = this.convertShape(this.svgContent);
  //   this.svgContent = this.convertFillTransparent(this.svgContent);
  //   this.svgContent = this.fixAdobeTag(this.svgContent);

  //   this.clearAllData();

  //   const used = process.memoryUsage();
  //   console.log('End of export service');
  //   console.log('Memory usage:');
  //   console.log(`  - heapTotal: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
  //   console.log(`  - heapUsed: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
  //   console.log(`  - external: ${Math.round(used.external / 1024 / 1024)} MB`);
  //   console.log(`  - rss: ${Math.round(used.rss / 1024 / 1024)} MB`);

  //   return this.svgContent;
  // }

  async export() {
    await this.initGroupElementContent();
    await this.initElementsContent();
    // this.removeFileTemp();
    console.time('export SVG');
    console.log(this.elements.length, 'this.elements.length..');
    const col = 1;
    const row = 1;
    const bleedSize = 0;
    const batchSize = 3;
    const elementsResult = [];
    for (let i = 0; i < this.elements.length; i += batchSize) {
      const batch = this.elements.slice(i, i + batchSize);
      const batchResult = await Promise.all(
        batch.map((_, index: number) => {
          const outerHTML = this.getContentWithFileTemp(i + index, 'outerHTML');
          const innerHTML = this.getContentWithFileTemp(i + index, 'innerHTML');
          if (this.isTextElement(innerHTML)) {
            console.log(i + index, 'isTextElement...')
            const masterElement = this.getMasterElement(innerHTML);
            // console.log(masterElement, 'masterElement..');
            if (this.hasClipPath(i + index)) {
              return this.convertTextClippingMaskByPosterize(i + index, innerHTML, outerHTML);
            }
            return this.convertTextByPosterize(innerHTML, outerHTML, masterElement);
          }

          if (this.isImageElement(innerHTML)) {
            console.log('isImageElement...')
            this.updateTransformClippingPathWithBleedSize(outerHTML, { col, row, bleedSize });
            return this.convertImage(innerHTML);
          }
        }).filter(el => Boolean(el))
      );
      elementsResult.push(...batchResult);
    }
  
    for (const element of elementsResult) {
      if (!element) {
        continue;
      }
  
      const { elementTag, clippingMaskTag, path } = element as any;
     
      switch (element.type) {
        case 'TEXT': {
          // console.log(elementTag)
          this.svgContent = this.svgContent.replace(elementTag, path);
          break;
        }
        case 'TEXT_CLIP_PATH': {
          this.svgContent = this.svgContent.replace(elementTag, path).replace(clippingMaskTag || '', '');
          break;
        }
        case 'IMAGE': {
          for (const item of element.svgImages || []) {
            this.svgContent = this.svgContent.replace(item.imageElement, item.imageContent);
          }
          break;
        }
      }
    }

    const imageParentTags = getImageParentTags(this.svgContent);
    imageParentTags.forEach((imageParentTag: string) => {
      let newImageParentTag = imageParentTag;
      const styles = getElemAttributesByImageWithRegex(imageParentTag);
      const transform = getMatrixFromTransform(styles?.transform || '');
      const translateX = (col === 1) ? bleedSize : 0;
      const translateY = (row === 1) ? bleedSize : 0;
      transform[4] = transform[4] + translateX;
      transform[5] = transform[5] + translateY;
      newImageParentTag = imageParentTag.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
      this.svgContent = this.svgContent.replace(imageParentTag, newImageParentTag);
    });

    this.svgContent = this.svgContent.replace(/&nbsp;/g, ' ');
    this.svgContent = this.removeMetadata(this.svgContent);
    this.svgContent = this.removeInkscapeAttributes(this.svgContent);
    this.svgContent = this.removeSodipodiNamedview(this.svgContent);
    this.svgContent = this.convertBackground(this.svgContent);
    this.svgContent = this.convertShape(this.svgContent);
    this.svgContent = this.convertFillTransparent(this.svgContent);
    this.svgContent = this.fixAdobeTag(this.svgContent);
    
    // this.removeAllTempFiles();
    
    console.timeEnd('export SVG');
    return this.svgContent;
  }
}

export default HandlerSVGContent;
