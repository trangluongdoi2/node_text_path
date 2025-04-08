import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Readable } from 'stream';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { ChromiumHandler } from './chromium/chromiumHandler';
import { Page } from 'puppeteer-core';
import HandlerSVGContent from './handlerSVGContent';
import { getContentByTag } from './utils-svg';

const PORT = 3000;
const app = express();

app.use(bodyParser.json({ limit: 'Infinity' }));
app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['*']
  })
);

app.listen(PORT, async () => {
  function preProcessSVG(svgContent: string) {
    const dom = new JSDOM(svgContent);
    const { window } = dom;
    const element = window.document.getElementsByClassName('svg_select_boundingRect hidden') as any;
    for (const item of element) {
      item.remove();
    }
    const newSVGContent = window.document.body.innerHTML;
    return newSVGContent;
  }

  async function waitForSelector(page: Page, className: string, timeout = 60 * 10 * 1000) {
    try {
      await page.waitForSelector(className, { timeout });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);
  // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
  // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_1.svg'), 'utf8');
  let page: Page | undefined;
  try {
    page = await ChromiumHandler.newPage();
    console.log('Chromium DONE!');
  } catch (error) {
    console.log(error, '==> error');
  }

  const url = 'https://www.corjl.com/output/org/GE01JKETWV649R53Q9Y2H89KC3BE/downloads/DO01JKET8BE3MJKGGCFG9XK1Z47S/U01JR503X0PPJM1FP4YDRAWXDT6/html/1.html';
  await page?.goto(url);
  await waitForSelector(page as any, '.canvas-loaded');

  const content = await page?.content();
  // @ts-ignore
  const headTag = getContentByTag(content as string, 'head', 0) as string;
  const styles = getContentByTag(headTag, 'style') as string[];

  const data = fs.readFileSync(path.join(__dirname, './data/index.json'), 'utf8');
  const svgContents = await Promise.all(
    Array.from({ length: 1 }, async (_, index: number) => {
      const svgContent = getContentByTag(content as string, 'svg', index) as string;
      // console.log(svgContent.slice(0, 100), 'slice 0 100...');
      const exportSvgService = new HandlerSVGContent(svgContent, styles, data);
      const contentSVG = await exportSvgService.export();
      // await exportSvgService.cleanup().catch((error) => {
      //   console.error(`Error cleaning up ExportSvgService:`, error);
      // });
      return contentSVG;
    })
  );
  const random = 'huhu-hehe.svg';
  fs.writeFileSync(random, svgContents.join(''));
  console.log(`File is write successfully in ${random}`);
});