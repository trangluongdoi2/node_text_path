import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import fs from 'fs';
import { TextPathService } from './services/textPathService.js';
import { TextService } from './services/textService.js';

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
} from './utils-svg.js';

class HandlerSVGContent {
  svgContent;
  backupSvgContent;
  styles;
  background;
  shapeRectangles;
  shapeClipPathByRectangles;
  elements;
  groupElement;
  textPathService;
  data;
  // temp
  constructor(svgContent, data) {
    this.configs = {
      pageColumns: 1,
      pageRows: 1,
      sectionIndex: 1,
    }
    svgContent = svgContent.replace(/\s+/g, ' ');
    this.background = getBackgroundTag(svgContent);
    this.shapeRectangles = getShapeRectanglesTag(svgContent);
    this.filterGradientTags = getFilterGradientTags(svgContent);
    this.shapeClipPaths = getShapeClipPathTags(getContentByTag(svgContent, 'defs')?.[0] || '');
    this.data = data;


    if (this.filterGradientTags?.length) {
      this.filterGradientTags.forEach((filterGradient, index) => {
        svgContent = svgContent.replace(filterGradient, `##filterGradient${index}##`);
      });
    }

    if (this.background) {
      svgContent = svgContent.replace(this.background, '##background##');
    }

    if (this.shapeRectangles?.length) {
      this.shapeRectangles.forEach((shapeRectangle, index) => {
        svgContent = svgContent.replace(shapeRectangle, `##shapeRectangles${index}##`);
      });
    }


    if (this.shapeClipPaths?.length) {
      this.shapeClipPaths.forEach((shapeClipPath, index) => {
        svgContent = svgContent.replace(shapeClipPath, `##shapeClipPaths${index}##`);
      });
    }
    // svgContent = svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    this.svgContent = svgContent;
    this.backupSvgContent = svgContent;
    const { window } = new JSDOM(this.svgContent);
    this.elements = [...window.document.getElementsByClassName('not-select')];
    this.groupElement = window.document.getElementsByClassName('group_elements')[0];
  }

  isTextElement(elementHtml) {
    return getContentByTag(elementHtml, 'text').length > 0
  }

  isImageElement(elementHtml) {
    return getContentByTag(elementHtml, 'image').length > 0;
  }

  isClipPath(elementHtml) {
    const clipPathId = getClipPathId(elementHtml);
    if (clipPathId) {
      return clipPathId.includes('canvas_clip_path');
    }
    return false;
  }

  hasClipPath(index) {
    return this.isClipPath(this.elements[index + 1]?.outerHTML ?? '');
  }

  hasAdobe(elementHtml) {
    return elementHtml.indexOf('&ns_extend') !== -1 || elementHtml.indexOf('&ns_ai') !== -1 || elementHtml.indexOf('&ns_graphs') !== -1;
  }

  hasFilter(elementHtml) {
    return elementHtml.indexOf('filter') !== -1;
  }

  convertTextByPath(elementTag, outerHTML) {
    // console.log(elementTag, '===> elementTag');
    return {
      type: 'TEXT',
      elementTag: '',
      path: '',
    }
  }

  convertSvgToPng(file) {
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

  convertImage(elementTag) {
    return new Promise(async (resolve) => {
      const imageElements = getContentByTag(elementTag, 'image');
      const svgImages = [];
      for (let imageElement of imageElements) {
        const imageStyles = getElemAttributesByImage(imageElement);
        let imageContent = imageStyles.href;
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

  convertShape(svgContent) {
    if (!this.shapeRectangles?.length) {
      return svgContent;
    }
    this.shapeRectangles.forEach((shapeRectangle, index) => {
      svgContent = svgContent.replace(`##shapeRectangles${index}##`, shapeRectangle);
    });

    if (!this.shapeClipPaths?.length) {
      return svgContent;
    }
    this.shapeClipPaths.forEach((shapeClipPath, index) => {
      svgContent = svgContent.replace(`##shapeClipPaths${index}##`, shapeClipPath);
    });

    return svgContent;
  }

  convertBackground(svgContent) {
    if (!this.background) {
      return svgContent;
    }
    svgContent = svgContent.replace('##background##', this.background);
    return svgContent;
  }

  convertFillTransparent(svgContent) {
    svgContent = svgContent.replace(/fill="transparent"/g, 'fill="none"');
    svgContent = svgContent.replace(/fillColor&quot;:&quot;transparent&quot;/g, "fillColor&quot;:&quot;none&quot;");
    return svgContent;
  }

  fixAdobeTag(svgContent) {
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

  updateTransformClippingPathWithBleedSize(outerHTML, {
    col = 1,
    row = 1,
    bleedSize = 37.5,
  }) {
    const clipPathId = getClipPathId(outerHTML);
    let selectClipPath = this.shapeClipPaths.find(shapeClipPath => shapeClipPath.match(clipPathId));
    const selectClipPathIndex = this.shapeClipPaths.findIndex(shapeClipPath => shapeClipPath.match(clipPathId));
    if (selectClipPath && selectClipPathIndex !== -1) {
      const transform = getMatrixFromTransform(selectClipPath.match(/transform="[^"]*"/)?.[0]);
      const translateX = col === 1 ? bleedSize : 0;
      const translateY = row === 1 ? bleedSize : 0;
      transform[4] = transform[4] + translateX;
      transform[5] = transform[5] + translateY;
      selectClipPath = selectClipPath.replace(/transform="[^"]*"/, `transform="matrix(${transform.join(',')})"`);
      this.svgContent = this.svgContent.replace(`##shapeClipPaths${selectClipPathIndex}##`, selectClipPath);
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
      this.elements.map(async (element, index) => {
        const { innerHTML, outerHTML } = element;
        if (this.isTextElement(innerHTML)) {
          const elementData = Object.values(this.data)[index];
          const textPathService = new TextService(innerHTML, outerHTML, elementData).getInstance();
          return await textPathService.exportPath();
        }
        if (this.isImageElement(innerHTML)) {
          this.updateTransformClippingPathWithBleedSize(outerHTML, { col, row, bleedSize });
          return this.convertImage(innerHTML, outerHTML);
        }
      }).filter(element => Boolean(element))
    );
    for (const element of elementsResult) {
      if (!element) {
        continue;
      }

      let { elementTag, path, clippingMaskTag } = element;
      switch (element.type) {
        case 'TEXT':
          this.svgContent = this.svgContent.replace(elementTag, path);
          break;
        case 'TEXT_CLIP_PATH':
          this.svgContent = this.svgContent.replace(elementTag, path).replace(clippingMaskTag || '', '');
          break;
        case 'IMAGE':
          for (const item of element.svgImages || []) {
            this.svgContent = this.svgContent.replace(item.imageElement, item.imageContent);
          }
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
    this.svgContent = this.svgContent.replace(/<rect(.*?)<\/rect>/g, '');
    this.svgContent = this.convertFillTransparent(this.svgContent);
    this.svgContent = this.fixAdobeTag(this.svgContent);
    this.svgContent = this.convertShape(this.svgContent);
    this.svgContent = this.convertBackground(this.svgContent);
    return this.svgContent;
  }
}

export default HandlerSVGContent;
