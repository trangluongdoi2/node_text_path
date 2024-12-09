import * as fabric from 'fabric';

export const useCaculateTransform = () => {
  const originOffset = {
    left: -0.5,
    top: -0.5,
    center: 0,
    bottom: 0.5,
    right: 0.5,
  };

  const _getTransformedDimensions = (element, options = {}) => {
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
      finalDimensions = new fabric.Point(
        dimX * dimOptions.scaleX,
        dimY * dimOptions.scaleY,
      );
    } else {
      finalDimensions = fabric.util.sizeAfterTransform(
        dimX,
        dimY,
        fabric.util.calcDimensionsMatrix(dimOptions),
      );
    }

    return finalDimensions.scalarAdd(postScalingStrokeValue);
  }

  const resolveOrigin = (originValue) =>
    typeof originValue === 'string'
      ? originOffset[originValue]
      : originValue - 0.5;

  const translateToGivenOrigin = (options) => {
    const { element, point, fromOriginX, fromOriginY, toOriginX, toOriginY } = options;
    let { x, y } = point;
    const offsetX = resolveOrigin(toOriginX) - resolveOrigin(fromOriginX);
    const offsetY = resolveOrigin(toOriginY) - resolveOrigin(fromOriginY);

    if (offsetX || offsetY) {
      const dim = _getTransformedDimensions(element);
      x += offsetX * dim.x;
      y += offsetY * dim.y;
    }

    return new fabric.Point(x, y);
  }

  const translateToCenterPoint = (options) => {
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
      return p.rotate(fabric.util.degreesToRadians(element.angle), point);
    }
    return p;
  }

  const translateToOriginPoint = (options) => {
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
      return p.rotate(fabric.util.degreesToRadians(element.angle), center);
    }
    return p;
  }

  const getRelativeCenterPoint = (element) => {
    return translateToCenterPoint({
      element,
      point: new fabric.Point(element.left, element.top),
      originX: element.originX,
      originY: element.originY,
    });
  }

  const reCaculateTransform = (element) => {
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
    const currentT = fabric.util.composeMatrix(options);
    const { transformMatrix = [1, 0, 0, 1, 0, 0] } = element;
    const mT = fabric.util.multiplyTransformMatrices(transformMatrix, currentT);
    const opt = fabric.util.qrDecompose(mT);
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
