import React from 'react';
import './UndoHistory.css';
import Group from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';

export let clickedItems = [];

const UndoHistory = ({ groupDict }) => (
  <div className="main">
    <h5>Undo History</h5>

    <div className="history">
      <SearchBar>
        {/*TODO: collapse group*/}
        {Object.keys(groupDict).map((title, index) => {
          return <Group title={title} key={index} edits={groupDict[title]} />;
        })}
      </SearchBar>
    </div>

    <div className="buttonGroup">
      <button>Move</button>
      <button>Delete</button>
      <button id="mainButton">Undo</button>
    </div>
  </div>
);

export default UndoHistory;
