import React, { useEffect, useRef } from 'react';
import cubeObj from '../../assets/cube.obj?raw';
import { EditorRenderer as CoreEditorRenderer, ObjLoader } from '@planara/core';

const EditorRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CoreEditorRenderer | null>(null);

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
    handleResize();
    rendererRef.current.loop();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      rendererRef.current = null;
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
      <div className="editor-renderer__container">
        <canvas ref={canvasRef} height={1000} width={1000} />
      </div>
    </>
  );
};

export default EditorRenderer;
