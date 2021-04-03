import React from 'react';
import './UndoHistory.css';
import Group from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';
<<<<<<< Updated upstream
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
=======
import * as UI from '../../backend/UIDriver/UIDriver';
>>>>>>> Stashed changes

export let clickedEdits = [];
export let clickedGroups = [];

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
<<<<<<< Updated upstream
      <button>Move</button>
      <button  /*onClick={UI.DeleteEdits()}*/  >Delete</button>
      <button id="mainButton"  /*onClick={UI.UndoLastEdit()} */   >Undo</button>
=======
      <button /*onClick={UI.MoveEdits(clickedEdits)} */>Move</button>
      <button /*onClick={UI.DeleteEdits(clickedEdits)} */>Delete</button>
      <button id="mainButton" /* onClick={UI.UndoGroup(clickedGroups[0])}  */>
        Undo
      </button>
>>>>>>> Stashed changes
    </div>
  </div>
);

export default UndoHistory;
