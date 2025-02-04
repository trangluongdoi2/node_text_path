import { JSDOM } from 'jsdom';
// import { Resvg } from '@resvg/resvg-js';
import {
  getContentByTag,
  getElemAttributesByImage,
  getAllStrokeDasharrayContents,
  getStrokeDasharrayValueContent,
  getStrokeDasharrayValues,
  getSVGSectionTags,
  findRepeatingPattern,
} from '@/utils-svg';

export type FileGeneratorInput = {
  pageWidth: number;
  pageHeight: number;
  sectionWidth: number;
  sectionHeight: number;
  pageBleed: number;
  pixelsPerInch: number;
  flatten: boolean;
  showBleed?: boolean;
  showTrimMarks?: boolean;
};

const defaultInput: FileGeneratorInput = {
  pageWidth: 2400,
  pageHeight: 1050,
  sectionWidth: 2400,
  sectionHeight: 1050,
  pageBleed: 0,
  pixelsPerInch: 100,
  flatten: false,
  showBleed: false,
  showTrimMarks: false,
};

class ExportSVGFilterService {
  private svgContent: string;
  private configs: FileGeneratorInput;
  private svgContentBySections: string[];

  constructor(svgContent: string) {
    this.configs = { ...defaultInput };
    this.svgContent = svgContent;
    this.svgContentBySections = [];
    this.processDasharray();
    this.preHandler();
  }

  processDasharray() {
    const dasharrayContents = getAllStrokeDasharrayContents(this.svgContent);
    dasharrayContents.forEach((val: string, index: number) => {
      const dasharrayValues = getStrokeDasharrayValueContent(val);
      this.svgContent = this.svgContent.replace(dasharrayValues, `##dasharrayValues_${index}##`);
      const arr = dasharrayValues.split(/\s+/).map(Number);
      const result = findRepeatingPattern(arr);
      if (result) {
        const newDasharrayValues = result.pattern.join(' ');
        this.svgContent = this.svgContent.replace(`##dasharrayValues_${index}##`, newDasharrayValues);
      } else {
        this.svgContent = this.svgContent.replace(`##dasharrayValues_${index}##`, dasharrayValues);
      }
    });
  }

  preHandler() {
    const rows = Math.floor(this.configs.pageHeight / this.configs.sectionHeight);
    const cols = Math.floor(this.configs.pageWidth / this.configs.sectionWidth);
    const sections = rows * cols;
    for (let index = 0; index < sections; index++) {
      const svgContentBySection = getSVGSectionTags(this.svgContent, index.toString()) as string;
      this.svgContentBySections.push(svgContentBySection);
    }
    this.svgContentBySections.forEach((svgContentBySection, index) => {
      this.svgContent = this.svgContent.replace(svgContentBySection, `##svgContentBySection_${index}##`);
    });

  }

  getBleedSize() {
    const bleedSize = this.configs.showBleed ? (this.configs.pageBleed || 0) : 0;
    return bleedSize;
  }

  isDownloadPDFUnflattened() {
    return !this.configs.flatten;
  }

  hasFilter(elementHtml: string) {
    const regex = /filter\s*=\s*['"]([^'"]+)['"]/i;
    const flag = regex.test(elementHtml);
    return flag;
  }

  hasPatternTag(elementHtml: string) {
    const regex = /<pattern\b[^>]*>/i;
    const flag = regex.test(elementHtml);
    return flag;
  }

  convertSvgToPng(file: string) {
    const { Resvg } = require('@resvg/resvg-js');
    return new Promise(async (resolve) => {
      const resvg = new Resvg(file, {});
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      const pngDataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
      resolve(pngDataUrl);
    });
  }

  convertImageFilterForUnflattenCase(elementTag: string) {
    return new Promise(async (resolve) => {
      const imageElements = getContentByTag(elementTag, 'svg', 'all');
      const svgImages = [];
      for (const imageElement of imageElements) {
        const imageStyles = getElemAttributesByImage(imageElement);
        const base64ImageContent = await this.convertSvgToPng(imageElement);
        const imageContent = `
          <image
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="${base64ImageContent}"
            width="${imageStyles.width}"
            height="${imageStyles.height}"
            x="${imageStyles.x}"
            y="${imageStyles.y}"
          />
        `;
        svgImages.push({ imageElement: imageElement.replace(/\s+/g, ' '), imageContent });
      }
      resolve({
        elementTag,
        path: '',
        type: 'IMAGE',
        svgImages,
      });
    });
  }

  async export() {
    let newSvgContentBySection = '';
    for (const [index, svgContentBySection] of this.svgContentBySections.entries()) {
      newSvgContentBySection = svgContentBySection;``
      const { window } = new JSDOM(newSvgContentBySection);
      // Format content from "<[tag_name] />" to "<[tag_name]></[tag_name]>"
      newSvgContentBySection = window.document.body.children[0].outerHTML;

      const elements = [...window.document.getElementsByClassName('not-select')];
      const elementsResult = await Promise.all(
        elements.map((element) => {
          const { innerHTML } = element;
          if (this.hasFilter(innerHTML) || this.hasPatternTag(innerHTML)) {
            console.log('>>> hasFilter 9999');
            return this.convertImageFilterForUnflattenCase(innerHTML);
          }
          return undefined;
        }).filter((result) => Boolean(result))
      );

      for (const element of elementsResult) {
        if (!element) {
          continue;
        }
        for (const item of (element as any).svgImages || []) {
          newSvgContentBySection = newSvgContentBySection.replace(/\s+/g, ' ');
          newSvgContentBySection = newSvgContentBySection.replace(item.imageElement, item.imageContent);
        }
      }
      this.svgContent = this.svgContent.replace(`##svgContentBySection_${index}##`, newSvgContentBySection);
    }
    return this.svgContent;
  }
}

export default ExportSVGFilterService;