import { createRoot } from 'react-dom/client';
// Styles
import './index.css';
// Pages
import Editor from './pages/editor.tsx';

createRoot(document.getElementById('root')!).render(<Editor />);
