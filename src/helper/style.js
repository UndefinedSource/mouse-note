var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.STYLE = void 0;
exports.STYLE = {
    getPosition: function (x, y) {
        return {
            '--x': x + "px",
            '--y': y + "px"
        };
    },
    getWidthAndHeight: function (width, height) {
        return {
            '--width': width + "px",
            '--height': height + "px"
        };
    },
    getPen: function (x, y, size, color) {
        var halfSize = size / 2;
        return __assign(__assign({}, this.getPosition(x - halfSize, y)), { '--crosshairVerticalX': halfSize + "px", '--crosshairVerticalY': -halfSize + "px", '--size': size + "px", '--color': "" + color });
    },
    getCircle: function (x, y, size, color) {
        var halfSize = size / 2;
        return __assign(__assign({}, this.getPosition(x - halfSize, y - halfSize)), { '--size': size + "px", '--color': "" + color });
    },
    getSquare: function (x, y, size, color) {
        return this.getCircle(x, y, size, color);
    },
    getShapePreview: function (x, y, width, height, backgroundColor, displayConditions) {
        var showDisplay = displayConditions.every(function (cond) { return cond === true; });
        return __assign(__assign(__assign({}, this.getPosition(x, y)), this.getWidthAndHeight(width, height)), { '--backgroundColor': "" + backgroundColor, '--display': "" + (showDisplay ? 'inline' : 'none') });
    },
    getCirclePreview: function (x, y, width, height, backgroundColor, displayConditions) {
        var style = this.getShapePreview(x, y, width, height, backgroundColor, displayConditions);
        style['borderRadius'] = '50%';
        return style;
    }
};
