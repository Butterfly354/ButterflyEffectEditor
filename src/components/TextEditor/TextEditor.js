import React, {useEffect, useContext} from 'react';
import './TextEditor.css';
import { Edit } from '../../backend/SmartUndoManager/Edit';
import { addEdit } from '../../backend/SmartUndoManager/EditManager/EditManager';
import { currentActiveGroup } from '../TopMenu/ActiveGroup/ActiveGroup.js';
import { GroupContext } from '../../GroupContext';
import { groupDictionary } from '../../backend/SmartUndoManager/SmartUndoManager.js';

var pl = require( "tau-prolog" );

export const  applyEdits = (edits) => {

    for (let i = 1; i < edits.length; i++){
	for (let j = 0; j < (edits.length - i - 1); j++){
	    if (+edits[j].timeCreated < +edits[j+1].timeCreated ){
		edits[j] = edits[i];
		
		var temp = edits[j];
		edits[j] = edits[j+1];
		edits[j+1] = temp;
	    }
	}	
    }    
    for (let e in edits){
	insertEdit(edits[e]);
    }
}
function prepareForQuery(s1,s2){
    for (let i = 0; i < s2.length; i++){
	let val = s2[i];
	switch (val){
	case " ": s1[i] = "' '";break;
	case ",": s1[i] = "','";break;
	case "\n": s1[i] = "'\n'";break;
	case "\'": s1[i] = "\"\'\"";break;
	case "\"": s1[i] = "'\"'";break;
	case "?": s1[i] = "'?'";break;
	case "%": s1[i] = "'%'";break;
	case "-": s1[i] = "'-'";break;
	case ":": s1[i] = "':'";break;
	case ";": s1[i] = "';'";break;
	case ".": s1[i] = "'.'";break;
	case "+": s1[i] = "'+'";break;
	case "_": s1[i] = "'_'";break;
	case "(": s1[i] = "'('";break;
	case ")": s1[i] = "')'";break;
	case "!": s1[i] = "'!'";break;
	case "@": s1[i] = "'@'";break;
	case "/": s1[i] = "'/'";break;
	case "\\": s1[i] = "'\\'";break;
	default:
	}
    }
    for (let i = 0; i < s2.length; i++){		
	let val = s2[i];
	switch (val){
	case " ": s2[i] = "' '";break;
	case ",": s2[i] = "','";break;
	case "\n": s2[i] = "'\n'";break;
	case "\'": s2[i] = "\"\'\"";break;
	case "\"": s2[i] = "'\"'";break;
	case "?": s2[i] = "'?'";break;
	case "%": s2[i] = "'%'";break;
	case "-": s2[i] = "'-'";break;
	case ":": s2[i] = "':'";break;
	case ";": s2[i] = "';'";break;
	case ".": s2[i] = "'.'";break;
	case "+": s2[i] = "'+'";break;
	case "_": s2[i] = "'_'";break;
	case "(": s2[i] = "'('";break;
	case ")": s2[i] = "')'";break;
	case "!": s2[i] = "'!'";break;
	case "@": s2[i] = "'@'";break;
	case "/": s2[i] = "'/'";break;
	case "\\": s2[i] = "'\\'";break;
	default:
	}
    }
    return [s1,s2];
}

function checkAnyMatch(s1, s2){
    const setDifference = `
diff2(S,[],S).
diff2([],S,S):-S\=[].
diff2([H|T1],[H|T2],S3):-
        diff2(T1,T2,S3).
diff2([H|T1],[H2|T2],[H|T3]):-
       length(T1,L1),
        length(T2,L2),
        L1 > L2,
        diff2(T1,[H2|T2],T3).
diff2([H1|T1],[H|T2],[H|T3]):-
       length(T1,L1),
        length(T2,L2),
        L1 < L2,
        diff2([H1|T1],T2,T3).
`;
    let tup = prepareForQuery([...s1],[...s2]);
    var goal = "diff2("+tup[0]+","+tup[1]+",S).";
    
    var session = pl.create();
    session.consult(setDifference, {
	success: function() {
	    session.query(goal, {
		success: function(goal){
		    session.answer({
			success: function(answer){
			    let result = answer.lookup("S").toJavaScript();
			    var ret = "";
			    console.log(result);
			    for (var X in Object.entries(result)){
				ret+=result[X];
			    }
			    return ret;
			},
			error: function() {return "";},
			fail: function() {return "";},
			limit: function() {return "";}
		    })
		},
		error: function(){return "";}
	    });
	},
	error: function(){return "";}
    });
    return "";
}		   

