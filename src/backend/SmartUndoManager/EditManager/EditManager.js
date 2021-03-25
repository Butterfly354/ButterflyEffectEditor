import { groupDictionary } from '../SmartUndoManager';

/**
 * add a new edit in the dictionary in the current active group
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
    if (edits[0].groupName.localeCompare(newGroup) === 0) {
        throw Error(
            `Unable to move edits. Edits are already in the specified group!`
        );
    }
    for (let i = 0; i < edits.length; i++) {
        let index = groupDictionary[edits[i].groupName].indexOf(edits[i]);
        if (index > -1) {
            groupDictionary[edits[i].groupName].splice(index, 1);
        }
        edits[i].groupName = newGroup;
        groupDictionary[newGroup].push(edits[i]);
    }
};

/**
 * remove the most recent edit from the dictionary
 * 
 * @throws an error if there are no edits in the dictionary
 */
export const deleteLastEdit = () => {
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

    let mostRecentEditTime = groupDictionary["Default"][groupDictionary["Default"].length - 1].timeCreated;
    let mostRecentEdit = groupDictionary["Default"][groupDictionary["Default"].length - 1];
    for (let groupName in groupDictionary) {
        if (groupDictionary[groupName][groupDictionary[groupName].length - 1].timeCreated > mostRecentEditTime) {
            mostRecentEditTime = groupDictionary[groupName][groupDictionary[groupName].length - 1].timeCreated;
            mostRecentEdit = groupDictionary[groupName][groupDictionary[groupName].length - 1];
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