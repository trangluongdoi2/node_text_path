import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import fs from 'fs';
// import { TextPathService } from './services/textPathService';
import { TextService } from './services/textService';
import { SVGElement } from './types/index'

import {
  getContentByTag,
  getContentByPoint,
  getBackgroundTag,
  getShapeRectanglesTag,
  getShapeClipPathByRectanglesTag,
  getElemAttributesByImage,
  getElemAttributesByImageWithRegex,
  getFilterGradientTags,
  getMatrixFromTransform,
  getShapeClipPathTags,
  getImageParentTags,
  getClipPathId,
  removeDOCTYPE,
  getTextStyleTags,
  getTextStylesContent,
  getFilterUrl,
  getTypeFiltersFormFilterTag,
} from './utils-svg';
import { Page } from 'puppeteer-core';
import PotraceService from './services/potraceService';
import { BoundingElement } from './types/convert-text';
import { TextClippingPath } from './services/textClippingPathService';

class HandlerSVGContent {
  private svgContent: string;
  private potraceService = new PotraceService();
  backupSvgContent;
  private styles: any;
  private background: string;
  private shapeRectangles: string[];
  private shapeClipPathByRectangles: any;
  private elements: Element[];
  groupElement: Element | null;
  private textPathService: any;
  private configs: Record<string, any>;
  private data: any;
  private filterGradientTags: string[];
  private shapeClipPaths: string[];
  private shapeClipPathsByText: string[];
  private shapeClipPathsExluceText: string[];

  constructor(svgContent: string, data: any, page?: Page) {
    this.configs = {
      pageColumns: 1,
      pageRows: 1,
      sectionIndex: 1,
    }
    svgContent = svgContent.replace(/\s+/g, ' ');
    this.background = getBackgroundTag(svgContent);
    this.shapeRectangles = getShapeRectanglesTag(svgContent);
    this.filterGradientTags = getFilterGradientTags(svgContent) as string[];
    this.shapeClipPaths = getShapeClipPathTags(getContentByTag(svgContent, 'defs')?.[0] || '') as string[];
    this.shapeClipPathsExluceText = this.shapeClipPaths.filter((shapeClipPath) => !shapeClipPath.includes('text'));
    this.shapeClipPathsByText = this.shapeClipPaths.filter((shapeClipPath) => shapeClipPath.includes('text'));
    this.data = Object.values(data);

    if (this.filterGradientTags?.length) {
      this.filterGradientTags.forEach((filterGradient, index) => {
        svgContent = svgContent.replace(filterGradient, `##filterGradient${index}##`);
      });
    }

    if (this.background) {
      svgContent = svgContent.replace(this.background, '##background##');
      this.data = this.data.filter((item: any) => item.type !== 'background');
    }

    if (this.shapeRectangles?.length) {
      this.shapeRectangles.forEach((shapeRectangle, index) => {
        svgContent = svgContent.replace(shapeRectangle, `##shapeRectangles${index}##`);
      });
    }

    // if (this.shapeClipPaths?.length) {
    //   this.shapeClipPaths.forEach((shapeClipPath, index) => {
    //     svgContent = svgContent.replace(shapeClipPath, `##shapeClipPaths${index}##`);
    //   });
    // }

    if (this.shapeClipPathsByText?.length) {
      this.shapeClipPathsByText.forEach((shapeClipPath, index) => {
        svgContent = svgContent.replace(shapeClipPath, `##shapeClipPathsByText${index}##`);
      });
    }
      
    if (this.shapeClipPathsExluceText?.length) {
      this.shapeClipPathsExluceText.forEach((shapeClipPath, index) => {
        svgContent = svgContent.replace(shapeClipPath, `##shapeClipPathsExluceText${index}##`);
      });
    }

    svgContent = svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    this.svgContent = svgContent;
    this.backupSvgContent = svgContent;
    const { window } = new JSDOM(this.svgContent);
    this.elements = [...window.document.getElementsByClassName('not-select')];
    this.groupElement = window.document.getElementsByClassName('group_elements')[0];
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

  private isCurvedText(masterElement: any) {
    if (!masterElement) {
      return false;
    }
    const { backstage = {} } = masterElement;
    if (!Object.keys(backstage)?.length) {
      return false;
    }
    const { curved = {} } = backstage;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!Object.keys(curved)?.length || !Boolean(curved?.enabled)) {
      return false;
    }
    return true;
  }

  convertSvgToPng(file: string) {
    return new Promise(async (resolve) => {
      try {
        const pngBuffer = await sharp(Buffer.from(file))
          .toFormat('png')
          .toBuffer();
        const pngDataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
        resolve(pngDataUrl);
      } catch (error) {
        resolve(file);
      }
    });
  }

