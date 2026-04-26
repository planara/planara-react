![build](https://github.com/planara/planara-react/actions/workflows/build.yml/badge.svg)
![deploy](https://github.com/planara/planara-react/actions/workflows/deploy.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![npm downloads](https://img.shields.io/npm/dm/@planara/react.svg)](https://www.npmjs.com/package/@planara/react)
[![npm total downloads](https://img.shields.io/npm/dt/@planara/react.svg)](https://www.npmjs.com/package/@planara/react)

## Planara React

React-адаптер для 3D-редактора Planara.

Пакет предоставляет готовые React-примитивы для встраивания редактора в приложение без прямой работы с `@planara/core`.

## Установка

```bash
npm install @planara/react @planara/types
```

или

```bash
yarn add @planara/react @planara/types
```

## Быстрый старт

Оборачиваем страницу редактора в `EditorProvider` и рендерим `EditorCanvas`.

```tsx
import { EditorProvider, EditorCanvas } from '@planara/react';

export const EditorPage = () => {
  return (
    <EditorProvider>
      <div style={{ width: '100%', height: '100vh' }}>
        <EditorCanvas />
      </div>
    </EditorProvider>
  );
};
```

* `EditorProvider` — хранит экземпляр редактора в контексте
* `EditorCanvas` — создает редактор, управляет resize и dispose

## Доступ к API редактора

Использовать `useEditorHub()` необходимо внутри `EditorProvider`.

```tsx
import { useEditorHub } from '@planara/react';
import { ToolType } from '@planara/types';

export const Toolbar = () => {
  const editor = useEditorHub();

  return (
    <button onClick={() => editor?.setToolMode(ToolType.Translate)}>
      Translate
    </button>
  );
};
```

## Готовые обработчики (Toolbar)

Можно использовать `makeEditorHandlers()` для быстрого подключения кнопок.

```tsx
import { makeEditorHandlers, useEditorHub } from '@planara/react';

export const Toolbar = () => {
  const editor = useEditorHub();
  const handlers = makeEditorHandlers(editor);

  return (
    <div>
      <button onClick={handlers.setPlaneMode}>Plane</button>
      <button onClick={handlers.setWireframeMode}>Wireframe</button>

      <button onClick={handlers.setTranslate}>Translate</button>
      <button onClick={handlers.setScale}>Scale</button>
      <button onClick={handlers.setRotate}>Rotate</button>

      <button onClick={handlers.setMeshSelect}>Mesh</button>
      <button onClick={handlers.setEdgeSelect}>Edge</button>
      <button onClick={handlers.setVertexSelect}>Vertex</button>

      <button onClick={handlers.addCube}>Add Cube</button>
      <button onClick={handlers.addCylinder}>Add Cylinder</button>
      <button onClick={handlers.addSphere}>Add Sphere</button>

      <button onClick={handlers.deleteFigure}>Delete</button>
    </div>
  );
};
```

## Статистика выбранного объекта

Хук `useSelectionStats()` возвращает трансформации выбранного объекта.

```tsx
import { useSelectionStats } from '@planara/react';

export const Inspector = () => {
  const stats = useSelectionStats();

  if (!stats) {
    return <div>Ничего не выбрано</div>;
  }

  const { position, rotation, scale, size } = stats;

  return (
    <div>
      <div>
        Position: {position.x.toFixed(2)} / {position.y.toFixed(2)} / {position.z.toFixed(2)}
      </div>
      <div>
        Rotation: {rotation.x.toFixed(2)} / {rotation.y.toFixed(2)} / {rotation.z.toFixed(2)}
      </div>
      <div>
        Scale: {scale.x.toFixed(2)} / {scale.y.toFixed(2)} / {scale.z.toFixed(2)}
      </div>
      <div>
        Size: {size.x.toFixed(2)} / {size.y.toFixed(2)} / {size.z.toFixed(2)}
      </div>
    </div>
  );
};
```

## Обработка ответов редактора

Методы редактора могут возвращать `IResponse`.

* `null` — успешное выполнение
* `IResponse` — действие заблокировано или произошла ошибка

```tsx
import { useEditorHub } from '@planara/react';
import { ToolType } from '@planara/types';

export const RotateButton = () => {
  const editor = useEditorHub();

  const handleClick = () => {
    const response = editor?.setToolMode(ToolType.Rotate);

    if (response?.blocked) {
      console.warn(response.message);
    }
  };

  return <button onClick={handleClick}>Rotate</button>;
};
```

Можно подключить уведомления, тосты или алерты.

## Полный пример

```tsx
import {
  EditorProvider,
  EditorCanvas,
  makeEditorHandlers,
  useEditorHub,
  useSelectionStats,
} from '@planara/react';

const Toolbar = () => {
  const editor = useEditorHub();
  const handlers = makeEditorHandlers(editor);

  return (
    <div>
      <button onClick={handlers.setTranslate}>Translate</button>
      <button onClick={handlers.setRotate}>Rotate</button>
      <button onClick={handlers.setMeshSelect}>Mesh</button>
      <button onClick={handlers.setVertexSelect}>Vertex</button>
      <button onClick={handlers.addCube}>Add Cube</button>
    </div>
  );
};

const Inspector = () => {
  const stats = useSelectionStats();

  if (!stats) return <aside>Ничего не выбрано</aside>;

  return (
    <aside>
      <div>X: {stats.position.x.toFixed(2)}</div>
      <div>Y: {stats.position.y.toFixed(2)}</div>
      <div>Z: {stats.position.z.toFixed(2)}</div>
    </aside>
  );
};

export const EditorPage = () => {
  return (
    <EditorProvider>
      <Toolbar />
      <EditorCanvas />
      <Inspector />
    </EditorProvider>
  );
};
```

## Экспорты

```ts
import {
  EditorProvider,
  EditorCanvas,
  useEditorHub,
  useEditorHubContext,
  useSelectionStats,
  makeEditorHandlers,
} from '@planara/react';
```

## Связанные пакеты

* `@planara/core` — ядро редактора
* `@planara/types` — общие типы
* `@planara/three` — расширения Three.js
