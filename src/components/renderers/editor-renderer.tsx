import React, { useEffect, useRef } from 'react';
// import cubeObj from '../../assets/cube.obj?raw';
import { createAppHub, EditorHub } from '@planara/core';
import { DisplayMode, FigureType, SceneMode, SelectMode, ToolType } from '@planara/types';

const EditorRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<EditorHub | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;

    const handleResize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width;
      canvas.height = height;

      rendererRef.current?.resizeRenderer();
    };

    rendererRef.current = createAppHub(canvas);
    handleResize();
    rendererRef.current?.updateRenderer();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, []);

  // useEffect(() => {
  //   if (!rendererRef.current) return;
  //
  //   const renderer = rendererRef.current!;
  //   const loader = new ObjLoader();
  //
  //   const figure = loader.load(cubeObj);
  //   renderer.addFigure(figure);
  // }, []);

  return (
    <>
      <button onClick={() => rendererRef.current?.setDisplayMode(DisplayMode.Plane)}>Plane</button>
      <button onClick={() => rendererRef.current?.setDisplayMode(DisplayMode.Wireframe)}>
        Wireframe
      </button>
      <button onClick={() => rendererRef.current?.setToolMode(ToolType.Translate)}>
        Translate
      </button>
      <button onClick={() => rendererRef.current?.setToolMode(ToolType.Scale)}>Scale</button>
      <button onClick={() => rendererRef.current?.setToolMode(ToolType.Rotate)}>Rotate</button>
      <button onClick={() => rendererRef.current?.setSelectMode(SelectMode.Mesh)}>Mesh</button>
      <button onClick={() => rendererRef.current?.setSelectMode(SelectMode.Edge)}>Edge</button>
      <button onClick={() => rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Cube)}>
        Add Cube
      </button>
      <button onClick={() => rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Plane)}>
        Add Plane
      </button>
      <button
        onClick={() => rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Cylinder)}
      >
        Add Cylinder
      </button>
      <button
        onClick={() => rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Sphere)}
      >
        Add Sphere
      </button>
      <button
        onClick={() => rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.UVSphere)}
      >
        Add UVSphere
      </button>
      <button onClick={() => rendererRef.current?.setSceneMode(SceneMode.DeleteFigure)}>
        Delete
      </button>
      <div className="editor-renderer__container">
        <canvas ref={canvasRef} height={1000} width={1000} />
      </div>
    </>
  );
};

export default EditorRenderer;
