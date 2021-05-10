import { useSelector, useDispatch } from "react-redux";
import {
  sGetQuizId,
  sGetCurrentQuestionId,
  sGetChoice,
  sGetSelectedChoiceId,
  sGetCorrectChoicesRequestStatus,
  sGetSelectedChoiceCorrect,
} from "../../services/takeSlice/selectors.js";
import {
  setSelectedChoiceId,
  getCorrectChoices,
} from "../../services/takeSlice";

import "./styles.css";

export default function ({ choiceId }) {
  const dispatch = useDispatch();

  const quizId = useSelector(sGetQuizId);
  const currentQuestionId = useSelector(sGetCurrentQuestionId);
  const choice = useSelector(sGetChoice(currentQuestionId, choiceId));
  const selectedChoiceId = useSelector(sGetSelectedChoiceId);
  const selectedChoiceCorrect = useSelector(sGetSelectedChoiceCorrect);
  const correctChoicesRequestStatus = useSelector(
    sGetCorrectChoicesRequestStatus
  );

  const isFetchingCorrectChoices = correctChoicesRequestStatus == "pending";
  const isSelected = choiceId == selectedChoiceId;
  const isCorrect = selectedChoiceCorrect;

  let choiceClass;
  if (isSelected) {
    if (isFetchingCorrectChoices) {
      choiceClass = "choice-pending";
    } else {
      if (isCorrect) {
        choiceClass = "choice-correct";
      } else {
        choiceClass = "choice-incorrect";
      }
    }
  }

  return (
    <div
      className={"choice p-2 m-2 " + choiceClass}
      onClick={() => {
        if (selectedChoiceId == -1) {
          dispatch(setSelectedChoiceId(choiceId));
          dispatch(
            getCorrectChoices({
              quizId,
              questionId: currentQuestionId,
            })
          );
        }
      }}
    >
      {choice.prompt}
    </div>
  );
}
