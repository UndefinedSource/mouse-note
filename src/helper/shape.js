exports.__esModule = true;
exports.SHAPE = void 0;
exports.SHAPE = {
    isEndXLeft: function (x1, x2) {
        return (x1 < x2) ? true : false;
    },
    isEndYDown: function (y1, y2) {
        return this.isEndXLeft(y1, y2);
    },
    getX: function (x1, x2) {
        return (x1 < x2) ? x1 : x2;
    },
    getY: function (y1, y2) {
        return this.getX(y1, y2);
    },
    getWidth: function (x1, x2) {
        return (x1 < x2) ? (x2 - x1) : (x1 - x2);
    },
    getHeight: function (y1, y2) {
        return this.getWidth(y1, y2);
    },
    getMinSideLength: function (startX, startY, endX, endY) {
        var width = Math.abs(endX - startX);
        var height = Math.abs(endY - startY);
        return width < height ? width : height;
    },
    getCenterPosition: function (startX, startY, endX, endY) {
        var x = (startX + endX) / 2;
        var y = (startY + endY) / 2;
        return { x: x, y: y };
    },
    getEllipse: function (startX, startY, endX, endY) {
        var _a = this.getCenterPosition(startX, startY, endX, endY), x = _a.x, y = _a.y;
        var radiusX = this.getWidth(startX, endX) / 2;
        var radiusY = this.getHeight(startY, endY) / 2;
        return { x: x, y: y, radiusX: radiusX, radiusY: radiusY };
    },
    // x, y are the center of circle
    getCircle: function (startX, startY, endX, endY) {
        var x = startX;
        var y = startY;
        var radius = this.getMinSideLength(startX, startY, endX, endY) / 2;
        var isEndXLeft = this.isEndXLeft(startX, endX);
        var isEndYDown = this.isEndYDown(startY, endY);
        if (isEndXLeft && isEndYDown) {
            x += radius;
            y += radius;
        }
        else if (!isEndXLeft && isEndYDown) {
            x -= radius;
            y += radius;
        }
        else if (isEndXLeft && !isEndYDown) {
            x += radius;
            y -= radius;
        }
        else {
            x -= radius;
            y -= radius;
        }
        return { x: x, y: y, radius: radius };
    },
    // get regular shape which draws from top left
    getRegularShape: function (startX, startY, endX, endY) {
        var sideLength = this.getMinSideLength(startX, startY, endX, endY);
        var x = startX;
        var y = startY;
        var isEndXLeft = this.isEndXLeft(startX, endX);
        var isEndYDown = this.isEndYDown(startY, endY);
        if (isEndXLeft && isEndYDown) {
            return { x: x, y: y, sideLength: sideLength };
        }
        else if (!isEndXLeft && isEndYDown) {
            x -= sideLength;
        }
        else if (isEndXLeft && !isEndYDown) {
            y -= sideLength;
        }
        else {
            x = startX - sideLength;
            y = startY - sideLength;
        }
        return { x: x, y: y, sideLength: sideLength };
    }
};
