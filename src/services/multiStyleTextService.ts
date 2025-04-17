import { JSDOM } from 'jsdom';
import PotraceService from './potraceService';
import { SVGTextStyles } from '@/types';
import { randomString } from '@/helper/string';
import fs from 'fs';
import { removeXMLContent } from '@/utils-svg';

type TagData = {
  text: string,
  fill: string,
  content: string,
  children?: TagData[],
}

export class MultiStyleTextService {
  private svgContent: string;
  private textContent: string;
  private styles: SVGTextStyles;
  private tspanWrapperContents: string[];
  private potraceService = new PotraceService();
  private uniqueKey: string;
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    // fs.writeFileSync('original.svg', svgContent);
    this.svgContent = removeXMLContent(svgContent);
    this.textContent = textContent;
    this.styles = styles;
    this.tspanWrapperContents = [];
    this.uniqueKey = randomString(false, 5);
    this.svgContent = this.svgContent.replace(this.textContent, `##text_replace_${this.uniqueKey}##`);
  }

  getTagElements(element: SVGTextElement) {
    const spanEls = element.childNodes;
    const results = [];
    for (const child of spanEls) {
      if (!child.textContent) {
        continue;
      }
      if (child.nodeName === 'TSPAN') {
        const tagData: TagData = {
          text: child.textContent,
          fill: (child as SVGElement).style.fill || this.styles.fill || 'none',
          content: (child as Element).outerHTML || '',
        };
        results.push(tagData);
      }
    }
    return results;
  }

  splitTextIntoTspans(tspanContent: string) {
    const dom = new JSDOM(tspanContent);
    const tspan = dom.window.document.querySelector('tspan');
    
    if (!tspan) {
      return tspanContent;
    };
    
    const id = tspan.getAttribute('id');
    const x = tspan.getAttribute('x');
    const dy = tspan.getAttribute('dy');
    let result = `<tspan id="${id}" x="${x}" dy="${dy}">`;

    const nodes = Array.from(tspan.childNodes);

    nodes.forEach(node => {
      if (node.nodeType === dom.window.Node.TEXT_NODE) {
        const chars = node.textContent?.split('') || [];
        chars.forEach(char => {
          if (char.trim()) {
            result += `<tspan>${char}</tspan>`;
          } else {
            result += char;
          }
        });
      } else if (node.nodeType === dom.window.Node.ELEMENT_NODE && node.nodeName === 'TSPAN') {
        const styledTspan = node as Element;
        const style = styledTspan.getAttribute('style');
        const text = styledTspan.textContent || '';
        const chars = text.split('');

        chars.forEach(char => {
          if (char.trim()) {
            result += `<tspan style="${style}">${char}</tspan>`;
          } else {
            result += char;
          }
        });
      }
    });

    result += '</tspan>';
    return result;
  };

  formatTextContent() {
    const { window } = new JSDOM(this.textContent);
    const textElement = window.document.getElementsByTagName('text')?.[0];
    if (!textElement) {
      return;
    }
    const tspansWrapElements = this.getTagElements(textElement);
    for (const tspanWrapper of tspansWrapElements) {
      const newTspanWrapperContent = this.splitTextIntoTspans(tspanWrapper.content);
      this.textContent = this.textContent.replace(tspanWrapper.content, newTspanWrapperContent);
      this.tspanWrapperContents.push(newTspanWrapperContent);
    }
    window.close();
  }

  setStyleFillNoneToTspan(tspanContent: string) {
    if (tspanContent.match(/style="[^"]*fill:\s*[^;"]+/)) {
      return tspanContent.replace(/style="([^"]*?)fill:\s*[^;"]+([^"]*)"/, `style="$1fill: none$2"`);
    }
    if (tspanContent.match(/style="[^"]*"/)) {
      return tspanContent.replace(/style="([^"]*)"/, `style="$1;fill: none"`);
    }
    return tspanContent.replace(/>/, ` style="fill: none">`);
  };

  async getPathByPotrace() {
    console.time(this.uniqueKey);
    this.formatTextContent();

    const tspanForEachChars = this.tspanWrapperContents.flatMap(wrapper => {
      const tspanElement = new JSDOM(wrapper).window.document.getElementsByTagName('tspan')?.[0];
      return this.getTagElements(tspanElement);
    });

    console.log(tspanForEachChars, 'tspanForEachChars....')

    const baseContent = this.svgContent;
    const baseTextContent = this.textContent;
    const tspanChildElements = tspanForEachChars.map((tspanData, idx) => ({
      content: tspanData.content,
      key: `##tspan_${idx}_${this.uniqueKey}##`
    }));

    const handledContents = tspanForEachChars.map((tspanData, index) => {
      let cloneTextContent = baseTextContent;

      tspanChildElements.forEach(elem => {
        cloneTextContent = cloneTextContent.replace(elem.content, elem.key);
      });

      const currentTspan = tspanChildElements[index];
      const otherTspans = tspanChildElements.filter((_, i) => i !== index);

      otherTspans.forEach(tspan => {
        const styledContent = this.setStyleFillNoneToTspan(tspan.content);
        cloneTextContent = cloneTextContent.replace(tspan.key, styledContent);
      });

      cloneTextContent = cloneTextContent.replace(currentTspan.key, currentTspan.content);

      // const test = baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent);
      // fs.writeFileSync(`${randomString(false, 5)}.svg`, test);

      return {
        content: baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent),
        styles: {
          ...this.styles,
          fill: tspanData.fill
        }
      };
    });

    // console.log(handledContents.length, 'handledContents.length...')

    const BATCH_SIZE = 10;
    const results = [];
    
    for (let i = 0; i < handledContents.length; i += BATCH_SIZE) {
      const batch = handledContents.slice(i, i + BATCH_SIZE);
      const batchResults = await this.potraceService.converTextByTraceNew(batch);
      results.push(...batchResults.filter(Boolean));
    }
    console.timeEnd(this.uniqueKey);
    return results.flatMap(result => result?.match(/<path(.*?)\/>/g) || []);
  }
}