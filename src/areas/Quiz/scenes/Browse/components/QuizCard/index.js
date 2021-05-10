import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function ({ quiz }) {
  const quizId = quiz._id;
  const quizTitle = quiz.title;
  const quizTrimmedDescription =
    quiz.description.length > 100
      ? quiz.description.substring(0, 100) + "..."
      : quiz.description;

  return (
    <div className="quiz-card h-100">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{quizTitle}</Card.Title>
          <Card.Text>{quizTrimmedDescription}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <LinkContainer to={"/quiz/open/" + quizId}>
            <Button className="mr-2" variant="outline-success">
              Open
            </Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </div>
  );
}
