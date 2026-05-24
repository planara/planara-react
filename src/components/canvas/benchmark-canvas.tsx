import React, { useEffect, useRef } from 'react';
// Core
import { createBenchmarkHub } from '@planara/core';
// Interfaces
import type { IBenchmarkApi } from '../../interfaces/benchmark-api';
// Contexts
import { useBenchmarkHubContext } from '../../contexts/benchmark-hub-context';
// Types
import type { RendererConfigInput } from '@planara/types';

interface BenchmarkCanvasProps {
  className?: string;
  width?: number;
  height?: number;
  config?: RendererConfigInput;
}

export const BenchmarkCanvas: React.FC<BenchmarkCanvasProps> = ({
  className,
  width = 1000,
  height = 1000,
  config,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setHub } = useBenchmarkHubContext();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const benchmarkHub = createBenchmarkHub(canvas, config);

    const api: IBenchmarkApi = {
      run: (benchmarkConfig) => benchmarkHub.run(benchmarkConfig),
      getReport: () => benchmarkHub.getReport(),
      subscribeMetrics: (listener) => benchmarkHub.subscribeMetrics(listener),

      resizeRenderer: () => benchmarkHub.resizeRenderer(),
      start: () => benchmarkHub.start(),
      stop: () => benchmarkHub.stop(),
    };

    setHub(api);

    const handleResize = () => {
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;

      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;

      api.resizeRenderer();
    };

    handleResize();
    api.start();

    window.addEventListener('resize', handleResize);

    return () => {
      api.stop();
      window.removeEventListener('resize', handleResize);

      benchmarkHub.dispose();
      setHub(null);
    };
  }, [setHub, config]);

  return <canvas ref={canvasRef} className={className} width={width} height={height} />;
};

export default BenchmarkCanvas;
