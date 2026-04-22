// Core
import React, { useEffect, useRef } from 'react';
import { createAppHub, EditorHub, type IResponse } from '@planara/core';
import { DisplayMode, FigureType, SceneMode, SelectMode, ToolType } from '@planara/types';
import UiButton from '../button';

export const EditorRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<EditorHub | null>(null);

  const handle = (execute: () => IResponse | null | undefined) => {
    return () => {
      const response = execute();

      if (response != null) {
        console.log(response.message);
      }
    };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;

    const handleResize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      rendererRef.current?.resizeRenderer();
    };

    rendererRef.current = createAppHub(canvas);
    handleResize();
    rendererRef.current?.start();

    window.addEventListener('resize', handleResize);

    return () => {
      rendererRef.current?.stop();
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div className="editor__layout">
      <div className="editor-buttons__layout">
        <UiButton
          onClick={handle(() => rendererRef.current?.setDisplayMode(DisplayMode.Plane))}
          text={'Plane'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setDisplayMode(DisplayMode.Wireframe))}
          text={'Wireframe'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setToolMode(ToolType.Translate))}
          text={'Translate'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setToolMode(ToolType.Scale))}
          text={'Scale'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setToolMode(ToolType.Rotate))}
          text={'Rotate'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setSelectMode(SelectMode.Mesh))}
          text={'Mesh'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setSelectMode(SelectMode.Face))}
          text={'Face'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setSelectMode(SelectMode.Edge))}
          text={'Edge'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setSelectMode(SelectMode.Vertex))}
          text={'Vertex'}
        />
        <UiButton
          onClick={handle(() =>
            rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Cube),
          )}
          text={'Add Cube'}
        />
        <UiButton
          onClick={handle(() =>
            rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Plane),
          )}
          text={'Add Plane'}
        />
        <UiButton
          onClick={handle(() =>
            rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Cylinder),
          )}
          text={'Add Cylinder'}
        />
        <UiButton
          onClick={handle(() =>
            rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.Sphere),
          )}
          text={'Add Sphere'}
        />
        <UiButton
          onClick={handle(() =>
            rendererRef.current?.addFigure(SceneMode.AddFigure, FigureType.UVSphere),
          )}
          text={'Add UVSphere'}
        />
        <UiButton
          onClick={handle(() => rendererRef.current?.setSceneMode(SceneMode.DeleteFigure))}
          text={'Delete'}
        />
      </div>
      <div className="editor-renderer__container">
        <canvas ref={canvasRef} height={1000} width={1000} />
      </div>
    </div>
  );
};

export default EditorRenderer;
