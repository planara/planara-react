// Types
import type {
  DisplayMode,
  FigureTransform,
  FigureType,
  SelectMode,
  ToolType,
  IResponse,
  ExportSceneResult,
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
  setSelectMode(mode: SelectMode): IResponse | null;
  setToolMode(mode: ToolType): IResponse | null;
  addFigure(figure: FigureType): IResponse | null;
  deleteFigure(): IResponse | null;
  loadFigure(content: string): IResponse | null;
  loadScene(content: string): IResponse | null;
  exportScene(): ExportSceneResult;

  resizeRenderer(): void;
  start(): void;
  stop(): void;

  getSelectionStats(): FigureTransform | null;
  onSelectionStatsChange(listener: () => void): () => void;
}
