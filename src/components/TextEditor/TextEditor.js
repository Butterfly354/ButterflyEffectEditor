import React, { useEffect } from 'react';
import './TextEditor.css';

const TextEditor = () => {
  TextEditor.myRef = React.createRef();

  useEffect(() => {
    TextEditor.myRef.current.value =
      JSON.parse(localStorage.getItem('TextEditor')) || '';
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem(
      'TextEditor',
      JSON.stringify(TextEditor.myRef.current.value)
    );
  };

  return (
    <div className="editor">
      <textarea
        id="textarea"
        ref={TextEditor.myRef}
        onChange={saveToLocalStorage}></textarea>
    </div>
  );
};

export default TextEditor;
