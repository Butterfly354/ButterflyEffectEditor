import { Edit, EditType } from '../Edit';
import * as EditManager from './EditManager';
import { groupDictionary } from '../SmartUndoManager';

test('adding a valid edit adds it to the dictionary', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "testGroup", EditType.add);

    groupDictionary["testGroup"] = [];

    EditManager.addEdit(testEdit);

    expect(groupDictionary["testGroup"][0].name).toStrictEqual(testEdit.name);
});

test('moving a valid edit to a valid group moves it successfully', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "Default", EditType.add);

    groupDictionary["newGroup"] = [];

    EditManager.addEdit(testEdit);

    let editsToMove = [testEdit];
    EditManager.moveEdits("newGroup", editsToMove);

    expect(groupDictionary["Default"]).toStrictEqual([]);
    expect(groupDictionary["newGroup"][0].name).toStrictEqual(testEdit.name);
});

test('undoing the most recent edit removes it from the dictionary', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "Default", EditType.add);
    let testEdit2 = new Edit("testname2", "hello my name is bojan", position, new Date(8640000000000000), "newGroup", EditType.add);

    groupDictionary["newGroup"] = [];

    EditManager.addEdit(testEdit);
    EditManager.addEdit(testEdit2);

    EditManager.undoLastEdit();

    expect(groupDictionary["newGroup"]).toStrictEqual([]);
});

test('deleting a valid list of edits removes them from the dictionary', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "Default", EditType.add);
    let testEdit2 = new Edit("testname2", "hello my name is bojan", position, new Date(8640000000000000), "newGroup", EditType.add);

    groupDictionary["newGroup"] = [];

    EditManager.addEdit(testEdit);
    EditManager.addEdit(testEdit2);

    let editsToDelete = [testEdit, testEdit2];
    EditManager.deleteEdits(editsToDelete);

    expect(groupDictionary["Default"]).toStrictEqual([]);
    expect(groupDictionary["newGroup"]).toStrictEqual([]);
});

test('moving a list of edits to a nonexistent group throws error', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "Default", EditType.add);
    let testEdit2 = new Edit("testname3", "hello my name is bojanwefwefw", position, new Date(), "Default", EditType.add);
    let testEdit3 = new Edit("testname2", "hello my name is bojan again lol", position, new Date(), "newGroup", EditType.add);

    groupDictionary["newGroup"] = [];

    EditManager.addEdit(testEdit);
    EditManager.addEdit(testEdit2);
    EditManager.addEdit(testEdit3);

    let editsToMove = [testEdit, testEdit2, testEdit3];
    expect(() => {
        EditManager.moveEdits("fakeGroup", editsToMove);
    }).toThrow(
        `Unable to move edits. Group fakeGroup does not exist!`
    );
});

test('calling undoLastEdit() when there are no edits throws error', () => {
    emptyDictionary();

    expect(() => {
        EditManager.undoLastEdit();
    }).toThrow(
        `Unable to delete most recent edit. There are no edits!`
    );
});

test('passing an empty list to moveEdits() throws an error', () => {
    emptyDictionary();

    let listOfEdits = [];

    expect(() => {
        EditManager.moveEdits("Default", listOfEdits);
    }).toThrow(
        `Unable to move edits. Array of edits is empty!`
    );
});

test('passing an empty list to deleteEdits() throws an error', () => {
    emptyDictionary();

    let listOfEdits = [];

    expect(() => {
        EditManager.deleteEdits(listOfEdits);
    }).toThrow(
        `Unable to delete edits. Array of edits is empty!`
    );
});

test('attempting to move an edit to the group its already in throws error', () => {
    emptyDictionary();

    let position = [2, 3]
    let testEdit = new Edit("testname", "hello my name is bojan", position, new Date(), "newGroup", EditType.add);

    groupDictionary["newGroup"] = [];

    EditManager.addEdit(testEdit);

    let editsToMove = [testEdit];
    expect(() => {
        EditManager.moveEdits("newGroup", editsToMove);
    }).toThrow(
        `Unable to move edits. Edit testname is already in the specified group newGroup!`
    );
});

function emptyDictionary() {
    for (let groupName in groupDictionary) {
        groupDictionary[groupName] = [];
    }
}