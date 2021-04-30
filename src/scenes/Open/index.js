import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getQuizById } from "../Browse/services/quizzes/selectors.js";
import { LinkContainer } from "react-router-bootstrap";

export default function () {
  const params = useParams();
  const quizId = params.id;
  const quiz = useSelector(getQuizById(quizId));

  return (
    <div className="open">
      <Card className="m-4">
        <Card.Header>
          <h3>{quiz.title}</h3>
        </Card.Header>
        <Card.Body>{quiz.description}</Card.Body>
        <Card.Footer>
          <LinkContainer exact to={"/take/" + quizId}>
            <Button variant="success">Take</Button>
          </LinkContainer>
          <Button variant="primary">Results</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
