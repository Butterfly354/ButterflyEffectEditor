import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './ActiveGroup.css';

const ActiveGroup = ({ groupDict }) => {
  const [activeGroup, setActiveGroup] = useState('Default');
  //TODO: change the active group when all groups are deleted, or even an individual group if that group happens to be the active one.

  return (
    <div className="activeDropdown">
      <Dropdown drop="left">
        <Dropdown.Toggle id="toggle">{activeGroup}</Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(groupDict).map((title, index) => {
            return (
              <Dropdown.Item
                onClick={() => setActiveGroup(title)}
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
