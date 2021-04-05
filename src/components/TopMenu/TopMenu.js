import React, {useState} from 'react';
import { Nav, Navbar, NavDropdown, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';
import logo from './icons/mdi_butterfly.png';
import { downloadFile, openFile } from '../../backend/FileManager/FileManager';
import TextEditor from '../TextEditor/TextEditor.js';

import './TopMenu.css';

const TopMenu = ({ groupDict }) => {
  const [smShow, setSmShow] = useState(false);

  TopMenu.myRef = React.createRef();
  let textInput = React.createRef();

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
              onClick={() => setSmShow(true)}>
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
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Download File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">Filename</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Filename"
              aria-describedby="inputGroup-sizing-sm"
              ref = {textInput}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant ="primary" onClick={() => {
                downloadFile(TextEditor.myRef.current.value, textInput.current.value)
              }}>Download</Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopMenu;
