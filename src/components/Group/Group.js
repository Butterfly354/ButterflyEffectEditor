import React, { useState, useEffect } from 'react';
import './Group.css';
import Edit from './Edit/Edit';
import { Accordion, useAccordionToggle, Image } from 'react-bootstrap';
import { clickedGroups } from '../UndoHistory/UndoHistory';
import arrow from './angle-down.png';

const Group = ({ title, edits, forceUpdate }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ourEventKey, setOurEventKey] = useState(0);

  useEffect(() => {
    //after moving or deleting edits/groups, it unselects everything
    setIsClicked(false);
  }, [forceUpdate]);

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);

    return (
      <Image
        src={arrow}
        onClick={() => {
          decoratedOnClick();
          setOurEventKey(ourEventKey === 0 ? 1 : 0);
        }}
        id="arrow"
        className={ourEventKey === 0 ? 'activeArrow' : 'inactive'}></Image>
    );
  }

  return (
    <Accordion key={title} defaultActiveKey="0">
      <CustomToggle eventKey="0"></CustomToggle>
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
        <Accordion.Collapse eventKey="0">
          <div>
            {edits.map((edit, key) => {
              return <Edit edit={edit} groupIsClicked={isClicked} key={key} forceUpdate={forceUpdate} />;
            })}
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

export default Group;
