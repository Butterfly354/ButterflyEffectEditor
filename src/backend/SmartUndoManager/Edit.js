/**
 * The class which represents individual edits
 *
 * @param {string} name         the name of the edit
 * @param {string} contents     the actual text which was edited
 * @param {int[]}  position     the position of the edit on the text editor in the form of an int array [row, column]
 * @param {Date}   timeCreated  the time the edit was created. Simply use new Date() for this
 * @param {string} groupName    the name of the group this edit belongs to
 * @param {EditType} type       the type of edit. Either add, remove, or replace. Use EditType.add, EditType.remove, or EditType.replace
 */

export class Edit {
    constructor(name, contents, position, timeCreated, groupName, type) {
        this.name = name;
        this.contents = contents;
        this.position = position;
        this.timeCreated = timeCreated;
        this.groupName = groupName;
        this.type = type;
    }
}

export const EditType = Object.freeze({ "add": 1, "remove": 2, "replace": 3});