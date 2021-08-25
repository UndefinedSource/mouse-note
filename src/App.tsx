import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cursor } from './components/Cursor';
import { Canvas } from './components/Canvas';
import { Panel } from './components/Panel';
import { useEventListener } from './hooks/useEventListener';
import { APP_SETTING, EVENT_LISTENER } from './helper/constants';
import { Type } from './types';
import './assets/scss/main.css';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [hasGrid, setHasGrid] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<Type.Canvas>({ width: 0, height: 0, });
  const [tool, setTool] = useState<Type.Tool>({
    color: APP_SETTING.TOOL.COLOR,
    mode: APP_SETTING.TOOL.MODE,
    size: APP_SETTING.TOOL.SIZE,
  });

  const getCanvasContext = (): CanvasRenderingContext2D | null => {
    return (canvasRef.current) ? canvasRef.current.getContext('2d') : null;
  };

  const getPanelHeight = (): number => {
    return (panelRef.current) ? panelRef.current.clientHeight : 0;
  };

  const changeToolColor = useCallback((value: string): void => {
    setTool(prevState => ({ ...prevState, color: value }));
  }, []);

  const changeToolMode = useCallback((value: string): void => {
    setTool(prevState => ({ ...prevState, mode: value }));
  }, []);

  const changeToolSize = useCallback((value: number): void => {
    setTool(prevState => ({ ...prevState, size: value }));
  }, []);

  const changeCanvasBackgroundColor = useCallback((value: string): void => {
    canvasRef.current!.style.backgroundColor = value;
  }, []);

  const clearCanvas = useCallback((): void => {
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvas]);

  const resize = useCallback((e): void => {
    setCanvas(prevState => ({
      ...prevState,
      width: e.currentTarget.outerWidth, // innerWidth doesn't work
      height: e.currentTarget.innerHeight - getPanelHeight(),
    }));
  }, []);

  const showGrid = (): void => {
    setHasGrid(!hasGrid);
  };

  const exportCanvasAsImage = (): void => {
    const ctx = canvasRef.current;
    if (!ctx) return;
    
    const image: string = ctx.toDataURL('image/png');
    const anchorElement: HTMLAnchorElement = document.createElement('a');

    anchorElement.download = 'image.png' as string;
    anchorElement.href = image as string;
    anchorElement.click();
  };

  useEventListener(EVENT_LISTENER.RESIZE, resize);

  useEffect(() => {
    setCanvas(prevState => ({
      ...prevState, 
      width: window.innerWidth,
      height: window.innerHeight - getPanelHeight(),
    }));
  }, []);

  return (
      <>
        <Cursor canvasRef={canvasRef} panelRef={panelRef} tool={tool}/>
        <Panel ref={panelRef} toolSize={tool.size}
          handleCanvasClear                 = {clearCanvas}
          handleCanvasBackgroundColorChange = {changeCanvasBackgroundColor}
          handleExportAsImage               = {exportCanvasAsImage}
          handleGridShow                    = {showGrid}
          handleToolColorChange             = {changeToolColor}
          handleToolModeChange              = {changeToolMode}
          handleToolSizeChange              = {changeToolSize} 
        />
        <Canvas ref={canvasRef} panelRef={panelRef}
          width={canvas.width} height={canvas.height} hasGrid={hasGrid}
        />
      </>
    );
};