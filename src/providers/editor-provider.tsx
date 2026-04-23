import React, { useMemo, useState } from 'react';
import type { IEditorApi } from '../interfaces/editor-api';
import { EditorHubContext } from '../contexts/editor-hub-context';

interface EditorProviderProps {
  children: React.ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [hub, setHub] = useState<IEditorApi | null>(null);

  const value = useMemo(
    () => ({
      hub,
      setHub,
    }),
    [hub],
  );

  return <EditorHubContext.Provider value={value}>{children}</EditorHubContext.Provider>;
};

export default EditorProvider;
