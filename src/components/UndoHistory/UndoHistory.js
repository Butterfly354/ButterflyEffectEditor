import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, InputGroup, FormControl, Accordion, useAccordionToggle, Image } from 'react-bootstrap';
import './UndoHistory.css';
import Group, {GroupName} from '../Group/Group';
import SearchBar from '../SearchBar/SearchBar';
import {
  deleteEdits,
  moveEdits
} from '../../backend/SmartUndoManager/EditManager/EditManager';
import { deleteGroup } from '../../backend/SmartUndoManager/GroupManager/GroupManager';
import { GroupContext } from '../../GroupContext';
import arrow from './angle-down.png';

export let clickedEdits = [];
export let clickedGroups = [];

const UndoHistory = ({ forceUpdate }) => {
  const [groupDict, setGroupDict] = useContext(GroupContext);
  const [moveShow, setMoveShow] = useState(false);

  let groupNameInput = React.createRef();

  function CustomToggle({eventKey}) {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
      <Image src= {arrow} onClick={decoratedOnClick} id="arrow"></Image>
    );
  } 

  useEffect(() => {
    localStorage.setItem('groupDict', JSON.stringify(groupDict));
  }, [forceUpdate]);

  const deleteClicked = () => {
    try {
      if (clickedGroups[0]) {
        clickedGroups.forEach((group) => {
          deleteGroup(group);
          //if clickedEdits were deleted in clickedGroup
          if (clickedEdits[0]) {
            clickedEdits.forEach((edit) => {
              //remove edit from the clickedEdits
              if (edit.groupName === group) {
                const index = clickedEdits.indexOf(edit);
                if (index > -1) {
                  clickedEdits.splice(index, 1);
                }
              }
            });
          }
        });
        clickedGroups = [];
      }
      if (clickedEdits[0]) {
        deleteEdits(clickedEdits);
        clickedEdits = [];
      }
      setGroupDict(groupDict);
      forceUpdate();
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
             return (
              <Accordion key={title} defaultActiveKey="1">
                <CustomToggle eventKey="0"></CustomToggle>
                  <GroupName title={title}></GroupName>
                <Accordion.Collapse eventKey="0">
                  <Group edits={groupDict[title]} forceUpdate={forceUpdate}/>
                </Accordion.Collapse>
              </Accordion>
            );
            // return (
            //   <Group
            //     title={title}
            //     key={title}
            //     edits={groupDict[title]}
            //     forceUpdate={forceUpdate}
            //   />
            // );
          })}
        </SearchBar>
      </div>

      <div className="buttonGroup">
        <button onClick={() => setMoveShow(true)}>Move</button>
        <button onClick={deleteClicked}>Delete</button>
        <button id="mainButton">Undo</button>
      </div>
      <Modal
        animation={false}
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
                moveEdits(groupNameInput.current.value, clickedEdits);
                setGroupDict(groupDict);
                forceUpdate();
                //after moving edits, it unselects everything
                clickedEdits = [];
                clickedGroups = [];
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
