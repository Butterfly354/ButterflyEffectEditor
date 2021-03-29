import React, { useState } from 'react';
import './Group.css';
import Edit from './Edit/Edit';
import { clickedItems } from '../UndoHistory/UndoHistory';

const Group = ({ title, edits }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={isClicked ? 'group active' : 'group'}>
      <p
        id="title"
        onClick={() => {
          if (!isClicked) {
            clickedItems.push(title);
            console.log(clickedItems);
          } else {
            clickedItems.pop(title);
            console.log(clickedItems);
          }
          setIsClicked(!isClicked);
        }}>
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
