// import { TBBox, TDegree, TMat2D, TRadian } from "@output/types-convert-text";
import { cos, degreesToRadians, radiansToDegrees, sin } from "./math";
import { Point, XY } from "./point";
import { iMatrix } from "./constants";
import { TBBox, TDegree, TMat2D, TRadian } from "@/types/convert-text";

export type TRotateMatrixArgs = {
  angle?: TDegree;
};

export type TTranslateMatrixArgs = {
  translateX?: number;
  translateY?: number;
};

export type TScaleMatrixArgs = {
  scaleX?: number;
  scaleY?: number;
  flipX?: boolean;
  flipY?: boolean;
  skewX?: TDegree;
  skewY?: TDegree;
};

export type TComposeMatrixArgs = TTranslateMatrixArgs &
  TRotateMatrixArgs &
  TScaleMatrixArgs;

export type TQrDecomposeOut = Required<
  Omit<TComposeMatrixArgs, 'flipX' | 'flipY'>
>;

export const isIdentityMatrix = (mat: TMat2D) =>
  mat.every((value, index) => value === iMatrix[index]);

export const transformPoint = (
  p: XY,
  t: TMat2D,
  ignoreOffset?: boolean,
): Point => new Point(p).transform(t, ignoreOffset);

export const invertTransform = (t: TMat2D): TMat2D => {
  const a = 1 / (t[0] * t[3] - t[1] * t[2]),
    r = [a * t[3], -a * t[1], -a * t[2], a * t[0], 0, 0] as TMat2D,
    { x, y } = new Point(t[4], t[5]).transform(r, true);
  r[4] = -x;
  r[5] = -y;
  return r;
};

export const multiplyTransformMatrices = (
  a: TMat2D,
  b: TMat2D,
  is2x2?: boolean,
): TMat2D =>
  [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4],
    is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5],
  ] as TMat2D;

export const multiplyTransformMatrixArray = (
  matrices: (TMat2D | undefined | null | false)[],
  is2x2?: boolean,
) =>
  matrices.reduceRight(
    (product: TMat2D, curr) =>
      curr && product
        ? multiplyTransformMatrices(curr, product, is2x2)
        : curr || product,
    undefined as unknown as TMat2D,
  ) || iMatrix.concat();

export const calcPlaneRotation = ([a, b]: TMat2D) =>
  Math.atan2(b, a) as TRadian;

export const qrDecompose = (a: TMat2D): TQrDecomposeOut => {
  const angle = calcPlaneRotation(a),
    denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
    scaleX = Math.sqrt(denom),
    scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX,
    skewX = Math.atan2(a[0] * a[2] + a[1] * a[3], denom);
  return {
    angle: radiansToDegrees(angle),
    scaleX,
    scaleY,
    skewX: radiansToDegrees(skewX),
    skewY: 0 as TDegree,
    translateX: a[4] || 0,
    translateY: a[5] || 0,
  };
};

export const createTranslateMatrix = (x: number, y = 0): TMat2D => [
  1,
  0,
  0,
  1,
  x,
  y,
];

export function createRotateMatrix(
  { angle = 0 }: TRotateMatrixArgs = {},
  { x = 0, y = 0 }: Partial<XY> = {},
): TMat2D {
  const angleRadiant = degreesToRadians(angle),
    cosValue = cos(angleRadiant),
    sinValue = sin(angleRadiant);
  return [
    cosValue,
    sinValue,
    -sinValue,
    cosValue,
    x ? x - (cosValue * x - sinValue * y) : 0,
    y ? y - (sinValue * x + cosValue * y) : 0,
  ];
}

export const createScaleMatrix = (x: number, y: number = x): TMat2D => [
  x,
  0,
  0,
  y,
  0,
  0,
];

export const angleToSkew = (angle: TDegree) =>
  Math.tan(degreesToRadians(angle));

export const skewToAngle = (value: TRadian) =>
  radiansToDegrees(Math.atan(value));


export const createSkewXMatrix = (skewValue: TDegree): TMat2D => [
  1,
  0,
  angleToSkew(skewValue),
  1,
  0,
  0,
];

export const createSkewYMatrix = (skewValue: TDegree): TMat2D => [
  1,
  angleToSkew(skewValue),
  0,
  1,
  0,
  0,
];

export const calcDimensionsMatrix = ({
  scaleX = 1,
  scaleY = 1,
  flipX = false,
  flipY = false,
  skewX = 0 as TDegree,
  skewY = 0 as TDegree,
}: TScaleMatrixArgs) => {
  let matrix = createScaleMatrix(
    flipX ? -scaleX : scaleX,
    flipY ? -scaleY : scaleY,
  );
  if (skewX) {
    matrix = multiplyTransformMatrices(matrix, createSkewXMatrix(skewX), true);
  }
  if (skewY) {
    matrix = multiplyTransformMatrices(matrix, createSkewYMatrix(skewY), true);
  }
  return matrix;
};

export const composeMatrix = (options: TComposeMatrixArgs): TMat2D => {
  const { translateX = 0, translateY = 0, angle = 0 as TDegree } = options;
  let matrix = createTranslateMatrix(translateX, translateY);
  if (angle) {
    matrix = multiplyTransformMatrices(matrix, createRotateMatrix({ angle }));
  }
  const scaleMatrix = calcDimensionsMatrix(options);
  if (!isIdentityMatrix(scaleMatrix)) {
    matrix = multiplyTransformMatrices(matrix, scaleMatrix);
  }
  return matrix;
};

export const makeBoundingBoxFromPoints = (points: XY[]): TBBox => {
  let left = 0,
    top = 0,
    width = 0,
    height = 0;

  for (let i = 0, len = points.length; i < len; i++) {
    const { x, y } = points[i];
    if (x > width || !i) width = x;
    if (x < left || !i) left = x;
    if (y > height || !i) height = y;
    if (y < top || !i) top = y;
  }

  return {
    left,
    top,
    width: width - left,
    height: height - top,
  };
};

export const sizeAfterTransform = (
  width: number,
  height: number,
  t: TMat2D,
) => {
  const dimX = width / 2,
    dimY = height / 2,
    points = [
      new Point(-dimX, -dimY),
      new Point(dimX, -dimY),
      new Point(-dimX, dimY),
      new Point(dimX, dimY),
    ].map((p) => p.transform(t)),
    bbox = makeBoundingBoxFromPoints(points);
  return new Point(bbox.width, bbox.height);
};
