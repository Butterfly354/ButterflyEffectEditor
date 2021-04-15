import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './ActiveGroup.css';
export let currentActiveGroup = 'Default';

const ActiveGroup = ({ groupDict, forceUpdate }) => {
  const [activeGroup, setActiveGroup] = useState('Default');

  //change the active group when a group gets deleted if that group happens to be the active one.
  useEffect(() => {
    if (!(activeGroup in groupDict)) {
      setActiveGroup('Default');
      currentActiveGroup = 'Default';
    }
  }, [forceUpdate]);

  return (
    <div className="activeDropdown">
      <Dropdown drop="left">
        <Dropdown.Toggle id="toggle">{activeGroup}</Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(groupDict).map((title, index) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setActiveGroup(title);
                  currentActiveGroup = title;
                }}
                eventKey={index}
                key={index}>
                {title}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ActiveGroup;
