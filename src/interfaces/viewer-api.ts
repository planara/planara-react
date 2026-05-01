// Types
import type { FigureType, IResponse } from '@planara/types';

/**
 * Публичный API вьювера для React-пакета.
 *
 * @remarks
 * Используется компонентами, хуками и хендлерами внутри `@planara/react`,
 * не раскрывая напрямую реализацию `ViewerHub` из `@planara/core`.
 *
 * @public
 * @interface
 */
export interface IViewerApi {
  addFigure(figure: FigureType): IResponse | null;
  loadFigure(content: string): IResponse | null;
  loadScene(content: string): IResponse | null;

  resizeRenderer(): void;
  start(): void;
  stop(): void;
}
