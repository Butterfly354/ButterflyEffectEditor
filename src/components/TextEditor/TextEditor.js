import React from 'react';
import './TextEditor.css';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
 
const TextEditor = () => {
  TextEditor.myRef = React.createRef();

  return (
    <div className="editor">
      <textarea id="textarea" ref={TextEditor.myRef}></textarea>
    </div>
  );
};

export default TextEditor;
