interface IVector {
  dx: number;
  dy: number;
}

export const moveTo = (v: IVector) => `M ${v.dx} ${v.dy}`;

export const horizontalLine = (dx: number) => `h ${dx}`;

export const verticalLine = (dy: number) => `v ${dy}`;

export const cubicBezier = (v1: IVector, v2: IVector, v3: IVector) =>
  `c ${v1.dx} ${v1.dy} ${v2.dx} ${v2.dy} ${v3.dx} ${v3.dy}`;

export const end = () => "z";

export const midpointConstant = (4 / 3) * (Math.sqrt(2) - 1);
