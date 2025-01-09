import { DOMParser } from '@xmldom/xmldom';
import sharp from 'sharp';

export const insertStringAt = (orginString, stringInsert, index) =>
  orginString.substr(0, index) + stringInsert + orginString.substr(index);

export const checkHasPrefixXMLX = (elemImg) => {
  const regex = new RegExp(`xmlns:xlink="http://www\\.w3\\.org/1999/xlink"`);
  const str = elemImg.replace(/\n/g, '');
  return regex.test(str);
}

export const getSvgDimensions = (content) => {
  const regexSvg = /<svg[^>]*>/g;
  const matchSvg = [...(content.match(regexSvg) ?? [])];
  const svg = matchSvg[0];
  const regexWidth = /width="([^"]*)"/g;
  const regexHeight = /height="([^"]*)"/g;
  const width = svg.match(regexWidth)[0].match(/\d+/)[0];
  const height = svg.match(regexHeight)[0].match(/\d+/)[0];
  return { width: Number(width), height: Number(height) };
};

export const replacePathToGroup = (innerHTML, path) => {
  const pathByGroup = [...(innerHTML.match(/<g[^>]*>/g) ?? [])][0].replace(/transform[^>]*\)" /g, '');
  return `${pathByGroup} ${path} </g>`;
};

export const getContentByTag = (html, tag, index = 'all') => {
  const regix = new RegExp(`<${tag}(.*?)<\\/${tag}>`, 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) || [];
  if (typeof index === 'number') {
    return bodyHtml[index];
  }
  return bodyHtml;
};

export const getContentByPoint = (html, startHtml, endHtml) => {
  const regix = new RegExp(`${startHtml}(.*?)${endHtml}`, 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) || [];
  return bodyHtml;
};

export const getShapeClipPathTags = (html) => {
  return getContentByTag(html, 'clipPath');
};  

export const getBackgroundTag = (html) => {
  const regix = new RegExp(`<g id="([^"]+)_canvas_group_background"[^>]*>(.*?)<\\/g>`, 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) ?? [];
  return bodyHtml[0] ?? '';
};

export const getFilterGradientTags = (html) => {
  return getContentByTag(html, 'linearGradient');
  };

export const getSVGElements = (content) => {
  const regix = new RegExp('<svg[^>]*>', 'g');
  let matches = [];
  let match;

  while ((match = regix.exec(content)) !== null) {
    const startIndex = match.index;
    const openTag = match[0];
    let depth = 1;
    let endIndex = startIndex + openTag.length;

    while (depth > 0 && endIndex < content.length) {
      const nextOpen = content.indexOf('<svg', endIndex);
      const nextClose = content.indexOf('</svg>', endIndex);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        endIndex = nextOpen + 4; // Move past the <svg
      } else {
        depth--;
        endIndex = nextClose + 6; // Move past the </svg>
      }
    }

    if (depth === 0) {
      matches.push(content.substring(startIndex, endIndex));
    }
  }
  if (typeof index === 'number') {
    return matches[index] ?? '';
  }
  return matches;
};

export const getSVGSectionTags = (content, index = 'all') => {
  const regix = new RegExp('<svg[^>]*class="[^"]*svg-main-canvas[^"]*"[^>]*>', 'g');
  let matches = [];
  let match;

  while ((match = regix.exec(content)) !== null) {
    const startIndex = match.index;
    const openTag = match[0];
    let depth = 1;
    let endIndex = startIndex + openTag.length;

    // Find the corresponding closing </svg> tag
    while (depth > 0 && endIndex < content.length) {
      const nextOpen = content.indexOf('<svg', endIndex);
      const nextClose = content.indexOf('</svg>', endIndex);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        endIndex = nextOpen + 4; // Move past the <svg
      } else {
        depth--;
        endIndex = nextClose + 6; // Move past the </svg>
      }
    }

    if (depth === 0) {
      matches.push(content.substring(startIndex, endIndex));
    }
  }
  if (typeof index === 'number') {
    return matches[index] ?? '';
  }
  return matches;
};

