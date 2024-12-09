import HandlerSVGContent from "./handlerSVGContent.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use('/', async (req, res) => {
  const svgContent = fs.readFileSync(path.join(__dirname, './files/input_text.svg'), 'utf8');
  fs.writeFileSync(path.join(__dirname, './files/input_text_2.svg'), svgContent.replace(/\s+/g, ' '));
  // const formatSVGContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
  const data1 = fs.readFileSync(path.join(__dirname, './data/index.json'), 'utf8');
  const data2 = fs.readFileSync(path.join(__dirname, './data/index_2.json'), 'utf8');
  const handlerSVGContent = new HandlerSVGContent(svgContent.replace(/\s+/g, ' '), JSON.parse(data1), JSON.parse(data2));
  const output = await handlerSVGContent.export();
  res.render('index', { input: svgContent, output });
  fs.writeFileSync(path.join(__dirname, './files/output_text.svg'), output);
  console.log('Write file output_text.svg SUCCESS!!!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  fetch('http://localhost:3000/');
});
