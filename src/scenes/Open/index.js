import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import QuizCard from "./components/QuizCard";
import LoadingQuizCard from "./components/LoadingQuizCard";
import {
  sGetSimplifiedQuizRequestStatus,
  sGetSimplifiedQuiz,
} from "./services/openQuizSlice/selectors.js";
import { getSimplifiedQuiz } from "./services/openQuizSlice";
import { useEffect } from "react";

export default function () {
  const dispatch = useDispatch();
  const params = useParams();
  const quizId = params.id;

  const simplifiedQuiz = useSelector(sGetSimplifiedQuiz);
  const simplifiedQuizRequestStatus = useSelector(
    sGetSimplifiedQuizRequestStatus
  );

  const resourcesLoaded = simplifiedQuizRequestStatus == "fulfilled";

  const loadResources = () => {
    dispatch(getSimplifiedQuiz(quizId));
  };

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="open">
      {resourcesLoaded ? (
        <QuizCard simplifiedQuiz={simplifiedQuiz} />
      ) : (
        <LoadingQuizCard loadResources={loadResources} />
      )}
    </div>
  );
}
