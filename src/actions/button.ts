// Types
import type { IEditorApi } from '../interfaces/editor-api';
import { DisplayMode, FigureType, SelectMode, ToolType } from '@planara/types';
import type { IViewerApi } from '../interfaces/viewer-api.ts';

/** Обработчики событий для кнопок редактора. */
export const makeEditorHandlers = (hub: IEditorApi | null) => ({
  setPlaneMode: () => hub?.setDisplayMode(DisplayMode.Plane),
  setWireframeMode: () => hub?.setDisplayMode(DisplayMode.Wireframe),

  setTranslate: () => hub?.setToolMode(ToolType.Translate),
  setScale: () => hub?.setToolMode(ToolType.Scale),
  setRotate: () => hub?.setToolMode(ToolType.Rotate),

  setMeshSelect: () => hub?.setSelectMode(SelectMode.Mesh),
  setEdgeSelect: () => hub?.setSelectMode(SelectMode.Edge),
  setVertexSelect: () => hub?.setSelectMode(SelectMode.Vertex),
  setFaceSelect: () => hub?.setSelectMode(SelectMode.Face),

  addPlane: () => hub?.addFigure(FigureType.Plane),
  addCube: () => hub?.addFigure(FigureType.Cube),
  addSphere: () => hub?.addFigure(FigureType.Sphere),
  addUVSphere: () => hub?.addFigure(FigureType.UVSphere),
  addIcosphere: () => hub?.addFigure(FigureType.Icosphere),
  addCylinder: () => hub?.addFigure(FigureType.Cylinder),
  addCone: () => hub?.addFigure(FigureType.Cone),
  addPyramid: () => hub?.addFigure(FigureType.Pyramid),
  addTetrahedron: () => hub?.addFigure(FigureType.Tetrahedron),
  addOctahedron: () => hub?.addFigure(FigureType.Octahedron),
  addDodecahedron: () => hub?.addFigure(FigureType.Dodecahedron),
  addTorus: () => hub?.addFigure(FigureType.Torus),
  addTorusKnot: () => hub?.addFigure(FigureType.TorusKnot),
  addCircle: () => hub?.addFigure(FigureType.Circle),
  addRing: () => hub?.addFigure(FigureType.Ring),
  addCapsule: () => hub?.addFigure(FigureType.Capsule),

  exportScene: () => hub?.exportScene(),
  loadScene: (content: string) => hub?.loadScene(content),
  loadFigure: (content: string) => hub?.loadFigure(content),
  deleteFigure: () => hub?.deleteFigure(),
});

/** Обработчики событий для кнопок вьювера. */
export const makeViewerHandlers = (hub: IViewerApi | null) => ({
  addPlane: () => hub?.addFigure(FigureType.Plane),
  addCube: () => hub?.addFigure(FigureType.Cube),
  addSphere: () => hub?.addFigure(FigureType.Sphere),
  addUVSphere: () => hub?.addFigure(FigureType.UVSphere),
  addIcosphere: () => hub?.addFigure(FigureType.Icosphere),
  addCylinder: () => hub?.addFigure(FigureType.Cylinder),
  addCone: () => hub?.addFigure(FigureType.Cone),
  addPyramid: () => hub?.addFigure(FigureType.Pyramid),
  addTetrahedron: () => hub?.addFigure(FigureType.Tetrahedron),
  addOctahedron: () => hub?.addFigure(FigureType.Octahedron),
  addDodecahedron: () => hub?.addFigure(FigureType.Dodecahedron),
  addTorus: () => hub?.addFigure(FigureType.Torus),
  addTorusKnot: () => hub?.addFigure(FigureType.TorusKnot),
  addCircle: () => hub?.addFigure(FigureType.Circle),
  addRing: () => hub?.addFigure(FigureType.Ring),
  addCapsule: () => hub?.addFigure(FigureType.Capsule),

  loadScene: (content: string) => hub?.loadScene(content),
  loadFigure: (content: string) => hub?.loadFigure(content),
});
