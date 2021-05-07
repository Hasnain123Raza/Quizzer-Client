import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  sGetQuizCountRequestStatus,
  sGetSimplifiedQuizzesRequestStatus,
} from "../../services/quizzesSimplifiedSlice/selectors.js";

export default function ({ loadResources }) {
  const quizCountRequestStatus = useSelector(sGetQuizCountRequestStatus);
  const simplifiedQuizzesRequestStatus = useSelector(
    sGetSimplifiedQuizzesRequestStatus
  );

  const resourcesFailedToLoad =
    quizCountRequestStatus == "rejected" ||
    simplifiedQuizzesRequestStatus == "rejected";

  return (
    <div className="quiz-card h-100">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>
            {resourcesFailedToLoad ? "Uh oh..." : "Loading..."}
          </Card.Title>
          <Card.Text>
            {resourcesFailedToLoad
              ? "We were unable to load the quizzes"
              : "We are loading your quizzes!"}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {resourcesFailedToLoad ? (
            <Button variant="danger" onClick={loadResources}>
              Retry
            </Button>
          ) : (
            <Button disabled variant="outline-secondary">
              Please Wait...
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