/**
 * Inserts an edit into the text body, will return a boolean of true or false to signify if it was successful or not
 * @returns bool
 */ 
function insertEdit(edit) {	
    var editStartPosition = shiftPosition(edit);
    var doc = TextEditor.myRef.current.value;
    switch (edit.type){
    case "add":{
	console.log("Starting to remove addition");
	let textBefore = doc.substring(0, editStartPosition);
	let textAfter = doc.substring(editStartPosition);
	console.log(textAfter.substring(0,edit.contents.length) + " : " + edit.contents);
	if (textAfter.substring(0,edit.contents.length) === edit.contents){
	    TextEditor.myRef.current.value = textBefore + textAfter.substring(edit.contents.length);
	}
	else{
	    var match = checkAnyMatch(textAfter.substring(0,edit.contents.length),edit.contents);
	}
	return true;
    }
    case "remove":{
	console.log("Starting add removal");
	let textBefore = doc.substring(0, editStartPosition);
	let textAfter = doc.substring(editStartPosition);
	TextEditor.myRef.current.value = textBefore + edit.contents + textAfter;
	return true;
    }
    default:
	return false;
    }	
}
/*
 * Function that will ventually shift the position sent back to the text so that it is not interrupting it much
 */
function shiftPosition(edit){
    var newPosition = edit.position;
    var shift = 0;
    console.log("------Dict------\n"+groupDictionary);
    newPosition += shift;
    return newPosition;
}


var lastDoc=[];

