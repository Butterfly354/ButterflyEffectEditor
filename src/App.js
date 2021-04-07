import React from 'react';
import TopMenu from './components/TopMenu/TopMenu';
import './App.css';
import TextEditor from './components/TextEditor/TextEditor';
import { Row, Col, Container } from 'react-bootstrap';
import UndoHistory from './components/UndoHistory/UndoHistory';
import { GroupProvider } from './GroupContext';

const App = () => {
  return (
    <GroupProvider>
      <div className="App">
        <TopMenu />
        <Container fluid>
          <Row>
            <Col>
              <UndoHistory />
            </Col>
            <Col xs={10}>
              <TextEditor />
            </Col>
          </Row>
        </Container>
      </div>
    </GroupProvider>
  );
};

export default App;
