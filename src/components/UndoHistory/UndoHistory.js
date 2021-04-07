import React, { useContext } from 'react';
import './UndoHistory.css';
import Group from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';
import { deleteGroup } from '../../backend/SmartUndoManager/GroupManager/GroupManager';
import { GroupContext } from '../../GroupContext';

export let clickedEdits = [];
export let clickedGroups = [];

const UndoHistory = () => {
  const [groupDict, setGroupDict] = useContext(GroupContext);

  return (
    <div className="main">
      <h5>Undo History</h5>

      <div className="history">
        <SearchBar>
          {/*TODO: collapse group*/}
          {Object.keys(groupDict).map((title) => {
            return <Group title={title} key={title} edits={groupDict[title]} />;
          })}
        </SearchBar>
      </div>

      <div className="buttonGroup">
        <button>Move</button>
        <button
          onClick={() => {
            clickedGroups.forEach((group) => {
              deleteGroup(group);
            });
            setGroupDict({ ...groupDict });
          }}>
          Delete
        </button>
        <button id="mainButton">Undo</button>
      </div>
    </div>
  );
};

export default UndoHistory;
