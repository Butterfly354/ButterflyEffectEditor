import {
  createGroup,
  renameGroup,
  deleteGroup,
  findGroupEdits,
  undoGroup
} from './GroupManager';
import { groupDictionary } from '../SmartUndoManager';

test('adding a group with a correct name', () => {
  createGroup('group1');
  //expect to have a key with an empty list
  expect(groupDictionary['group1']).toStrictEqual([]);
});

test('adding a group with the same name throws error', () => {
  expect(() => {
    createGroup('group1');
  }).toThrow(
    'Group group1 already exists! Choose another name for your group.'
  );
});

test('renaming a group works', () => {
  renameGroup('group1', 'newGroup');
  expect(groupDictionary['group1']).toBeUndefined();
  expect(groupDictionary['newGroup']).toStrictEqual([]);
});

test('deleting a nonexistent group throws', () => {
  expect(() => {
    deleteGroup('group1');
  }).toThrow('Group group1 does not exist!');
  expect(() => {
    deleteGroup('group2');
  }).toThrow('Group group2 does not exist!');
});

test('finding a groups edits works', () => {
  expect(findGroupEdits('newGroup')).toStrictEqual([]);
  //TODO: using editManager's addEdit, add edits to a group, then retest this function
});

test('deleting a group works', () => {
  deleteGroup('newGroup');
  expect(groupDictionary['newGroup']).toBeUndefined();
});

test('undoing a group works', () => {
  createGroup('group1');
  undoGroup('group1');
  //TODO: fix this test, how to test undoing edits and groups?
  expect(groupDictionary['group1']).toBeUndefined();
});
