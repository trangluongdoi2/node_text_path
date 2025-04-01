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

const PORT = 3000;
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'jade');
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

// app.get('/', async (req: Request, res: Response) => {
// });

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);
  let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
  // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_1.svg'), 'utf8');
  svgContent = preProcessSVG(svgContent);
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
  const data = fs.readFileSync(path.join(__dirname, './data/index.json'), 'utf8');
  const exportSVGService = new HandlerSVGContent(svgContent, JSON.parse(data));
  const result = await exportSVGService.export();

  // const random = `huhu-${Date.now()}.svg`;
  const random = 'huhu-hehe.svg';
  fs.writeFileSync(random, result);
  console.log(`File is write successfully in ${random}`);
});