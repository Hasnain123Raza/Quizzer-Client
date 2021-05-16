import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  reset,
  resetPostQuizRequest,
  setQuizTitle,
  setQuizDescription,
  addQuestion,
  postQuizCreateForm,
} from "./services/createSlice";
import {
  sGetQuiz,
  sGetQuizTitle,
  sGetQuizDescription,
  sGetQuestions,
  sGetPostQuizRequestStatus,
  sGetPostedQuizId,
  sGetQuizTitleError,
  sGetQuizDescriptionError,
  sGetQuestionsAmountError,
} from "./services/createSlice/selectors.js";
import PostRequestButton from "../../../../components/PostRequestButton";
import Question from "./components/Question";

import "./styles.css";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();

  const quiz = useSelector(sGetQuiz);
  const quizTitle = useSelector(sGetQuizTitle);
  const quizDescription = useSelector(sGetQuizDescription);
  const questions = useSelector(sGetQuestions);

  const postQuizRequestStatus = useSelector(sGetPostQuizRequestStatus);
  const postedQuizId = useSelector(sGetPostedQuizId);

  const quizTitleError = useSelector(sGetQuizTitleError);
  const quizDescriptionError = useSelector(sGetQuizDescriptionError);
  const quizQuestionsAmountError = useSelector(sGetQuestionsAmountError);

  useEffect(() => {
    if (postQuizRequestStatus === "fulfilled")
      history.push(`/quiz/open/${postedQuizId}`);

    return function cleanup() {
      dispatch(resetPostQuizRequest());
    };
  }, [postQuizRequestStatus]);

  return (
    <div className="quiz-create">
      <Card className="m-4">
        <Card.Header>
          <h3>Create your own Quiz!</h3>
        </Card.Header>

        <Card.Body>
          <div className="quiz-container">
            <Form>
              <Form.Group controlId="quiz-title">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control
                  size="lg"
                  autoComplete="off"
                  type="text"
                  placeholder="Quiz Title"
                  value={quizTitle}
                  isInvalid={quizTitleError !== undefined}
                  onChange={(event) =>
                    dispatch(setQuizTitle(event.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {quizTitleError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="quiz-description">
                <Form.Label>Quiz Description</Form.Label>
                <Form.Control
                  size="lg"
                  autoComplete="off"
                  type="text"
                  placeholder="Quiz Description"
                  value={quizDescription}
                  isInvalid={quizDescriptionError !== undefined}
                  onChange={(event) =>
                    dispatch(setQuizDescription(event.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {quizDescriptionError}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>

          {questions.map((question, questionIndex) => (
            <Question key={questionIndex} questionIndex={questionIndex} />
          ))}

          <Button variant="success" onClick={() => dispatch(addQuestion())}>
            <b className="pr-2">Add Question</b>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <div className="invalid-feedback" style={{ display: "block" }}>
            {quizQuestionsAmountError}
          </div>
        </Card.Body>

        <Card.Footer>
          <Button
            className="mr-2"
            variant="primary"
            onClick={() => dispatch(reset())}
          >
            New
          </Button>

          <PostRequestButton
            initiatePostRequest={() => dispatch(postQuizCreateForm(quiz))}
            postRequestStatus={postQuizRequestStatus}
            idleText="Create"
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
