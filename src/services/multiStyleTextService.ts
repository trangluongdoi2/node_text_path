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
  private tspanWrapperContents: string[] = [];
  private potraceService = new PotraceService();
  private uniqueKey: string;
  private primaryFill: string;
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    this.styles = styles;
    this.svgContent = this.formatContent(svgContent);
    this.textContent = this.formatContent(textContent).replace(/#ffffff/g, '#fdfdfd');
    this.uniqueKey = randomString(false, 5);
    this.svgContent = this.svgContent.replace(this.textContent, `##text_replace_${this.uniqueKey}##`);
    this.textContent = this.formatTextContent(this.textContent);
    this.getPrimaryFill();
  }

  formatContent(content: string) {
    const { window } = new JSDOM(content);
    content = window.document.body.innerHTML;
    return content.replace(/\s+/g, ' ');
  }

  getFillByTspanData(tspanElement: any) {
    let fill = tspanElement.style?.fill || this.styles?.fill || 'none';
    if (tspanElement.childNodes) {
      const childNodesArray = Array.from(tspanElement.childNodes);
      for (const childNode of childNodesArray) {
        // @ts-ignore
        console.log(childNode.style, 'childNode.style')
        // console.log(childNode, 'childNode...')
        // const { window } = new JSDOM(childNode);
        // childNode = window.document.body.innerHTML;
        // // @ts-ignore
        // console.log(childNode.outerHTML, 'childNode.outerHTML..')
        fill = this.getFillByTspanData(childNode);
      }
    }
    return fill;
    // return tspanElement.style.fill || this.styles.fill || 'none';
  }

  getTagElements(element: SVGTextElement) {
    const spanEls = element.childNodes;
    const results = [];
    for (const child of spanEls) {
      if (!child.textContent) {
        continue;
      }
      if (child.nodeName === 'TSPAN') {
        if (child.textContent === 'c') {
          const fill = this.getFillByTspanData(child);
          console.log(fill, 'filll...')
        }
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

  getPrimaryFill() {
    const tspanElement = new JSDOM(this.textContent).window.document.getElementsByTagName('text')?.[0];
    this.primaryFill = tspanElement.getAttribute('fill') || this.styles.fill || '';
  }

  splitTextIntoTspans(tspanContent: string) {
    const { window } = new JSDOM(tspanContent);
    const tspan = window.document.querySelector('tspan');
    
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
        if (node.childNodes.length) {
          const childOfChildNodes = Array.from(node.childNodes);
          for (const childnodes of childOfChildNodes) {
            if (childStyleContent) {
              return;
            }
            if (childnodes.nodeName === 'TSPAN') {
              const childStyles = (childnodes as any).getAttribute('style');
              if (childStyles) {
                childStyleContent = childStyles;
              }
            }
          }
        }
        const text = styledTspan.textContent || '';
        console.log(text,  'text...')
        const chars = text.split('');

        let styleContent = '';
        if (style) {
          styleContent = `style="${style}"`
        } else if (!style && childStyleContent) {
          styleContent = `style="${childStyleContent}"`
        }

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
    const tspanForEachChars = this.tspanWrapperContents.flatMap(wrapper => {
      const tspanElement = new JSDOM(wrapper).window.document.getElementsByTagName('tspan')?.[0];
      return this.getTagElements(tspanElement);
    });

    // console.log(tspanForEachChars, 'tspanForEachChars...')

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
      // if (currentTspan.text === 'c') {
      //   console.log(tspanForEachChars, 'tspanForEachChars....')
      // }
      otherTspans.forEach((tspan: any) => {
        const styledContent = this.setStyleFillNoneToTspan(tspan.content);
        cloneTextContent = cloneTextContent.replace(tspan.key, styledContent);
      });

      cloneTextContent = cloneTextContent.replace(currentTspan.key, currentTspan.content);

      const test = baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent);
      fs.writeFileSync(`${index}.svg`, test);

      return {
        content: baseContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent),
        styles: {
          ...this.styles,
          fill: tspanData.fill
        }
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