export const getImageParentTags = (html) => {
  const regix = new RegExp(`<g\\s+id="([^"]+)_canvas_group_image_parent_([^"]+)"[^>]*>`, 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) ?? [];
  return bodyHtml ?? [];
}

export const getTextParentTags = (html) => {
  const regix = new RegExp(`<g\\s+id="([^"]+)_canvas_group_text_parent_([^"]+)"[^>]*>`, 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) ?? [];
  return bodyHtml ?? [];
}

export const getTextParentsContent = (content, index = 'all') => {
  const regix = new RegExp(`<g\\s+id="([^"]+)_canvas_group_text_parent_([^"]+)*"[^>]*>`, 'g');
  let matches = [];
  let match;

  while ((match = regix.exec(content)) !== null) {
    const startIndex = match.index;
    const openTag = match[0];
    let depth = 1;
    let endIndex = startIndex + openTag.length;
    // Find the corresponding closing </g> tag
    while (depth > 0 && endIndex < content.length) {
      const nextOpen = content.indexOf('<g', endIndex);
      const nextClose = content.indexOf('</g>', endIndex);
      if (nextClose === -1) {
        break;
      };
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        endIndex = nextOpen + 4; // Move past the <svg
      } else {
        depth--;
        endIndex = nextClose + 6; // Move past the </svg>
      }
    }
    if (depth === 0) {
      matches.push(content.substring(startIndex, endIndex));
    }
  }
  if (typeof index === 'number') {
    return matches[index] || '';
  }
  return matches;
}

export const getTextTags = (html) => {
  return getContentByTag(html, 'text');
}

export const getShapeRectanglesTag = (html) => {
  const regix = new RegExp("<rect id=\"[^\"]*_canvas_image_[^\"]*\" width=\"(?!0)\\d+(\\.\\d+)?\" height=\"(?!0)\\d+(\\.\\d+)?\"[^>]* data-fill=\"\\{[^}]*\\}\"[^>]*>(.*?)<\\/rect>", 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) ?? [];
  return bodyHtml || [];
};

export const getShapeClipPathByRectanglesTag = (html) => {
  const regix = new RegExp("<rect id=\"[^\"]*_canvas_shape_clipping_[^\"]*\" width=\"(?!0)\\d+(\\.\\d+)?\" height=\"(?!0)\\d+(\\.\\d+)?\"[^>]* data-fill=\"\\{[^}]*\\}\"[^>]*>(.*?)<\\/rect>", 'g');
  let bodyHtml = html.replace(/\n/g, '');
  bodyHtml = bodyHtml.match(regix) ?? [];
  return bodyHtml || [];
}

const getGradientFilterId = () => {
  const regex = /fill="url\(#(SvgjsLinearGradient[^)]+)\)"/;
  const match = elementTag.match(regex);
  return match ? match[1] : null;
}

export const getClipPathId = (html) => {
  const regex = /clip-path="url\(#([^)]+)\)"/;
  const match = html.match(regex);
  return match ? match[1] : null;
}

export const getElemAttributesByImage = (elemImg, tag = 'image') => {
  const flag = checkHasPrefixXMLX(elemImg);
  const isImageTag = /<image[^>]*>/i.test(elemImg);
  const isSvgTag = /<svg[^>]*>/i.test(elemImg);
  if (isImageTag) {
    tag = 'image';
  }
  if (isSvgTag) {
    tag = 'svg';
  }
  const newImageElement = flag ? elemImg : elemImg.replace(`<${tag}`, `<${tag} xmlns:xlink="http://www.w3.org/1999/xlink"`);
  const parser = new DOMParser();
  const doc = parser.parseFromString(newImageElement, 'text/xml');
  const imageElement = doc.getElementsByTagName(tag)[0];
  
  const keyAttributes = [
    'id',
    'fill',
    'href',
    'viewBox',
    'width',
    'height',
    'x',
    'y',
    'filter',
    'preserveAspectRatio',
    'fontFamily',
    'style',
    'transform',
  ];

  const attributes = {};
  if (imageElement) {
    for (let i = 0; i < imageElement.attributes.length; i++) {
      const attr = imageElement.attributes[i];
      const name = attr.name.replace(/-(\w)/g, (_, c) => c.toUpperCase());
      if (keyAttributes.includes(name)) {
        attributes[name] = attr.value;
      }
      /// For xlink:href case
      if (attr.name === 'xlink:href') {
        attributes['href'] = attr.value;
      }
    }
  }
  return attributes;
}

