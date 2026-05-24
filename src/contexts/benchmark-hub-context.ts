import { createContext, useContext } from 'react';
// Interfaces
import type { IBenchmarkApi } from '../interfaces/benchmark-api';

export interface IBenchmarkContext {
  hub: IBenchmarkApi | null;
  setHub: (hub: IBenchmarkApi | null) => void;
}

export const BenchmarkHubContext = createContext<IBenchmarkContext | null>(null);

export const useBenchmarkHubContext = (): IBenchmarkContext => {
  const context = useContext(BenchmarkHubContext);

  if (!context) {
    throw new Error('useBenchmarkHubContext must be used inside BenchmarkProvider');
  }

  return context;
};

export const useBenchmarkHub = (): IBenchmarkApi | null => {
  return useBenchmarkHubContext().hub;
};
