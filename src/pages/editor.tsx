// Components
import { EditorRenderer } from '../components/renderers/editor-renderer.tsx';
import FigureStats from '../components/inspector/figure-stats.tsx';
// import { EditorButtons } from '../components/helpers/editor-buttons.tsx';

const Editor = () => {
  return (
    <div className="editor__page">
      {/*<EditorButtons />*/}
      <div className="editor__page__body">
        <EditorRenderer />
      </div>
      {/*<FigureStats />*/}
    </div>
  );
};

export default Editor;
