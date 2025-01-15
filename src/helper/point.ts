import { TMat2D } from "@/types/convert-text";
import { cos, sin } from "./math";

export interface XY {
  x: number;
  y: number;
}

export class Point implements XY {
  declare x: number;
  declare y: number;
  constructor();
  constructor(x: number, y: number);
  constructor(point?: XY);
  constructor(arg0: number | XY = 0, y = 0) {
    if (typeof arg0 === 'object') {
      this.x = arg0.x;
      this.y = arg0.y;
    } else {
      this.x = arg0;
      this.y = y;
    }
  }
  add(that: XY): Point {
    return new Point(this.x + that.x, this.y + that.y);
  }

  subtract(that: XY): Point {
    return new Point(this.x - that.x, this.y - that.y);
  }

  scalarAdd(scalar: number): Point {
    return new Point(this.x + scalar, this.y + scalar);
  }

  rotate(radians: any, origin: XY = { x:0, y: 0 }): Point {
    const sinus = sin(radians),
      cosinus = cos(radians);
    const p = this.subtract(origin);
    const rotated = new Point(
      p.x * cosinus - p.y * sinus,
      p.x * sinus + p.y * cosinus,
    );
    return rotated.add(origin);
  }
  transform(t: TMat2D, ignoreOffset = false): Point {
    return new Point(
      t[0] * this.x + t[2] * this.y + (ignoreOffset ? 0 : t[4]),
      t[1] * this.x + t[3] * this.y + (ignoreOffset ? 0 : t[5]),
    );
  }
}