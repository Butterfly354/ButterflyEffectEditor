import React, { useState, useEffect } from 'react';
import './Edit.css';
import { clickedEdits } from '../../UndoHistory/UndoHistory';

const Edit = ({ edit, groupIsClicked }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    setIsClicked(groupIsClicked);
    //if it group is clicked, but edit wasn't, add edit
    if (groupIsClicked && !isClicked) {
      clickedEdits.push(edit);
      console.log(clickedEdits);
    } else if (!groupIsClicked) {
      clickedEdits.pop(edit);
      console.log(clickedEdits);
    }
  }, [groupIsClicked]);

  return (
    <div
      className={isClicked ? 'edit active' : 'edit'}
      onClick={() => {
        if (!groupIsClicked) {
          setIsClicked(!isClicked);
          //if it wasn't clicked, it will be now
          if (!isClicked) {
            clickedEdits.push(edit);
            console.log(clickedEdits);
          } else {
            clickedEdits.pop(edit);
            console.log(clickedEdits);
          }
        }
      }}>
      <p>{edit.name}</p>
    </div>
  );
};

export default Edit;
