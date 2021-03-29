import React, { useState, useEffect } from 'react';
import './Edit.css';
import { clickedItems } from '../../UndoHistory/UndoHistory';

const Edit = ({ editName, groupIsClicked }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    setIsClicked(groupIsClicked);
    //if it wasn't clicked, it will be now
    if (groupIsClicked && !isClicked) {
      clickedItems.push(editName);
    } else if (groupIsClicked && isClicked) {
      //do nothing
    } else {
      clickedItems.pop(editName);
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
            clickedItems.push(editName);
          } else {
            clickedItems.pop(editName);
          }
        }
      }}>
      <p>{editName}</p>
    </div>
  );
};

export default Edit;
