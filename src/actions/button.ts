// Core
import type { EditorHub } from '@planara/core';
// Types
import { DisplayMode, FigureType, SceneMode, SelectMode, ToolType } from '@planara/types';

/** Обработчики событий для кнопок */
export const makeEditorHandlers = (hub: EditorHub | null) => ({
  setPlaneMode: () => hub?.setDisplayMode(DisplayMode.Plane),
  setWireframeMode: () => hub?.setDisplayMode(DisplayMode.Wireframe),
  setTranslate: () => hub?.setToolMode(ToolType.Translate),
  setScale: () => hub?.setToolMode(ToolType.Scale),
  setRotate: () => hub?.setToolMode(ToolType.Rotate),
  setMeshSelect: () => hub?.setSelectMode(SelectMode.Mesh),
  setEdgeSelect: () => hub?.setSelectMode(SelectMode.Edge),
  setVertexSelect: () => hub?.setSelectMode(SelectMode.Vertex),
  addCube: () => hub?.addFigure(SceneMode.AddFigure, FigureType.Cube),
  addCylinder: () => hub?.addFigure(SceneMode.AddFigure, FigureType.Cylinder),
  addSphere: () => hub?.addFigure(SceneMode.AddFigure, FigureType.Sphere),
  deleteFigure: () => hub?.setSceneMode(SceneMode.DeleteFigure),
});
