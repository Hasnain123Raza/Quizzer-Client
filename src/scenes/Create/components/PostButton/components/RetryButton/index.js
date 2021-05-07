import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postQuizCreateForm } from "../../../../services/quizCreateFormSlice";
import { getQuizCreateForm } from "../../../../services/quizCreateFormSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();
  const quiz = useSelector(getQuizCreateForm).quiz;

  return (
    <Button
      variant="danger"
      onClick={() => {
        dispatch(postQuizCreateForm(quiz));
      }}
    >
      Retry
    </Button>
  );
}
