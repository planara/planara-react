// Core
import { useEffect, useState } from 'react';
// Types
import type { BenchmarkMetrics } from '@planara/types';
// Contexts
import { useBenchmarkHub } from '../contexts/benchmark-hub-context';

export const useBenchmarkMetrics = (): BenchmarkMetrics | null => {
  const hub = useBenchmarkHub();
  const [metrics, setMetrics] = useState<BenchmarkMetrics | null>(null);

  useEffect(() => {
    if (!hub) {
      setMetrics(null);
      return;
    }

    return hub.subscribeMetrics((nextMetrics) => {
      setMetrics(nextMetrics);
    });
  }, [hub]);

  return metrics;
};
