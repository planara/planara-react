// Core
import { createContext, useContext } from 'react';
// Interfaces
import type { IEditorApi } from '../interfaces/editor-api';

export interface IEditorContext {
  hub: IEditorApi | null;
  setHub: (hub: IEditorApi | null) => void;
}

export const EditorHubContext = createContext<IEditorContext | null>(null);

export const useEditorHubContext = (): IEditorContext => {
  const context = useContext(EditorHubContext);

  if (!context) {
    throw new Error('useEditorHubContext must be used inside EditorProvider');
  }

  return context;
};

export const useEditorHub = (): IEditorApi | null => {
  return useEditorHubContext().hub;
};
