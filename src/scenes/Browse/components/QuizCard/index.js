import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function (props) {
  let { quiz } = props;
  let trimmedDescription =
    quiz.description.length > 100
      ? quiz.description.substring(0, 100) + "..."
      : quiz.description;

  return (
    <div className="quiz-card h-100">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{quiz.title}</Card.Title>
          <Card.Text>{trimmedDescription}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <LinkContainer to={"/open/" + quiz._id}>
            <Button className="mr-2" variant="outline-success">
              Open
            </Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </div>
  );
}
