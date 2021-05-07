import { Button, Spinner } from "react-bootstrap";

export default function () {
  return (
    <Button variant="secondary" disabled>
      <Spinner size="sm" animation="border" />
    </Button>
  );
}
