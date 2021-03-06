import React, { useState, useContext } from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import ActiveGroup from './ActiveGroup/ActiveGroup';
import logo from './icons/mdi_butterfly.png';
import { downloadFile, openFile } from '../../backend/FileManager/FileManager';
import {
  createGroup,
  deleteAllGroups
} from '../../backend/SmartUndoManager/GroupManager/GroupManager';
import { deleteAllEdits } from '../../backend/SmartUndoManager/EditManager/EditManager';
import TextEditor from '../TextEditor/TextEditor.js';
import { GroupContext } from '../../GroupContext';
import './TopMenu.css';
import FontSizeChanger from 'react-font-size-changer';
import { clearLastDoc } from './../TextEditor/TextEditor';

const TopMenu = ({ forceUpdate }) => {
  const [groupDict, setGroupDict] = useContext(GroupContext);

  const [downloadShow, setDownloadShow] = useState(false);
  const [groupShow, setGroupShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteEditShow, setDeleteEditShow] = useState(false);
  const [newShow, setNewShow] = useState(false);

  let openFileButton = React.createRef();
  let fileNameInput = React.createRef();
  let groupNameInput = React.createRef();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          Butterfly <img src={logo} id="logo" width="30px" alt="logo" /> Effect
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="File" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={() => setNewShow(true)}>
              New file
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                openFileButton.current.click();
              }}>
              Open file
            </NavDropdown.Item>
            <input
              type="file"
              id="input"
              style={{ display: 'none' }}
              ref={openFileButton}
              onChange={async () => {
                let fileToOpen = openFileButton.current.files[0];
                try {
                  TextEditor.myRef.current.value = await openFile(fileToOpen);
                  clearLastDoc(TextEditor.myRef.current.value);
                  localStorage.setItem(
                    'TextEditor',
                    JSON.stringify(TextEditor.myRef.current.value)
                  );
                  //resetting the dictionary
                  deleteAllGroups();
                  setGroupDict(groupDict);
                  forceUpdate();
                } catch (err) {
                  alert(err);
                }
              }}></input>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => setDownloadShow(true)}>
              Download file
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Font" id="collasible-nav-dropdown">
            <FontSizeChanger
              targets={['textarea']}
              options={{
                stepSize: 3,
                range: 6
              }}
              customButtons={{
                up: <span style={{ fontSize: '34px' }}>A</span>,
                down: <span style={{ fontSize: '22px' }}>A</span>,
                style: {
                  WebkitBorderRadius: '5px'
                },
                buttonsMargin: 10
              }}
            />
          </NavDropdown>
          <NavDropdown title="Group" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={() => setGroupShow(true)}>
              Create New Group
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setDeleteShow(true)}>
              Delete All Groups
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setDeleteEditShow(true)}>
              Delete All Edits
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <p id="activeGroupTitle">Active Group</p>
        <ActiveGroup groupDict={groupDict} forceUpdate={forceUpdate} />
      </Navbar>
      <Modal
        animation={false}
        size="sm"
        show={downloadShow}
        onHide={() => setDownloadShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Download File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Filename
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Filename"
              aria-describedby="inputGroup-sizing-sm"
              ref={fileNameInput}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              downloadFile(
                TextEditor.myRef.current.value,
                fileNameInput.current.value
              );
            }}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        animation={false}
        size="sm"
        show={groupShow}
        onHide={() => setGroupShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Create New Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Group name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="groupName"
              aria-describedby="inputGroup-sizing-sm"
              ref={groupNameInput}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              try {
                createGroup(groupNameInput.current.value);
                setGroupDict(groupDict);
                forceUpdate();
                setGroupShow(false);
              } catch (err) {
                alert(err);
              }
            }}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        animation={false}
        size="sm"
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete All Groups
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This will delete all your edits.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteShow(false);
            }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteAllGroups();
              setGroupDict(groupDict);
              forceUpdate();
              setDeleteShow(false);
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        animation={false}
        size="sm"
        show={deleteEditShow}
        onHide={() => setDeleteEditShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete All Groups
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This will delete all your edits.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteEditShow(false);
            }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteAllEdits();
              setGroupDict(groupDict);
              forceUpdate();
              setDeleteEditShow(false);
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        animation={false}
        size="sm"
        show={newShow}
        onHide={() => setNewShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">New File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to download your current file before starting new?
        </Modal.Body>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Filename
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Filename"
              aria-describedby="inputGroup-sizing-sm"
              ref={fileNameInput}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              TextEditor.myRef.current.value = '';
              localStorage.setItem(
                'TextEditor',
                JSON.stringify(TextEditor.myRef.current.value)
              );
              deleteAllGroups();
              setGroupDict(groupDict);
              forceUpdate();
              setNewShow(false);
            }}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              downloadFile(
                TextEditor.myRef.current.value,
                fileNameInput.current.value
              );
              TextEditor.myRef.current.value = '';
              localStorage.setItem(
                'TextEditor',
                JSON.stringify(TextEditor.myRef.current.value)
              );
              deleteAllGroups();
              setGroupDict(groupDict);
              forceUpdate();
              setNewShow(false);
            }}>
            Download File
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopMenu;