export const getElemAttributesByImageWithRegex = (elemImg) => {
  const attributes = {};
  const regex = /[\s\r\t\n]*([a-z0-9\-_]+)[\s\r\t\n]*=[\s\r\t\n]*(['"])((?:\\\2|(?!\2).)*)\2/gi;
  const keyAttributes = [
    'id',
    'fill',
    'href',
    'viewBox',
    'width',
    'height',
    'x',
    'y',
    'filter',
    'preserveAspectRatio',
    'fontFamily',
    'style',
    'transform',
  ];
  let match = null;

  while ((match = regex.exec(elemImg))) {
    let attribute = match[1];
    const value = match[3];
    const index = attribute.indexOf('-');

    if (index !== -1) {
      attribute = attribute.replace('-', '');
      attribute = attribute.split('');
      attribute[index] = attribute[index].toUpperCase();
      attribute = attribute.join('');
    }

    if (keyAttributes.includes(attribute)) {
      attributes[attribute] = value;
    }
  }
  return attributes;
};

export const getElemAttributesByText = (elemText) => {
  const attributes = {};
  const regex = /[\s\r\t\n]*([a-z0-9\-_]+)[\s\r\t\n]*=[\s\r\t\n]*(['"])((?:\\\2|(?!\2).)*)\2/gi;
  const stylesByString = [
    'id',
    'fontFamily',
    'fontWeight',
    'fill',
    'fontStyle',
    'style',
    'textAnchor',
    'transform',
    'stroke',
    'filter',
    'href',
    'preserveAspectRatio',
    'viewBox',
  ];

  let match = null;
  while ((match = regex.exec(elemText))) {
    let attribute = match[1];
    const value = match[3];
    const index = attribute.indexOf('-');
    if (index !== -1) {
      attribute = attribute.replace(/-/g, '');
      attribute = attribute.split('');
      attribute[index] = attribute[index].toUpperCase();
      attribute = attribute.join('');
    }
    if (stylesByString.includes(attribute)) {
      attributes[attribute] = value;
    }
  }
  return attributes;
};

export const removeXMLContent = (svgContent) => {
  const regex = new RegExp('<\\?xml[^>]*\\?>', 'g'); 
  svgContent = svgContent.replace(regex, '');
  return svgContent;
}

export const removeDOCTYPE = (svgContent) => {
  const regex = new RegExp('<!DOCTYPE[^>]*>', 'g'); 
  svgContent = svgContent.replace(regex, ' ');
  return svgContent;
}

export const updateXYPosition = (content, tag = 'svg', x, y) => {
  const regexTag = new RegExp(`<${tag}[^>]*>`, 'g');
  const matchSvg = [...(content.match(regexTag) ?? [])];
  if (!matchSvg.length) {
    return content;
  }
  const tagContent = matchSvg[0];
  const replaceRegex = /\b(x|y)="(\d+)"/;
  let newContent = tagContent.replace(replaceRegex, (_, attr, value) => {
    const newValue = attr === 'x' ? (Number(value) + x) : (Number(value) + y);
    return `${attr}="${newValue}"`;
  });

  if (!/\bx="/.test(newContent)) {
    newContent = newContent.replace(/<(\w+)/, `<$1 x="${x}"`);
  }
  if (!/\by="/.test(newContent)) {
    newContent = newContent.replace(/<(\w+)/, `<$1 y="${y}"`);
  }
  return newContent;
};

export const getRowColumnIndex = (columns, rows, index) => {
  if (index === columns * rows) {
    return { row: rows, col: columns };
  }
  const col = index % columns === 0 ? columns : index % columns;
  let row = 1;
  for (let i = 1; i < index; i++) {
    if (i % columns === 0) {
      row += 1;
    }
  }
  return { row, col };
};

export const removeTransform = (content) => {
  content = content.replace(/transform="[^"]*"/, '');
  content = content.replace(/transform: matrix\([^)]*\);/, '');
  return content;
}

export const removeViewBox = (content) => {
  content = content.replace(/viewBox="[^"]*"/, '');
  return content;
}

export const removeXYTranslate = (content) => {
  content = content.replace(/x="[^"]*"/, '');
  content = content.replace(/y="[^"]*"/, '');
  return content;
}

export const getMatrixFromTransform = (transform) => {
  const regex = /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/;
  const match = transform.match(regex);
  if (match) {
    return match.slice(1).map(Number);
  }
  return [1, 0, 0, 1, 0, 0];
}

export const getClassNames = (content) => {
  const classRegex = /class="([^"]+)"/g;
  const classNames = [];
  let match;
  while ((match = classRegex.exec(content)) !== null) {
    classNames.push(match[1].split(' '));
  }
  const uniqueClassNames = [... new Set(classNames.flat())];
  return uniqueClassNames;
}

export const getClipPathUrl = (content) => {
  const clipPathRegex = /clip-path\s*[:=]\s*["']?url\(#([^)]+)\)["']?/g;
  const clipPaths = [];
  let match;
  while ((match = clipPathRegex.exec(content)) !== null) {
    clipPaths.push(match[1].split(' '));
  }
  const uniqueClassNames = [... new Set(clipPaths.flat())];
  return uniqueClassNames;
}

export const getUrlOfUseTag = (content) => {
  const regex = /<use[^>]+xlink:href="#([^"]+)"/g;
  const result = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    result.push(match[1].split(' '));
  }
  return [... new Set(result.flat())];;
}

