import React, { useState, useEffect } from 'react';
import './Group.css';
import Edit from './Edit/Edit';
import { clickedGroups } from '../UndoHistory/UndoHistory';

const Group = ({ title, edits, forceUpdate }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    //after moving or deleting edits/groups, it unselects everything
    setIsClicked(false);
  }, [forceUpdate]);

  return (
    <div className={isClicked ? 'group active' : 'group'}>
      <p
        id="title"
        onClick={() => {
          if (!isClicked) {
            clickedGroups.push(title);
          } else if (isClicked) {
            clickedGroups.pop(title);
          }
          setIsClicked(!isClicked);
        }}>
        {title}
      </p>
      {edits.map((edit, key) => {
        return <Edit edit={edit} groupIsClicked={isClicked} key={key} />;
      })}
    </div>
  );
};

export default Group;
