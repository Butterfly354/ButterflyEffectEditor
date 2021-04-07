import React from 'react';
import './TextEditor.css';
import { Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Edit } from '../../backend/SmartUndoManager/Edit';
import { addEdit } from '../../backend/SmartUndoManager/EditManager/EditManager';
 
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

	    let timeout = (now.getSeconds() - editStartTime >= 5 ||
			   (now.getSeconds() - editStartTime <= 0 &&
			    now.getSeconds() - editStartTime >= -5))
	    let cursorJump = ((position > (editStartPos+editStack.length+1)) ||
			      (position < editStartPos))
	    
	    
	    if (timeout || cursorJump){
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

		// Creating the Edit Object	
		let editObject = new Edit("", temp, position, now.getTime, "Default", null);

		//Calling the save edit function to store the edit
		addEdit(editObject);
	    
	}
	/*
	 * regular expression to check if the character just typed was a printable character
	 * that would have been added to the dock
	 */
	
	if (event.key == " "){
	    console.log("----Space----");
	    editStack.splice((position-editStartPos),0," ");
	}else if (event.key === "Backspace" || event.key == "Delete"){
	    console.log("----Backspace---");
	    editStack.splice((position-editStartPos),1);
	}else if (event.key.length == 1 && event.key.charCodeAt(0) >=33 && event.key.charCodeAt(0) <=126 ){
	    console.log("----Normal Key---");
	    editStack.splice((position-editStartPos),0,event.key);
	}else {
	    console.log("Invalid, CharCode: " + event.key);
	}
	
	console.log("e:"+editStack +" p:"+ position+" t:"+now.getSeconds());
	console.log("saved: "+fakeSavedEdits);
    }
    /**
     * Will insert an edit into the text body, will return a boolean of true or false to signify if it was successful or not
     * @returns bool
     *//* Ignore this for now, is the vdery start of implementation
	* I may have some feedback on how to implement the edits and types better though
	* 
    function insertEdit(edit) {
	
	var editStartPos = shiftPosition(edit);
	var editEndPos = editStartPos+edit.contents.length;
	switch (edit.type){
	case "add":{
	    
	}break;
	case "remove":{

	}break;
	case "repalce":{

	}break;
	default:
	    return false;
	}
	
	return false;
    }
    */

    return (
    <div className="editor">
	<textarea
	    id="textarea"
	    ref={TextEditor.myRef}
	    onKeyDown={(e) => handler(e)}
	></textarea>
    </div>
  );
};

export default TextEditor;
