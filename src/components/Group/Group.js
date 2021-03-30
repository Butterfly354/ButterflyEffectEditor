import React, { useState } from 'react';
import './Group.css';
import Edit from './Edit/Edit';
import { clickedGroups } from '../UndoHistory/UndoHistory';

const Group = ({ title, edits }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={isClicked ? 'group active' : 'group'}>
      <p
        id="title"
        onClick={() => {
          if (!isClicked) {
            clickedGroups.push(title);
            console.log(clickedGroups);
          } else if (isClicked) {
            clickedGroups.pop(title);
            console.log(clickedGroups);
          }
          setIsClicked(!isClicked);
        }}>
        {title}
      </p>
      {edits.map((edit, key) => {
        return (
          <Edit
            className="edits"
            edit={edit}
            groupIsClicked={isClicked}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default Group;
