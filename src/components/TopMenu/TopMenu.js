import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';
import logo from './icons/mdi_butterfly.png';
import { downloadFile, openFile } from '../../backend/FileManager/FileManager';
import TextEditor from '../TextEditor/TextEditor.js';

import './TopMenu.css';

const TopMenu = ({ groupDict }) => {
  TopMenu.myRef = React.createRef();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          Butterfly <img src={logo} id="logo" width="30px" alt="logo" /> Effect
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="File" id="collasible-nav-dropdown">
            <NavDropdown.Item>New file</NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                TopMenu.myRef.current.click();
              }}>
              Open file
            </NavDropdown.Item>
            <input
              type="file"
              accept=".txt"
              id="input"
              style={{ display: 'none' }}
              ref={TopMenu.myRef}
              onChange={async () => {
                let fileToOpen = TopMenu.myRef.current.files[0];
                TextEditor.myRef.current.value = await openFile(fileToOpen);
              }}></input>
            <NavDropdown.Item>Save</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                downloadFile(TextEditor.myRef.current.value, 'Butterfly');
              }}>
              Download file
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Font" id="collasible-nav-dropdown">
            <NavDropdown.Item>Change Font Size</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Group" id="collasible-nav-dropdown">
            <NavDropdown.Item>Create New Group</NavDropdown.Item>
            <NavDropdown.Item>Delete All Groups</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>Undo History</Nav.Link>
          <Nav.Link>Help</Nav.Link>
        </Nav>
        <p id="activeGroupTitle">Active Group</p>
        <ActiveGroup groupDict={groupDict} />
      </Navbar>
    </div>
  );
};

export default TopMenu;
