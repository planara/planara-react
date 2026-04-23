import { useEffect, useState } from 'react';
import type { FigureTransform } from '@planara/types';
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
