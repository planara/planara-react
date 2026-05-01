// Core
import React, { useEffect, useRef } from 'react';
import { createViewerHub } from '@planara/core';
// Interfaces
import type { IViewerApi } from '../../interfaces/viewer-api';
// Contexts
import { useViewerHubContext } from '../../contexts/viewer-hub-context';
// Types
import type { RendererConfigInput } from '@planara/types';

interface ViewerCanvasProps {
  className?: string;
  width?: number;
  height?: number;
  config?: RendererConfigInput;
}

export const ViewerCanvas: React.FC<ViewerCanvasProps> = ({
  className,
  width = 1000,
  height = 1000,
  config,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHub } = useViewerHubContext();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const editorHub = createViewerHub(canvas, config);

    const api: IViewerApi = {
      addFigure: (figure) => editorHub.addFigure(figure),
      loadFigure: (content) => editorHub.loadFigure(content),
      loadScene: (content) => editorHub.loadScene(content),

      resizeRenderer: () => editorHub.resizeRenderer(),
      start: () => editorHub.start(),
      stop: () => editorHub.stop(),
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

export default ViewerCanvas;
