import React, { useState, useEffect } from 'react';
import './Edit.css';

const Edit = ({ editName, groupIsClicked }) => {
  const [isClicked, setIsClicked] = useState(groupIsClicked);
  useEffect(() => {
    setIsClicked(groupIsClicked);
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
