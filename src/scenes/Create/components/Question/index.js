import { Form, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  removeQuestion,
  updateQuestionPrompt,
  addChoice,
  removeChoice,
  updateChoicePrompt,
} from "../../services/create/actions.js";
import Choice from "../Choice";
import DummyChoice from "../DummyChoice";
import { useState } from "react";

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
              onChange={(event) =>
                dispatch(
                  updateQuestionPrompt(questionIndex, event.target.value)
                )
              }
            />
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
      </div>
    </div>
  );
}
