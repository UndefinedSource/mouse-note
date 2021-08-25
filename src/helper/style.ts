import { Type } from '../types';

export const STYLE = {
    getPosition(x: number, y: number): Type.Style {
        return  {
            '--x': `${x}px`,
            '--y': `${y}px`,
        };
    },
    getWidthAndHeight(width: number, height: number): Type.Style {
        return {
            '--width': `${width}px`,
            '--height': `${height}px`,
        };
    },
    getPen(x: number, y: number, size: number, color: string): Type.Style {
        const halfSize: number = size / 2;
        return {
            ...this.getPosition(x - halfSize, y),
            '--crosshairVerticalX': `${halfSize}px`,
            '--crosshairVerticalY': `${-halfSize}px`,
            '--size': `${size}px`,
            '--color': `${color}`,
        };
    },
    getCircle(x: number, y: number, size: number, color: string): Type.Style {
        const halfSize: number = size / 2;
        return {
            ...this.getPosition(x - halfSize, y - halfSize),
            '--size': `${size}px`,
            '--color': `${color}`,
        };
    },
    getSquare(x: number, y: number, size: number, color: string): Type.Style {
        return this.getCircle(x, y, size, color);
    },
    getShapePreview(x: number, y: number, width: number, height: number, backgroundColor: string, displayConditions: boolean[]): Type.Style {
        const showDisplay: boolean = displayConditions.every(cond => cond === true);
        return {
            ...this.getPosition(x, y),
            ...this.getWidthAndHeight(width, height),
            '--backgroundColor': `${backgroundColor}`,
            '--display': `${showDisplay ? 'inline' : 'none'}`,
        };
    },
    getCirclePreview(x: number, y: number, width: number, height: number, backgroundColor: string, displayConditions: boolean[]): Type.Style {
        const style: Type.Style = this.getShapePreview(x, y, width, height, backgroundColor, displayConditions);
        style['borderRadius'] = '50%';
        return style;
    },
};