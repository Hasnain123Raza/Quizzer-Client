import { Button } from "react-bootstrap";

export default function ({ initiatePostRequest, idleText }) {
  return (
    <Button variant="success" onClick={initiatePostRequest}>
      {idleText}
    </Button>
  );
}
