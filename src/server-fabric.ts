import fs from 'fs';
import { Readable } from 'stream';
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
import { prepareWorkingDir } from './helper/file';
import { im } from 'mathjs';
import * as WebSocketServer  from 'ws';

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

app.get('/', async (req: Request, res: Response) => {
  // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
  // let svgContent = fs.readFileSync(path.join(__dirname, './files/input_1.svg'), 'utf8');
  // svgContent = preProcessSVG(svgContent);
  // function preProcessSVG(svgContent: string) {
  //   const dom = new JSDOM(svgContent);
  //   const { window } = dom;
  //   const element = window.document.getElementsByClassName('svg_select_boundingRect hidden') as any;
  //   for (const item of element) {
  //     item.remove();
  //   }
  //   const newSVGContent = window.document.body.innerHTML;
  //   return newSVGContent;
  // }

  // async function webSocketStreaming(page: Page) {
  //   const wss = new WebSocket.Server({ port: 8080 });
  //   // const filePath = path.join(__dirname, './result/result.svg');
  //   const filePath = path.join(__dirname, './test.svg');
  //   const outputStream = fs.createWriteStream(filePath);
  //   let receivedSize = 0;
  
  //   const serverReady = new Promise(resolve => {
  //     wss.on('connection', ws => {
  //       console.log('Browser connected');
  //       ws.on('message', message => {
  //         try {
  //           const data = JSON.parse(message.toString());
            
  //           if (data.type === 'data') {
  //             outputStream.write(data.chunk);
  //             receivedSize += data.chunk.length;
  //             console.log(`Received ${receivedSize} bytes so far`);
  //           } else if (data.type === 'complete') {
  //             console.log('Transfer complete');
  //             outputStream.end();
  //             wss.close();
  //             resolve(true);
  //           }
  //         } catch (e) {
  //           // Not JSON, assume raw data
  //           outputStream.write(message.toString());
  //         }
  //       });
  //     });
  //   });
  
  //   const options = {
  //     exportWidth: 5100,
  //     exportHeight: 3300,
  //     scale: 1,
  //     bleedSize: 0,
  //   }
  
  //   await page.evaluate(async (opts) => {
  //     const ws = new WebSocket('ws://localhost:8080');
  //     const result = (window as any).corjlFabricCanvas.exportNew('SVG', opts);
  //     return new Promise(resolve => {
  //       const ws = new WebSocket('ws://localhost:8080');
  //       console.log(ws, '==> ws..')
  //       ws.onopen = () => {
  //         console.log('Connected to server, sending data...');
  //         // Send in chunks
  //         const CHUNK_SIZE = 1024 * 1024; // 1MB
  //         const totalChunks = Math.ceil(result.length / CHUNK_SIZE);
  //         let sentChunks = 0;
          
  //         function sendNextChunk() {
  //           if (sentChunks >= totalChunks) {
  //             // All sent
  //             ws.send(JSON.stringify({ type: 'complete' }));
  //             setTimeout(() => {
  //               ws.close();
  //               resolve(true);
  //             }, 500);
  //             return;
  //           }
            
  //           const start = sentChunks * CHUNK_SIZE;
  //           const end = Math.min(start + CHUNK_SIZE, result.length);
  //           const chunk = result.substring(start, end);
            
  //           ws.send(JSON.stringify({
  //             type: 'data',
  //             chunk,
  //             index: sentChunks,
  //             total: totalChunks
  //           }));
            
  //           sentChunks++;
  //           console.log(`Sent chunk ${sentChunks}/${totalChunks}`);
            
  //           // Schedule next chunk
  //           setTimeout(sendNextChunk, 0);
  //         }
          
  //         sendNextChunk();
  //       };
  //     });
  //   }, options);
  //   await serverReady;
  //   page.close();
  // }

  let page: Page | undefined = undefined;
  try {
    page = await ChromiumHandler.newPage();
    console.log('Chromium DONE!');
  } catch (error) {
    console.log(error, '==> error');
  }
  
});

