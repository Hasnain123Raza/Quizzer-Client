import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postQuizCreateForm } from "../../../../services/createSlice";
import { sGetQuiz } from "../../../../services/createSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();

  const quiz = useSelector(sGetQuiz);

  return (
    <Button
      variant="success"
      onClick={() => {
        dispatch(postQuizCreateForm(quiz));
      }}
    >
      Create
    </Button>
  );
}
