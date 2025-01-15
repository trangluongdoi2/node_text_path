import { 
  calcDimensionsMatrix,
  composeMatrix,
  multiplyTransformMatrices,
  qrDecompose,
  sizeAfterTransform
} from "./matrix";
import { Point } from "./point";

export const useCaculateTransform = () => {
  const originOffset = {
    left: -0.5,
    top: -0.5,
    center: 0,
    bottom: 0.5,
    right: 0.5,
  };

  const degreesToRadians = (angle: number): number => {
    return angle * Math.PI / 180;
  }

  const _getTransformedDimensions = (element: any, options = {}) => {
    const dimOptions = {
      scaleX: element.scaleX,
      scaleY: element.scaleY,
      skewX: element.skewX,
      skewY: element.skewY,
      width: element.width,
      height: element.height,
      strokeWidth: element.strokeWidth,
      ...options,
    };
    const { strokeWidth } = dimOptions;
    let preScalingStrokeValue = strokeWidth,
        postScalingStrokeValue = 0;

    if (element.strokeUniform) {
      preScalingStrokeValue = 0;
      postScalingStrokeValue = strokeWidth;
    }
    const dimX = dimOptions.width + preScalingStrokeValue,
          dimY = dimOptions.height + preScalingStrokeValue,
          noSkew = dimOptions.skewX === 0 && dimOptions.skewY === 0;
    let finalDimensions;
    if (noSkew) {
      finalDimensions = new Point(
        dimX * dimOptions.scaleX,
        dimY * dimOptions.scaleY,
      );
    } else {
      finalDimensions = sizeAfterTransform(
        dimX,
        dimY,
        calcDimensionsMatrix(dimOptions),
      );
    }

    return finalDimensions.scalarAdd(postScalingStrokeValue);
  }

  const resolveOrigin = (originValue: any) =>
    typeof originValue === 'string'
      ? (originOffset as any)[originValue]
      : originValue - 0.5;

  const translateToGivenOrigin = (options: any) => {
    const { element, point, fromOriginX, fromOriginY, toOriginX, toOriginY } = options;
    let { x, y } = point;
    const offsetX = resolveOrigin(toOriginX) - resolveOrigin(fromOriginX);
    const offsetY = resolveOrigin(toOriginY) - resolveOrigin(fromOriginY);

    if (offsetX || offsetY) {
      const dim = _getTransformedDimensions(element);
      x += offsetX * dim.x;
      y += offsetY * dim.y;
    }

    return new Point(x, y);
  }

  const translateToCenterPoint = (options: any) => {
    const { element, point, originX, originY } = options;
    const p = translateToGivenOrigin({
      element,
      point,
      fromOriginX: originX,
      fromOriginY: originY,
      toOriginX: 'center',
      toOriginY: 'center',
    });
    if (element.angle) {
      return p.rotate(degreesToRadians(element.angle), point);
    }
    return p;
  }

  const translateToOriginPoint = (options: any) => {
    const { element, center, originX, originY } = options;
    const p = translateToGivenOrigin({
      element,
      point: center,
      fromOriginX: 'center',
      fromOriginY: 'center',
      toOriginX: originX,
      toOriginY: originY,
    });
    if (element.angle) {
      return p.rotate(degreesToRadians(element.angle), center);
    }
    return p;
  }

  const getRelativeCenterPoint = (element: any) => {
    return translateToCenterPoint({
      element,
      point: new Point(element.left, element.top),
      originX: element.originX,
      originY: element.originY,
    });
  }

  const reCaculateTransform = (element: any) => {
    const center = getRelativeCenterPoint(element);
    const options = {
      angle: element.angle,
      translateX: center.x,
      translateY: center.y,
      scaleX: element.scaleX,
      scaleY: element.scaleY,
      skewX: element.skewX,
      skewY: element.skewY,
      flipX: element.flipX,
      flipY: element.flipY,
    };
    const currentT = composeMatrix(options);
    const { transformMatrix = [1, 0, 0, 1, 0, 0] } = element;
    const mT = multiplyTransformMatrices(transformMatrix, currentT);
    const opt = qrDecompose(mT);
    const newCenter = { x: opt.translateX, y: opt.translateY };
    Object.assign(element, opt);
    const centerPoint = translateToCenterPoint({ element, point: newCenter, originX: 'center', originY: 'center' });
    const position = translateToOriginPoint({
      element,
      center: centerPoint,
      originX: element.originX,
      originY: element.originY,
    });
    return position;
  }
  return {
    reCaculateTransform,
  }
}
