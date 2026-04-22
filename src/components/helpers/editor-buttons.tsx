// Core
import { useEffect, useMemo, useState } from 'react';
import { type EditorHub, getAppHub } from '@planara/core';
// Actions
import { makeEditorHandlers } from '../../actions/button.ts';
import UiButton from '../button';

export const EditorButtons = () => {
  const [hub, setHub] = useState<EditorHub | null>(null);

  useEffect(() => {
    try {
      // Получение хаба
      const _hub = getAppHub();
      setHub(_hub);
    } catch (e) {
      console.error(e);
    }
  });

  const handlers = useMemo(() => makeEditorHandlers(hub), [hub]);

  return (
    <div className="editor-buttons__layout">
      <UiButton text="Plane" onClick={handlers.setPlaneMode} />
      <UiButton text="Wireframe" onClick={handlers.setWireframeMode} />
      <UiButton text="Mesh" onClick={handlers.setMeshSelect} />
      <UiButton text="Edge" onClick={handlers.setEdgeSelect} />
      <UiButton text="Vertex" onClick={handlers.setVertexSelect} />
      <UiButton text="Add Cube" onClick={handlers.addCube} />
      <UiButton text="Add Cylinder" onClick={handlers.addCylinder} />
      <UiButton text="Add Sphere" onClick={handlers.addSphere} />
      <UiButton text="Delete" onClick={handlers.deleteFigure} />
    </div>
  );
};

export default EditorButtons;
