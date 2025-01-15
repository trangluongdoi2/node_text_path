export interface ImageAttributes {
  format: string,
  width: number, // tmp: remove in future
  height: number, // tmp: remove in future
  origWidth: number,
  origHeight: number,
  optimizeWidth: number,
  optimizeHeight: number,
  thumbWidth: number,
  thumbHeight: number,
  fileSize: number,
  scaleX: number,
  scaleY: number,
}

export interface SvgAttributes extends ImageAttributes {
  numberOfColors: number,
  colors: string[],
}

export type FontAttributes = {
  fileSize: number,
  fontname: string,
  origFontfamily: string,
  fontfamily: string,
  format: string,
  macstyle?: string | number,
  license?: string,
  italicangle?: string,
  weight?: string,
  source?: string,
  fontversion: number | string,
  glyphs: number,
};

export type AssetAttributes = ImageAttributes | SvgAttributes | FontAttributes;


export type ElementType =
 'textbox' |
 'image' |
 'svg' |
 'shape' |
 'line-shape' |
 'clipping-mask' |
 'clipping-text' |
 'gif' |
 'background' |
 'group'
 ;

 export interface ItemSetReference {
  itemType: string,
  setId: string,
  setType: string,
}

 export interface AssetAttribute {
  selected: string,
  selectedStyles?: string[],
  available?: string[],
  syncItemSet?: ItemSetReference[],
}

export interface MasterBaseObjectElement {
  elementKey: string,
  type: ElementType,
  asset?: AssetAttribute,
  originX?: string,
  originY?: string,
  top?: number,
  left?: number,
  width?: number,
  height?: number,
  scaleX?: number,
  scaleY?: number,
  flipX?: boolean,
  flipY?: boolean,
  angle?: number,
  skewX?: number,
  skewY?: number,
  cropX?: number,
  cropY?: number,
  crop?: {
    width: number,
    height: number,
    left: number,
    top: number,
  } | null,
  backstage?: any,
  transformMatrix?: [number, number, number, number, number, number],
  imageScaleX?: number,
  imageScaleY?: number,
  imageWidth?: number,
  imageHeight?: number,
}

export interface MasterElement extends  MasterBaseObjectElement {
  originalClipPathObject?: MasterBaseObjectElement,
  originalImageObject?: MasterBaseObjectElement,
}

export interface PagePayloadData {
  objectMap: {
    dataType: "Map";
    value: Array<any>;
  };
  orderArray: string[];
}

export type ResultListAssetIdsFromPageSections = {
  elementAssetIds: string[],
  backgroundAssetIds: string[],
}

export type SvgOptions = {
  exportWidth: number;
  exportHeight: number;
  scale?: number;
}

export type TrimMarkOptions = {
  x: number;
  y: number;
  widthPdf: number;
  heightPdf: number;
  rotation: number;
}

export type TrimMarkLine = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
};

export type SVGTagHtml = 'svg' | 'style' | 'head' | 'image' | 'text' | 'textPath' | 'tspan' | 'defs' | 'clipPath' | 'linearGradient' | 'rect';

export type SVGImageStyles = {
  id?: string;
  fill?: string;
  href: string;
  viewBox?: string;
  width?: string;
  height?: string;
  x?: string;
  y?: string;
  filter?: string;
  preserveAspectRatio?: string;
  style?: string;
  transform?: string;
};

export type SVGTextStyles = {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  letterSpacing?: number;
  size?: number;
  strokeWidth?: number;
  strokeOpacity?: number;
  dy?: number;
  fontFamily?: string;
  fontWeight?: string;
  fill?: string;
  fontStyle?: string;
  style?: string;
  textAnchor?: string;
  transform?: string;
  stroke?: string;
  filter?: string;
  href?: string;
  preserveAspectRatio?: string;
  viewBox?: string;
};

export type SVGPositionSections = {
  top: number;
  left: number;
  sectionIndex?: number;
};

export type SVGImageContent = {
  imageElement: string;
  imageContent: string;
}

export type SVGElementType = 'TEXT' | 'TEXT_CLIP_PATH' | 'IMAGE';

export type SVGElement = {
  type: SVGElementType;
  elementTag: string;
  path: string;
  clippingMaskTag?: string;
  svgImages?: SVGImageContent[];
};

export type TrimMarkPositions = {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
