import { Form, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeQuestion,
  setQuestionPrompt,
  addChoice,
  setChoicePrompt,
  setActiveQuestionIndex,
} from "../../services/createSlice";
import Choice from "../Choice";
import DummyChoice from "../DummyChoice";
import { useState } from "react";
import {
  sGetChoices,
  sGetQuestionPrompt,
  sGetActiveQuestionIndex,
  sGetQuestionPromptError,
  sGetChoiceCriteriaError,
} from "../../services/createSlice/selectors.js";

import "./styles.css";

export default function ({ questionIndex }) {
  const dispatch = useDispatch();

  const [focusChoiceIndex, setFocusChoiceIndex] = useState(-1);

  const questionPrompt = useSelector(sGetQuestionPrompt(questionIndex));
  const isQuestionActive =
    useSelector(sGetActiveQuestionIndex) == questionIndex;
  const choices = useSelector(sGetChoices(questionIndex));
  const choicesCount = choices.length;

  const questionPromptError = useSelector(
    sGetQuestionPromptError(questionIndex)
  );
  const choiceCriteriaError = useSelector(
    sGetChoiceCriteriaError(questionIndex)
  );

  return (
    <div className="question-container">
      <Collapse in={isQuestionActive}>
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
        onClick={() => dispatch(setActiveQuestionIndex(questionIndex))}
      >
        <Form>
          <Form.Group controlId="question-prompt">
            <Form.Label>Question Prompt</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Question Prompt"
              value={questionPrompt}
              isInvalid={questionPromptError !== undefined}
              onChange={(event) =>
                dispatch(setQuestionPrompt(questionIndex, event.target.value))
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
            questionIndex={questionIndex}
            choiceIndex={choiceIndex}
            focus={choiceIndex == focusChoiceIndex}
            setFocusChoiceIndex={setFocusChoiceIndex}
          />
        ))}

        <DummyChoice
          onChangeCallback={(value) => {
            dispatch(addChoice(questionIndex));
            dispatch(setChoicePrompt(questionIndex, choicesCount, value));
            setFocusChoiceIndex(choicesCount);
          }}
          focus={choicesCount == focusChoiceIndex}
          setFocusChoiceIndex={setFocusChoiceIndex}
        />

        <div className="invalid-feedback" style={{ display: "block" }}>
          {choiceCriteriaError}
        </div>
      </div>
    </div>
  );
}
