import HandlerSVGContent from "./handlerSVGContent.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use('/', async (req, res) => {
  const svgContent = fs.readFileSync(path.join(__dirname, './files/input_text.svg'), 'utf8');
  // const svgContent = fs.readFileSync(path.join(__dirname, './files/input_text_2.svg'), 'utf8');
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