  convertImage(elementTag: string) {
    return new Promise(async (resolve) => {
      const imageElements = getContentByTag(elementTag, 'image');
      const svgImages = [];
      for (let imageElement of imageElements) {
        const imageStyles = getElemAttributesByImage(imageElement);
        // @ts-ignore
        let imageContent = imageStyles?.href as any;
        if (imageContent.startsWith('data:image/svg+xml')) {
          imageContent = decodeURIComponent(imageContent.split(',')[1]);
          if (imageContent.indexOf('svg_has_been_converted') !== -1) {
            const xml = '<?xml version="1.0"?>';
            imageContent = imageContent.replace(xml, '');
            svgImages.push({ imageElement, imageContent });
            return;
          }

          const classSvg = `svg-${imageStyles.id}`.replace(/_/g, '-');
          const styles = getContentByTag(imageContent, 'style');
          for (const style of styles) {
            const allStyle = style.replace(/<style[^>]*>/g, '').match(/.(.*?){(.*?)}/g) || [];

            let tmpStyle = style;
            for (const item of allStyle) {
              tmpStyle = tmpStyle.replace(item, `.${classSvg} ${item}`);
            }
            imageContent = imageContent.replace(style, tmpStyle);
          }
  
          const imageStylesBySvg = getElemAttributesByImage(imageContent);
          imageContent = imageContent.replace(/<\/svg>/g, '').replace(/<svg[^>]*>/g, '');
          imageContent = removeDOCTYPE(imageContent);
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
      resolve({
        elementTag,
        path: '',
        type: 'IMAGE',
        svgImages,
      });
    });
  }

  // private convertTextByPosterize(elementTag: string, outerHTML: string): Promise<SVGElement> {
  //   return new Promise(async (resolve) => {
  //     const groupElementContent = this.groupElement?.innerHTML || '';
  //     const currentOnlyTextHtml: string = this.backupSvgContent.replace(groupElementContent, outerHTML);
  //     const path = await this.potraceService.convertTextByPotrace(currentOnlyTextHtml, elementTag, this.styles);
  //     resolve({
  //       type: 'TEXT',
  //       elementTag,
  //       path,
  //     });
  //   });
  // }

  convertShape(svgContent: string) {
    // if (!this.shapeClipPaths?.length) {
    //   return svgContent;
    // }
    // this.shapeClipPaths.forEach((shapeClipPath, index) => {
    //   svgContent = svgContent.replace(`##shapeClipPaths${index}##`, shapeClipPath);
    // });

    this.shapeClipPathsByText.forEach((shapeClipPath, index) => {
      svgContent = svgContent.replace(`##shapeClipPathsByText${index}##`, shapeClipPath);
    });

    this.shapeClipPathsExluceText.forEach((shapeClipPath, index) => {
      svgContent = svgContent.replace(`##shapeClipPathsExluceText${index}##`, shapeClipPath);
    });

    // if (!this.shapeRectangles?.length) {
    //   return svgContent;
    // }
    this.shapeRectangles.forEach((shapeRectangle, index) => {
      svgContent = svgContent.replace(`##shapeRectangles${index}##`, shapeRectangle);
    });


    return svgContent;
  }

  convertBackground(svgContent: string) {
    if (!this.background) {
      return svgContent;
    }
    svgContent = svgContent.replace('##background##', this.background);
    return svgContent;
  }

  convertFillTransparent(svgContent: string) {
    svgContent = svgContent.replace(/fill="transparent"/g, 'fill="none"');
    svgContent = svgContent.replace(/fillColor&quot;:&quot;transparent&quot;/g, "fillColor&quot;:&quot;none&quot;");
    return svgContent;
  }

  fixAdobeTag(svgContent: string) {
    if (!this.hasAdobe(svgContent)) {
      return svgContent;
    }

    // Remove content not use
    const pgfs = getContentByPoint(svgContent, '<i:pgf ', '</i:pgf>');
    for (const pgf of pgfs) {
      svgContent = svgContent.replace(pgf, '');
    }
    const pgfRefs = getContentByPoint(svgContent, '<i:pgfRef ', '</i:pgfRef>');
    for (const pgfRef of pgfRefs) {
      svgContent = svgContent.replace(pgfRef, '');
    }

    svgContent = svgContent.replace('<svg', `<svg xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"`);
    svgContent = `<!DOCTYPE svg [
      <!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">
      <!ENTITY ns_ai "http://ns.adobe.com/AdobeIllustrator/10.0/">
      <!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">
      ]>
      ${svgContent}
    `;
    return svgContent;
  }

  getBleedSize() {
    return 37.5;
  }

  updateTransformClippingPathWithBleedSize(outerHTML: string, {
    col = 1,
    row = 1,
    // bleedSize = 37.5,
    bleedSize = 0,
  }) {
    const clipPathId = getClipPathId(outerHTML);
    let selectClipPath = this.shapeClipPathsExluceText.find(shapeClipPath => shapeClipPath.match(clipPathId)) as string;
    // console.log(selectClipPath, '==> selectClipPath...');
    const selectClipPathIndex = this.shapeClipPathsExluceText.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    if (selectClipPath && selectClipPathIndex !== -1) {
      // @ts-ignore
      const transform = getMatrixFromTransform(selectClipPath.match(/transform="[^"]*"/)?.[0]);
      // const translateX = col === 1 ? bleedSize : 0;
      // const translateY = row === 1 ? bleedSize : 0;
      const translateX = 0;
      const translateY = 0;
      // console.log(translateX, translateY, '==> translateX, translateY...');
      transform[4] = transform[4] + translateX;
      transform[5] = transform[5] + translateY;
      selectClipPath = selectClipPath.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
      this.svgContent = this.svgContent.replace(`##shapeClipPathsExluceText${selectClipPathIndex}##`, selectClipPath);
    }
  }

  createRectBouding() {
    return `<rect width="100%" height="100%" fill="red" x="0" y="0"/>`;
  }

  getMasterElement(innerHTML: string) {
    const currentData = this.data.find((item: any) => innerHTML.includes(item.elementKey));
    return currentData;
  }

  getAllFilterTags() {
    // const filterTags = getFilterGradientTags(this.svgContent);
    // return filterTags;
  }

  private getClipPathId(html: string): string {
    const regex = /clip-path="url\(#([^)]+)\)"/;
    const match = html.match(regex);
    return match ? match[1] : '';
  }

  getNewClippingPathTagsContent(input: any) {
    const { elementKey } = input;
    let { clipPath, path, transform } = input;
    const idPath = `clipingText_path_${elementKey}`;
    const textTag = getContentByTag(clipPath, 'text')?.[0] || '';
    const contentClipPathTag = `
      <use
        ${transform}
        width="100%"
        height="100%"
        xlink:href="#${idPath}"
      />
    `
    clipPath = clipPath.replace(textTag, contentClipPathTag);
    clipPath = clipPath.replace(/transform="[^"]*"/, '')
    path = path.replace('<path', `<path id="${idPath}" fill="none"`)
    const newClipPath = [clipPath, path];
    return newClipPath.join('');
  }

  convertClippingPathText(index: number, elementTag: string, outerHTML: string) {
    // console.log('==> convertClippingPathText..');
    const outerHtmlByClipPath: string = this.elements[index + 1]?.outerHTML || '';
    const innerHtmlByClipPath: string = this.elements[index + 1]?.innerHTML || '';
    const clippingMaskTag = this.isClipPath(outerHtmlByClipPath) ? outerHtmlByClipPath : '';
    const innerClippingMaskTag = clippingMaskTag ? innerHtmlByClipPath : '';
    const masterElementClippingPath = this.getMasterElement(clippingMaskTag);
    // console.log(masterElementClippingPath, '==> masterElementClippingPath..');

    const textClippingPathService = new TextClippingPath({
      html: { outerHTML: outerHtmlByClipPath, innerHTML: innerClippingMaskTag },
      data: { masterElement: masterElementClippingPath }
    });

    const res2 = textClippingPathService.getNewClippingMaskContent();
    console.log(res2, 'res2...');
    // console.log(textClippingPathService, '==> textClippingPathService...');

    const imageClipPathTag = getContentByTag(clippingMaskTag, 'image')?.[0] || '';
    const styleImageClipPathTag = getElemAttributesByImage(imageClipPathTag);
    const displayNone = [
      'display: none',
      'visibility: hidden',
      'opacity: 0',
    ];

    const masterElement = this.getMasterElement(elementTag);
    const { elementKey } = masterElement;
    const textStyleTags = (getTextStylesContent(elementTag) || []) as string[];
    // const filterTags = getFilterUrl(textStyleTags.join(''));
    const filterTags = textStyleTags.map((textStyleTag) => {
      return {
        type: getTypeFiltersFormFilterTag(textStyleTag) || '',
        tagUrl: getFilterUrl(textStyleTag),
      }
    });
    const textPathService = new TextService({
      html: { outerHTML, innerHTML: elementTag },
      // @ts-ignore
      data: { masterElement, filterTags }
    });
    let newTransform = '';
    let pureContentPath = '';
    const res = textPathService.exportPath((res: any) => {
      pureContentPath = res.path;
      newTransform = res.transform;
    });
    if (displayNone.some((style: string) => (styleImageClipPathTag?.style || '').includes(style))) {
      this.elements.splice(index + 1, 1);
      return res;
    }

    const clipPathId = this.getClipPathId(outerHtmlByClipPath);
    let selectClipPath = this.shapeClipPathsByText.find(shapeClipPath => shapeClipPath.match(clipPathId));
    const selectClipPathIndex = this.shapeClipPathsByText.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    if (selectClipPath && selectClipPathIndex !== -1) {
      selectClipPath = this.getNewClippingPathTagsContent({
        elementKey,
        transform: newTransform,
        clipPath: selectClipPath,
        path: pureContentPath,
      })
      this.svgContent = this.svgContent.replace(`##shapeClipPathsByText${selectClipPathIndex}##`, selectClipPath);
    }

    // Need replace clippingMaskTag by new!!

    return {
      ...res,
      clippingMaskTag,
      type: 'TEXT_CLIP_PATH',
    }
  }

  async export() {
    const bleedSize = this.getBleedSize();
    const col = 1;
    const row = 1;

    let formatSVGContent = this.svgContent;
    const { window } = new JSDOM(this.svgContent);
    formatSVGContent = window.document.body.innerHTML;
    this.svgContent = formatSVGContent;

    const elementsResult = await Promise.all(
      this.elements.map((element, index) => {
        const { innerHTML, outerHTML } = element;
        if (this.isTextElement(innerHTML)) {
          const masterElement = this.getMasterElement(innerHTML);
          if (this.isCurvedText(masterElement)) {
            return {
              type: 'TEXT',
              elementTag: innerHTML,
              path: ''
            }
          }
          if (this.hasClipPath(index)) {
            return this.convertClippingPathText(index, innerHTML, outerHTML);
          }
          const textStyleTags = (getTextStylesContent(innerHTML) || []) as string[];
          const filterTags = textStyleTags.map((textStyleTag) => {
            return {
              type: getTypeFiltersFormFilterTag(textStyleTag) || '',
              tagUrl: getFilterUrl(textStyleTag),
            }
          });
          const textPathService = new TextService({
            html: { outerHTML, innerHTML },
            // @ts-ignore
            data: { masterElement, filterTags }
        });
          const res = textPathService.exportPath();
          return res;
        }
        if (this.isImageElement(innerHTML)) {
          this.updateTransformClippingPathWithBleedSize(outerHTML, { col, row, bleedSize });
          return this.convertImage(innerHTML);
        }
      }).filter(element => Boolean(element))
    ) as SVGElement[];
    

    for (const [elementIndex, element] of elementsResult.entries()) {
      if (!element) {
        continue;
      }

      let { elementTag, path, clippingMaskTag } = element as any;
      switch (element.type) {
        case 'TEXT': 
          this.svgContent = this.svgContent.replace(elementTag, path);
          break;
        case 'TEXT_CLIP_PATH':
          this.svgContent = this.svgContent.replace(elementTag, path);
          break;
        case 'IMAGE':
          for (const item of element.svgImages || []) {
            this.svgContent = this.svgContent.replace(item.imageElement, item.imageContent);
          }
          break;
        default:
          break;
      }
    }

    // const imageParentTags = getImageParentTags(this.svgContent);
    // imageParentTags.forEach((imageParentTag) => {
    //   let newImageParentTag = imageParentTag;
    //   const styles = getElemAttributesByImageWithRegex(imageParentTag);
    //   const transform = getMatrixFromTransform(styles?.transform || '');
    //   const translateX = (col === 1) ? bleedSize : 0;
    //   const translateY = (row === 1) ? bleedSize : 0;
    //   transform[4] = transform[4] + translateX;
    //   transform[5] = transform[5] + translateY;
    //   newImageParentTag = imageParentTag.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
    //   this.svgContent = this.svgContent.replace(imageParentTag, newImageParentTag);
    // });

    this.svgContent = this.svgContent.replace(/&nbsp;/g, ' ');
    // this.svgContent = this.svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    this.svgContent = this.convertBackground(this.svgContent);
    this.svgContent = this.convertShape(this.svgContent);
    this.svgContent = this.convertFillTransparent(this.svgContent);
    this.svgContent = this.fixAdobeTag(this.svgContent);

    // Draw bounding rect for text element
    // const { window: newWindow } = new JSDOM(this.svgContent);
    // const groupElement = newWindow.document.getElementsByClassName('group_elements')[0];
    // boundingRects.forEach((boundingRect) => {
    //   const rect = window.document.createElement('rect');
    //   const { x, y, width, height } = boundingRect;
    //   rect.setAttribute('width', `${width}px`);
    //   rect.setAttribute('height', `${height}px`);
    //   rect.setAttribute('fill', 'red');
    //   rect.setAttribute('stroke', '10px');
    //   rect.setAttribute('opacity', '0.1');
    //   rect.setAttribute('x', `${x}px`);
    //   rect.setAttribute('y', `${y}px`);
    //   groupElement.appendChild(rect);
    // });
    // this.svgContent = newWindow.document.body.innerHTML;
    // this.svgContent = this.svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    return this.svgContent;
  }
}

export default HandlerSVGContent;
