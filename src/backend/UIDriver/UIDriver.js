
import * as EditManager from '../../backend/SmartUndoManager/EditManager/EditManager';
import * as GroupManager from '../../backend/SmartUndoManager/GroupManager/GroupManager';
import { clickedEdits } from '../../components/UndoHistory/UndoHistory';
import { clickedGroups } from '../../components/UndoHistory/UndoHistory';


/**
 *This method would move edits form one group to another by calling the moveEdits method in
 the EditManager class 
 * @param {type} clickedEdits list of edits to move
 */
export const MoveEdits = (clickedEdits) => {
  // takes two parameters , (newgroup , edits).
  EditManager.moveEdits(clickedEdits);
};
/**
 * This method would delit edits  from the dictionnary by calling the deleteEdits method in
 the EditManager class.
 * @param {type} clickedEdits list of edits to be deleted.
 */
export const DeleteEdits = (clickedEdits) => {
  // takes a list of edits as parameter (edits)
  EditManager.deleteEdits(clickedEdits);
};
/**
 * This method would delete all edits from the dictionnary by calling the deleteAllEdits method in
 the EditManager class.
 */
export const DeleteAllEdits = () => {
  EditManager.deleteAllEdits();
};

/**
 *This method would create a new  group by calling the createGroup method in
 the GroupManager class.
 * @param {type} groupname the new group name that will be added.
 */
export const CreateGroup = (groupname) => {
  //  think about asking the user for a new Name
  //  takes a parameter group name
  //alert("What is the name of your group ?");

  GroupManager.createGroup(groupname);
};

/**
 * *This method would change the name of a group by calling the RenameGroup method in
 the GroupManager class.
 * @param {type} oldname the old name of the group to be changed.
 * @param {type} newname the new name of the group.
 */
export const RenameGroup = (oldname, newname) => {
  // old name
  //new name
  //(old name, new name)
  GroupManager.renameGroup(oldname, newname);
};

/**
 ** *This method would delete a group by calling the deleteGroup method in
 the GroupManager class.
 * @param {type} groupName the name of the group that should be deleted.
 */
export const DeleteGroup = (groupName) => {
  //  takes one parameter  (groupName)

  GroupManager.deleteGroup(groupName);
};

/**
 *This method would create a group by calling the findGroupEdits method in
 the GroupManager class.
 * @param {type} GroupNamethe The new group to be created.
 */
export const FindGroup = (GroupName) => {
  //  takes one parameter group name (groupName)

  //takes an input as well
  GroupManager.findGroupEdits(GroupName);
};

/**
 *This method  callsthe GroupManager method in
 the GroupManager class.
 * @param {type} GroupName The group name that  will be passed as parameter to the undoGroup method 
 of GroupManager
 */
export const UndoGroup = (GroupName) => {
  //  takes one parameter (groupName)
  console.log('We made  it here');

  //takes an input as well
  GroupManager.undoGroup(GroupName);
};

/**
 *This method  calls the DeleteAllGroups method in
 the GroupManager class which is going to delete all groups. 
 */
export const DeleteAllGroups = () => {
  //  group name already exists
  console.log('We made  it here');

  GroupManager.deleteAllGroups();
};
