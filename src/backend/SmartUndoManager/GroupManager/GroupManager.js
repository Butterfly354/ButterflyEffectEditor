import { groupDictionary } from '../SmartUndoManager';

/**
 * creates a new entry in the dictionary with the key being the groupName, and the value is an empty list.
 *
 * @throws an error if groupName is in use.
 * @param {type} groupName           Name of the new group.
 */
export const createGroup = (groupName) => {
  if (groupName in groupDictionary) {
    throw Error(
      `Group ${groupName} already exists! Choose another name for your group.`
    );
  }
  groupDictionary[groupName] = [];
};

/**
 * renames a group.
 *
 * @throws an error if newName is in use.
 * @throws an error if oldName does not exist
 * @param {type} oldName           old name of the group.
 * @param {type} newName           new name of the group.
 */
export const renameGroup = (oldName, newName) => {
  if (newName in groupDictionary) {
    throw Error(
      `Group ${newName} already exists! Choose another name for your group.`
    );
  }
  if (!(oldName in groupDictionary)) {
    throw Error(`Group ${oldName} does not exist!`);
  }
  const targetKey = groupDictionary[oldName];
  delete groupDictionary[oldName];
  groupDictionary[newName] = targetKey;
};

/**
 * finds that entry in the dictionary and deletes it. Can’t delete the default group.
 *
 * @throws an error if groupName does not exist.
 * @param {type} groupName           Name of the group you want to delete.
 */
export const deleteGroup = (groupName) => {
  if (!(groupName in groupDictionary)) {
    throw Error(`Group ${groupName} does not exist!`);
  }
  if (groupName === 'Default') {
    //if it is the default group, just empty it.
    groupDictionary[groupName] = [];
  } else delete groupDictionary[groupName];
};

/**
 * @throws an error if groupName does not exist.
 * @returns the list of edits that are the value of the key groupName.
 * @param {type} groupName           Name of the group you want to get the edits for.
 */
export const findGroupEdits = (groupName) => {
  if (!(groupName in groupDictionary)) {
    throw Error(`Group ${groupName} does not exist!`);
  }
  return groupDictionary[groupName];
};

/**
 * deletes all groups. Can’t delete the default group.
 * Use carefully.
 */
export const deleteAllGroups = () => {
  for (let groupName in groupDictionary) {
    if (groupName.localeCompare('Default') !== 0) {
      delete groupDictionary[groupName];
    } else {
      //if it is the default group, just empty it.
      groupDictionary[groupName] = [];
    }
  }
};
