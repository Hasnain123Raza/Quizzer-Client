import { Container, Row, Col, Nav } from "react-bootstrap";

export default function () {
  return (
    <div className="footer">
      <Container fluid className="bg-dark text-light py-4">
        <Row>
          <Col md={4}>
            <Nav className="flex-column align-items-center">
              <h4>Quizzer</h4>
              <Nav.Link>Contact</Nav.Link>
              <Nav.Link>About</Nav.Link>
              <Nav.Link>Team</Nav.Link>
              <Nav.Link>Join</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <Nav className="flex-column align-items-center">
              <h4>Help</h4>
              <Nav.Link>FAQs</Nav.Link>
              <Nav.Link>Docs</Nav.Link>
              <Nav.Link>Tutorial</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <Nav className="flex-column align-items-center">
              <h4>Contribute</h4>
              <Nav.Link>Donate</Nav.Link>
              <Nav.Link>Share</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "white" }} />
        <small>
          <Row>
            <Col md={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              pellentesque euismod viverra. Quisque porta felis id mauris
              molestie
            </Col>
            <Col md={4}>Copyright Quizzer</Col>
          </Row>
        </small>
      </Container>
    </div>
  );
}
