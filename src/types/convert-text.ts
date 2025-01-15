
const enum Degree {}
const enum Radian {}

interface NominalTag<T> {
  nominalTag?: T;
}

type Nominal<Type, Tag> = NominalTag<Tag> & Type;

export type TDegree = Nominal<number, Degree>;
export type TRadian = Nominal<number, Radian>;

export type TMat2D = [
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
];

export type TSize = {
  width: number;
  height: number;
};

export type TBBox = {
  left: number;
  top: number;
} & TSize;

export type BoundingElement = {
  x: number,
  y: number,
  cx: number,
  cy: number,
  width: number,
  height: number
}

export type TspanContent = {
  text: string,
  x: number | string,
  dy: number | string,
  style: any,
  children: any,
}

export type RenderCharInfo = {
  char: string,
  fill: string,
  fontFamily: string,
  fontSize: number,
  fontWeight: string | number ,
  fontStyle: string,
  x: number,
  dy: number,
  y: number,
  top: number,
  left: number,
  width: number,
  dyNew: number,
}

export type TransformPath = {
  x: number,
  y: number,
  isItalicStyle: boolean,
}