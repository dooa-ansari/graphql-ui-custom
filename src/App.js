import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReactJson from "react-json-view";

const Query =
  "query { head { vars link } results { distinct ordered bindings { distribution{value datatype type xmlLang} title{value datatype type xmlLang} mediaType{value datatype type xmlLang} modified{value datatype type xmlLang} identifier{value datatype type xmlLang} accessURL{value datatype type xmlLang} description{value datatype type xmlLang} geometry{value datatype type xmlLang} license{value datatype type xmlLang} publisherName{value datatype type xmlLang} maintainerEmail{value datatype type xmlLang} } } }";

function App() {
  const [selectedOption, setSelectedOption] = useState("Animal Parks");
  const [query, setQuery] = useState(Query);
  const [queryResult, setQueryResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runGraphQlQuery = async () => {
    const response = await fetch("http://127.0.0.1:8000/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    //const formattedData = JSON.stringify(result, null, 2).replace(/\\/g, "");
    setQueryResult(result);
    console.log(result);
  };

  const handleSelect = async (eventKey) => {
    setLoading(true);
    setSelectedOption(eventKey);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/machine_data/machine_data?dataset=${eventKey}`
      );
      const data = await response.json();
      console.log("API Response:", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="p-1">
            <h2>Sparql-to-Graphql Research Project</h2>
          </div>
        </Col>
        <Col>
          <Stack
            direction="horizontal"
            gap={3}
            className="p-1 d-flex justify-content-end"
          >
            <Nav
              className="p-1 d-flex justify-content-end"
              defaultActiveKey="/home"
              as="ul"
            >
              <Nav.Item as="li">
                <Nav.Link href="/howto">How To</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
            </Nav>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <DropdownButton
              className="mt-3 p-1"
              id="datasets"
              title="Datasets Selections"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="Animal Parks">
                Animal Parks
              </Dropdown.Item>
              <Dropdown.Item eventKey="Parking ticket machines">
                Parking ticket machines
              </Dropdown.Item>
              <Dropdown.Item eventKey="Schools">Schools</Dropdown.Item>
            </DropdownButton>
            {selectedOption && (
              <span style={{ marginTop: "10px" }}>
                Current Dataset: {selectedOption}
                {loading && (
                  <div className="mt-3">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
              </span>
            )}
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Stack>
            <div className="mt-5 p-3" style={{ backgroundColor: "#ffb3ba" }}>
              <Row>
                <Col>
                  <h3>Graphql Query</h3>
                </Col>
                <Col>
                  <ButtonGroup className="mb-3 d-flex justify-content-end">
                    <Button variant="primary">Copy</Button>
                    <Button variant="success">Edit</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="graphqlquery">
                <Form.Control as="textarea" rows={15} defaultValue={query} />
              </Form.Group>
            </div>

            <div className="mt-5 d-flex justify-content-end">
              <Button
                onClick={runGraphQlQuery}
                className="px-5"
                variant="primary"
              >
                Run
              </Button>
            </div>
          </Stack>
        </Col>
        <Col>
          <div className="mt-5 p-3" style={{ backgroundColor: "#ffb3ba" }}>
            <Row>
              <Col>
                <h3>Results</h3>
              </Col>
              <Col>
                <ButtonGroup className="mb-3 d-flex justify-content-end">
                  <Button variant="primary">Copy</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="resultsquery">
              {/* <Form.Control
                defaultValue={queryResult}
                as="textarea"
                rows={15}
              /> */}
              <ReactJson
                src={queryResult} // Pass JSON object directly
                theme="monokai" // Dark mode styling
                collapsed={false} // Expand all by default
                enableClipboard={true} // Copy feature
                displayDataTypes={false}
              />
              ;
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
