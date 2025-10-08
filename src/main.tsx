import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
// Styles
import './index.css';
// Components
import EditorRenderer from './components/renderers/editor-renderer.tsx';

createRoot(document.getElementById('root')!).render(<EditorRenderer />);
