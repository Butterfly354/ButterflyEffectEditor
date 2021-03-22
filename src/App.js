import TopMenu from './components/TopMenu/TopMenu';
import './App.css';
import TextEditor from './components/TextEditor/TextEditor';
import { Row, Col, Container } from 'react-bootstrap';
import UndoHistory from './components/UndoHistory/UndoHistory';
import { groupDictionary } from './backend/SmartUndoManager/SmartUndoManager';

const App = () => {
  return (
    <div className="App">
      <TopMenu groupDict={groupDictionary} />
      <Container fluid>
        <Row>
          <Col>
            <UndoHistory groupDict={groupDictionary} />
          </Col>
          <Col xs={10}>
            <TextEditor />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
