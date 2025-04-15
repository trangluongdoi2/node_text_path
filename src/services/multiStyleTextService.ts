import { JSDOM } from 'jsdom';
import PotraceService from './potraceService';
import { SVGTextStyles } from '@/types';

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
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    this.svgContent = svgContent;
    this.textContent = textContent;
    this.styles = styles;
    this.tspanWrapperContents = [];
    this.initText();
  }
  
  initText() {
    const { window } = new JSDOM(this.textContent);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    this.textElement = textElement;
    window.close();
    this.svgContent = this.svgContent.replace(this.textContent, '#text_replace');
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

  // isMultiStyles() {
  //   return Boolean(this.tspanElement?.children.length)
  // }

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
    const tspanForEachCharsFlat = tspanForEachChars.flat();

    const promises: Array<Promise<any> | null> = []
    for (const [index, tspan] of tspanForEachCharsFlat.entries()) {
      let cloneEntireContent = this.svgContent;
      let cloneTextContent = this.textContent;
      const cloneTspanChildElement = [...tspanForEachCharsFlat].map((tspanData: TagData) => tspanData.content);
        cloneTspanChildElement.splice(index, 1);
        for (const tspanChildContent of cloneTspanChildElement) {
          const newTspanContent = this.addStyleToTspan(tspanChildContent);
          cloneTextContent = cloneTextContent.replace(tspanChildContent, newTspanContent);
        }
        const result = cloneEntireContent.replace('#text_replace', cloneTextContent);
        try {
          promises.push(this.potraceService.convertTextByTrace(result, {
            ...this.styles,
            fill: tspan.fill,
          }));
        } catch (error) {
          console.log(error, 'error..')
          promises.push(null);
        }
    }
    const res = await Promise.all(promises.filter(Boolean));
    const finalResult = [];
    for (const subRes of res) {
      finalResult.push(subRes.match(/<path(.*?)\/>/g) || [])
    }
    return finalResult.flat();
  }
}