import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateForm,
  updateQuizTitle,
  updateQuizDescription,
  addQuestion,
} from "./services/create/actions.js";
import { getCreateQuizForm } from "./services/create/selectors.js";
import Question from "./components/Question";
import { postQuiz } from "../../services/quiz.js";

import "./styles.css";

export default function () {
  const dispatch = useDispatch();

  const quizForm = useSelector(getCreateQuizForm);
  const { title, description, questions } = quizForm;

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
                  onChange={(event) =>
                    dispatch(updateQuizTitle(event.target.value))
                  }
                />
              </Form.Group>
              <Form.Group controlId="quiz-description">
                <Form.Label>Quiz Description</Form.Label>
                <Form.Control
                  size="lg"
                  autoComplete="off"
                  type="text"
                  placeholder="Quiz Description"
                  value={description}
                  onChange={(event) =>
                    dispatch(updateQuizDescription(event.target.value))
                  }
                />
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
        </Card.Body>

        <Card.Footer>
          <Button
            className="mr-2"
            variant="primary"
            onClick={() => dispatch(clearCreateForm())}
          >
            New
          </Button>
          <Button
            variant="success"
            onClick={() => {
              postQuiz(quizForm);
            }}
          >
            Create
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
