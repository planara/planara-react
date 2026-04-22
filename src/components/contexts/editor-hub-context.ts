import { createContext, useContext } from 'react';
import { EditorHub } from '@planara/core';

export const EditorHubContext = createContext<EditorHub | null>(null);
export const useEditorHub = () => useContext(EditorHubContext);
