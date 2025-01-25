import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h2>Sparql-to-Graphql Research Project</h2>
          </div>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Nav defaultActiveKey="/home" as="ul">
              <Nav.Item as="li">
                <Nav.Link href="/home">How To</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">About</Nav.Link>
              </Nav.Item>
            </Nav>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Stack>
            <div style={{ backgroundColor: "#ffb3ba" }}>
              <Row>
                <Col>Graphql Query</Col>
                <Col>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Copy</Button>
                    <Button variant="secondary">Edit</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>

            <div>
              <Button variant="success">Run</Button>
            </div>
          </Stack>
        </Col>
        <Col>
          <div style={{ backgroundColor: "#ffb3ba" }}>
            <Row>
              <Col>Results</Col>
              <Col>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">Copy</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
