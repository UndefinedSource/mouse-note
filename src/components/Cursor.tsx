import React, { useState, useEffect, useCallback } from 'react';
import { ShapePreviewer } from './ShapePreviewer';
import { TOOL_MODE, CURSOR_CLASS, KEYBOARD_KEY, EVENT_LISTENER } from '../helper/constants';
import { CANVAS } from '../helper/canvas';
import { SHAPE } from '../helper/shape';
import { STYLE } from '../helper/style';
import { Type } from '../types';
import { useEventListener } from '../hooks/useEventListener';

interface Props {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    panelRef: React.RefObject<HTMLDivElement>;
    tool: Type.Tool;
}

export const Cursor: React.FC<Props> = React.memo(({ canvasRef, panelRef, tool }) => {
    const [position, setPosition] = useState<Type.Position>({ x: 0, y: 0, });
    const [dragPosition, setDragPosition] = useState<Type.DragPosition>({ x: 0, y: 0, });
    const [drawable, setDrawable] = useState<boolean>(false);
    const [isShiftKeyOn, setIsShiftKeyOn] = useState<boolean>(false);

    const getCursorStyle = (): Type.Style => {
        switch (tool.mode) {
            case TOOL_MODE.CIRCLE:
                return STYLE.getCircle(position.x, position.y, tool.size, tool.color);
            case TOOL_MODE.SQUARE:
                return STYLE.getSquare(position.x, position.y, tool.size, tool.color);
        }
        
        return STYLE.getPen(position.x, position.y, tool.size, tool.color);
    };

    const getCanvasContext = useCallback((): CanvasRenderingContext2D | null => {
        return canvasRef.current ? canvasRef.current.getContext('2d') : null;
    }, [canvasRef]);

    const getPanelHeight = useCallback((): number => {
        return panelRef.current ? panelRef.current.clientHeight : 0;
    }, [panelRef]);

    const isShapeMode = useCallback((): boolean => {
        return Object.values(TOOL_MODE.SHAPE).some(mode => mode === tool.mode);
    }, [tool.mode]);

    const getDragPosition = useCallback((): Type.DragPosition => {
        return { x: dragPosition.x, y: dragPosition.y };
    }, [dragPosition]);

    const getPosition = useCallback((): Type.Position => {
        return { x: position.x, y: position.y };
    }, [position]);

    const getPreviewConditions = useCallback((): boolean[] => {
        return [drawable, isShapeMode()];
    }, [drawable, isShapeMode]);

    const getRegularShape = useCallback((): Type.RegularShape => {
        return SHAPE.getRegularShape(dragPosition.x, dragPosition.y, position.x, position.y);
    }, [position, dragPosition]);

    const getShapeEllipse = useCallback((): Type.Ellipse => {
        return SHAPE.getEllipse(dragPosition.x, dragPosition.y, position.x, position.y);
    }, [position, dragPosition]);

    const getShapeCircle = useCallback((): Type.Circle => {
        return SHAPE.getCircle(dragPosition.x, dragPosition.y, position.x, position.y);
    }, [position, dragPosition]);

    const getTouchPosition = (e: TouchEvent): Type.Position => {
        const x = e.targetTouches[0].clientX;
        const y = e.targetTouches[0].clientY;
        return { x, y };
    };

    const drawShapeRectangle = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const y = dragPosition.y - getPanelHeight();
        const width = position.x - dragPosition.x;
        const height = position.y - dragPosition.y;

        CANVAS.drawRectangle(ctx, dragPosition.x, y, width, height, tool.color);
    }, [position, dragPosition, tool.color, getCanvasContext, getPanelHeight]);

    const drawShapeSquare = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const { x, y, sideLength } = getRegularShape();
        CANVAS.drawSquare(ctx, x, y - getPanelHeight(), sideLength, tool.color);
    }, [tool.color, getCanvasContext, getPanelHeight, getRegularShape]);

    const drawShapeEllipse = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const { x, y, radiusX, radiusY } = getShapeEllipse();
        CANVAS.drawEllipse(ctx, x, y - getPanelHeight(), radiusX, radiusY, tool.color, tool.color);
    }, [tool.color, getCanvasContext, getPanelHeight, getShapeEllipse]);

    const drawShapeCircle = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const { x, y, radius } = getShapeCircle();
        CANVAS.drawCircle(ctx, x, y - getPanelHeight(), radius, tool.color, tool.color);
    }, [tool.color, getCanvasContext, getPanelHeight, getShapeCircle]);

    const drawPen = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const y = position.y - getPanelHeight();
        CANVAS.drawLine(ctx, position.x, y, tool.size, tool.color);
    }, [position, tool.size, tool.color, getCanvasContext, getPanelHeight]);

    const drawCircle = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const y = position.y - getPanelHeight();
        const radius = CANVAS.CIRCLE.getRadius(tool.size);
        CANVAS.drawCircle(ctx, position.x, y, radius, tool.color, tool.color);
    }, [position, tool.color, tool.size, getCanvasContext, getPanelHeight]);

    const drawSquare = useCallback((): void => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const x = CANVAS.SQUARE.getX(position.x, tool.size);
        const y = CANVAS.SQUARE.getY(position.y, tool.size) - getPanelHeight();
        CANVAS.drawSquare(ctx, x, y, tool.size, tool.color);
    }, [position, tool.color, tool.size, getCanvasContext, getPanelHeight]);

    const draw = useCallback((): void => {
        const { PEN, CIRCLE, SQUARE } = TOOL_MODE;
        switch (tool.mode) {
            case PEN:
                drawPen();
                break;
            case CIRCLE:
                drawCircle();
                break;
            case SQUARE:
                drawSquare();
                break;
            default:
                break;
        }
    }, [tool.mode, drawPen, drawCircle, drawSquare]);

    const updatePositionState = useCallback((x: number, y: number) => {
        setPosition((prevState : any) => ({
            ...prevState,
            x: x, 
            y: y,
        }));
    }, []);

    const updateDragPositionState = useCallback((x: number, y: number) => {
        setDragPosition((prevState : any) => ({
            ...prevState,
            x: x, 
            y: y,
        }));
    }, []);

    const mouseUp = useCallback((): void => {
        setDrawable(false);
        /* 
            since canvas can't have draggable attribute, onDrag doesn't work,
            therefore use mouseUp and mouseDown to simulate drag to draw shapes
        */
        switch (tool.mode) {
            case TOOL_MODE.SHAPE.RECT:
                (isShiftKeyOn) ? drawShapeSquare() : drawShapeRectangle();
                break;
            case TOOL_MODE.SHAPE.ELLIPSE:
                (isShiftKeyOn) ? drawShapeCircle() : drawShapeEllipse();
                break;
            default:
                break;
        }

        const ctx = getCanvasContext();
        if (!ctx) return;

        CANVAS.finishDraw(ctx);
    }, [tool.mode, isShiftKeyOn, drawShapeRectangle, drawShapeSquare, drawShapeEllipse, drawShapeCircle , getCanvasContext]);

    const mouseDown = useCallback((): void => {
        setDrawable(true);

        if (isShapeMode()) {
            updateDragPositionState(position.x, position.y);
        }
    }, [position, isShapeMode, updateDragPositionState]);

    const mouseMove = useCallback((e: MouseEvent): void => {
        updatePositionState(e.x, e.y);
    }, [updatePositionState]);

    const touchStart = useCallback((e: TouchEvent): void => {
        const { x, y } = getTouchPosition(e);

        updatePositionState(x, y);

        if (isShapeMode()) {
            updateDragPositionState(x, y);
        }
    }, [isShapeMode, updatePositionState, updateDragPositionState]);

    const touchMove = useCallback((e: TouchEvent): void => {
        const { x, y } = getTouchPosition(e);

        setDrawable(true);
        updatePositionState(x, y);
    }, [updatePositionState]);

    const keyUp = useCallback((): void => {
        setIsShiftKeyOn(false);
    }, []);

    const keyDown = useCallback((e: KeyboardEvent): void => {
        setIsShiftKeyOn(e.key === KEYBOARD_KEY.SHIFT);
    }, []);

    useEffect((): void => {
        if (drawable) {
            draw();
        }
    }, [drawable, draw]);

    useEventListener(EVENT_LISTENER.MOUSE.UP, mouseUp);
    useEventListener(EVENT_LISTENER.MOUSE.DOWN, mouseDown);
    useEventListener(EVENT_LISTENER.MOUSE.MOVE, mouseMove);

    useEventListener(EVENT_LISTENER.KEY.UP, keyUp);
    useEventListener(EVENT_LISTENER.KEY.DOWN, keyDown);

    useEventListener(EVENT_LISTENER.TOUCH.START, touchStart);
    useEventListener(EVENT_LISTENER.TOUCH.END, mouseUp);
    useEventListener(EVENT_LISTENER.TOUCH.MOVE, touchMove);

    return (
        <>
            <div id='cursor' className={CURSOR_CLASS[tool.mode]} style={getCursorStyle()}/>
            <ShapePreviewer toolMode={tool.mode} toolColor={tool.color} isShiftKeyOn={isShiftKeyOn} 
                dragPosition      = {getDragPosition()}
                position          = {getPosition()}
                previewConditions = {getPreviewConditions()}
                regularShape      = {getRegularShape()}
            />
        </>
    );
});