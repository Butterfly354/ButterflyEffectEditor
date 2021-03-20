import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';

import './TopMenu.css';

const TopMenu = ({ groupDict }) => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Butterfly Effect</Navbar.Brand>
      <Nav className="mr-auto">
        <NavDropdown title="File" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">New file</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Open file</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Save</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Download file</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Font" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            Change Font Size
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Group" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            Create New Group
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Delete All Groups
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#undoHistory">Undo History</Nav.Link>
        <Nav.Link href="#help">Help</Nav.Link>
      </Nav>
      <p id="activeGroupTitle">Active Group</p>
      <ActiveGroup groupDict={groupDict} />
    </Navbar>
  </div>
);

export default TopMenu;
