import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function ({ simplifiedQuiz }) {
  return (
    <div className="open">
      <Card className="m-4">
        <Card.Header>
          <h3>{simplifiedQuiz.title}</h3>
        </Card.Header>
        <Card.Body>{simplifiedQuiz.description}</Card.Body>
        <Card.Footer>
          <LinkContainer exact to={"/take/" + simplifiedQuiz._id}>
            <Button variant="success">Take</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </div>
  );
}
