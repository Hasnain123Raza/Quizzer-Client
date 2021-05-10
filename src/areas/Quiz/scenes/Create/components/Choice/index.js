import { Form, FormGroup } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeChoice,
  setChoicePrompt,
  setChoiceCorrect,
} from "../../services/createSlice";
import {
  sGetChoicePrompt,
  sGetChoiceCorrect,
} from "../../services/createSlice/selectors.js";

export default function ({
  questionIndex,
  choiceIndex,
  focus,
  setFocusChoiceIndex,
}) {
  const dispatch = useDispatch();

  const choicePrompt = useSelector(
    sGetChoicePrompt(questionIndex, choiceIndex)
  );
  const choiceCorrect = useSelector(
    sGetChoiceCorrect(questionIndex, choiceIndex)
  );

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
            value={choicePrompt}
            ref={(choicePromptInput) => (inputRef = choicePromptInput)}
            onChange={(event) => {
              if (event.target.value == "") {
                dispatch(removeChoice(questionIndex, choiceIndex));
                setFocusChoiceIndex(choiceIndex);
              } else {
                dispatch(
                  setChoicePrompt(
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
            checked={choiceCorrect}
            onChange={(event) =>
              dispatch(
                setChoiceCorrect(
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
