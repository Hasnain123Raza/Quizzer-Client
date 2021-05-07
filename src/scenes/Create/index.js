import { Card, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateForm,
  updateValidationErrors,
  updateQuizTitle,
  updateQuizDescription,
  addQuestion,
} from "./services/quizCreateFormSlice";
import {
  getQuizCreateForm,
  getQuizTitleError,
  getQuizDescriptionError,
  getQuestionsAmountError,
} from "./services/quizCreateFormSlice/selectors.js";
import Question from "./components/Question";
import PostButton from "./components/PostButton";

import "./styles.css";

export default function () {
  const dispatch = useDispatch();

  const { quiz, postStatus } = useSelector(getQuizCreateForm);
  const { title, description, questions } = quiz;

  const quizTitleError = useSelector(getQuizTitleError);
  const quizDescriptionError = useSelector(getQuizDescriptionError);
  const quizQuestionsAmountError = useSelector(getQuestionsAmountError);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);

  return (
    <div className="quiz-creator">
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
                  value={title}
                  isInvalid={quizTitleError !== undefined}
                  onChange={(event) =>
                    dispatch(updateQuizTitle(event.target.value))
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
                  value={description}
                  isInvalid={quizDescriptionError !== undefined}
                  onChange={(event) =>
                    dispatch(updateQuizDescription(event.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {quizDescriptionError}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>

          {questions.map((question, questionIndex) => (
            <Question
              key={questionIndex}
              prompt={question.prompt}
              choices={question.choices}
              questionIndex={questionIndex}
              active={questionIndex == activeQuestionIndex}
              setActive={setActiveQuestionIndex}
            />
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
            onClick={() => dispatch(clearCreateForm())}
          >
            New
          </Button>

          <PostButton />
        </Card.Footer>
      </Card>
    </div>
  );
}
