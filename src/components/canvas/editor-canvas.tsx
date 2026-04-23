import React, { useEffect, useRef } from 'react';
import { createAppHub } from '@planara/core';
import type { IEditorApi } from '../../interfaces/editor-api';
import { useEditorHubContext } from '../../contexts/editor-hub-context';

interface EditorCanvasProps {
  className?: string;
  width?: number;
  height?: number;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  className,
  width = 1000,
  height = 1000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHub } = useEditorHubContext();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const editorHub = createAppHub(canvas);

    const api: IEditorApi = {
      setDisplayMode: (mode) => editorHub.setDisplayMode(mode),
      setSceneMode: (mode) => editorHub.setSceneMode(mode),
      setSelectMode: (mode) => editorHub.setSelectMode(mode),
      setToolMode: (mode) => editorHub.setToolMode(mode),
      addFigure: (mode, figure) => editorHub.addFigure(mode, figure),

      resizeRenderer: () => editorHub.resizeRenderer(),
      start: () => editorHub.start(),
      stop: () => editorHub.stop(),

      getSelectionStats: () => editorHub.getSelectionStats(),
      onSelectionStatsChange: (listener) => editorHub.onSelectionStatsChange(listener),
    };

    setHub(api);

    const handleResize = () => {
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;

      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;

      api.resizeRenderer();
    };

    handleResize();
    api.start();
    window.addEventListener('resize', handleResize);

    return () => {
      api.stop();
      window.removeEventListener('resize', handleResize);
      editorHub.dispose();
      setHub(null);
    };
  }, [setHub]);

  return <canvas ref={canvasRef} className={className} width={width} height={height} />;
};

export default EditorCanvas;
