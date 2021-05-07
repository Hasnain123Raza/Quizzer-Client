import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { sGetSimplifiedQuizRequestStatus } from "../services/openQuizSlice/selectors.js";

export default function ({ loadResources }) {
  const simplifiedQuizRequestStatus = useSelector(
    sGetSimplifiedQuizRequestStatus
  );

  const resourcesFailedToLoad = simplifiedQuizRequestStatus == "rejected";

  return (
    <div className="open">
      <Card className="m-4">
        <Card.Header>
          <h3>{resourcesFailedToLoad ? "Uh oh..." : "Loading..."}</h3>
        </Card.Header>
        <Card.Body>
          {resourcesFailedToLoad
            ? "We failed to load the quiz."
            : "We are loading your quiz."}
        </Card.Body>
        <Card.Footer>
          {resourcesFailedToLoad ? (
            <Button variant="danger" onClick={loadResources}>
              Retry
            </Button>
          ) : (
            <Button disabled variant="secondary">
              Please Wait
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
