// Core
import React, { useMemo, useState } from 'react';
// Interfaces
import type { IBenchmarkApi } from '../interfaces/benchmark-api';
// Contexts
import { BenchmarkHubContext } from '../contexts/benchmark-hub-context';

interface BenchmarkProviderProps {
  children: React.ReactNode;
}

export const BenchmarkProvider: React.FC<BenchmarkProviderProps> = ({ children }) => {
  const [hub, setHub] = useState<IBenchmarkApi | null>(null);

  const value = useMemo(
    () => ({
      hub,
      setHub,
    }),
    [hub],
  );

  return <BenchmarkHubContext.Provider value={value}>{children}</BenchmarkHubContext.Provider>;
};

export default BenchmarkProvider;
