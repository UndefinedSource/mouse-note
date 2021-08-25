export const CANVAS = {
    LINE_WIDTH: 1 as number,

    drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strokeColor: string, fillColor: string): void {
        ctx.beginPath();
        ctx.lineWidth = this.LINE_WIDTH;
        ctx.strokeStyle = strokeColor; 
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    },
    drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, radiusX: number, radiusY: number, strokeColor: string, fillColor: string): void {
        ctx.beginPath();
        ctx.lineWidth = this.LINE_WIDTH;
        ctx.strokeStyle = strokeColor; 
        ctx.ellipse(x, y, radiusX, radiusY, Math.PI, 0, Math.PI * 2, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    },
    drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, lineWidth: number, strokeColor: string): void {
        ctx.lineTo(x, y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth; 
        ctx.stroke();
    },
    drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, sideLen: number, fillColor: string): void {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, sideLen, sideLen);
    },
    drawRectangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
    },

    finishDraw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath(); // start new drawing
    },

    getHalfLineWidth(): number { 
        return this.LINE_WIDTH / 2;
    },
    getTriangleHypotenuse(x: number, y: number): number {
        return Math.sqrt((x * x) + (y * y));
    },

    SQUARE: {
        getX(x: number, toolSize: number): number {
            return x - (toolSize / 2);
        },
        getY(y: number, toolSize: number): number {
            return this.getX(y, toolSize);
        },
    },

    CIRCLE: {
        // arc total radius is determined by radius plus lineWidth
        getRadius(toolSize: number): number {
            const radius: number = (toolSize / 2) - CANVAS.LINE_WIDTH;
            return radius > 0 ? radius : CANVAS.LINE_WIDTH / 2; // prevent radius below or equal to 0
        },
    },
};