import React, { RefObject, useCallback, useMemo, useRef } from 'react';
import { COLOR as COLOR_CONVERTER } from '../helper/color';
import { APP_SETTING, COLOR, TOOL_MODE, EVENT_LISTENER } from '../helper/constants';
import { BackgroundPicker, Grid, TrashCan, Save } from './Functions';
import { useEventListener } from '../hooks/useEventListener';
import { REGREX } from '../helper/regrex';

interface Props {
    ref: RefObject<HTMLDivElement>;
    toolSize: number;
    handleCanvasClear: Function;
    handleCanvasBackgroundColorChange: Function;
    handleExportAsImage: Function;
    handleToolColorChange: Function;
    handleToolModeChange: Function;        
    handleToolSizeChange: Function; 
    handleGridShow: Function;
}

type Ref = HTMLDivElement;

export const Panel: React.FC<Props> = React.memo(React.forwardRef<Ref, Props>((
    { toolSize, handleCanvasBackgroundColorChange, handleCanvasClear,
    handleExportAsImage, handleGridShow, handleToolColorChange,
    handleToolModeChange, handleToolSizeChange, }, ref) => {

    const toolSizeRef = useRef<HTMLInputElement>(null);
    const canvasBackgroundPickerRef = useRef<HTMLInputElement>(null);

    const colors = useMemo((): string[] => {
        return ([
            COLOR.BLACK,
            COLOR.WHITE,
            COLOR.RED,
            COLOR.GREEN,
            COLOR.BLUE,
        ]);
    }, []);

    const modes = useMemo(() => {
        return ([
            { className: 'pen', name: TOOL_MODE.PEN },
            { className: 'circle', name: TOOL_MODE.CIRCLE },
            { className: 'square', name: TOOL_MODE.SQUARE },
        ]);
    }, []);

    const shapeModes = useMemo(() => {
        return ([
            { className: 'ellipse', name: TOOL_MODE.SHAPE.ELLIPSE },
            { className: 'rect', name: TOOL_MODE.SHAPE.RECT },
        ]);
    }, []);

    const keyDown = useCallback((e: KeyboardEvent): void => {
        if (colors.length === 0) {
            return;
        }
        const colorNum: RegExp = REGREX.getRegrexNumberRange(1, colors.length);
        // passing color element at out of boundary index casues vertical pen cursor to disappear
        if (e.key.match(colorNum)) {
            handleToolColorChange(colors[Number(e.key) - 1]);
        }
    }, [handleToolColorChange, colors]);

    const changeToolColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const color: string = COLOR_CONVERTER.convertHexToRgb(e.currentTarget.value);
        handleToolColorChange(color);
    };
    
    const changeBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const color: string = COLOR_CONVERTER.convertHexToRgb(e.currentTarget.value);
        handleCanvasBackgroundColorChange(color);
    };

    useEventListener(EVENT_LISTENER.KEY.DOWN, keyDown);

    return (
        <div id='panel' ref={ref}> 
            <div className='tool-mode'>
                {modes.map((mode) => 
                    <button key={`tool_${mode.name}`} className={`icon ${mode.className}`} 
                        onClick={() => handleToolModeChange(mode.name)}
                    />
                )}
            </div>
            <div className='tool-size'>
                <label className='lbl-size'>{toolSize}</label>
                <input type='range' className='ipt-size' id='mouseRadius' min='1' max='100' 
                    ref={toolSizeRef} defaultValue={toolSize}
                    onChange={(e) => handleToolSizeChange(e.currentTarget.value)}
                />
            </div>
            <div className='color-palette'>
                {colors.map(color => 
                    <button key={color} className='btn color' 
                        style={{backgroundColor: color}}
                        onClick={() => handleToolColorChange(color)}
                    />
                )}
                <input type='color' className='tool-color-picker' 
                    defaultValue={COLOR_CONVERTER.convertRgbToHex(COLOR.WHITE)}
                    onChange={(e) => changeToolColor(e)}
                />
            </div>
           <div className='features'>
                {shapeModes.map((mode) => 
                        <button key={`feature_${mode.name}`} className={`icon ${mode.className}`} 
                            onClick={() => handleToolModeChange(mode.name)}
                        />
                )}
                <BackgroundPicker ref={canvasBackgroundPickerRef}
                    defaultValue={COLOR_CONVERTER.convertRgbToHex(APP_SETTING.CANVAS.BACKGROUND_COLOR)}
                    handleBackgroundColorChange={changeBackgroundColor}
                />
                <Grid handleOnClick={() => handleGridShow()}/>
                <TrashCan handleOnClick={() => handleCanvasClear()}/>
                <Save handleOnClick={() => handleExportAsImage()}/>
            </div>
        </div>
    );
}));