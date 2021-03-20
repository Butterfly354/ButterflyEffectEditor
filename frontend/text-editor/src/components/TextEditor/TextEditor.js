import React from 'react';
import './TextEditor.css';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="editor">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default TextEditor;
