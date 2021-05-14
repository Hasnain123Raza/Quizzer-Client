import { Button } from "react-bootstrap";

export default function ({ initiatePostRequest }) {
  return (
    <Button variant="danger" onClick={initiatePostRequest}>
      Retry
    </Button>
  );
}
