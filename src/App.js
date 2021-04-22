import React, { useState } from 'react';
import TopMenu from './components/TopMenu/TopMenu';
import './App.css';
import TextEditor from './components/TextEditor/TextEditor';
import { Row, Col, Container } from 'react-bootstrap';
import UndoHistory from './components/UndoHistory/UndoHistory';
import { GroupProvider } from './GroupContext';

const App = () => {
  const [dumbState, setDumbState] = useState(false);
  const forceUpdate = () => setDumbState(!dumbState);

  return (
    <GroupProvider>
      <div className="App">
        <TopMenu forceUpdate={forceUpdate} />
        <Container fluid>
          <Row>
            <Col>
              <UndoHistory forceUpdate={forceUpdate} />
            </Col>
            <Col xs={10}>
              <TextEditor forceUpdate={forceUpdate} />
            </Col>
          </Row>
        </Container>
      </div>
    </GroupProvider>
  );
};

export default App;
