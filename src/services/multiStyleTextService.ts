import { JSDOM } from 'jsdom';
import PotraceService from './potraceService';
import { SVGTextStyles } from '@/types';
import { randomString } from '@/helper/string';
import fs from 'fs';
import { curryingGetByField } from '@/helper/function';

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
  private tspanWrapperContents: string[] = [];
  private potraceService = new PotraceService();
  private uniqueKey: string;
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    this.styles = styles;
    this.svgContent = this.formatContent(svgContent);
    this.textContent = this.formatContent(textContent).replace(/#ffffff/g, '#fdfdfd');
    this.uniqueKey = randomString(false, 5);
    this.svgContent = this.svgContent.replace(this.textContent, `##text_replace_${this.uniqueKey}##`);
    this.textContent = this.formatTextContent(this.textContent);
    // this.getPrimaryFill();
  }

  formatContent(content: string) {
    const { window } = new JSDOM(content);
    content = window.document.body.innerHTML;
    return content.replace(/\s+/g, ' ');
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

  // getPrimaryFill() {
  //   const tspanElement = new JSDOM(this.textContent).window.document.getElementsByTagName('text')?.[0];
  //   this.primaryFill = tspanElement.getAttribute('fill') || this.styles.fill || '';
  // }

  splitTextIntoTspans(tspanContent: string) {
    const { window } = new JSDOM(tspanContent);
    const tspan = window.document.querySelector('tspan');
    let fill = this.styles.fill || 'none';

    
    if (!tspan) {
      return tspanContent;
    };
    
    const id = tspan.getAttribute('id');
    const x = tspan.getAttribute('x');
    const dy = tspan.getAttribute('dy');
    let result = `<tspan id="${id}" x="${x}" dy="${dy}">`;

    const nodes = Array.from(tspan.childNodes);

    nodes.forEach(node => {
      if (node.nodeType === window.Node.TEXT_NODE) {
        const chars = node.textContent?.split('') || [];
        chars.forEach(char => {
          if (char.trim()) {
            result += `<tspan>${char}</tspan>`;
          } else {
            result += char;
          }
        });
      } else if (node.nodeType === window.Node.ELEMENT_NODE && node.nodeName === 'TSPAN') {
        const styledTspan = node as Element;
        const style = styledTspan.getAttribute('style');
        let childStyleContent = '';
        // @ts-ignore
        fill = styledTspan.style.fill || this.styles.fill;

        if (node.childNodes.length) {
          for (const childnodes of node.childNodes) {
            if (childnodes.nodeName === 'TSPAN') {
              // @ts-ignore
              fill = childnodes.style.fill;
            }
          }
        }
        const text = styledTspan.textContent || '';
        const chars = text.split('');

        let styleContent = '';
        if (style) {
          styleContent = `style="${style}"`
        } else if (!style && childStyleContent) {
          styleContent = `style="${childStyleContent}"`
        }

        styleContent = this.updateStyleFillForContent(styleContent, fill);

        chars.forEach(char => {
          if (char.trim()) {
            result += styleContent ? `<tspan ${styleContent}>${char}</tspan>` : `<tspan>${char}</tspan>`;
          } else {
            result += char;
          }
        });
      }
    });

    result += '</tspan>';
    window.close();
    return result;
  };

  formatTextContent(textContent: string) {
    if (!this.tspanWrapperContents) {
      this.tspanWrapperContents = [];
    }
    const { window } = new JSDOM(textContent);
    const textElement = window.document.getElementsByTagName('text')?.[0];
    if (!textElement) {
      return textContent;
    }
    const tspansWrapElements = this.getTagElements(textElement);
    for (const tspanWrapper of tspansWrapElements) {
      const newTspanWrapperContent = this.splitTextIntoTspans(tspanWrapper.content);
      textContent = textContent.replace(tspanWrapper.content, newTspanWrapperContent);
      this.tspanWrapperContents.push(newTspanWrapperContent);
    }
    window.close();
    return textContent;
  }

  private cleanContent(content: string): string {
    // Remove extra whitespace between attributes
    content = content.replace(/\s+/g, ' ');
    
    // Remove redundant semicolons in style attributes
    content = content.replace(/style="([^"]*)"/g, (match, styleContent) => {
      // Remove multiple consecutive semicolons
      styleContent = styleContent.replace(/;+/g, ';');
      // Remove leading/trailing semicolons
      styleContent = styleContent.replace(/^;|;$/g, '');
      // Remove spaces around semicolons
      styleContent = styleContent.replace(/\s*;\s*/g, ';');
      return `style="${styleContent}"`;
    });

    // Remove empty style attributes
    content = content.replace(/style="\s*"/g, '');
    
    // Remove redundant quotes in attributes
    content = content.replace(/(\w+)="([^"]*)"/g, (match, attr, value) => {
      // If value is just a number or doesn't contain spaces, remove quotes
      if (/^\d+$/.test(value) || !value.includes(' ')) {
        return `${attr}=${value}`;
      }
      return match;
    });

    // Remove self-closing tags that shouldn't be self-closing
    content = content.replace(/<(\w+)([^>]*)\/>/g, (match, tag, attrs) => {
      if (!['path', 'line', 'rect', 'circle', 'ellipse', 'polygon', 'polyline'].includes(tag)) {
        return `<${tag}${attrs}></${tag}>`;
      }
      return match;
    });

    return content;
  }

  updateStyleFillForContent(content: string, value: string = 'none') {
    if (content.match(/style="[^"]*fill:\s*[^;"]+/)) {
      return this.cleanContent(content.replace(/style="([^"]*?)fill:\s*[^;"]+([^"]*)"/, (match, before, after) => {
        before = before.replace(/;\s*$/, '');
        after = after.replace(/^\s*;/, '');
        return `style="${before ? before + ';' : ''}fill: ${value}${after}"`;
      }));
    }
    
    if (content.match(/style="[^"]*"/)) {
      return this.cleanContent(content.replace(/style="([^"]*)"/, (match, styleContent) => {
        styleContent = styleContent.replace(/;\s*$/, '');
        return `style="${styleContent ? styleContent + ';' : ''}fill: ${value}"`;
      }));
    }
    
    return this.cleanContent(content.replace(/>/, ` style="fill: ${value}">`));
  }

  async getPathByPotrace() {
    const tspanForEachChars = this.tspanWrapperContents.flatMap(wrapper => {
      const tspanElement = new JSDOM(wrapper).window.document.getElementsByTagName('tspan')?.[0];
      return this.getTagElements(tspanElement);
    });

    const baseContent = this.svgContent;
    const baseTextContent = this.textContent;
    const tspanChildElements = tspanForEachChars.map((tspanData, idx) => ({
      content: tspanData.content,
      key: `##tspan_${idx}_${this.uniqueKey}##`,
      text: tspanData.text,
    }));

    const handledContents = tspanForEachChars.map((tspanData, index) => {
      let cloneTextContent = baseTextContent;

      tspanChildElements.forEach(elem => {
        cloneTextContent = cloneTextContent.replace(elem.content, elem.key);
      });

      const currentTspan = tspanChildElements[index];
      const otherTspans = tspanChildElements.filter((_, i) => i !== index);
      otherTspans.forEach((tspan: any) => {
        const styledContent = this.updateStyleFillForContent(tspan.content);
        cloneTextContent = cloneTextContent.replace(tspan.key, styledContent);
      });

      cloneTextContent = cloneTextContent.replace(currentTspan.key, currentTspan.content);

      // const test = baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent);
      // fs.writeFileSync(`${index}.svg`, test);

      return {
        content: baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent),
        styles: {
          ...this.styles,
          fill: tspanData.fill
        },
        index,
      };
    });

    const BATCH_SIZE = 10;
    const results = [];
    
    for (let i = 0; i < handledContents.length; i += BATCH_SIZE) {
      const batch = handledContents.slice(i, i + BATCH_SIZE);
      const batchResults = await this.potraceService.converTextByTraceNew(batch);
      results.push(...batchResults.filter(Boolean));
    }
    return results.flatMap(result => result?.match(/<path(.*?)\/>/g) || []);
  }
}