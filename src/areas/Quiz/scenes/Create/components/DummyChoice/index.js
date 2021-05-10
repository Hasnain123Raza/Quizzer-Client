import { Form } from "react-bootstrap";
import { useEffect } from "react";

export default function ({ onChangeCallback, focus, setFocusChoiceIndex }) {
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
            value=""
            ref={(choicePromptInput) => (inputRef = choicePromptInput)}
            onChange={(event) => {
              onChangeCallback(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
