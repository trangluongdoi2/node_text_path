import { JSDOM } from 'jsdom';
import PotraceService from './potraceService';
import { SVGTextStyles } from '@/types';
import { curryingGetByField } from '@/helper/function';
import { randomString, splitStringToChunk } from '@/helper/string';
import { writeArrayToFileStream, writeBufferWithProgress } from '@/helper/file';
import fs from 'fs';

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
  // private textElement: SVGTextElement;
  private tspanWrapperContents: string[];
  private potraceService = new PotraceService();
  private uniqueKey: string;
  constructor(svgContent: string, textContent: string, styles: SVGTextStyles) {
    this.svgContent = svgContent;
    this.textContent = textContent;
    this.styles = styles;
    this.tspanWrapperContents = [];
    this.uniqueKey = randomString(false, 5);
    this.svgContent = this.svgContent.replace(this.textContent, `##text_replace_${this.uniqueKey}##`);
    // this.initText();
  }
  
  // initText() {
  //   // const { window } = new JSDOM(this.textContent);
  //   // const textElement = window.document.getElementsByTagName('text')[0] as any;
  //   // this.textElement = textElement;
  //   // window.close();
  //   this.svgContent = this.svgContent.replace(this.textContent, `##text_replace_${this.uniqueKey}##`);
  // }

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
          // children: recursion ? this.getTagElements(child as SVGTextElement): [],
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
    // console.log(tspanForEachCharsFlat, 'tspanForEachCharsFlat..')
    // console.log(tspanForEachCharsFlat.length, 'tspanForEachCharsFlat.length...');
    const handledContents: Array<{ content: string, styles: any }> = tspanForEachCharsFlat.map((tspanData: TagData, index: number) => {
      let cloneEntireContent = this.svgContent;
      let cloneTextContent = this.textContent;
      const cloneTspanChildElement = [...tspanForEachCharsFlat].map((tspanData: TagData, tspanIndex: number) => ({
        content: tspanData.content,
        key: `##tspan_${tspanIndex}_${this.uniqueKey}##`,
        text: tspanData.text
      }));
      for (const tspanChildContent of cloneTspanChildElement) {
        // console.log(tspanChildContent.text, 'tspanChildContent.text')
        cloneTextContent = cloneTextContent.replace(tspanChildContent.content, tspanChildContent.key);
      }
      // console.log(cloneTextContent, 'cloneTextContent')
      const tspanTempRemove = cloneTspanChildElement.splice(index, 1)?.[0];
      for (const tspanChildContent of [...cloneTspanChildElement]) {
        const newTspanContent = this.addStyleToTspan(tspanChildContent.content);
        cloneTextContent = cloneTextContent.replace(tspanChildContent.key, newTspanContent);
      }
      // console.log(tspanTempRemove.key, 'tspanTempRemove.key');
      // console.log(cloneTextContent, 'cloneTextContent BEFORE');
      // console.log('=======================================');
      cloneTextContent = cloneTextContent.replace(tspanTempRemove.key, tspanTempRemove?.content);
      // console.log(cloneTextContent, 'cloneTextContent AFTER');
      // console.log('===========END============');

      // console.log(cloneEntireContent, 'cloneEntireContent before')
      return {
        content: cloneEntireContent.replace(`##text_replace_${this.uniqueKey}##`, cloneTextContent),
        styles: {
          ...this.styles,
          fill: tspanData.fill,
        }
      }
    });

    const BATCH_SIZE = 3;
    for (let i = 0; i < handledContents.length; i += BATCH_SIZE) {
      const batch = handledContents.slice(i, i + BATCH_SIZE);
      const batchResults = await this.potraceService.converTextByTraceNew(batch);
      // const batchResults = await Promise.all(batch.map((b: any) => {
      //   // const keyRandom = randomString(false, 5)
      //   // const fileName = `${keyRandom}.svg`;
      //   // const hehe = splitStringToChunk(b.content);
      //   // writeArrayToFileStream(hehe, fileName);
      //   try {
      //     return this.potraceService.convertTextByTrace(b.content, b.styles)
      //   } catch (error) {
      //     return null;
      //   }
      // }));
      res.push(...batchResults.filter(Boolean));
    }
    // for (const handledContent of handledContents) {
    //   const keyRandom = randomString(false, 5)
    //   const fileName = `${keyRandom}.svg`;
    //   const hehe = splitStringToChunk(handledContent.content);
    //   await writeArrayToFileStream(hehe, fileName);
    //   // await writeBufferWithProgress(handledContent.content, fileName);
    //   // fs.writeFileSync(handledContent.content, fileName);
    //   const pathContent = await this.potraceService.convertTextByTrace(handledContent.content, handledContent.styles, keyRandom);
    //   res.push(pathContent);
    // }
    const finalResult = [];
    for (const subRes of res) {
      finalResult.push(subRes?.match(/<path(.*?)\/>/g) || [])
    }
    return finalResult.flat();
  }
}