<<<<<<< Updated upstream
import React from 'react';
import { Nav, Navbar, NavDropdown,FormControl } from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';
import logo from './icons/mdi_butterfly.png';
import * as UI from '../../components/UI/UI';

import './TopMenu.css';



const TopMenu = ({ groupDict }) => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Butterfly <img src={logo} id="logo" width="30px" alt="logo" /> Effect
      </Navbar.Brand>
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
          <NavDropdown.Item href="#action/3.1"  onClick ={TopMenu.myFunction} >
            Create New Group
          </NavDropdown.Item>
          <NavDropdown.Item id='panel' class="flip" onClick ={UI.CreateGroup} >
            This will appear after
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" onClick ={UI.DeleteAllGroups()}  >
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
=======
import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';
import logo from './icons/mdi_butterfly.png';
import { downloadFile, openFile } from '../../backend/FileManager/FileManager';
import TextEditor from '../TextEditor/TextEditor.js';
import * as UI from '../../backend/UIDriver/UIDriver';

import './TopMenu.css';

const TopMenu = ({ groupDict }) => {
  TopMenu.myRef = React.createRef();
  const [smShow, setSmShow] = useState(false);
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
              id="input"
              style={{ display: 'none' }}
              ref={TopMenu.myRef}
              onChange={async () => {
                let fileToOpen = TopMenu.myRef.current.files[0];
                try {
                  TextEditor.myRef.current.value = await openFile(fileToOpen);
                } catch (err) {
                  console.error(err);
                }
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
            <NavDropdown.Item onClick={() => setSmShow(true)}>
              Create New Group
            </NavDropdown.Item>
            <NavDropdown.Item onClick={UI.DeleteAllGroups}>
              Delete All Groups
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>Undo History</Nav.Link>
          <Nav.Link>Help</Nav.Link>
        </Nav>
        <p id="activeGroupTitle">Active Group</p>
        <ActiveGroup groupDict={groupDict} />
      </Navbar>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl placeholder="Enter a group name" />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2"></InputGroup.Text>
            </InputGroup.Append>
            <Button variant="Submit">Submit</Button>{' '}
          </InputGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};
>>>>>>> Stashed changes

function myFunction() {
  alert(document.getElementById("panel"));
  document.getElementById("panel").style.display = "block"};

export default TopMenu;
