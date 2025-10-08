import React, { useEffect, useRef } from 'react';
import cubeObj from '../../assets/cube.obj?raw';
import {
  createAppHub,
  EditorHub,
  EditorRenderer as CoreEditorRenderer,
  ObjLoader,
} from '@planara/core';
import { DisplayMode } from '@planara/types';

const EditorRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CoreEditorRenderer | null>(null);
  const hub = useRef<EditorHub | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;

    const handleResize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width;
      canvas.height = height;

      rendererRef.current?.resize();
    };

    rendererRef.current = new CoreEditorRenderer(canvasRef.current);
    hub.current = createAppHub(rendererRef.current);
    handleResize();
    rendererRef.current.loop();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!rendererRef.current) return;

    const renderer = rendererRef.current!;
    const loader = new ObjLoader();

    const figure = loader.load(cubeObj);
    renderer.addFigure(figure);
  }, []);

  return (
    <>
      <button onClick={() => hub.current?.setDisplayMode(DisplayMode.Plane)}>Plane</button>
      <button onClick={() => hub.current?.setDisplayMode(DisplayMode.Wireframe)}>Wireframe</button>
      <div className="editor-renderer__container">
        <canvas ref={canvasRef} height={1000} width={1000} />
      </div>
    </>
  );
};

export default EditorRenderer;