const TextEditor = ({forceUpdate}) => {
    /*
     * Does something? maybe?
     */
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

    /*
     * Once the text editor is made, it will create a Tau-prolog session
     * and initialize the string that will hold the tau-prolog program
     * that will be queried.
     */
    var session = pl.create();
    var program = `
diff(S,[],S).
diff([],S,S):-S\=[].
diff([H|T1],[H|T2],S3):-
    diff(T1,T2,S3).
diff([H|T1],[H2|T2],[H|T3]):-
    diff(T1,[H2|T2],T3).
`;
    /*
     * Initialization of global variables needed for the textEditor handler,
     * These essentially just need to keep their value between keystrokes
     */
    TextEditor.myRef = React.createRef();
    const [groupDict, setGroupDict] = useContext(GroupContext);
    var newEdit = true,
	editStartTime = 0,
	editStartPos = 0,
	canvasSize = 0,
	editType,
	position = 0,
	lastPosition;
    /*
     * The handler function, on each keystroke in textEditor it will be called with the event,
     * which contains the cursor position, key pressed, and other info.
     */
    function handler(event){
	/* 
	 * Will update the last position a character was written only when a character is written or deleted
	 * and if any other key is pressed that ends up changing the position is pressed it will not update
	 * causing the cursorJumped variable to become true.
	 */
	if (event.key === " "){
	    console.log("----Space----");
	    lastPosition = position;
	}else if (event.key === "Backspace" || event.key === "Delete"){
	    console.log("----Backspace---");
	    lastPosition = position;
	}else if (event.key.length === 1 && event.key.charCodeAt(0) >=33 && event.key.charCodeAt(0) <=126 ){
	    console.log("----Normal Key---");
	    lastPosition = position;
	}else {
	    console.log("Invalid, CharCode: " + event.key);
	}	
	
	/*
	 * Will initialize  immediately needed variables, the time, cursor position, 
	 * edit object in case, and value of the edit
	 *
	 */
	
	let now = new Date();
	var editObject,
	    editVal = "",
	    cursorJump;
		
	let target = event.target;
	//lastPosition = position;
	position = target.selectionStart;

	/*
	 * Will determine if the cursor has moved more than 1 space from the last position
	 * where a character was written 
	 */
	if (position - lastPosition > 1 || position - lastPosition < -1)
	    cursorJump = true;

	/*
	 * Whenever an edit is started it will set variables such as where it started, what time
	 * it started, etc. all needed to decide when the next edit will be or test for it.
	 */
	
	if (newEdit){
	    editStartPos = position;
	    editStartTime = now.getTime();
	    newEdit = false;
	    canvasSize = TextEditor.myRef.current.value.length;
	} else {

	    /*
	     * If the edit is not a new one, it will test to see if 5 seconds has passed or 
	     * if the cursor has jumped from the last time a character was pressed, it will
	     * start the process to save the changes as a new edit.
	     */
	    
	    let timeout = ((now.getTime() - editStartTime)/1000 >= 5)

	    //Saves edits
	    if (timeout || cursorJump){
		//-----------------------------------------------------------------
		/*
		 * First will start by taking the full document's value and turing it into
		 * an ordered list/set of characters, then take the value of what the doc was
		 * when the last edit was saved and do the same, then it will proceed to find
		 * the set difference of the two, and save the differece, it will be decalared
		 * a as removal or addition of text based on if there was more text before or
		 * after.
		 */

		/*
		 * Will initialize the sets from the documents' values and convert the strings
		 * to arrays.
		 */
		
		
		let moddedDoc = [...TextEditor.myRef.current.value];
		let goal = "";
	
		/*
		 * Will remove problematic characters from the document character sets
		 * and replace them with prolog syntax friendly equivilents.
		 */
		var docs = prepareForQuery(lastDoc, moddedDoc);
		
		/*
		 * Depending on which character set is greater in length, it will set the goal
		 * to query with the longer one first, as I have written the set difference function
		 * to assume that the first set is always longer than then the second one. 
		 * See ~line 20 for the prolog program being parsed to find set difference.
		 */
		if (TextEditor.myRef.current.value.length - canvasSize > 0){
		    editType = "add";
		    goal = "diff(["+docs[1]+"],["+docs[0]+"],S).";
		}else{
		    editType = "remove";
		    goal = "diff(["+docs[0]+"],["+docs[1]+"],S).";
		}
		lastDoc = docs[1];
		console.log(goal);
		/*
		 * Consults the prolog program itself with tau-prolog, a prolog interpreter written in js,
		 * first it will start by consulting the program to make sure it is syntatically correct,
		 * then it will query the already defined goal against the program, based on if the
		 * query failed, succeeded, or other it will perform an action, sending the edit will
		 * only happen on success which should always happen unless of an unforseen circumstance.
		 */
		session.consult(program, {
		    success: function() {
			// Query
			session.query(goal, {
			    success: function(goal) {
				// Answers
				session.answer({
				    success: function(answer) {
					/*
					 * Upon success, the differnce list is unified to the variable S,
					 * which we bind what its value was to result. The returned value
					 * is an object type, so we then convert it to a string by appending 
					 * each variable stored in it to editVal. Then if editVal is greater
					 * than 0 it will send the edit.
					 */
					
					let result = answer.lookup("S").toJavaScript();
					
					for (var X in Object.entries(result)){
					    editVal+=result[X];
					}

					if (editVal.length > 0){
					    newEdit = true;
					    let currentTime =
						(now.getHours()*10000)+
						(now.getMinutes()*100)+
						(now.getSeconds());
					    editObject = new Edit(editVal.slice(0,10)+"...",
								  editVal,
								  editStartPos,
								  currentTime, //now.getTime(),
								  currentActiveGroup,
								  editType);
					    console.log(editObject);
					    addEdit(editObject);
					    setGroupDict(groupDict);
					    forceUpdate();
					}else{
					    console.log("Edit had no Value");
					}
				    },
				    error:   function(err) {
					console.log(err);
				    },
				    fail:    function() {
					console.log("false.");
				    },
				    limit:   function() {
					console.log("limit exceeded.");
				    }
				})
			    },
			    error: function(err) {
				console.log("error parsing goal");
			    }
			});
		    },		    
		    error: function(err) { console.log("error parsing program"); }
		});
		//-----------------------------------------------------------------
	    }
	}
    }
    
    
    return (
	<div className="editor">
	    <script src="tau-prolog.js"></script>
	    <textarea
		id="textarea"
		ref={TextEditor.myRef}
		onKeyDown={(e) => handler(e)}
		onChange={saveToLocalStorage}
	    ></textarea>
	</div>
    );
};

export default TextEditor;
