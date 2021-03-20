import React, { useState, useEffect } from 'react';
import './Edit.css';

const Edit = ({ editName, groupIsClicked }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    //TODO: when a group has just been clicked to remvove active, change the edit to inactive
    if (groupIsClicked) {
      setIsClicked(groupIsClicked);
    }
  }, [groupIsClicked]);

  return (
    <div
      className={isClicked ? 'edit active' : 'edit'}
      onClick={() => {
        if (!groupIsClicked) {
          setIsClicked(!isClicked);
        }
      }}>
      <p>{editName}</p>
    </div>
  );
};

export default Edit;
