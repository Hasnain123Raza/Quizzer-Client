import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { sGetQuizRequestStatus } from "../../services/takeSlice/selectors.js";

export default function ({ loadQuiz }) {
  const quizRequestStatus = useSelector(sGetQuizRequestStatus);
  const quizFailedToLoad = quizRequestStatus == "rejected";

  return (
    <Card className="m-4">
      <Card.Header>{quizFailedToLoad ? "Uh oh..." : "Loading..."}</Card.Header>
      <Card.Body>
        {quizFailedToLoad
          ? "We were unable to load the quiz"
          : "We are loading your quiz!"}
      </Card.Body>
      <Card.Footer>
        {quizFailedToLoad ? (
          <Button variant="danger" onClick={loadQuiz}>
            Retry
          </Button>
        ) : (
          <Button disabled variant="outline-secondary">
            Please Wait...
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
