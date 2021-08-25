exports.__esModule = true;
exports.EVENT_LISTENER = exports.APP_SETTING = exports.CURSOR_CLASS = exports.KEYBOARD_KEY = exports.TOOL_MODE = exports.CURSOR_STYLE = exports.COLOR = void 0;
exports.COLOR = {
    BLACK: 'rgb(  0,   0,   0)',
    WHITE: 'rgb(255, 255, 255)',
    RED: 'rgb(235,  64,  52)',
    GREEN: 'rgb( 50, 168,  82)',
    BLUE: 'rgb( 66, 135, 245)'
};
exports.CURSOR_STYLE = {
    CROSSHAIR: 'cursor crosshair',
    CIRCLE: 'cursor circle',
    SQUARE: 'cursor square',
    TEXT: 'cursor text'
};
exports.TOOL_MODE = {
    PEN: 'PEN',
    CIRCLE: 'CIRCLE',
    SQUARE: 'SQUARE',
    SHAPE: {
        RECT: 'SHAPE_RECT',
        ELLIPSE: 'SHAPE_ELLIPSE'
    }
};
exports.KEYBOARD_KEY = {
    E: 'e',
    SHIFT: 'Shift'
};
// Constants with dependencies of previous constant
exports.CURSOR_CLASS = {
    PEN: exports.CURSOR_STYLE.CROSSHAIR,
    CIRCLE: exports.CURSOR_STYLE.CIRCLE,
    SQUARE: exports.CURSOR_STYLE.SQUARE,
    SHAPE_RECT: exports.CURSOR_STYLE.CROSSHAIR,
    SHAPE_ELLIPSE: exports.CURSOR_STYLE.CROSSHAIR,
    TEXT: exports.CURSOR_STYLE.TEXT
};
exports.APP_SETTING = {
    CANVAS: {
        BACKGROUND_COLOR: exports.COLOR.WHITE
    },
    TOOL: {
        MODE: exports.TOOL_MODE.PEN,
        COLOR: exports.COLOR.BLACK,
        SIZE: 10
    },
    GRID: {
        LINE_WIDTH: 1,
        GAP: 30
    }
};
exports.EVENT_LISTENER = {
    RESIZE: 'resize',
    MOUSE: {
        UP: 'mouseup',
        DOWN: 'mousedown',
        MOVE: 'mousemove'
    },
    KEY: {
        UP: 'keyup',
        DOWN: 'keydown'
    },
    TOUCH: {
        START: 'touchstart',
        END: 'touchend',
        MOVE: 'touchmove'
    }
};
