exports.__esModule = true;
exports.CANVAS = void 0;
exports.CANVAS = {
    LINE_WIDTH: 1,
    drawCircle: function (ctx, x, y, radius, strokeColor, fillColor) {
        ctx.beginPath();
        ctx.lineWidth = this.LINE_WIDTH;
        ctx.strokeStyle = strokeColor;
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    },
    drawEllipse: function (ctx, x, y, radiusX, radiusY, strokeColor, fillColor) {
        ctx.beginPath();
        ctx.lineWidth = this.LINE_WIDTH;
        ctx.strokeStyle = strokeColor;
        ctx.ellipse(x, y, radiusX, radiusY, Math.PI, 0, Math.PI * 2, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    },
    drawLine: function (ctx, x, y, lineWidth, strokeColor) {
        ctx.lineTo(x, y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    },
    drawSquare: function (ctx, x, y, sideLen, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, sideLen, sideLen);
    },
    drawRectangle: function (ctx, x, y, width, height, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
    },
    finishDraw: function (ctx) {
        ctx.beginPath(); // start new drawing
    },
    getHalfLineWidth: function () {
        return this.LINE_WIDTH / 2;
    },
    getTriangleHypotenuse: function (x, y) {
        return Math.sqrt((x * x) + (y * y));
    },
    SQUARE: {
        getX: function (x, toolSize) {
            return x - (toolSize / 2);
        },
        getY: function (y, toolSize) {
            return this.getX(y, toolSize);
        }
    },
    CIRCLE: {
        // arc total radius is determined by radius plus lineWidth
        getRadius: function (toolSize) {
            var radius = (toolSize / 2) - exports.CANVAS.LINE_WIDTH;
            return radius > 0 ? radius : exports.CANVAS.LINE_WIDTH / 2; // prevent radius below or equal to 0
        }
    }
};
