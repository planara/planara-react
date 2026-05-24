import type {
  BenchmarkConfig,
  BenchmarkReport,
  BenchmarkRunResult,
  BenchmarkMetrics,
} from '@planara/types';

export type MetricsListener = (metrics: BenchmarkMetrics | null) => void;

export interface IBenchmarkApi {
  run: (config: BenchmarkConfig) => BenchmarkRunResult;

  getReport: () => BenchmarkReport;

  subscribeMetrics: (listener: MetricsListener) => () => void;

  resizeRenderer: () => void;
  start: () => void;
  stop: () => void;
}
