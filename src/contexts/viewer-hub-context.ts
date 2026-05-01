// Core
import { createContext, useContext } from 'react';
// Interfaces
import type { IViewerApi } from '../interfaces/viewer-api';

export interface IViewerContext {
  hub: IViewerApi | null;
  setHub: (hub: IViewerApi | null) => void;
}

export const ViewerHubContext = createContext<IViewerContext | null>(null);

export const useViewerHubContext = (): IViewerContext => {
  const context = useContext(ViewerHubContext);

  if (!context) {
    throw new Error('useViewerHubContext must be used inside ViewerProvider');
  }

  return context;
};

export const useViewerHub = (): IViewerApi | null => {
  return useViewerHubContext().hub;
};
