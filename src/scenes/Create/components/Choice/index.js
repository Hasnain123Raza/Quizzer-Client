import { Form, FormGroup } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addChoice,
  removeChoice,
  updateChoicePrompt,
  updateChoiceCorrect,
} from "../../services/create/actions.js";

export default function ({
  prompt,
  correct,
  questionIndex,
  choiceIndex,
  focus,
  setFocusChoiceIndex,
}) {
  const dispatch = useDispatch();

  let inputRef = null;

  useEffect(() => {
    if (focus) {
      setFocusChoiceIndex(-1);
      inputRef.focus();
    }
  });

  return (
    <div className="choice-container">
      <Form className="d-flex align-items-baseline">
        <Form.Group style={{ flex: 1 }} controlId="choice-prompt">
          <Form.Control
            size="sm"
            autoComplete="off"
            type="text"
            placeholder="Choice Prompt"
            value={prompt}
            ref={(choicePromptInput) => (inputRef = choicePromptInput)}
            onChange={(event) => {
              if (event.target.value == "") {
                dispatch(removeChoice(questionIndex, choiceIndex));
                setFocusChoiceIndex(choiceIndex);
              } else {
                dispatch(
                  updateChoicePrompt(
                    questionIndex,
                    choiceIndex,
                    event.target.value
                  )
                );
              }
            }}
          />
        </Form.Group>
        <Form.Group className={"ml-3 d-block"} controlId="correct-choice">
          <Form.Check
            type="checkbox"
            label="Correct"
            checked={correct}
            onChange={(event) =>
              dispatch(
                updateChoiceCorrect(
                  questionIndex,
                  choiceIndex,
                  event.target.checked
                )
              )
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}
