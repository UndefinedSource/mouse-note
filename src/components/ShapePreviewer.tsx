import React, { useCallback, useMemo } from 'react';
import { TOOL_MODE } from '../helper/constants';
import { SHAPE } from '../helper/shape';
import { STYLE } from '../helper/style';
import { Type } from '../types';

interface Props {
    dragPosition: Type.DragPosition;
    isShiftKeyOn: boolean;
    position: Type.Position;
    previewConditions: boolean[];
    regularShape: Type.RegularShape;
    toolColor: string;
    toolMode: string;
}

export const ShapePreviewer: React.FC<Props> = (
    { dragPosition, isShiftKeyOn, toolColor, toolMode, position, previewConditions, regularShape }) => {

    const getShapePreview = useCallback((): Type.Shape => {
        const x = SHAPE.getX(dragPosition.x, position.x);
        const y = SHAPE.getY(dragPosition.y, position.y);
        const width = SHAPE.getWidth(dragPosition.x, position.x);
        const height = SHAPE.getHeight(dragPosition.y, position.y);
        return { x, y, width, height };
    }, [dragPosition, position]);

    const rectanglePreviewStyle = useMemo((): Type.Style => {
        const { x, y, width, height } = getShapePreview();

        return STYLE.getShapePreview(x, y, width, height, toolColor, previewConditions);
    }, [toolColor, previewConditions, getShapePreview]);

    const ellipsePreviewStyle = useMemo((): Type.Style => {
        const { x, y, width, height } = getShapePreview();

        return STYLE.getCirclePreview(x, y, width, height, toolColor, previewConditions);
    }, [toolColor, previewConditions, getShapePreview]);

    const squarePreviewStyle = useMemo((): Type.Style => {
        const { x, y, sideLength } = regularShape;

        return STYLE.getShapePreview(x, y, sideLength, sideLength, toolColor, previewConditions);
    }, [toolColor, regularShape, previewConditions]);;

    const circlePreviewStyle = useMemo((): Type.Style => {
        const { x, y, sideLength } = regularShape;

        return STYLE.getCirclePreview(x, y, sideLength, sideLength, toolColor, previewConditions);
    }, [toolColor, regularShape, previewConditions]);

    const getShapePreviewStyle = (): Type.Style => {
        switch (toolMode) {
            case TOOL_MODE.SHAPE.RECT:
                return (isShiftKeyOn) ? squarePreviewStyle : rectanglePreviewStyle;
            case TOOL_MODE.SHAPE.ELLIPSE:
                return (isShiftKeyOn) ? circlePreviewStyle : ellipsePreviewStyle;
            default:
                break;
        }
        
        return { };
    };

    return (
        <div className='shape-previewer' style={getShapePreviewStyle()}/>
    );
};