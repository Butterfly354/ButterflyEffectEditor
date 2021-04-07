import React, { useContext, useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import './UndoHistory.css';
import Group from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';
import {
  deleteEdits,
  moveEdits
} from '../../backend/SmartUndoManager/EditManager/EditManager';
import { deleteGroup } from '../../backend/SmartUndoManager/GroupManager/GroupManager';
import { GroupContext } from '../../GroupContext';

export let clickedEdits = [];
export let clickedGroups = [];

const UndoHistory = () => {
  const [groupDict, setGroupDict] = useContext(GroupContext);
  const [moveShow, setMoveShow] = useState(false);

  let groupNameInput = React.createRef();

  return (
    <div className="main">
      <h5>Undo History</h5>

      <div className="history">
        <SearchBar>
          {/*TODO: collapse group*/}
          {Object.keys(groupDict).map((title) => {
            return <Group title={title} key={title} edits={groupDict[title]} />;
          })}
        </SearchBar>
      </div>

      <div className="buttonGroup">
        <button onClick={() => setMoveShow(true)}>Move</button>
        <button
          onClick={() => {
            clickedGroups.forEach((group) => {
              deleteGroup(group);
            });
            deleteEdits(clickedEdits);
            setGroupDict({ ...groupDict });
          }}>
          Delete
        </button>
        <button id="mainButton">Undo</button>
      </div>
      <Modal
        size="sm"
        show={moveShow}
        onHide={() => setMoveShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Move to Group
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
              moveEdits(groupNameInput.current.value, clickedEdits);
              setGroupDict({ ...groupDict });
              setMoveShow(false);
              clickedEdits = [];
            }}>
            Move to Group
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UndoHistory;
