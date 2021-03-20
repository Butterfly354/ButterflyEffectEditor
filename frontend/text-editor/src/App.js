import TopMenu from './components/TopMenu/TopMenu';
import './App.css';
import TextEditor from './components/TextEditor/TextEditor';
import { Row, Col, Container } from 'react-bootstrap';
import UndoHistory from './components/UndoHistory/UndoHistory';

const App = () => {
  let groupDictionary = {
    Default: [
      { name: 'edit5', contents: 'hi world' },
      { name: 'edit2', contents: 'laila' }
    ],
    group2: [
      { name: 'edit1', contents: 'hi world' },
      { name: 'edit2', contents: 'laila' }
    ],
    group3: [
      { name: 'edit1', contents: 'hi world' },
      { name: 'edit2', contents: 'laila' }
    ],
    group4: [
      { name: 'edit1', contents: 'hi world' },
      { name: 'edit2', contents: 'laila' }
    ]
  };
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
