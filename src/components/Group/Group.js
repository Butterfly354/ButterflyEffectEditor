import React, { useState, useEffect } from 'react';
import './Group.css';
import Edit from './Edit/Edit';
import { clickedGroups } from '../UndoHistory/UndoHistory';

// for accordion
// import {Accordion, useAccordionToggle, Image} from 'react-bootstrap';
// import arrow from './angle-down.png';

const Group = ({ title, edits, forceUpdate }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    //after moving or deleting edits/groups, it unselects everything
    setIsClicked(false);
  }, [forceUpdate]);

  return (
    // <Accordion key={title}>
      // <CustomToggle eventKey="0"></CustomToggle>
        <div className={isClicked ? 'group active' : 'group'}>
          {/* <p
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
          </p> */}
          {/* <Accordion.Collapse eventKey="0"> */}
            {edits.map((edit, key) => {
                return <Edit edit={edit} groupIsClicked={isClicked} key={key} />;
            })}
          {/* </Accordion.Collapse>   */}
        </div>
    // </Accordion>
  );

  // What was originally here
  // return (
  //   <div className={isClicked ? 'group active' : 'group'}>
  //     <p
  //       id="title"
  //       onClick={() => {
  //         if (!isClicked) {
  //           clickedGroups.push(title);
  //         } else if (isClicked) {
  //           clickedGroups.pop(title);
  //         }
  //         setIsClicked(!isClicked);
  //       }}>
  //       {title}
  //     </p>
  //     {edits.map((edit, key) => {
  //       return <Edit edit={edit} groupIsClicked={isClicked} key={key} />;
  //     })}
  //   </div>
  // );
};

// Added this to extract the groupName for the accordion in the undohistory.js
const GroupName = ({title}) => {
  const [titleIsClicked, setTitleIsClicked] = useState(false);
  return (
    <div className={titleIsClicked ? 'group active' : 'group'} id="div-title">
    <p
      id="title"
      onClick={() => {
        if (!titleIsClicked) {
          clickedGroups.push(title);
        } else if (titleIsClicked) {
          clickedGroups.pop(title);
        }
        setTitleIsClicked(!titleIsClicked);
      }}>
      {title}
    </p>
    </div>
  );
}

export default Group;
export {GroupName};
