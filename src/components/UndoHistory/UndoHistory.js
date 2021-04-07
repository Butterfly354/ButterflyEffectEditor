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

  const deleteClicked = () => {
    try {
      console.log(clickedGroups);
      if (clickedGroups[0]) {
        clickedGroups.forEach((group) => {
          deleteGroup(group);
          //if clickedEdits were deleted in clickedGroups
          console.log(clickedEdits);
          if (clickedEdits[0]) {
            clickedEdits.forEach((edit) => {
              if (edit.groupName === group) clickedEdits.pop(edit);
            });
          }
        });
        clickedGroups = [];
      }
      if (clickedEdits[0]) {
        deleteEdits(clickedEdits);
        clickedEdits = [];
      }
      setGroupDict({ ...groupDict });
    } catch (err) {
      alert(err);
    }
  };

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
        <button onClick={deleteClicked}>Delete</button>
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
              try {
                //TODO: after moving edits, it should unselect everything
                console.log(clickedEdits);
                moveEdits(groupNameInput.current.value, clickedEdits);
                setGroupDict({ ...groupDict });
                setMoveShow(false);
              } catch (err) {
                alert(err);
              }
            }}>
            Move to Group
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UndoHistory;
