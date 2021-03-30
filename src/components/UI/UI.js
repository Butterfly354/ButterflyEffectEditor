//import React, {UI} from 'react';
import * as EditManager from '../../backend/SmartUndoManager/EditManager/EditManager';
import * as GroupManager from '../../backend/SmartUndoManager/GroupManager/GroupManager';
//import { groupDictionary } from '../../backend/SmartUndoManager/SmartUndoManager';

/**
 * change function to updated javascript
 */

export const AcessDictionary  =() =>{

    //for(var i =0 ; i < groupDictionary.)

}
 export const addEdits  = () => 
 {
     // takes a parameter Edit 
 EditManager.addEdit();
 };

export const MoveEdits  = () => 
{
    // takes two parameters , (newgroup , edits).
EditManager.moveEdits();
};

export const UndoLastEdit  = () => 
{
EditManager.undoLastEdit();
};

export const DeleteEdits  = () => 
{
    // takes a list of edits as parameter (edits)
EditManager.deleteEdits();
};


export const DeleteAllEdits  = () => 
{ 

EditManager.deleteAllEdits();
};

export const CreateGroup  = () => 
{
    //  think about asking the user for a new Name 
    //  takes a parameter group name 
   //alert("What is the name of your group ?");

   console.log("I am here");

    GroupManager.createGroup("Maamar");
};

export const RenameGroup  = () => 
{
    // old name
    //new name
    //(old name, new name)
    GroupManager.renameGroup();
};

export const DeleteGroup  = () => 
{
    //  takes one parameter  (groupName)
    console.log("We made  it here");

    GroupManager.deleteGroup();
};

export const FindGroup  = () => 
{
    //  takes one parameter group name (groupName)
    console.log("We made  it here");
   
    //takes an input as well 
    GroupManager.findGroupEdits();
};

export const UndoGroup  = () => 
{
    //  takes one parameter (groupName)
    console.log("We made  it here");
   
    //takes an input as well 
    GroupManager.undoGroup();
};

export const DeleteAllGroups  = () => 
{
    //  group name already exists
    console.log("We made  it here");

    GroupManager.deleteAllGroups();
};

//export default UI;