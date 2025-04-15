import { JSDOM } from 'jsdom';
import PotraceService from './potraceService';
import { SVGTextStyles } from '@/types';
import { curryingGetByField } from '@/helper/function';
import { randomString } from '@/helper/string';

type TagData = {
  text: string,
  fill: string,
  content: string,
  children: TagData[],
}

export class MultiStyleTextService {
  private svgContent: string;
  private textContent: string;
  private styles: SVGTextStyles;
  private textElement: SVGTextElement;
  private tspanWrapperContents: string[];
  private potraceService = new PotraceService();
  private uniqueKey: string;
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    this.svgContent = svgContent;
    this.textContent = textContent;
    this.styles = styles;
    this.tspanWrapperContents = [];
    this.uniqueKey = randomString(false, 5);
    this.initText();
  }
  
  initText() {
    const { window } = new JSDOM(this.textContent);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    this.textElement = textElement;
    window.close();
    this.svgContent = this.svgContent.replace(this.textContent, `#text_replace_${this.uniqueKey}`);
  }

  getTagElements(element: SVGTextElement, recursion = false) {
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
          children: recursion ? this.getTagElements(child as SVGTextElement): [],
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
    const tspansWrapElements = this.getTagElements(textElement, false);
    for (const tspanWrapper of tspansWrapElements) {
      const newTspanWrapperContent = this.splitTextIntoTspans(tspanWrapper.content);
      this.textContent = this.textContent.replace(tspanWrapper.content, newTspanWrapperContent);
      this.tspanWrapperContents.push(newTspanWrapperContent);
    }
    window.close();
  }

  addStyleToTspan(tspanContent: string, style: string = 'fill: none') {
    if (tspanContent.match(/style="[^"]*fill:\s*[^;"]+/)) {
      return tspanContent.replace(/style="([^"]*?)fill:\s*[^;"]+([^"]*)"/, `style="$1fill: none$2"`);
    }
    if (tspanContent.match(/style="[^"]*"/)) {
      return tspanContent.replace(/style="([^"]*)"/, `style="$1;fill: none"`);
    }
    return tspanContent.replace(/>/, ` style="fill: none">`);
  };

  async getPathByPotrace() {
    this.formatTextContent();
    const tspanForEachChars: Array<TagData[]> = []
    for (const tspanWrapper of this.tspanWrapperContents) {
      const { window } = new JSDOM(tspanWrapper);
      const tspanElement = window.document.getElementsByTagName('tspan')?.[0]; 
      const tags = this.getTagElements(tspanElement, true);
      tspanForEachChars.push(tags);
      window.close();
    }
    const res = [];
    const tspanForEachCharsFlat = tspanForEachChars.flat();
    const batchSize = 5;
    for (let i = 0; i < tspanForEachCharsFlat.length; i += batchSize) {
      const batch = tspanForEachCharsFlat.slice(i, i + batchSize);
      // const batchResults2 = batch.map((b: TagData, index: number) => {
      //   let cloneEntireContent = this.svgContent;
      //   let cloneTextContent = this.textContent;
      //   const cloneTspanChildElement = [...tspanForEachCharsFlat].map((tspanData: TagData, tspanIndex: number) => ({
      //     content: tspanData.content,
      //     index: tspanIndex
      //   }));
      //   for (const [tspanIndex, tspanChildContent] of cloneTspanChildElement.entries()) {
      //     cloneTextContent = cloneTextContent.replace(tspanChildContent.content, `tspan_${tspanIndex}_${this.uniqueKey}`);
      //   }
      //   const tspanTempRemove = cloneTspanChildElement.splice(i + index, 1);
      //   const keyTempRemove = `tspan_${i + index}_${this.uniqueKey}`;
      //   for (const tspanChildContent of cloneTspanChildElement) {
      //     const newTspanContent = this.addStyleToTspan(tspanChildContent.content);
      //     const key = `tspan_${tspanChildContent.index}_${this.uniqueKey}`;
      //     cloneTextContent = cloneTextContent.replace(key, newTspanContent);
      //   }
      //   cloneTextContent = cloneTextContent.replace(keyTempRemove, tspanTempRemove[0].content);
      //   const result = cloneEntireContent.replace(`#text_replace_${this.uniqueKey}`, cloneTextContent);
      //   return {
      //     content: result,
      //     styles: {
      //       ...this.styles,
      //       fill: b.fill,
      //     }
      //   };
      // });

      // const batchResultsFinals = await this.potraceService.converTextByTraceNew(batchResults2);
      // console.log(batchResults2, 'batchResults2...');


      const batchResults = await Promise.all(batch.map((b: any, index: number) => {
        let cloneEntireContent = this.svgContent;
        let cloneTextContent = this.textContent;
        const cloneTspanChildElement = [...tspanForEachCharsFlat].map((tspanData: TagData, tspanIndex: number) => ({
          content: tspanData.content,
          index: tspanIndex
        }));
        for (const [tspanIndex, tspanChildContent] of cloneTspanChildElement.entries()) {
          cloneTextContent = cloneTextContent.replace(tspanChildContent.content, `tspan_${tspanIndex}`);
        }
        const tspanTempRemove = cloneTspanChildElement.splice(i + index, 1);
        const keyTempRemove = `tspan_${i + index}`;
        for (const tspanChildContent of cloneTspanChildElement) {
          const newTspanContent = this.addStyleToTspan(tspanChildContent.content);
          const key = `tspan_${tspanChildContent.index}`;
          cloneTextContent = cloneTextContent.replace(key, newTspanContent);
        }
        cloneTextContent = cloneTextContent.replace(keyTempRemove, tspanTempRemove[0].content);
        const result = cloneEntireContent.replace('#text_replace', cloneTextContent);
        try {
          return this.potraceService.convertTextByTrace(result, {
            ...this.styles,
            fill: b.fill,
          });
        } catch (error) {
          console.log(error, 'error..')
          return null;
        }
      }));
      // res.push(...batchResultsFinals.filter(Boolean));
      res.push(...batchResults.filter(Boolean));
    }
    const finalResult = [];
    for (const subRes of res) {
      finalResult.push(subRes?.match(/<path(.*?)\/>/g) || [])
    }
    return finalResult.flat();
    // return [''];
  }
}