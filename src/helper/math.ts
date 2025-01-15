import { TDegree, TRadian } from "@/types/convert-text";
import { PiBy180 } from "./constants";

const halfPI = Math.PI / 2;

export const cos = (angle: number): number => {
  if (angle === 0) {
    return 1;
  }
  const angleSlice = Math.abs(angle) / halfPI;
  switch (angleSlice) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(angle);
};

export const sin = (angle: number): number => {
  if (angle === 0) {
    return 0;
  }
  const angleSlice = angle / halfPI;
  const value = Math.sign(angle);
  switch (angleSlice) {
    case 1:
      return value;
    case 2:
      return 0;
    case 3:
      return -value;
  }
  return Math.sin(angle);
};

export const degreesToRadians = (degrees: TDegree): TRadian =>
  (degrees * PiBy180) as TRadian;

export const radiansToDegrees = (radians: TRadian): TDegree =>
  (radians / PiBy180) as TDegree;
