import { Font, Glyph } from "opentype.js";

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
  // y: number,
  top: number,
  left: number,
  width: number,
  // dyNew: number,
}

export type TransformPath = {
  x: number,
  y: number,
  isItalicStyle: boolean,
}

export type GraphemeBBox = {
  width: number;
  height: number;
  kernedWidth: number;
  left: number;
  deltaY: number;
  renderLeft?: number;
  renderTop?: number;
  angle?: number;
};

export interface ITextPathServiceInput {
  boundingElement: BoundingElement,
  object: any,
  fontloadMap: FontloadMap,
  deltaY: number,
  glyphsData: Array<GlyphData[]>,
}

export type FontloadMap = { [key: string]: { fontload: Font } }

export type StylePropertiesType =
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'fontSize'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontStyle'
  | 'textBackgroundColor'
  | 'deltaY'
  | 'overline'
  | 'underline'
  | 'linethrough';

export type TextStyleDeclaration = Pick<
  Record<string, any>,
  StylePropertiesType
>;

export interface TextFontData {
  text: string;
  fontload: Font;
}

export interface Point {
  x: number;
  y: number;
}

export interface Extension {
  outerGlow: string;
  shadow: string;
  stroke: string;
  gradient: string;
}

export interface PathCommand {
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
}

export interface GlyphData {
  top: number;
  left: number;
  charIndexStart: number;
  charIndexEnd: number;
  path: TextPath;
  fill: string;
  fontStyle: string;
  fontSize: number;
  width?: number;
  width2?: number;
  name: string;
  text?: string;
  glyph?: Glyph;
}

export interface TextPath {
  commands: PathCommand[];
}