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
import measureCharsRouter from './routes/measure-chars';
import { prepareWorkingDir } from './common/file';
import { convertSvgContentToBlob } from './common/convert';

// const PORT = 3000;
// const app = express();

// view engine setup
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'jade');
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: ['*']
//   })
// );

// app.post('/api/post-html', (req: Request, res: Response) => {
//   // @ts-ignore
//   const { data } = req.body;
//   const htmlService = new HTMLService(data);
//   const pureSVGContent = htmlService.getPureSVG();
// });

// app.get('/', async (req: Request, res: Response) => {
//   let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
//   // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_1.svg'), 'utf8');
//   function preProcessSVG(svgContent: string) {
//     const dom = new JSDOM(svgContent);
//     const { window } = dom;
//     const element = window.document.getElementsByClassName('svg_select_boundingRect hidden') as any;
//     for (const item of element) {
//       item.remove();
//     }
//     const newSVGContent = window.document.body.innerHTML;
//     return newSVGContent;
//   }
//   async function waitForSelector(page: Page, className: string, timeout = 60 * 10 * 1000) {
//     try {
//       await page.waitForSelector(className, { timeout });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function getChunkedSVGContent(page: Page, options: any) {
//     await page.evaluate(() => {
//       (window as any).chunkString = function(str: string, size: number) {
//         const chunks = [];
//         for (let i = 0; i < str.length; i += size) {
//           chunks.push(str.slice(i, i + size));
//         }
//         return chunks;
//       };
//     });
  
//     const chunks = await page.evaluate((opts) => {
//       const svgContent = (window as any).corjlFabricCanvas.exportNew('SVG', opts);
//       return (window as any).chunkString(svgContent, 200000);
//     }, options);

//     return chunks.join('');
//   }

//   svgContent = preProcessSVG(svgContent);

//   let page: Page | undefined = undefined;
//   try {
//     page = await ChromiumHandler.newPage();
//     console.log('Chromium DONE!');
//   } catch (error) {
//     console.log(error, '==> error');
//   }

//   const url = 'https://www.corjl.com/output/org/GD01HHP5CCHRSKDCFPVPKNS4DW35/downloads/DC01HHPZGSV8GQ2C6RF4GTSD5DJN/U01JPMV13ZFYYZPSX43PC09P4D4/html/1.html';
//   // const url = 'https://www.corjl.com/output/org/GD01HHP605E91ESTTSY8BAT6DPV4/downloads/DC01JCEEZQZEVTTJHYBCXV6G575A/U01JPMA69YJT09P7D1AQMM3HZ5G/html/2.html';
//   await page?.goto(url);

//   const options = {
//     exportWidth: 5100,
//     exportHeight: 3300,
//     scale: 1,
//     bleedSize: 0
//   }

//   await waitForSelector(page as any, '.canvas-loaded');
//   console.time('DOWNLOAD');
//   const result = await getChunkedSVGContent(page as any, options);
//   console.timeEnd('DOWNLOAD');
//   // console.log(result, '===> result...');

//   res.send({ code: 200 });

//   // res.contentType("application/pdf");
//   // res.send(page);


//   // const data = fs.readFileSync(path.join(__dirname, './data/index_3.json'), 'utf8');
//   // const handlerSVGContent = new HandlerSVGContent(svgContent.replace(/\s+/g, ' '), JSON.parse(data));
//   // const output = await handlerSVGContent.export();
//   // const svgFilter = new ExportSVGFilterService(output);
//   // const newOutput = await svgFilter.export();
//   // fs.writeFileSync(path.join(__dirname, './files/output_text.svg'), newOutput);
//   // res.render('index', { input: svgContent, output: newOutput });
//   // console.log('Write file output_text.svg SUCCESS!!!');
// });

// app.listen(PORT, async () => {
//   console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);
//   fetch(`http://localhost:${PORT}/`);
// });


async function waitForSelector(page: Page, className: string, timeout = 60 * 10 * 1000) {
  try {
    await page.waitForSelector(className, { timeout });
  } catch (error) {
    console.error(error);
  }
}
  
async function getChunkedSVGContent(page: Page, options: any) {
  await page.evaluate(() => {
    (window as any).chunkString = function(str: string, size: number) {
      const chunks = [];
      for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
      }
      return chunks;
    };
  });

  const chunks = await page.evaluate(async (opts) => {
    const svgContent = await (window as any).corjlFabricCanvas.exportNew('SVG', opts);
    return (window as any).chunkString(svgContent, 200000);
  }, options);

  return chunks.join('');
}

(async () => {
  let page: Page | undefined = undefined;
  try {
    page = await ChromiumHandler.newPage();
    console.log('Chromium DONE!');
  } catch (error) {
    console.log(error, '==> error');
  }
  
  // const url = 'https://www.corjl.com/output/org/GD01HHP5CCHRSKDCFPVPKNS4DW35/downloads/DC01HHPZGSV8GQ2C6RF4GTSD5DJN/U01JPMV13ZFYYZPSX43PC09P4D4/html/1.html';
  // const url = 'https://www.corjl.com/output/org/GD01HHP605E91ESTTSY8BAT6DPV4/downloads/DC01JCEEZQZEVTTJHYBCXV6G575A/U01JPMA69YJT09P7D1AQMM3HZ5G/html/2.html';
  const url = 'http://192.168.1.121:9000/chromium';
  
  await page?.goto(url);
  
  const options = {
    exportWidth: 5100,
    exportHeight: 3300,
    scale: 1,
    bleedSize: 0
  }
  
  await waitForSelector(page as any, '.canvas-loaded');
  console.time('DOWNLOAD');
  const result = await getChunkedSVGContent(page as any, options);
  // const result = await page?.evaluate((opts) =>(window as any).corjlFabricCanvas.exportNew('SVG', opts), options);
  // page?.on('console', msg => console.log(msg.text()));
  // console.log(result, '==> result...')
  
  const tmp = path.join(__dirname, './result/result.svg');
  fs.writeFileSync(tmp, result);
  console.timeEnd('DOWNLOAD');
  page?.close();
})()
  
