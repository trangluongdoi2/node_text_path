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
  removeXMLContent,
  getTextParentTags,
} from './utils-svg';
import PotraceService from './services/potraceService';
import { randomString } from './helper/string';
import { prepareWorkingDir } from './helper/file';
const os = require('os');
const path = require('path');

type OptionsExportSVG = {
  svgContentFilePathTmp: string,
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
  private declare elementLength: number;
  private WORKING_DIR = process.env.TEMP_DIR || path.join(os.tmpdir(), 'chromiumFile');

  constructor(styles: any, data: any, options: OptionsExportSVG) {
    let svgContent = fs.readFileSync(options.svgContentFilePathTmp, { encoding: 'utf8' });
    this.styles = styles;
    this.potraceService = new PotraceService();
    this.configs = {
      pageColumns: 1,
      pageRows: 1,
      sectionIndex: 1,
    }
    svgContent = svgContent.replace(/\s+/g, ' ');
    this.background = getBackgroundTag(svgContent);
    this.shapeRectangles = getShapeRectanglesTag(svgContent);
    this.filterGradientTags = getFilterGradientTags(svgContent) as string[];
    const defsContent = getContentByTag(svgContent, 'defs')?.[0] || '';
    this.shapeClipPaths = getShapeClipPathTags(defsContent) as string[];
    this.shapeClipPathsExluceText = this.shapeClipPaths.filter((shapeClipPath) => !shapeClipPath.includes('text'));
    this.shapeClipPathsByText = this.shapeClipPaths.filter((shapeClipPath) => shapeClipPath.includes('text'));
    // this.textRectangles = getTextRectanglesTag(svgContent);
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

    // if (this.shapeClipPathsByText?.length) {
    //   this.shapeClipPathsByText.forEach((shapeClipPath, index) => {
    //     this.replacementMap.set(shapeClipPath, `##shapeClipPathsByText${index}##`);
    //   });
    // }
      
    if (this.shapeClipPathsExluceText?.length) {
      this.shapeClipPathsExluceText.forEach((shapeClipPath, index) => {
        this.replacementMap.set(shapeClipPath, `##shapeClipPathsExluceText${index}##`);
      });
    }

    for (const [key, value] of this.replacementMap.entries()) {
      svgContent = svgContent.replace(key, value);
    }

    this.replacementMap.clear();
    svgContent = svgContent.replace(/<rect(.*?)<\/rect>/g, '');

    this.svgContent = svgContent;
    this.backupSvgContent = svgContent;

    this.elements = [];
    this.elementsFilePathTmp = options.elementsFilePathTmp;
    this.getElementLength();
  }

  private getElementLength() {
    this.elementLength = this.elementsFilePathTmp.get('innerHTML')?.length || 0;
    return this.elementLength;
  }

  // private chunkSize(content: string, callback: Function): Promise<void> {
  //   return new Promise(resolve => {
  //     const CHUNK_SIZE = 1024 * 1024 * 5;
  //     const totalChunks = Math.ceil(content.length / CHUNK_SIZE);
  //     let nextChunk = 0;
  //     function sendNextChunk() {
  //       if (nextChunk >= totalChunks) {
  //         resolve();
  //       }
  //       let start = CHUNK_SIZE * nextChunk;
  //       let end = Math.min(start + CHUNK_SIZE, content.length);
  //       const subContent = content.substring(start, end);
  //       callback(subContent);
  //       nextChunk++;
  //       setTimeout(sendNextChunk, 0);
  //     }
  //     sendNextChunk();
  //   })
  // }

  // private async initGroupElementContent() {
    // this.groupElement = {
    //   outerHTML: '',
    //   innerHTML: '',
    // };

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
    // const content1 = fs.readFileSync(this.groupElementFilePathTmp[0], { encoding: 'utf8' });
    // const content2 = fs.readFileSync(this.groupElementFilePathTmp[1], { encoding: 'utf8' });
    // const ps1 = [
    //   this.chunkSize(content1, (data: string) => { this.groupElement.outerHTML += data }),
    //   this.chunkSize(content2, (data: string) => { this.groupElement.innerHTML += data }),
    // ];
    // await Promise.all(ps1);
    // this.groupElementFilePathTmp = [];
  // }

  // private async initElementsContent() {
  //   this.elements = [];
  //   // this.elementsFilePathTmp.get('innerHTML')?.forEach((fileTemp: string, index: number) => {
  //   //   if (!this.elements[index]) {
  //   //     this.elements[index] = { outerHTML: '', innerHTML: '' };
  //   //   }
  //   //   const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
  //   //   // this.elements[index].innerHTML = content;
  //   //   this.elements[index].innerHTML = this.chunkSize(content, this.elements[index].innerHTML);
  //   // });

  //   // this.elementsFilePathTmp.get('outerHTML')?.forEach((fileTemp: string, index: number) => {
  //   //   const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
  //   //   // this.elements[index].outerHTML = content;
  //   //   this.elements[index].outerHTML = this.chunkSize(content, this.elements[index].outerHTML);
  //   // });

  //   const ps1 = this.elementsFilePathTmp.get('innerHTML')?.map((fileTemp: string, index: number) => {
  //     if (!this.elements[index]) {
  //       this.elements[index] = { outerHTML: '', innerHTML: '' };
  //     }
  //     const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
  //     return this.chunkSize(content, (data: string) => {
  //       this.elements[index].innerHTML += data;
  //     });
  //   }) as any[];
  //   await Promise.all(ps1);

  //   const ps2 = this.elementsFilePathTmp.get('outerHTML')?.map((fileTemp: string, index: number) => {
  //     const content = fs.readFileSync(fileTemp, { encoding: 'utf8' });
  //     return this.chunkSize(content, (data: string) => {
  //       this.elements[index].outerHTML += data;
  //     });
  //   }) as any[];
  //   await Promise.all(ps2);
  //   console.log('By pass load elements...');
  // }

  // private removeFileTemp() {
  //   try {
  //     // Remove group element temp files
  //     this.groupElementFilePathTmp.forEach((fileTemp: string) => {
  //       try {
  //         if (fs.existsSync(fileTemp)) {
  //           fs.unlinkSync(fileTemp);
  //           console.log(`Removed group temp file: ${fileTemp}`);
  //         }
  //       } catch (error) {
  //         console.warn(`Failed to remove group temp file ${fileTemp}:`, error);
  //       }
  //     });

  //     // Remove elements temp files
  //     for (const [_, filePaths] of this.elementsFilePathTmp.entries()) {
  //       filePaths.forEach((fileTemp: string) => {
  //         try {
  //           if (fs.existsSync(fileTemp)) {
  //             fs.unlinkSync(fileTemp);
  //             console.log(`Removed element temp file: ${fileTemp}`);
  //           }
  //         } catch (error) {
  //           console.warn(`Failed to remove element temp file ${fileTemp}:`, error);
  //         }
  //       });
  //     }

  //     // Try to remove the temp directory if it's empty
  //     // try {
  //     //   const tempDir = 'temp';
  //     //   if (fs.existsSync(tempDir)) {
  //     //     const files = fs.readdirSync(tempDir);
  //     //     if (files.length === 0) {
  //     //       fs.rmdirSync(tempDir);
  //     //       console.log('Removed empty temp directory');
  //     //     } else {
  //     //       console.log(`Temp directory still contains ${files.length} files`);
  //     //     }
  //     //   }
  //     // } catch (error) {
  //     //   console.warn('Failed to remove temp directory:', error);
  //     // }

  //     console.log('Temp file cleanup completed successfully!');
  //   } catch (error) {
  //     console.error('Error during temp file cleanup:', error);
  //   }
  // }

  // getFileTempById(index: number, tag: string, format = 'txt') {
  //   return `temp/element-${index}-${tag}.${format}`;
  // }

  getFileTempById(index: number, tag: string) {
    return (this.elementsFilePathTmp.get(tag) as string[])[index];
  }

  getContentWithFileTemp(index: number, tag: string) {
    const fileTmp = this.getFileTempById(index, tag);
    try {
      // Use streaming read for large files to reduce memory usage
      let content = fs.readFileSync(fileTmp, { encoding: 'utf8' });
      return this.removeReduntdantRect(content);
    } catch (error) {
      console.error(`Error reading temp file ${fileTmp}:`, error);
      return '';
    }
  }

  getContentGroupWithTemp(tag: string) {
    let fileTmp = `${this.WORKING_DIR}/groupOuterHTML.txt`;
    if (tag === 'innerHTML') {
      fileTmp = `${this.WORKING_DIR}/groupInnerHTML.txt`;
    }
    try {
      let content = fs.readFileSync(fileTmp, { encoding: 'utf8' });
      return this.removeReduntdantRect(content);
    } catch (error) {
      console.error(`Error reading group temp file ${fileTmp}:`, error);
      return '';
    }
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
    const outerHTML = this.getContentWithFileTemp(index + 1, 'outerHTML');
    return this.isClipPath(outerHTML);
  }

  hasAdobe(elementHtml: string) {
    return elementHtml.indexOf('&ns_extend') !== -1 || elementHtml.indexOf('&ns_ai') !== -1 || elementHtml.indexOf('&ns_graphs') !== -1;
  }

  hasFilter(elementHtml: string) {
    return elementHtml.indexOf('filter') !== -1;
  }


  private isMultiStyles(masterElement?: MasterElement) {
    if (!masterElement) {
      return false;
    }
    return masterElement.type === 'textbox' && Boolean(Object.keys((masterElement as any)?.styles || {}).length);
  }

  private isHasGradient(masterElement?: MasterElement) {
    if (!masterElement) {
      return false;
    }
    const { backstage = {} } = masterElement;
    if (!Object.keys(backstage).length)  {
      return false;
    }
    const { gradient = {} } = backstage;
    return masterElement.type === 'textbox' && Boolean(gradient?.enabled);
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
    try {
      const imageElements = getContentByTag(elementTag, 'image');
      const svgImages = [];
      
      for (let imageElement of imageElements) {
        const imageStyles = getElemAttributesByImage(imageElement);
        let imageContent = imageStyles?.href as string;
        if (!imageContent) {
          continue;
        }
  
        // fs.writeFileSync(`temp/image-${randomString(false, 5)}.txt`, imageContent);
        
        if (imageContent.startsWith('data:image/svg+xml')) {
          imageContent = decodeURIComponent(imageContent.split(',')[1]);
          if (imageContent.indexOf('svg_has_been_converted') !== -1) {
            console.log('CASE SVG UNCODING');
            // console.log('Case svg uncode3');
            const xml = '<?xml version="1.0"?>';
            imageContent = imageContent.replace(xml, '');
            svgImages.push({ imageElement, imageContent: this.removeContentCauseError(imageContent) });
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
          imageContent = this.removeContentCauseError(imageContent);
          
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
    } catch (error) {
      return {
        elementTag,
        path: '',
        type: 'IMAGE',
        svgImages: [],
      };
    }
  }

  private async convertTextByPosterize(elementTag: string, outerHTML: string, isMultiStyles = false): Promise<SVGElement> {
    const groupElementContent = this.getContentGroupWithTemp('innerHTML') || '';
    // const hasGroupElementContent = this.backupSvgContent.includes(groupElementContent);
    // console.log(groupElementContent.slice(0, 100), 'convertTextByPosterize.. groupElementContent.slice');
    // console.log('Group element content found:', hasGroupElementContent);

    const currentOnlyTextHtml = this.backupSvgContent.replace(groupElementContent, outerHTML);

    // const path = await this.potraceService.converTextByPotraceNew({
    //     textHTML: currentOnlyTextHtml,
    //     innerHTML: elementTag,
    //   },
    //   { styles: this.styles, element });

    const path = await this.potraceService.convertTextByPotrace(currentOnlyTextHtml, elementTag, this.styles, isMultiStyles);
    return {
      type: 'TEXT',
      elementTag,
      path,
    };
  }

  private async convertTextClippingMaskByPosterize(index: number, elementTag: string, outerHTML: string): Promise<SVGElement> {
    const outerHtmlByClipPath = this.getContentWithFileTemp(index + 1, 'outerHTML');
    const clippingMaskTag = this.isClipPath(outerHtmlByClipPath) ? outerHtmlByClipPath : '';

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

    const groupElementContent = this.getContentGroupWithTemp('innerHTML') || '';
    // const flag = this.backupSvgContent.includes(groupElementContent);
    // console.log(flag, 'Has group ElementContent in Clippingmask');
    // fs.writeFileSync('temp/clipping-mask.txt',`${outerHTML}${clippingMaskTag}` as string);
    const currentOnlyTextHtml = this.backupSvgContent.replace(groupElementContent, `${outerHTML}${clippingMaskTag}`);
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

  removeContentCauseError(svgContent: string) {
    svgContent = this.removeMetadata(svgContent);
    svgContent = this.removeInkscapeAttributes(svgContent);
    svgContent = this.removeSodipodiNamedview(svgContent);
    return svgContent;
  }

  removeMetadata(svgContent: string) {
    return svgContent.replace(/<metadata[^>]*>[\s\S]*?<\/metadata>/g, '');
  }

  removeInkscapeAttributes(svgContent: string) {
    // Remove all inkscape attributes and elements, including complex multi-line ones
    // This handles various formats of inkscape content like:
    // <inkscape:path-effect effect="bspline" id="path-effect8" is_visible="true" lpeversion="1.3" weight="33.333333" steps="2" helper_size="0" apply_no_weight="true" apply_with_weight="true" only_selected="false" uniform="false"/>
    
    let result = svgContent;
    
    // Pattern 1: Remove complete inkscape elements (self-closing tags)
    // This matches: <inkscape:path-effect effect="bspline" id="path-effect8" is_visible="true" lpeversion="1.3" weight="33.333333" steps="2" helper_size="0" apply_no_weight="true" apply_with_weight="true" only_selected="false" uniform="false"/>
    result = result.replace(/<inkscape:[^>]*\/>/g, '');
    
    // Pattern 2: Remove inkscape elements with opening and closing tags
    // This matches: <inkscape:something>content</inkscape:something>
    result = result.replace(/<inkscape:[^>]*>[\s\S]*?<\/inkscape:[^>]*>/g, '');
    
    // Pattern 3: Remove inkscape attributes from other elements
    // This matches: inkscape:path-effect effect="bspline" id="path-effect8" is_visible="true" lpeversion="1.3" weight="33.333333"
    result = result.replace(/\s+inkscape:[^=]*="[^"]*"/g, '');
    
    // Pattern 4: Remove any remaining inkscape: prefixes that might be left
    result = result.replace(/\s+inkscape:[^>\s]*/g, '');
    
    // Pattern 5: Clean up any extra whitespace that might be left
    result = result.replace(/\s+/g, ' ');
    
    return result;
  }

  removeSodipodiNamedview(svgContent: string) {
    // Remove all sodipodi attributes and elements, including complex multi-line ones
    // This handles various formats of sodipodi content like:
    // <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="0.98994949" inkscape:cx="400" inkscape:cy="300" inkscape:document-units="mm" inkscape:current-layer="layer1" showgrid="false" inkscape:window-width="1920" inkscape:window-height="1017" inkscape:window-x="0" inkscape:window-y="0" inkscape:window-maximized="1"/>
    // sodipodi:type="arc" sodipodi:cx="100" sodipodi:cy="100" sodipodi:rx="50" sodipodi:ry="50"
    
    let result = svgContent;
    
    // Pattern 1: Remove complete sodipodi elements (self-closing tags)
    // This matches: <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" .../>
    result = result.replace(/<sodipodi:[^>]*\/>/g, '');
    
    // Pattern 2: Remove sodipodi elements with opening and closing tags
    // This matches: <sodipodi:somet`hing>content</sodipodi:something>
    result = result.replace(/<sodipodi:[^>]*>[\s\S]*?<\/sodipodi:[^>]*>/g, '');
    
    // Pattern 3: Remove sodipodi attributes from other elements
    // This matches: sodipodi:type="arc" sodipodi:cx="100" sodipodi:cy="100" sodipodi:rx="50" sodipodi:ry="50"
    result = result.replace(/\s+sodipodi:[^=]*="[^"]*"/g, '');
    
    // Pattern 4: Remove any remaining sodipodi: prefixes that might be left
    result = result.replace(/\s+sodipodi:[^>\s]*/g, '');
    
    // Pattern 5: Clean up any extra whitespace that might be left
    result = result.replace(/\s+/g, ' ');
    
    return result;
  }

  removeReduntdantRect(svgContent: string) {
    svgContent = svgContent.replace(/<rect[^>]*class="[^"]*svg_select_boundingRect[^"]*"[^>]*><\/rect>/g, '');
    svgContent = svgContent.replace(/<rect[^>]*fill="none"[^>]*\/?><\/rect>/g, '')
    return svgContent;
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

  // getTextRectByElementKey(key: string) {
  //   return this.textRectangles.find((textRectangle) => textRectangle.match(key));
  // }

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

  removeAllTempFiles() {
    prepareWorkingDir(this.WORKING_DIR, true);
  }

  async export() {
    console.time('export SVG');
    
    // Log memory usage at start
    const startMemory = process.memoryUsage();
    console.log(`Export started - Memory: ${Math.round(startMemory.heapUsed / 1024 / 1024)}MB heap, ${Math.round(startMemory.rss / 1024 / 1024)}MB RSS`);
    
    const col = 1;
    const row = 1;
    const bleedSize = 0;
    
    // Adaptive batch size based on available memory
    const availableMemory = os.freemem();
    const BATCH_SIZE = availableMemory > 2 * 1024 * 1024 * 1024 ? 4 : 2; // Use smaller batches if less than 2GB available
    console.log(`Using batch size: ${BATCH_SIZE} (available memory: ${Math.round(availableMemory / 1024 / 1024 / 1024)}GB)`);
    
    const elementsResult = [];
    console.log(this.elementLength, 'this.elementLength..');
    const elements = Array.from({ length: this.elementLength }).fill(1);
    // Process elements in sequential batches with memory monitoring
    for (let i = 0; i < this.elementLength; i += BATCH_SIZE) {
      const batch = elements.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(this.elementLength/BATCH_SIZE)} (elements ${i}-${Math.min(i + BATCH_SIZE - 1, this.elementLength - 1)})`);
      
      const batchResult = await Promise.all(
        batch.map(async (_, index: number) => {
          const outerHTML = this.getContentWithFileTemp(i + index, 'outerHTML');
          const innerHTML = this.getContentWithFileTemp(i + index, 'innerHTML');

          if (this.isTextElement(innerHTML)) {
            const masterElement = this.getMasterElement(innerHTML);
            if (this.hasClipPath(i + index)) {
              return this.convertTextClippingMaskByPosterize(i + index, innerHTML, outerHTML);
            }
            console.log(`Processing text element ${i + index}`);
            return this.convertTextByPosterize(innerHTML, outerHTML, this.isMultiStyles(masterElement) && !this.isHasGradient(masterElement));
          }

          if (this.isImageElement(innerHTML)) {
            console.log(`Processing image element ${i + index}`);
            this.updateTransformClippingPathWithBleedSize(outerHTML, { col, row, bleedSize });
            return this.convertImage(innerHTML);
          }
          
          return null;
        })
      );
      
      // Filter out null results and add to main results
      elementsResult.push(...batchResult.filter(Boolean));
      
      // Force garbage collection after each batch if available
      if (global.gc) {
        global.gc();
      }
      
      // Log memory usage after each batch
      const memUsage = process.memoryUsage();
      console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} completed. Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB heap, ${Math.round(memUsage.rss / 1024 / 1024)}MB RSS`);
    }
  
    for (const element of elementsResult) {
      if (!element) {
        continue;
      }
  
      const { elementTag, clippingMaskTag, path } = element as any;
      
      switch (element.type) {
        case 'TEXT': {
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
      // console.log(transform.join(' '));
      newImageParentTag = imageParentTag.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
      this.svgContent = this.svgContent.replace(imageParentTag, newImageParentTag);
    });

    this.svgContent = this.svgContent.replace(/&nbsp;/g, ' ');
    this.svgContent = this.removeContentCauseError(this.svgContent);
    this.svgContent = this.convertBackground(this.svgContent);
    this.svgContent = this.convertShape(this.svgContent);
    this.svgContent = this.convertFillTransparent(this.svgContent);
    this.svgContent = this.fixAdobeTag(this.svgContent);
    this.svgContent = removeXMLContent(this.svgContent);
    
    // Clean up temp files and clear memory
    this.removeAllTempFiles();
    this.elementsFilePathTmp.clear();
    
    // Final memory usage log
    const endMemory = process.memoryUsage();
    console.log(`Export completed - Final memory: ${Math.round(endMemory.heapUsed / 1024 / 1024)}MB heap, ${Math.round(endMemory.rss / 1024 / 1024)}MB RSS`);
    console.log(`Memory difference: ${Math.round((endMemory.heapUsed - startMemory.heapUsed) / 1024 / 1024)}MB heap, ${Math.round((endMemory.rss - startMemory.rss) / 1024 / 1024)}MB RSS`);
    
    console.timeEnd('export SVG');
    return this.svgContent;
  }
}

export default HandlerSVGContent;
