// Core
import { useEffect, useState } from 'react';
// Types
import type { EditorHub } from '@planara/core';
import type { FigureTransform } from '@planara/types';

export const useSelectionStats = (hub: EditorHub | null): FigureTransform | null => {
  const [stats, setStats] = useState<FigureTransform | null>(null);

  useEffect(() => {
    if (!hub) {
      setStats(null);
      return;
    }

    // начальный снимок
    setStats(hub.getSelectionStats());

    return hub.onSelectionStatsChange(() => {
      const next = hub.getSelectionStats();
      setStats(next);
    });
  }, [hub]);

  return stats;
};
