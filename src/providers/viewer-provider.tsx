// Core
import React, { useMemo, useState } from 'react';
// Interfaces
import type { IViewerApi } from '../interfaces/viewer-api';
// Contexts
import { ViewerHubContext } from '../contexts/viewer-hub-context';

interface ViewerProviderProps {
  children: React.ReactNode;
}

export const ViewerProvider: React.FC<ViewerProviderProps> = ({ children }) => {
  const [hub, setHub] = useState<IViewerApi | null>(null);

  const value = useMemo(
    () => ({
      hub,
      setHub,
    }),
    [hub],
  );

  return <ViewerHubContext.Provider value={value}>{children}</ViewerHubContext.Provider>;
};

export default ViewerProvider;
