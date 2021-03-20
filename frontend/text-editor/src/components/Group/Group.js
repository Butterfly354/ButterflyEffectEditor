import React, { useState } from 'react';
import './Group.css';
import Edit from './Edit/Edit';

const Group = ({ title, edits }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={isClicked ? 'group active' : 'group'}>
      <p id="title" onClick={() => setIsClicked(!isClicked)}>
        {title}
      </p>
      {edits.map((editName, key) => {
        return (
          <Edit
            className="edits"
            editName={editName.name}
            groupIsClicked={isClicked}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default Group;
