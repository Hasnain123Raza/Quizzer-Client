import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getQuiz, clearTake } from "./services/quizTakeSlice";
import { sGetQuizRequestStatus } from "./services/quizTakeSlice/selectors.js";
import LoadingQuizCard from "./components/LoadingQuizCard";
import QuestionCard from "./components/QuestionCard";

export default function () {
  const params = useParams();
  const quizId = params.id;
  const dispatch = useDispatch();

  const quizRequestStatus = useSelector(sGetQuizRequestStatus);
  const quizLoaded = quizRequestStatus == "fulfilled";

  const loadQuiz = () => {
    dispatch(getQuiz(quizId));
  };

  useEffect(() => {
    loadQuiz();

    return function cleanup() {
      dispatch(clearTake());
    };
  }, []);

  return (
    <div className="take">
      {quizLoaded ? <QuestionCard /> : <LoadingQuizCard loadQuiz={loadQuiz} />}
    </div>
  );
}