app.post('/save-file', (req: Request, res: Response) => {
  const filePath = 'test.svg';
  fs.writeFileSync(filePath, req.body.data);
  console.log('done...')
  res.send({ success: true, path: filePath });
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);

  // function preProcessSVG(svgContent: string) {
  //   const dom = new JSDOM(svgContent);
  //   const { window } = dom;
  //   const element = window.document.getElementsByClassName('svg_select_boundingRect hidden') as any;
  //   for (const item of element) {
  //     item.remove();
  //   }
  //   const newSVGContent = window.document.body.innerHTML;
  //   return newSVGContent;
  // }

  async function waitForSelector(page: Page, className: string, timeout = 60 * 10 * 1000) {
    try {
      await page.waitForSelector(className, { timeout });
    } catch (error) {
      console.error(error);
    }
  }

  // async function getChunkedSVGContent(page: Page, options: any) {
  //   await page.evaluate(() => {
  //     (window as any).chunkString = function(str: string, size: number) {
  //       const chunks = [];
  //       for (let i = 0; i < str.length; i += size) {
  //         chunks.push(str.slice(i, i + size));
  //       }
  //       return chunks;
  //     };
  //   });
  
  //   const chunks = await page.evaluate(async (opts) => {
  //     const svgContent = await (window as any).corjlFabricCanvas.exportNew('SVG', opts);
  //     return (window as any).chunkString(svgContent, 200000);
  //   }, options);
  
  //   return chunks.join('');
  // }

  // async function webSocketStreaming(page: Page) {
  //   const wss = new WebSocketServer.Server({ port: 1234 });
  //   // const filePath = path.join(__dirname, './result/result.svg');
  //   const filePath = path.join(__dirname, './test.svg');
  //   const outputStream = fs.createWriteStream(filePath);
  //   let receivedSize = 0;
  
  //   const serverReady = new Promise(resolve => {
  //     wss.on('connection', ws => {
  //       console.log('Browser connected');
  //       ws.on('message', message => {
  //         try {
  //           console.log('message...');
  //           const data = JSON.parse(message.toString());
            
  //           if (data.type === 'data') {
  //             outputStream.write(data.chunk);
  //             receivedSize += data.chunk.length;
  //             console.log(`Received ${receivedSize} bytes so far`);
  //           } else if (data.type === 'complete') {
  //             console.log('Transfer complete');
  //             outputStream.end();
  //             wss.close();
  //             resolve(true);
  //           }
  //         } catch (e) {
  //           // Not JSON, assume raw data
  //           outputStream.write(message.toString());
  //         }
  //       });
  //     });
  //   });
  
  //   const options = {
  //     exportWidth: 5100,
  //     exportHeight: 3300,
  //     scale: 1,
  //     bleedSize: 0,
  //   }
  
  //   await page.evaluate(async (opts) => {
  //     const result = (window as any).corjlFabricCanvas.exportNew('SVG', opts);
  //     const ws = new WebSocket('ws://localhost:1234');
  //     return new Promise(resolve => {
  //       ws.onopen = () => {
  //         console.log('Connected to server, sending data...');
  //         // Send in chunks
  //         const CHUNK_SIZE = 1024 * 1024; // 1MB
  //         const totalChunks = Math.ceil(result.length / CHUNK_SIZE);
  //         let sentChunks = 0;
          
  //         function sendNextChunk() {
  //           if (sentChunks >= totalChunks) {
  //             // All sent
  //             ws.send(JSON.stringify({ type: 'complete' }));
  //             setTimeout(() => {
  //               ws.close();
  //               resolve(true);
  //             }, 500);
  //             return;
  //           }
            
  //           const start = sentChunks * CHUNK_SIZE;
  //           const end = Math.min(start + CHUNK_SIZE, result.length);
  //           const chunk = result.substring(start, end);
            
  //           ws.send(JSON.stringify({
  //             type: 'data',
  //             chunk,
  //             index: sentChunks,
  //             total: totalChunks
  //           }));
            
  //           sentChunks++;
  //           console.log(`Sent chunk ${sentChunks}/${totalChunks}`);
  //           // Schedule next chunk
  //           setTimeout(sendNextChunk, 0);
  //         }
          
  //         sendNextChunk();
  //       };
  //     });
  //   }, options);

  //   await serverReady;
  //   page.close();
  // }
  
  async function getChunkedSVGContent2(page: Page, options: any) {
    const size = await page.evaluate((opt) => {
      return new Promise(async (resolve) => {
        const CHUNK_SIZE = 1024 * 1024 * 10; // 10Mb
        (window as any).svgContent = [];
        const svgContent = await (window as any).corjlFabricCanvas.exportNew('SVG', opt);
        let totalChunks = Math.ceil(svgContent.length / CHUNK_SIZE);
        let sendChunks = 0;
        function sendNextChunk() {
          if (sendChunks >= totalChunks) {
            resolve((window as any).svgContent?.length || 0)
            return;
          }
          const start = sendChunks * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, svgContent.length);
          const chunk = svgContent.substring(start, end);
  
          (window as any).svgContent.push(chunk);
          sendChunks++;
          setTimeout(sendNextChunk, 0)
        }
        sendNextChunk();
      })

    }, options) as number;
    const promises = [];
    for (let i = 0; i < size; i++) {
      promises.push(await page.evaluate((index: number) => (window as any).svgContent[index], i))
    }
    const final = await Promise.all(promises);
    return final.join('');
  }

  async function writeArrayToFileStream(data: string[], filename: string) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filename, {
        flags: 'w',
        encoding: 'utf8'
      });

      writeStream.on('error', (error) => {
        reject(error);
      });

      writeStream.on('finish', () => {
        resolve(true);
      });

      for (let i = 0; i < data.length; i++) {
        if (!data) {
          continue;
        }
        writeStream.write(data[i]);
      }
      writeStream.end();
    });
  }

  let page: Page | undefined = undefined;

  try {
    page = await ChromiumHandler.newPage();
    console.log('Chromium DONE!');
  } catch (error) {
    console.log(error, '==> error');
  }
  const url = 'http://192.168.100.20:9000/chromium';
  await page?.goto(url);
  await waitForSelector(page as any, '.canvas-loaded');

  const options = {
    exportWidth: 5100,
    exportHeight: 3300,
    scale: 1,
    bleedSize: 0,
  } 

  console.log('START...');
  const result: string[] = [];
  await page?.exposeFunction('saveToFile', (data: string) => {
    result.push(data);
  });
  await page?.evaluate((opt: any) => {
    const res = (window as any).corjlFabricCanvas.exportNew('SVG', opt);
    for (let i = 0; i < res.length; i++) {
      (window as any).saveToFile(res[i]);
    }
  }, options);
  result.push('</svg>');
  const filePath = `huhu-${Date.now()}.svg`;

  await writeArrayToFileStream(result, filePath);
  console.log('END...');
  page?.close();
});