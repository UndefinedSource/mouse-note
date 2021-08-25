import { Type } from '../types';

export const SHAPE = {
    isEndXLeft(x1: number, x2: number): boolean {
        return (x1 < x2) ? true : false;
    },
    isEndYDown(y1: number, y2: number): boolean {
        return this.isEndXLeft(y1, y2);
    },
    getX(x1: number, x2: number): number {
        return (x1 < x2) ? x1 : x2;
    },
    getY(y1: number, y2: number): number {
        return this.getX(y1, y2);
    },
    getWidth(x1: number, x2: number): number {
        return (x1 < x2) ? (x2 - x1) : (x1 - x2);
    },
    getHeight(y1: number, y2: number): number {
        return this.getWidth(y1, y2);
    },
    getMinSideLength(startX: number, startY: number, endX: number, endY: number): number {
        const width: number = Math.abs(endX - startX);
        const height: number = Math.abs(endY - startY);
        return width < height ? width : height;
    },
    getCenterPosition(startX: number, startY: number, endX: number, endY: number): Type.Position {
        const x: number = (startX + endX) / 2;
        const y: number = (startY + endY) / 2;
        return { x, y };
    },
    getEllipse(startX: number, startY: number, endX: number, endY: number): Type.Ellipse  {
        const { x, y } = this.getCenterPosition(startX, startY, endX, endY);
        const radiusX: number = this.getWidth(startX, endX) / 2;
        const radiusY: number = this.getHeight(startY, endY) / 2;
        return { x, y, radiusX, radiusY };
    },
    // x, y are the center of circle
    getCircle(startX: number, startY: number, endX: number, endY: number): Type.Circle {
        let x: number = startX;
        let y: number = startY;

        const radius: number = this.getMinSideLength(startX, startY, endX, endY) / 2;
        const isEndXLeft: boolean = this.isEndXLeft(startX, endX);
        const isEndYDown: boolean = this.isEndYDown(startY, endY);

        if (isEndXLeft && isEndYDown) {
            x += radius;
            y += radius;
        } else if (!isEndXLeft && isEndYDown) {
            x -= radius;
            y += radius;
        } else if (isEndXLeft && !isEndYDown) {
            x += radius;
            y -= radius;
        } else {
            x -= radius;
            y -= radius;
        }

        return { x, y, radius };
    },
    // get regular shape which draws from top left
    getRegularShape(startX: number, startY: number, endX: number, endY: number): Type.RegularShape {
        let sideLength: number = this.getMinSideLength(startX, startY, endX, endY);
        let x: number = startX;
        let y: number = startY;

        const isEndXLeft: boolean = this.isEndXLeft(startX, endX);
        const isEndYDown: boolean = this.isEndYDown(startY, endY);

        if (isEndXLeft && isEndYDown) {
            return { x, y, sideLength };
        } else if (!isEndXLeft && isEndYDown) {
            x -= sideLength;
        } else if (isEndXLeft && !isEndYDown) {
            y -= sideLength;
        } else {
            x = startX - sideLength;
            y = startY - sideLength;
        }

        return { x, y, sideLength };
    },
};