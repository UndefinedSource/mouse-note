export namespace Type {
    export interface StringObj {
        [key: string]: string;
    }

    export interface Canvas extends Size { }
    export interface Color extends StringObj { }
    export interface CursorClass extends StringObj { }
    export interface CursorStyle extends StringObj { }
    export interface DragPosition extends Position { }
    export interface KeyboardKey extends StringObj { }
    export interface Shape extends Size, Position { }
    export interface Style extends StringObj { }

    export interface Size {
        width: number;
        height: number;  
    }

    export interface Position {
        x: number;
        y: number;
    }

    export interface RegularShape extends Position {
        sideLength: number;
    }

    export interface Circle extends Position {
        radius: number;
    }

    export interface Ellipse extends Position {
        radiusX: number;
        radiusY: number;
    }

    export interface Grid extends Position {
        rows: number;
        cols: number;
        lineGap: number;
    }

    export interface Tool {
        color: string;
        mode: string;
        size: number;
    }

    export interface AppSetting {
        CANVAS: {
            [key: string]: string;
        },
        TOOL: {
            MODE: string;
            COLOR: string;
            SIZE: number;
        },
        GRID: {
            [key: string]: number;
        }
    }
}