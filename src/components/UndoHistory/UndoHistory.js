import React from 'react';
import './UndoHistory.css';
import Group from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';
import * as UI from '../../components/UI/UI';
//import UI from '../UI/UI';

//import UI from '../../components/UI/UI';
//import UI from './UI';


//import * as UI from './UI';

/*
<script type = "text/javaScript"
src = "../UI.js">
</script>
*/

export let clickedGroups = [];
export let clickedEdits = [];

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
      <button  /*onClick={UI.DeleteEdits()}*/  >Delete</button>
      <button id="mainButton"  /*onClick={UI.UndoLastEdit()} */   >Undo</button>
    </div>
  </div>
);

export default UndoHistory;
