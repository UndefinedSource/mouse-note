import React, { useState, useEffect, useCallback, RefObject } from 'react';
import { APP_SETTING } from '../helper/constants';
import { Type } from '../types';

interface Props {
    ref: RefObject<HTMLCanvasElement>;
    panelRef: RefObject<HTMLDivElement>;
    width: number;
    height: number;
    hasGrid: boolean;
}

type Ref = HTMLCanvasElement;

export const Canvas: React.FC<Props> = React.memo(React.forwardRef<Ref, Props>((
    { width, height, hasGrid, panelRef }, ref) => {
    const [grid, setGrid] = useState<Type.Grid>({
        x: 0,
        y: 0,
        rows: 0,
        cols: 0,
        lineGap: APP_SETTING.GRID.GAP, 
    });

    const getPanelHeight = useCallback(() => {
        return (panelRef.current) ? panelRef.current.clientHeight : 0;
    }, [panelRef]);

    useEffect((): void => {
        setGrid(prevState => ({
            ...prevState,
            x: 0,
            y: getPanelHeight(),
            cols: window.innerWidth,
            rows: window.innerHeight,
        }));
    }, [getPanelHeight]);

    const createGrid = useCallback((): React.ReactElement[] => {
        let gridLines: React.ReactElement[] = [];
        
        for (let i = grid.y; i < grid.rows + grid.y; i += grid.lineGap) {
            gridLines.push(
                <span className='grid-line horizontal' key={`horizontal${i}`}
                    style={{ 'top': `${i}px` }}> 
                </span>
            );
        }
        for (let i = 0; i < grid.cols; i += grid.lineGap) {
            gridLines.push(
                <span className='grid-line vertical' key={`vertical${i}`}
                    style={{
                        'top': `${grid.y}px`,
                        'left': `${i}px`,
                        'height': `calc(100% - ${grid.y}px)`,
                    }}>
                </span>
            );
        }

        return gridLines;
    }, [grid]);

    useEffect((): void => {
        setGrid(prevState => ({
            ...prevState,
            x: 0,
            y: getPanelHeight(),
            cols: width,
            rows: height,
        }));
    }, [width, height, getPanelHeight]);

    return (
        <>
            <canvas id='canvas' ref={ref} width={width} height={height}/>
            {hasGrid && createGrid()}
        </>
    );
}));