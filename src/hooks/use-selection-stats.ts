// Core
import { useEffect, useState } from 'react';
// Types
import type { FigureTransform } from '@planara/types';
// Contexts
import { useEditorHub } from '../contexts/editor-hub-context';

export const useSelectionStats = (): FigureTransform | null => {
  const hub = useEditorHub();
  const [stats, setStats] = useState<FigureTransform | null>(null);

  useEffect(() => {
    if (!hub) {
      setStats(null);
      return;
    }

    setStats(hub.getSelectionStats());

    return hub.onSelectionStatsChange(() => {
      setStats(hub.getSelectionStats());
    });
  }, [hub]);

  return stats;
};
