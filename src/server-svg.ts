import fs from 'fs';
import { JSDOM } from 'jsdom';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ChromiumHandler } from './chromium/chromiumHandler';
import { Page } from 'puppeteer-core';
import HandlerSVGContent from './handlerSVGContent';
import { getContentByTag, removeXMLContent } from './utils-svg';
import DesignService from './services/designService'
import { FileGeneratorInput } from './services/svgFilter';
import { prepareWorkingDir } from './helper/file';
import { randomString } from './helper/string';
const os = require('os');
const path = require('path');

console.log(os, 'os..')

const PORT = 3000;
export const CHROMIUM_DEFAULT_PPI = 96;

export const LINUX_DEFAULT_PPI = 72;

export const RATIO_PPI_BETWEEN_LINUX_AND_CHROMIUM = LINUX_DEFAULT_PPI / CHROMIUM_DEFAULT_PPI;
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

app.get('/healthcheck', (req, res) => {
  res.send('Ok')
});

// Text path
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
      console.log('Error when waiting selctor..')
      console.error(error);
    }
  }

  async function screenshotWithChromium(page: Page, input: { width: number, height: number, format: 'png' | 'jpeg' }): Promise<Buffer> {
    const imageBuffer = await page.screenshot({
      type: input.format,
      clip: {
        x: 0,
        y: 0,
        width: input.width,
        height: input.height,
      },
      quality: input.format === 'jpeg' ? 100 : undefined,
      omitBackground: input.format == 'png' ? true : undefined,
    });
    const fileName = `result-${Math.random() * 100}.${input.format}`;
    console.log(fileName, '==> fileName...');
    fs.writeFileSync(fileName, imageBuffer);
    return imageBuffer;
  }

  function getOutputSize(input: FileGeneratorInput) {
    let outputWidth = input.pageWidth;
    let outputHeight = input.pageHeight;
    // if (input.showBleed) {
    //   outputWidth += (input.pageBleed * 2);
    //   outputHeight += (input.pageBleed * 2);
    //   console.log('calculateActualSizeOutput showBleed: ', outputWidth, outputHeight);
    // }
  
    
    // if (input.showTrimMarks) {
    //   outputWidth += TRIM_MARKS_SIZE;
    //   outputHeight += TRIM_MARKS_SIZE;
    //   console.log('calculateActualSizeOutput showTrimMarks: ', outputWidth, outputHeight);
    // }
  
    const size = {
      outputWidth,
      outputHeight,
    }
  
    return size;
  }

  // function getPdfZoomValue(pixelsPerInch: number) {
  //   const defaultPPI = CHROMIUM_DEFAULT_PPI;
  //   const scaleBydesignPPI = defaultPPI / pixelsPerInch;
  //   const scaleByDefaultPPI = pixelsPerInch / defaultPPI;
  //   const scale = (defaultPPI < pixelsPerInch) ? scaleBydesignPPI : scaleByDefaultPPI;
  //   console.log(`getPdfZoomValue: scale: ${scale}, pixelsPerInch: ${pixelsPerInch}`);
  //   return Number(scale);
  // }

  // async function createPDFWithChromium(page: Page, input: FileGeneratorInput): Promise<Buffer> {
  //   const { outputWidth, outputHeight } = getOutputSize(input);
  //   const scalePdfByRatioPPI = getPdfZoomValue(input.pixelsPerInch) * RATIO_PPI_BETWEEN_LINUX_AND_CHROMIUM;
  //   const scaledWidth = outputWidth * scalePdfByRatioPPI;
  //   const scaledHeight = outputHeight * scalePdfByRatioPPI;

  //   console.log(scaledWidth, scaledHeight, 'scaledWidth, scaledHeight..');

  //   const content = await page.pdf({
  //     width: scaledWidth,
  //     height: scaledHeight,
  //     margin: {
  //       top: 0,   
  //       right: 0,
  //       bottom: 0,
  //       left: 0,
  //     },
  //     printBackground: true,
  //   });
  //   return content;
  // }

  // async function getDataFromContent(content: string) {
  //   const TIMEOUT: number = 10 * 60 * 1000;
  //   return new Promise(async (resolve, reject) => {
  //     let page: Page | undefined;
      
  //     try {
  //       page = await ChromiumHandler.newPage();
  //       await page?.setViewport({ width: 1, height: 1 });
  //       await page?.setContent(content, {
  //         waitUntil: ['load', 'networkidle0'],
  //         timeout: TIMEOUT,
  //       });
  //       resolve(1);
  //     } catch (error) {
  //       console.error('Error when setting content to page:', error);
  //       reject(error);
  //     } finally {
  //       if (page) {
  //         await page.close().catch(console.error);
  //       }
  //     }
  //   });
  // }

  // async function getSVGContentBySections(page: Page): Promise<any> {
  //   const result = await page.evaluate(() => {
  //     const svgEditorBySections = document.querySelectorAll('svg.svg-main-canvas');
  //     const svgNodeBySections = [...svgEditorBySections];
  //     const svgDataBySections = svgNodeBySections.map((nodeSVGSection: any, index: number) => ({
  //       svgContent: nodeSVGSection.outerHTML,
  //       index,
  //     }));
  //     return svgDataBySections;
  //   });
  //   return result;
  // }

  async function getStylesFromPage(page: Page): Promise<string[]> {
    return await page.evaluate(() => {
      const head = document.getElementsByTagName('head')?.[0];
      const styles = Array.from(head.getElementsByTagName('style')).map(tag => tag.outerHTML) as string[];
      return styles;
    });
  }
  
  async function getDataDesignPageFromPage(page: Page): Promise<any> {
    return await page.evaluate(() => {
      return (window as any).data;
    });
  };

  function createWriteStream(fileTemp: string) {
    const stream = fs.createWriteStream(fileTemp, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: 64 * 1024, // 64KB buffer for better performance
    });
    
    // Add error handling
    stream.on('error', (error) => {
      console.error(`Write stream error for ${fileTemp}:`, error);
    });
    
    return stream;
  }


  async function getDataFromLargePage(page: Page): Promise<{
    svgContentsFilePathTmp: string[],
    groupElementFilePathTmp: string[],
    elementsFilePathTmp: Map<string, string[]>
  }> {
    type TagType = 'outerHTML' | 'innerHTML';
    type EntityType = 'svgContent' | 'element' | 'group';
    type ChunkSizeInput = {
      content: string,
      type: EntityType,
      tag?: TagType,
      index?: number,
    }
    // Use OS-aware temp directory with fallback for better cross-platform support
    const workingDirTmp = process.env.TEMP_DIR || path.join(os.tmpdir(), 'chromiumFile');
    console.log(`Using temp directory: ${workingDirTmp}`);
    prepareWorkingDir(workingDirTmp);
    
    // Setup cleanup on process exit
    const cleanup = () => {
      try {
        prepareWorkingDir(workingDirTmp, true);
        console.log('Temp directory cleaned up on exit');
      } catch (error) {
        console.warn('Failed to cleanup temp directory:', error);
      }
    };
    
    process.on('exit', cleanup);
    process.on('SIGINT', () => { cleanup(); process.exit(1); });
    process.on('SIGTERM', () => { cleanup(); process.exit(1); });
    process.on('uncaughtException', (error) => { 
      console.error('Uncaught exception:', error);
      cleanup(); 
      process.exit(1); 
    });
    // const groupOuterHTMLFileTmp = `${workingDirTmp}/groupOuterHTML-${randomString(false, 5)}.txt`;
    // const groupInnerHTMLFileTmp = `${workingDirTmp}/groupInnerHTML-${randomString(false, 5)}.txt`;
    const groupOuterHTMLFileTmp = `${workingDirTmp}/groupOuterHTML.txt`;
    const groupInnerHTMLFileTmp = `${workingDirTmp}/groupInnerHTML.txt`;

    const writeStreamSVGContents: Array<fs.WriteStream> = [];
    const svgContentsFilePathTmp: string[] = [];

    const writeStreamGroupOuterHTML = createWriteStream(groupOuterHTMLFileTmp);
    const writeStreamGroupInnerHTML = createWriteStream(groupInnerHTMLFileTmp);

    const writeStreamElementMap = new Map();
    const elementsFilePathTmp = new Map();
    elementsFilePathTmp.set('outerHTML', []);
    elementsFilePathTmp.set('innerHTML', []);
  
    await page.exposeFunction('setChunkSize', async (data: ChunkSizeInput) => {
      try {
        if (data.type === 'svgContent') {
          const index = data.index as number;
          const elementFileTmp = `${workingDirTmp}/svg-${data.index}-${randomString(false, 5)}.txt`;
          if (!writeStreamSVGContents[index]) {
            writeStreamSVGContents[index] = createWriteStream(elementFileTmp);
            svgContentsFilePathTmp[index] = elementFileTmp;
          }
          const stream = writeStreamSVGContents[index] as fs.WriteStream;
          
          // Use streaming write with backpressure handling
          if (!stream.write(data.content || '')) {
            await new Promise<void>(resolve => stream.once('drain', resolve));
          }
          return;
        }
        // Case element
        if (data.type === 'element') {
          const elementFileTmp = `${workingDirTmp}/element-${data.index}-${data.tag}-${randomString(false, 5)}.txt`;
          const key = `element-${data.index}-${data.tag}`;
          if (!writeStreamElementMap.has(key)) {
            const arrayFilePath = elementsFilePathTmp.get(data.tag) || [];
            arrayFilePath.push(elementFileTmp);
            writeStreamElementMap.set(key, createWriteStream(elementFileTmp));
            elementsFilePathTmp.set(data.tag, arrayFilePath);
          }
          const stream = writeStreamElementMap.get(key);
          
          // Use streaming write with backpressure handling
          if (!stream.write(data.content || '')) {
            await new Promise<void>(resolve => stream.once('drain', resolve));
          }
          return;
        }
        if (data.type === 'group') {
          const stream = data.tag === 'outerHTML' ? writeStreamGroupOuterHTML : writeStreamGroupInnerHTML;
          
          // Use streaming write with backpressure handling
          if (!stream.write(data.content)) {
            await new Promise<void>(resolve => stream.once('drain', resolve));
          }
        }
      } catch (error) {
        console.error('Error writing chunk:', error);
      }
    });

    await page.exposeFunction('finishWriting', (data: ChunkSizeInput) => {
      if (data.type === 'svgContent') {
        const stream = writeStreamSVGContents[data.index as number];
        if (stream) {
          stream.end();
        }
        return;
      }
      if (data.type === 'element') {
        const keyPattern = `element-${data.index}-${data.tag}`;
        const stream = writeStreamElementMap.get(keyPattern);
        if (stream) {
          stream.end();
        }
        return;
      }
      if (data.type === 'group') {
        if (data.tag === 'outerHTML') {
          writeStreamGroupOuterHTML.end();
        } else {
          writeStreamGroupInnerHTML.end();
        }
      }
    });

    await page.evaluate(async () => {
      type TagType = 'outerHTML' | 'innerHTML';
      type EntityType = 'svgContent' | 'element' | 'group';
      type ChunkSizeInput = {
        content: string,
        type: EntityType,
        tag?: TagType,
        index?: number,
      }
      // Memory-adaptive chunk size calculation
      const availableMemory = os.freemem();
      const totalMemory = os.totalmem();
      const memoryUsageRatio = (totalMemory - availableMemory) / totalMemory;
      
      // Adaptive chunk size: smaller chunks when memory is constrained
      const baseChunkSize = 1024 * 1024 * 5; // 5MB default
      const CHUNK_SIZE = memoryUsageRatio > 0.8 
        ? Math.max(1024 * 1024, baseChunkSize * 0.5) // Reduce to 2.5MB if memory usage > 80%
        : Math.min(baseChunkSize, Math.floor(availableMemory * 0.01)); // Use 1% of available memory
      
      console.log(`Memory usage: ${(memoryUsageRatio * 100).toFixed(1)}%, Using chunk size: ${(CHUNK_SIZE / 1024 / 1024).toFixed(1)}MB`);
      const svgEditorBySections = document.querySelectorAll('svg.svg-main-canvas');
      const svgNodeBySections = [...svgEditorBySections];

      function processChunksOptimized(input: ChunkSizeInput, chunkSize = CHUNK_SIZE): Promise<void> {
        return new Promise(resolve => {
          const { content, type, tag } = input;
          const totalChunks = Math.ceil(content.length / chunkSize);
          let sendChunks = 0;
          function sendChunk() {
            if (sendChunks >= totalChunks) {
              (window as any).finishWriting(input);
              resolve();
              return;        
            }
            const start = sendChunks * chunkSize;
            const end = Math.min(start + chunkSize, content.length);
            const chunk = content.substring(start, end);
            if (type === 'svgContent') {
              (window as any).setChunkSize({
                content: chunk,
                type,
                index: input.index,
              });
            } else if (type === 'element') {
              (window as any).setChunkSize({
                content: chunk,
                tag,
                type,
                index: input.index,
              });
            } else if (type === 'group') {
              (window as any).setChunkSize({
                content: chunk,
                tag,
                type,
              });
            }
  
            sendChunks++;
            setTimeout(sendChunk, 10);
          }
          sendChunk();
        });
      }

      async function executeSVGElement(node: any, index: number) {
        if (!node) {
          return;
        }
        await processChunksOptimized({
          type: 'svgContent',
          content: node.outerHTML,
          index
        });
      }

      async function executeGroupElement(node: any) {
        if (!node) {
          return;
        }
        const input1: ChunkSizeInput = {
          type: 'group',
          content: node.outerHTML,
          tag: 'outerHTML',
        }
        const input2: ChunkSizeInput = {
          type: 'group',
          content: node.innerHTML,
          tag: 'innerHTML',
        }
        await Promise.all([
          processChunksOptimized(input1),
          processChunksOptimized(input2),
        ]);
      }

      async function executeElements(node: any) {
        const elements = node.getElementsByClassName('not-select');
        const elementArray = [...elements];
        const BATCH_SIZE = 5;
        // Sequential batch processing to prevent memory overflow
        for (let i = 0; i < elementArray.length; i += BATCH_SIZE) {
          const batch = elementArray.slice(i, i + BATCH_SIZE);
          console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(elementArray.length/BATCH_SIZE)} (${batch.length} elements)`);
          
          const batchPromises = batch.map((element: any, batchIndex: number) => {
            const index = i + batchIndex;
            const inputOuterHTML: ChunkSizeInput = {
              type: 'element',
              content: element.outerHTML,
              tag: 'outerHTML',
              index,
            };
            const inputInnerHTML: ChunkSizeInput = {
              type: 'element',
              content: element.innerHTML,
              tag: 'innerHTML',
              index,
            };

            return Promise.all([
              processChunksOptimized(inputOuterHTML),
              processChunksOptimized(inputInnerHTML),
            ]);
          });
          
          // Process batch sequentially and trigger garbage collection
          await Promise.all(batchPromises);
          
          // Force garbage collection if available (run with --expose-gc flag)
          if (global.gc) {
            global.gc();
          }
          
          // Log memory usage after each batch
          const memUsage = process.memoryUsage();
          console.log(`Batch completed. Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB heap, ${Math.round(memUsage.rss / 1024 / 1024)}MB RSS`);
        }
      }

      for (let i = 0; i < svgNodeBySections.length; i++) {
        const nodeSVGSection = svgNodeBySections[i];
        // result.push(nodeSVGSection.outerHTML);
        await executeSVGElement(nodeSVGSection, i);
        const groupElement = nodeSVGSection.getElementsByClassName('group_elements')[0];
        await executeGroupElement(groupElement);
        await executeElements(nodeSVGSection);
      }
      // return result;
    });

    return {
      svgContentsFilePathTmp,
      groupElementFilePathTmp: [groupOuterHTMLFileTmp, groupInnerHTMLFileTmp],
      elementsFilePathTmp,
    }
  }

  console.log(`Server is running on port ${PORT} ` + `http://localhost:${PORT}/`);

  let page: Page | undefined;
  try {
    page = await ChromiumHandler.newPage();
    console.log('Chromium DONE!');
  } catch (error) {
    console.log(error, '==> error');
  }

  let url = 'https://www.corjl.com/output/org/GE01JKETWV649R53Q9Y2H89KC3BE/downloads/DO01JKET8BE3MJKGGCFG9XK1Z47S/U01JR503X0PPJM1FP4YDRAWXDT6/html/1.html';
  // let url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY5WSE4C1YXKFPSYQ108R7/U01JRJ40F984XDWEYX1PPQAW6R6/html/1.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRVVY52R3J9EP38KMGNQF2HJ/html/12.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWAS0JC7DVE5VYHRWED4QAB/html/9.html';
  url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWBVT4HXHYBV0K7F3KHR3KV/html/13.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWD37BAQR5QMSW99CBE7HHS/html/14.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWGE0TP41B6R20ZPFQ8F4HG/html/14.html ';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWHACW31N4C2ETATFNJF5CZ/html/14.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRWHTA4XF18BR7XZA3HNDM2H/html/14.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRY39CH644QZPW4JVCW2AFKE/html/14.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRYA36V6XZ5319N2XWEKZJ7H/html/14.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRS0BP87ZPSPDN8BKG6RR02F/U01JRYAJSM7RPPQC3ZM774P7WA9/html/17.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRYCQHAGN2S4HVF1TAFEEDG3/U01JS191QTNYNFHYNYRG4FQBZ97/html/18.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JRYCQHAGN2S4HVF1TAFEEDG3/U01JS1D75WKVRVXVHGVED0E9EGE/html/19.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CF727JKHP8146TQYV73C/downloads/DC01HHQTF967YN4YBX4TE0A19SWC/U01JS1P1TWC8G8VK2SG6V81Z0BS/html/1.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CF727JKHP8146TQYV73C/downloads/DC01HHQTF967YN4YBX4TE0A19SWC/U01JS39RAJCSY4B4H51V4NEZ8X1/html/2.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY6SHWBEXZHM5XW3W459BW/U01JS3G8TBMFBBT37QEM4A14V5H/html/1.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY6SHWBEXZHM5XW3W459BW/U01JS3GDF3M1Y4X4Q222W90SR0X/html/4.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CF727JKHP8146TQYV73C/downloads/DC01HHQTEWKB9YCRTWRTVJR16BQ4/U01JS40AWTB0T666A08Y0MT98N3/html/1.html';

  // NOT FIXED
  // url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY6AQREGH5ATYXQFTMXN0W/U01JS4697M13AAPRDGRC44QN65Y/html/1.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY6AQREGH5ATYXQFTMXN0W/U01JS46V5KZCGAV4QV7GEEY5BT8/html/4.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CRND058V7TNCH9WG0NS5/downloads/DC01HMEY7Q8S7WM49YPFRBNWWJDW/U01JSBNWR861TPGS4C3TTV7FXPW/html/1.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CT1KMGNSPFHSYBWT3Y5R/downloads/DC01JP9Y2QHAEA0X0PTQYXY2DYWN/U01JSBP6206EDPYTFGYVDFMEGK7/html/1.html';
  // url = 'https://www.corjl.com/output/org/GD01HHP5CT1KMGNSPFHSYBWT3Y5R/downloads/DC01JP9Y2QHAEA0X0PTQYXY2DYWN/U01JSBPN2CTCY3NAGBYDDZ7FP8F/html/3.html';


  // url = 'https://dev.korjl.com/output/org/GD01HHDZSMZQ57K00R3XXZ50CCT6/downloads/DC01JWSZ2NBC5J1WV13Z26N7P8JD/U01JWSZ8HD435Y5YKM973EFJPYP/html/25.html';
  // url = 'https://www.corjl.com/output/org/GE01JXEFEK3ZV4Q2DEPCX4QC7HF1/downloads/DO01JXECNE9M55ZP99EBRCQG2SFJ/U01JXKMRTCY72Z5FS8C7ZG0ZCF9/html/1.html';
  // url = 'https://www.corjl.com/output/org/GE01HHPMGJAP6RWJCHKKTTD6TPQ9/downloads/DO01JVWQ53XKQZ4PKMP6MCYFWPVF/U01JXMC1ZGSZ12JM72SE3VTB2GR/html/1.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHDZSMZQ57K00R3XXZ50CCT6/downloads/DC01HQ59V143VPYYB0NPFJKAP06G/U01JYJYWFXZT9Y1ETR517SY3JDH/html/1.html';

  // Large SVG File 1
  url = 'https://dev.korjl.com/output/org/GD01HHDZT87PZVNN1AH165EPDC5F/downloads/DC01HM8PPXV9T12X7H66D9V0GH41/U01JZPGJSHT29CZGANSF9MHDX13/html/2.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHDZT87PZVNN1AH165EPDC5F/downloads/DC01JYNH7G2WWPB6HCBF6NTDDJK0/U01K109HG6PCCJDR961Q52EP2F0/html/1.html';
  // Large SVG FIle 2
  // url = 'https://dev.korjl.com/output/org/GD01HHDZT87PZVNN1AH165EPDC5F/downloads/DC01HM8PED6PX8SED3XV5FJ4QSPC/U01K17EHAP79RR4TPMEE1E9C15M/html/1.html';
  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01K0X4RJSB4K17CPJRFTE3HAFT/U01K0XY8PQVD68XYP7H7FNARPQJ/html/13.html';

  // url = 'https://dev.korjl.com/output/org/GD01HHDZT87PZVNN1AH165EPDC5F/downloads/DC01HM8PPXV9T12X7H66D9V0GH41/U01K183842B1FMPDR986QECRASQ/html/3.html';

  // Case 4

  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JTT4YC8RHGBTY76TQNM0CQ1E/U01K187E67DN8VK5RN89F840DQG/html/1.html';

  // url = 'https://dev.korjl.com/output/org/GD01HHE0HGV05VPEJ5TGT5BF14CT/downloads/DC01JWQPCKNK5BF42NRR9E09E51G/U01K188PXRYC90E9Y51NSS1PDCC/html/1.html';
  await page?.goto(url);

  await waitForSelector(page as any, '.canvas-loaded');

  const [data, styles] = await Promise.all([
    getDataDesignPageFromPage(page as Page),
    getStylesFromPage(page as Page),
  ]);

  const {
    svgContentsFilePathTmp,
    groupElementFilePathTmp,
    elementsFilePathTmp,
  } = await getDataFromLargePage(page as Page);

  console.log(svgContentsFilePathTmp, 'svgContentsFilePathTmp.');

  // const input = {
  //   pageWidth: data.designPage.pageWidth,
  //   pageHeight: data.designPage.pageHeight,
  //   format: 'png',
  //   pixelsPerInch: 12,
  // }

  // const result = await createPDFWithChromium(page as Page, input as any);
  // const pdfFileName = `result-${Math.random() * 100}.pdf`;
  // fs.writeFileSync(pdfFileName, result);
  // console.log(`PDF file written successfully: ${pdfFileName}`);

  // // await screenshotWithChromium(page as any, input as any)

  const { pageSections, orgId } = data.designPage;

  const elementsBySection = await DesignService.getListMasterElementsFromPageSections(pageSections, orgId);

  const finalSVGContents = await Promise.all(
    Array.from({ length: pageSections.length }, async (_, index: number) => {
      const exportSvgService = new HandlerSVGContent(
        styles,
        elementsBySection[index],
        {
          elementsFilePathTmp,
          groupElementFilePathTmp,
          svgContentFilePathTmp: svgContentsFilePathTmp[index],
        }
      );
      return await exportSvgService.export();
    })
  );
  const random = 'huhu-hehe.svg';
  fs.writeFileSync(random, finalSVGContents.join(''));
  console.log(`File is write successfully in ${random}`);
});