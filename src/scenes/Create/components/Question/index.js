import { Form, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeQuestion,
  updateQuestionPrompt,
  addChoice,
  removeChoice,
  updateChoicePrompt,
} from "../../services/quizCreateFormSlice";
import Choice from "../Choice";
import DummyChoice from "../DummyChoice";
import { useState } from "react";
import {
  getQuestionPromptError,
  getChoiceCriteriaError,
} from "../../services/quizCreateFormSlice/selectors.js";

import "./styles.css";

export default function ({
  questionIndex,
  active,
  setActive,
  prompt,
  choices,
}) {
  const dispatch = useDispatch();

  const [focusChoiceIndex, setFocusChoiceIndex] = useState(-1);

  const questionPromptError = useSelector(
    getQuestionPromptError(questionIndex)
  );
  const choiceCriteriaError = useSelector(
    getChoiceCriteriaError(questionIndex)
  );

  return (
    <div className="question-container">
      <Collapse in={active}>
        <div className="question-container-header">
          <div className="py-2 px-3">
            <Button
              variant="danger"
              onClick={() => dispatch(removeQuestion(questionIndex))}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
      </Collapse>

      <div
        className="question-container-body"
        onClick={() => setActive(questionIndex)}
      >
        <Form>
          <Form.Group controlId="question-prompt">
            <Form.Label>Question Prompt</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Question Prompt"
              value={prompt}
              isInvalid={questionPromptError !== undefined}
              onChange={(event) =>
                dispatch(
                  updateQuestionPrompt(questionIndex, event.target.value)
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              {questionPromptError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <hr />

        {choices.map((choice, choiceIndex) => (
          <Choice
            key={choiceIndex}
            prompt={choice.prompt}
            correct={choice.correct}
            questionIndex={questionIndex}
            choiceIndex={choiceIndex}
            focus={choiceIndex == focusChoiceIndex}
            setFocusChoiceIndex={setFocusChoiceIndex}
          />
        ))}

        <DummyChoice
          onChangeCallback={(value) => {
            dispatch(addChoice(questionIndex));
            dispatch(updateChoicePrompt(questionIndex, choices.length, value));
            setFocusChoiceIndex(choices.length);
          }}
          focus={choices.length == focusChoiceIndex}
          setFocusChoiceIndex={setFocusChoiceIndex}
        />

        <div className="invalid-feedback" style={{ display: "block" }}>
          {choiceCriteriaError}
        </div>
      </div>
    </div>
  );
}