export const saturateToMatrix = (saturateValue) => {
  const s = saturateValue;
  return [
    0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0,
    0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0,
    0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0,
    0, 0, 0, 1, 0
  ];
}

export const rotateToZero = (matrix) => {
  // Extract the current rotation angle from the matrix
  const a = matrix[0];
  const b = matrix[1];
  const c = matrix[2];
  const d = matrix[3];
  const e = matrix[4];
  const f = matrix[5];

  // Calculate the current rotation angle in radians
  const currentAngle = Math.atan2(b, a);
  console.log(currentAngle * 180 / Math.PI, '>>> deg...');

  // Calculate the inverse rotation angle to rotate to 0 degrees
  const inverseAngle = -currentAngle;

  // Calculate the inverse rotation matrix
  const cosTheta = Math.cos(inverseAngle);
  const sinTheta = Math.sin(inverseAngle);

  // Apply the inverse rotation to the current matrix
  const newA = a * cosTheta + b * sinTheta;
  const newB = -a * sinTheta + b * cosTheta;
  const newC = c * cosTheta + d * sinTheta;
  const newD = -c * sinTheta + d * cosTheta;

  // The translation components remain the same
  const newE = e;
  const newF = f;

  // Return the new transformation matrix
  return [newA, newB, newC, newD, newE, newF];
}

export const getImagePng = async (file) => {
  let image = sharp(file);
  const metadata = await image.metadata();
  return image
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(metadata.width, metadata.height, {
      withoutEnlargement: true,
      fit: 'cover',
    })
    .png()
    .toBuffer();
}

export const getRotationMatrixRatios = (deg) => {
  const radians = ((deg || 0) * Math.PI) / 180;
  return {
    a: Math.cos(radians),
    b: Math.sin(radians),
    c: -Math.sin(radians),
    d: Math.cos(radians),
  };
}
