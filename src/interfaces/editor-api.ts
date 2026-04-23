// Types
import type { IResponse } from '@planara/core';
import type {
  DisplayMode,
  FigureTransform,
  FigureType,
  SceneMode,
  SelectMode,
  ToolType,
} from '@planara/types';

/**
 * Публичный API редактора для React-пакета.
 *
 * @remarks
 * Используется компонентами, хуками и хендлерами внутри `@planara/react`,
 * не раскрывая напрямую реализацию `EditorHub` из `@planara/core`.
 *
 * @public
 * @interface
 */
export interface IEditorApi {
  setDisplayMode(mode: DisplayMode): IResponse | null;
  setSceneMode(mode: SceneMode): IResponse | null;
  setSelectMode(mode: SelectMode): IResponse | null;
  setToolMode(mode: ToolType): IResponse | null;
  addFigure(mode: SceneMode, figure: FigureType): IResponse | null;

  resizeRenderer(): void;
  start(): void;
  stop(): void;

  getSelectionStats(): FigureTransform | null;
  onSelectionStatsChange(listener: () => void): () => void;
}
