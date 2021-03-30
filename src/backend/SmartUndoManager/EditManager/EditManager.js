import { groupDictionary } from '../SmartUndoManager';

/**
 * add a new edit in the dictionary in the edit's specified groupName. The group name should be the current active group.
 *
 * @throws an error if the edit object's group name does not exist
 * @param {Edit} edit              the edit object
 */
export const addEdit = (edit) => {
    if (!(edit.groupName in groupDictionary)) {
        throw Error(
            `Cannot add edit. Group ${edit.groupName} does not exist!`
        );
    }
    groupDictionary[edit.groupName].push(edit);
};

/**
 * move edits from one group to another
 *
 * @throws an error if the array of edits is empty
 * @throws an error if newGroup does not exist
 * @throws an error if newGroup is already used by the edits
 * @param {type} newGroup          name of new group.
 * @param {type} edits             array of edits to move
 */
export const moveEdits = (newGroup, edits) => {
    if (!(newGroup in groupDictionary)) {
        throw Error(
            `Unable to move edits. Group ${newGroup} does not exist!`
        );
    }
    if (edits.length < 1) {
        throw Error(
            `Unable to move edits. Array of edits is empty!`
        );
    }
    for (let i = 0; i < edits.length; i++) {
        let index = groupDictionary[edits[i].groupName].indexOf(edits[i]);
        if (index > -1 && edits[i].groupName.localeCompare(newGroup) !== 0) {
            groupDictionary[edits[i].groupName].splice(index, 1);
            edits[i].groupName = newGroup;
            groupDictionary[newGroup].push(edits[i]);
        }
    }
    groupDictionary[newGroup].sort((a, b) => a.timeCreated.getTime() - b.timeCreated.getTime());
};

/**
 * remove the most recent edit from the dictionary
 * 
 * @throws an error if there are no edits in the dictionary
 */
export const undoLastEdit = () => {
    let editFound = false;
    for (let groupName in groupDictionary) {
        if (groupDictionary[groupName].length > 0) {
            editFound = true;
            break;
        }
    }
    if (!editFound) {
        throw Error(
            `Unable to delete most recent edit. There are no edits!`
        );
    }

    let mostRecentEdit;
    let mostRecentEditTime = new Date(-8640000000000000);
    for (let groupName in groupDictionary) {
        // get the latest edit in the current group, which is always the last edit in the list
        let currentEdit = groupDictionary[groupName][groupDictionary[groupName].length - 1];
        if (currentEdit.timeCreated > mostRecentEditTime) {
            mostRecentEdit = currentEdit;
            mostRecentEditTime = mostRecentEdit.timeCreated;
        }
    }
    groupDictionary[mostRecentEdit.groupName].pop();
};

/**
 * removes a list of edits from the dictionary
 * 
 * @returns the list of edits that are the value of the key groupName.
 * @param {type} edits           list of edits to undo
 */
export const deleteEdits = (edits) => {
    if (edits.length < 1) {
        throw Error(
            `Unable to delete edits. Array of edits is empty!`
        );
    }

    for (let i = 0; i < edits.length; i++) {
        let index = groupDictionary[edits[i].groupName].indexOf(edits[i]);
        if (index > -1) {
            groupDictionary[edits[i].groupName].splice(index, 1);
        }
    }
};

/**
 * deletes all edits. Doesn't delete the groups.
 * Use carefully.
 */
 export const deleteAllEdits = () => {
    for (let groupName in groupDictionary) {
      groupDictionary[groupName] = [];
    }
  };

// TODO check if we should update edit positions as the user makes changes to the document
//export default EditManager;


