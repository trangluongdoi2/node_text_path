import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const dirname = path.resolve();

export class HTMLService {
  constructor(html) {
    this.html = html;
    fs.writeFileSync(path.join(__dirname, '../files/pure.html'), this.html);
  }

  getPureSVG() {
    const { window } = new JSDOM(this.html);
    const svg = window.document.getElementsByClassName('svg-main-canvas ready');
    console.log(svg?.length, '==> svg?.length...');
    return '';
  }
}
