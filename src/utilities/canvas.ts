import { JSDOM } from 'jsdom';

let measuringContext: CanvasRenderingContext2D | null;

export const getMeasuringContext = () => {
  if (!measuringContext) {
    const widow = new JSDOM().window;
    const canvas = widow.document.createElement('canvas');
    console.log(canvas, 'canvas');
    canvas.width = 0;
    canvas.height = 0;
    measuringContext = canvas.getContext('2d');
  }
  return measuringContext;
};
