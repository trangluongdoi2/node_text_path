import fs from 'fs';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { JSDOM } from 'jsdom';
import { HTMLService } from './services/htmlService';
import HandlerSVGContent from './handlerSVGContent';

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
  let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text.svg'), 'utf8');
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
  const data = fs.readFileSync(path.join(__dirname, './data/index.json'), 'utf8');
  const handlerSVGContent = new HandlerSVGContent(svgContent.replace(/\s+/g, ' '), JSON.parse(data));
  const output = await handlerSVGContent.export();
  res.render('index', { input: svgContent, output });
  fs.writeFileSync(path.join(__dirname, './files/output_text.svg'), output);
  console.log('Write file output_text.svg SUCCESS!!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);
  fetch(`http://localhost:${PORT}/`);
});
