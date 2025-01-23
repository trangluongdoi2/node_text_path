import { BoundingElement, ITextPathServiceInput } from "@/types/convert-text";
import { TextPathService } from "./textPathService";
import { TextService, TextServiceInput } from "./textService";
import { useCaculateTransform } from "@/helper/transform";
import { getRotationMatrixRatios } from "@/utils-svg";
import * as math from 'mathjs';
import { Point } from "@/helper/point";
import { degreesToRadians } from "@/helper/math";

const { reCaculateTransform  }  = useCaculateTransform();

export class TextClippingPath {
  declare innerHTML: string;
  declare outerHTML: string;
  declare object: any;
  declare boundingElement: BoundingElement;
  constructor(options: TextServiceInput) {
    this.outerHTML = options.html.outerHTML;
    this.innerHTML = options.html.innerHTML;
    this.object = { ...options.data.masterElement };
    this.boundingElement = {
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
      width: 0,
      height: 0,
    }
    this.initTextClippingPathData();
    console.log(this.boundingElement, '==> this.boundingElement CLIPPING PATH....');
  }

  initTextClippingPathData() {
    this.getPositionOfBoundingBox();
  }

  caculateCenterOfElement({ x, y, angle }: { x: number, y: number, angle: number }) {
    const { a, b, c, d } = getRotationMatrixRatios(angle);
    const rotationMatrix = math.matrix([[a, c], [b, d]]);
    const translateMatrix = math.matrix([[-this.object.width / 2], [-this.object.height / 2]]);
    const positionMatrix = math.matrix([[x], [y]]);
    const center = math.subtract(positionMatrix, math.multiply(rotationMatrix, translateMatrix)) as any;
    return {
      x: center._data[0][0],
      y: center._data[1][0],
    };
  }

  getPositionOfBoundingBox() {
    const originalAngle = this.object.angle;
    const originalFlipX = this.object.flipX;
    const originalFlipY = this.object.flipY;
    this.object.flipX = false;
    this.object.flipY = false;
    const position = reCaculateTransform(this.object);
    const center = this.caculateCenterOfElement({ x: position.x, y: position.y, angle: originalAngle });
    this.object.angle = originalAngle;
    this.object.flipX = originalFlipX;
    this.object.flipY = originalFlipY;
    // const w = this.rectData.params.width || this.object.width;
    // const h = this.rectData.params.height || this.object.height;
    const w = this.object.width;
    const h = this.object.height;
    this.boundingElement = {
      x: position.x,
      y: position.y,
      cx: center.x,
      cy: center.y,
      width: w,
      height: h,
    };
  }

  private getOriginalImageTransformContent() {
    const boundText = {
      x: 105.73325021080359,
      y: 602.3459756138137,
      cx: 601.2217903107121,
      cy: 912.7652566196731,
      width: 990.9770801998169,
      height: 620.8385620117188
    }

    const { a, b, c, d } = getRotationMatrixRatios(-this.object.angle);
    const { a: a1, b: b1, c: c1, d: d1 } = getRotationMatrixRatios(this.object.angle);

    const test = {
      x: (this.boundingElement.width / 2) * a + (this.boundingElement.height / 2) * c,
      y: (this.boundingElement.width / 2) * b + (this.boundingElement.height / 2) * d,
    }

    const test2 = {
      x: (this.boundingElement.width / 2) * a1 + (this.boundingElement.height / 2) * c1,
      y: (this.boundingElement.width / 2) * b1 + (this.boundingElement.height / 2) * d1,
    }

    const deltaCenter = {
      x: boundText.cx - this.boundingElement.cx,
      y: boundText.cy - this.boundingElement.cy,
    }

    const deltaCenter2 = {
      x: deltaCenter.x * a + deltaCenter.y * c,
      y: deltaCenter.x * b + deltaCenter.y * d,
    }

    const translate = {
      x: deltaCenter.x + boundText.width / 2,
      y: deltaCenter.y + boundText.height / 2,
    }

    const translate2 = {
      x: deltaCenter.x + this.boundingElement.width / 2,
      y: deltaCenter.y + this.boundingElement.height / 2,
    }

    // console.log(translate, '==> translate...');
    // console.log(translate2, '==> translate2...');
    // const { a, b, c, d } = getRotationMatrixRatios(-this.object.angle);
    const { scaleX, scaleY } = this.object;
    const width = this.object.width * scaleX;
    const height = this.object.height * scaleY;
    const newA = a * scaleX;
    const newB = b * scaleX;
    const newC = c * scaleY;
    const newD = d * scaleY;

    const matrix = `matrix(${newA} ${newB} ${newC} ${newD} ${translate.x} ${translate.y})`;
    const matrix2 = `matrix(${newA} ${newB} ${newC} ${newD} ${translate2.x} ${translate2.y})`;
    const matrix3 = `matrix(${newA} ${newB} ${newC} ${newD} ${this.boundingElement.width / 2} ${this.boundingElement.height / 2})`;
    const matrix4 = `matrix(${newA} ${newB} ${newC} ${newD} ${boundText.width / 2} ${boundText.height / 2})`;
    // const matrix = `matrix(${1} ${0} ${0} ${1} ${translate.x} ${translate.y})`;
    // console.log(matrix, '==> matrix...');
    const transformContent = `transform="${matrix}"`;
    const transformContent2 = `transform="${matrix2}"`;
    const transformContent3 = `transform="${matrix3}"`;
    const transformContent4 = `transform="${matrix4}"`;
    console.log(transformContent, '==> transformContent...');
    console.log(transformContent2, '==> transformContent2...');
    console.log(transformContent3, '==> transformContent3...');
    console.log(transformContent4, '==> transformContent4...');
  }

