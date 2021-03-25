import { Edit } from '../../Edit';
import { addEdit, moveEdits, deleteLastEdit, deleteEdits } from './EditManager';
import { groupDictionary } from '../SmartUndoManager';

test('moving a list of edits to a nonexistent group throws error', () => {
    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "Default", "add");
    let testEdit2 = new Edit("testname3", "hello my name is bojanwefwefw", position, new Date(), "Default", "add");
    let testEdit3 = new Edit("testname2", "hello my name is bojan again lol", position, new Date(), "newGroup", "add");

    groupDictionary["newGroup"] = [];

    addEdit(testEdit);
    addEdit(testEdit2);
    addEdit(testEdit3);

    let editsToMove = [testEdit, testEdit2, testEdit3];
    expect(() => {
        moveEdits("fakeGroup", editsToMove);
    }).toThrow(
        `Unable to move edits. Group fakeGroup does not exist!`
    );
});

test('calling undoLastEdit() when there are no edits does nothing', () => {
    groupDictionary["newGroup"] = [];

    expect(() => {
        deleteLastEdit();
    }).toThrow(
        `Unable to move edits. Group fakeGroup does not exist!`
    );
});

test('passing an empty list to moveEdits() throws an error', () => {
    let listOfEdits = [];

    expect(() => {
        moveEdits("Default", listOfEdits);
    }).toThrow(
        `Unable to move edits. Array of edits is empty!`
    );
});

test('passing an empty list to deleteEdits() throws an error', () => {
    let listOfEdits = [];

    expect(() => {
        deleteEdits(listOfEdits);
    }).toThrow(
        `Unable to delete edits. Array of edits is empty!`
    );
});

test('attempting to move an edit to the group its already in throws error', () => {
    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "newGroup", "add");

    groupDictionary["newGroup"] = [];

    addEdit(testEdit);

    let editsToMove = [testEdit];
    expect(() => {
        moveEdits("newGroup", editsToMove);
    }).toThrow(
        `Unable to move edits. Edits are already in the specified group!`
    );
});