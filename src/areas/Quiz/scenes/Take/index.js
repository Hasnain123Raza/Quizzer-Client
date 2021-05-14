import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUnrevealedQuiz, reset } from "./services/takeSlice";
import { sGetQuizRequestStatus } from "./services/takeSlice/selectors.js";
import LoadingQuizCard from "./components/LoadingQuizCard";
import QuestionCard from "./components/QuestionCard";

export default function () {
  const params = useParams();
  const quizId = params.id;
  const dispatch = useDispatch();

  const quizRequestStatus = useSelector(sGetQuizRequestStatus);
  const quizLoaded = quizRequestStatus == "fulfilled";

  const loadQuiz = () => {
    dispatch(getUnrevealedQuiz(quizId));
  };

  useEffect(() => {
    loadQuiz();

    return function cleanup() {
      dispatch(reset());
    };
  }, []);

  return (
    <div className="quiz-take">
      {quizLoaded ? <QuestionCard /> : <LoadingQuizCard loadQuiz={loadQuiz} />}
    </div>
  );
}