  private getOriginalClipPathsTransformContent = () => {
    console.log(this.object.angle, '==> this.object.angle...');
    const { a, b, c, d } = getRotationMatrixRatios(-this.object.angle || 0);
    const sw = this.object.width;
    const sh = this.object.height;
    const { scaleX, scaleY } = this.object;
    const width = this.object.width * scaleX;
    const height = this.object.height * scaleY;
    const newA = a * scaleX;
    const newB = b * scaleX;
    const newC = c * scaleY;
    const newD = d * scaleY;

    // const translate = {
    //   x: this.boundingElement.cx,
    //   y: this.boundingElement.cy,
    // }

    const leftRelative = -width / 2;
    const topRelative = -height / 2;

    // console.log(tx, ty, '==> tx, ty...');
    const x1 = 932.4009759957368;
    const y1 = 205.87691561006784;
    const tx = x1 - width / 2;
    const ty = y1 - height / 2;

    const matrixTest = `matrix(${newA} ${newB} ${newC} ${newD} ${tx} ${ty})`;
    const { a: a1, b: b1, c: c1, d: d1 } = getRotationMatrixRatios(this.object.angle || 0);
    const sw1 = this.object.width;
    const sh1 = this.object.height;
    const { scaleX: scaleX1, scaleY: scaleY1 } = this.object;
    const width1 = this.object.width * scaleX1;
    const height1 = this.object.height * scaleY1;
    const newA1 = a1 * scaleX1;
    const newB1 = b1 * scaleX1;
    const newC1 = c1 * scaleY1;
    const newD1 = d1 * scaleY;

    const positionTextNotRotate = {
      x: 105.73325021080359,
      y: 387.52242046785676,
    }

    const positionClipPathHasRotate = {
      x: this.boundingElement.x,
      y: this.boundingElement.y,
    }

    const boundText = {
      x: 105.73325021080359,
      y: 602.3459756138137,
      cx: 601.2217903107121,
      cy: 912.7652566196731,
      width: 990.9770801998169,
      height: 620.8385620117188
    }

    const p1 = new Point(positionClipPathHasRotate.x, positionClipPathHasRotate.y);
    const radians = degreesToRadians(-this.object.angle || 0);
    const pNotRotate = p1.rotate(radians, { x: this.boundingElement.cx, y: this.boundingElement.cy });
    console.log(pNotRotate, '==> pNotRotate...');

    const pNotRotate2 = {
      x: this.boundingElement.cx - this.boundingElement.width / 2,
      y: this.boundingElement.cy - this.boundingElement.height / 2,
    }

    const translateImage = {
      x: 932.4009759957368,
      y: 205.87691561006784
    }

    const XY = {
      x: 164.1652069091797,
      y: 78.21014404296875,
    }

    const deltaXY = {
      x: XY.x * a + XY.y * c,
      y: XY.x * b + XY.y * d,
    }

    const positionTopLeftText = {
      x: boundText.cx - boundText.width / 2,
      y: boundText.cy - boundText.height / 2,
    }

    const deltaPosition = {
      x: positionTopLeftText.x - pNotRotate2.x,
      y: positionTopLeftText.y - pNotRotate2.y,
    }

    const translatePosition = {
      x: deltaPosition.x + boundText.width / 2,
      y: deltaPosition.y + boundText.height / 2,
    }
    return '';
  }

  getNewClippingMaskContent() {
    // const res = this.getOriginalClipPathsTransformContent();
    // console.log(res, '==> res..');
    this.getOriginalImageTransformContent();
    // return res;
    return ''
  }
}
