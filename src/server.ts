import fs from 'fs';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { JSDOM } from 'jsdom';
import { HTMLService } from './services/htmlService';
import HandlerSVGContent from './handlerSVGContent';
import { ChromiumHandler } from './chromium/chromiumHandler';
import { Page } from 'puppeteer-core';
import ExportSVGFilterService from './services/svgFilter';

const PORT = 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['*']
  })
);

app.post('/api/post-html', (req: Request, res: Response) => {
  // @ts-ignore
  const { data } = req.body;
  const htmlService = new HTMLService(data);
  const pureSVGContent = htmlService.getPureSVG();
  console.log(pureSVGContent, '==> pureSVGContent...');
});

app.use('/', async (req: Request, res: Response) => {
  let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
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
  svgContent = preProcessSVG(svgContent);

  // let page: Page | undefined = undefined;
  // try {
  //   page = await ChromiumHandler.newPage();
  //   console.log('Chromium DONE!');
  // } catch (error) {
  //   console.log(error, '==> error');
  // }

  const data = fs.readFileSync(path.join(__dirname, './data/index_3.json'), 'utf8');
  const handlerSVGContent = new HandlerSVGContent(svgContent.replace(/\s+/g, ' '), JSON.parse(data));
  const output = await handlerSVGContent.export();
  // res.render('index', { input: svgContent, output });
  // fs.writeFileSync(path.join(__dirname, './files/output_text.svg'), output);
  const svgFilter = new ExportSVGFilterService(output);
  const newOutput = await svgFilter.export();
  // console.log(newOutput, '==> newOutput...');
  fs.writeFileSync(path.join(__dirname, './files/output_text.svg'), newOutput);
  res.render('index', { input: svgContent, output: newOutput });
  console.log('Write file output_text.svg SUCCESS!!!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);
  fetch(`http://localhost:${PORT}/`);
  // try {
  //   const page = await ChromiumHandler.newPage();
  //   console.log('Chromium DONE!');
  // } catch (error) {
  //   console.log(error, '==> error');
  // }
});
