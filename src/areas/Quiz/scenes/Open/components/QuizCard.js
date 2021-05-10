import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import {
  sGetSimplifiedQuizId,
  sGetSimplifiedQuizTitle,
  sGetSimplifiedQuizDescription,
} from "../services/openSlice/selectors.js";

export default function () {
  const quizId = useSelector(sGetSimplifiedQuizId);
  const quizTitle = useSelector(sGetSimplifiedQuizTitle);
  const quizDescription = useSelector(sGetSimplifiedQuizDescription);

  return (
    <div className="open">
      <Card className="m-4">
        <Card.Header>
          <h3>{quizTitle}</h3>
        </Card.Header>
        <Card.Body>{quizDescription}</Card.Body>
        <Card.Footer>
          <LinkContainer exact to={"/quiz/take/" + quizId}>
            <Button variant="success">Take</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </div>
  );
}
