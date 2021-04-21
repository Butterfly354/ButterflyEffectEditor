import React, { useState, useEffect } from 'react';
import './Edit.css';
import { clickedEdits } from '../../UndoHistory/UndoHistory';

const Edit = ({ edit, groupIsClicked, forceUpdate }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    setIsClicked(groupIsClicked);
    //if it group is clicked, but edit wasn't, add edit
    if (groupIsClicked && !isClicked) {
      clickedEdits.push(edit);
    } else if (!groupIsClicked) {
      clickedEdits.pop(edit);
    }
  }, [groupIsClicked]);

  useEffect(() => {
    setIsClicked(false);
  }, [forceUpdate]);

  return (
    <div
      className={isClicked ? 'edit active' : 'edit'}
      onClick={() => {
        if (!groupIsClicked) {
          setIsClicked(!isClicked);
          //if it wasn't clicked, it will be now
          if (!isClicked) {
            clickedEdits.push(edit);
          } else {
            clickedEdits.pop(edit);
          }
        }
      }}>
      <p className="editName">
        {edit.name} {edit.name.length > 19 ? '...' : ''}
        <sub>{edit.type == 'add' ? '++' : '--'}</sub>
      </p>
    </div>
  );
};

export default Edit;
