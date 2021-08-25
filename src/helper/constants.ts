import { Type } from '../types';

export const COLOR: Type.Color = {
    BLACK: 'rgb(  0,   0,   0)',
    WHITE: 'rgb(255, 255, 255)',
    RED  : 'rgb(235,  64,  52)',
    GREEN: 'rgb( 50, 168,  82)',
    BLUE : 'rgb( 66, 135, 245)',
};

export const CURSOR_STYLE: Type.CursorStyle = {
    CROSSHAIR: 'cursor crosshair',
    CIRCLE   : 'cursor circle',
    SQUARE   : 'cursor square',
    TEXT     : 'cursor text',
};

export const TOOL_MODE = {
    PEN   : 'PEN',
    CIRCLE: 'CIRCLE',
    SQUARE: 'SQUARE',
    SHAPE: {
        RECT   : 'SHAPE_RECT',
        ELLIPSE: 'SHAPE_ELLIPSE',
    },
};

export const KEYBOARD_KEY: Type.KeyboardKey = {
    E    : 'e',
    SHIFT: 'Shift',
}

// Constants with dependencies of previous constant
export const CURSOR_CLASS: Type.CursorClass = {
    PEN          : CURSOR_STYLE.CROSSHAIR,
    CIRCLE       : CURSOR_STYLE.CIRCLE,
    SQUARE       : CURSOR_STYLE.SQUARE, 
    SHAPE_RECT   : CURSOR_STYLE.CROSSHAIR,
    SHAPE_ELLIPSE: CURSOR_STYLE.CROSSHAIR,
    TEXT         : CURSOR_STYLE.TEXT,
};

export const APP_SETTING: Type.AppSetting = {
    CANVAS: {
        BACKGROUND_COLOR: COLOR.WHITE,
    },
    TOOL: {
        MODE : TOOL_MODE.PEN,
        COLOR: COLOR.BLACK,
        SIZE : 10,
    },
    GRID: {
        LINE_WIDTH: 1,
        GAP       : 30,
    },
};

export const EVENT_LISTENER = {
    RESIZE: 'resize',
    MOUSE: {
        UP: 'mouseup',
        DOWN: 'mousedown',
        MOVE: 'mousemove',
    },
    KEY: {
        UP: 'keyup',
        DOWN: 'keydown',
    },
    TOUCH: {
        START: 'touchstart',
        END: 'touchend',
        MOVE: 'touchmove',
    },
};