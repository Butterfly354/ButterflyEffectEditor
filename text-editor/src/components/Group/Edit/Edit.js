import React, { useState, useEffect } from 'react';
import './Edit.css';

const Edit = ({ editName, groupIsClicked }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    if (groupIsClicked) {
      setIsClicked(groupIsClicked);
    }
    if (!groupIsClicked) {
      setIsClicked(false);
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
