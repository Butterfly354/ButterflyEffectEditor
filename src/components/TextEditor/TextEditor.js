import React from 'react';
import './TextEditor.css';
import { Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
 
const TextEditor = () => {
    TextEditor.myRef = React.createRef();
    var newEdit = true;
    var editStack = [];
    var saveEdit = false;
    var editStartTime = 0;
    var fakeSavedEdits = [];
    var editStartPos = 0;
    
    //edit monitor
    const handler = (event) => {
	let now = new Date();
	//state is name of key
	
	let target = event.target,
	    position = target.selectionStart;
	if (newEdit){
	    editStartPos = position;
	    editStartTime = now.getSeconds();
	    newEdit = false;
	    saveEdit = false;
	} else {
	    if (now.getSeconds() - editStartTime >= 5 || (now.getSeconds() - editStartTime <= 0 && now.getSeconds() - editStartTime >= -5)){
		console.log(now.getSeconds() +" : " + editStartTime);
		saveEdit = true;
	    }
	}
	if (saveEdit){
	    console.log("pretend this saves it");
	    newEdit = true;
	    let temp = "";
	    for (let i = 0; i < editStack.length; i++){
		temp += editStack[i];
	    }
	    fakeSavedEdits[fakeSavedEdits.length] = temp;
	    editStack = [];
	    
	}
	
	editStack[editStack.length] = (event.key);
	console.log("e:"+editStack +" p:"+ position+" t:"+now.getSeconds());
	console.log("saved: "+fakeSavedEdits);
    }
    
    return (
    <div className="editor">
	<textarea
	    id="textarea"
	    ref={TextEditor.myRef}
	    onKeyPress={(e) => handler(e)}
	></textarea>
    </div>
  );
};

export default TextEditor;
