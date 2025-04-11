import { JSDOM } from 'jsdom';
import fs from 'fs';
import { curryingGetByField } from '@/helper/function';

export class MultiStyleTextService {
  private content: string;
  private textContent: string;
  private styles: any;
  private textElement: any;
  private tspanElement: any;
  private tspanChildElement: any;
  private contentWithEachTspanContent: any;
  constructor(content: string, textContent: string, styles: any) {
    this.content = content;
    this.textContent = textContent;
    this.styles = styles;
    this.tspanChildElement = [];
    this.contentWithEachTspanContent = [];
    this.initText();
    this.content = this.content.replace(this.textContent, '#123');
  }

  initText() {
    const { window } = new JSDOM(this.textContent);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    this.textElement = textElement;
  }

  preHandlerText() {

  }

  getTagElements(element: any) {
    const spanEls = element.childNodes;
    const results = [];
    for (const child of spanEls) {
      if (!child.textContent) {
        continue;
      }
      if (child.nodeName === 'TSPAN') {
        const tagData: any = {
          text: child.textContent,
          x: child.getAttribute('x'),
          dy: child.getAttribute('dy'),
          style: child.getAttribute('style') || {},
          content: child.outerHTML || '',
          children: this.getTagElements(child),
        };
        results.push(tagData);
      }
    }
    return results;
  }

  splitTspan() {
    const { window } = new JSDOM(this.textContent);
    const textElement = window.document.getElementsByTagName('text')[0] as any;
    this.tspanElement = this.getTagElements(textElement)?.[0];
    for (const childNode of this.tspanElement.children) {
      this.tspanChildElement.push(childNode);
    }
    for (let i = 0; i < this.tspanChildElement.length; i++) {
      let cloneTextContent = this.textContent;
      let cloneEntireContent = this.content;
      const cloneTspanChildElement = [...this.tspanChildElement];
      cloneTspanChildElement.splice(i, 1);

      // const name = curryingGetByField('text')(cloneTspanChildElement);
      // console.log(this.tspanChildElement.length, 'this.tspanChildElement.length...');
      // console.log(cloneTspanChildElement.length, 'cloneTspanChildElement.length...');

      for (const tspanChild of cloneTspanChildElement) {
        console.log(tspanChild.content, 'tspanChild.content...')
        this.textContent = this.textContent.replace(tspanChild.content, '');
      }
      this.contentWithEachTspanContent.push(cloneTextContent);
      const mathRandom = Math.floor(Math.random() * 100)
      fs.writeFileSync(`${mathRandom}.svg`, cloneEntireContent.replace('#123', cloneTextContent));
    }
  }
}