import { Card, Button, ProgressBar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  sGetQuizId,
  sGetQuizTitle,
  sGetQuestionCount,
  sGetTotalCorrectQuestions,
  sGetTotalWrongQuestions,
  sGetCurrentQuestionId,
  sGetQuestion,
  sGetIsChoiceSelected,
} from "../../services/takeSlice/selectors.js";
import {
  incrementCurrentQuestionId,
  setSelectedChoiceId,
  setTotalWrongQuestions,
} from "../../services/takeSlice";
import Choice from "../Choice";

export default function () {
  const dispatch = useDispatch();

  const quizId = useSelector(sGetQuizId);
  const quizTitle = useSelector(sGetQuizTitle);
  const totalQuestions = useSelector(sGetQuestionCount);
  const totalCorrectQuestions = useSelector(sGetTotalCorrectQuestions);
  const totalWrongQuestions = useSelector(sGetTotalWrongQuestions);
  const isChoiceSelected = useSelector(sGetIsChoiceSelected);

  const currentQuestionId = useSelector(sGetCurrentQuestionId);
  const currentQuestion = useSelector(sGetQuestion(currentQuestionId));
  const { prompt, choices } = currentQuestion;

  const isLastQuestion = currentQuestionId == totalQuestions;

  return (
    <Card className="m-4">
      <Card.Header>{quizTitle}</Card.Header>
      <Card.Body>
        <h5>{prompt}</h5>
        <hr />
        {choices.map((choice, choiceIndex) => (
          <Choice key={choiceIndex} choiceId={choice._id} />
        ))}
      </Card.Body>
      <Card.Footer>
        <div className="d-flex align-items-baseline">
          <ProgressBar style={{ flex: 1 }}>
            <ProgressBar
              variant="success"
              now={(100 * totalCorrectQuestions) / totalQuestions}
              key={1}
            />
            <ProgressBar
              variant="danger"
              now={(100 * totalWrongQuestions) / totalQuestions}
              key={2}
            />
          </ProgressBar>

          <LinkContainer exact to={"/quiz/open/" + quizId}>
            <Button className="mx-3" variant="danger">
              Quit
            </Button>
          </LinkContainer>

          {isLastQuestion ? (
            <LinkContainer exact to="/quiz/browse">
              <Button variant="success">Finish</Button>
            </LinkContainer>
          ) : (
            <Button
              variant="success"
              onClick={() => {
                dispatch(incrementCurrentQuestionId());
                dispatch(setSelectedChoiceId(-1));
                if (!isChoiceSelected)
                  dispatch(setTotalWrongQuestions(totalWrongQuestions + 1));
              }}
            >
              Next
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}
