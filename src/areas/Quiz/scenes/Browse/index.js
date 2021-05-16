import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuizCount,
  getSimplifiedQuizzes,
  reset,
  setCurrentPage,
} from "./services/browseSlice";
import {
  sGetCurrentPage,
  sGetQuizCountRequestStatus,
  sGetSimplifiedQuizzesRequestStatus,
  sGetRows,
  sGetTotalPages,
} from "./services/browseSlice/selectors.js";
import Paginator from "../../../../components/Paginator";
import LoadingQuizCard from "./components/LoadingQuizCard";
import QuizCard from "./components/QuizCard";

const cardsPerRow = 3;
const totalRows = 4;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function () {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();
  const history = useHistory();

  const currentPage = useSelector(sGetCurrentPage);
  const queriedPage = parseInt(query.get("page")) || 1;
  if (queriedPage !== currentPage) dispatch(setCurrentPage(queriedPage));

  const totalPages = useSelector(sGetTotalPages(cardsPerRow, totalRows));
  const rows = useSelector(sGetRows(cardsPerRow, totalRows));

  const quizCountRequestStatus = useSelector(sGetQuizCountRequestStatus);
  const simplifiedQuizzesRequestStatus = useSelector(
    sGetSimplifiedQuizzesRequestStatus
  );
  const resourcesLoaded =
    quizCountRequestStatus == "fulfilled" &&
    simplifiedQuizzesRequestStatus == "fulfilled";

  const loadResources = () => {
    dispatch(getQuizCount());
    dispatch(getSimplifiedQuizzes(cardsPerRow * totalRows));
  };

  useEffect(() => {
    loadResources();
  }, [currentPage]);

  useEffect(() => {
    return function cleanup() {
      dispatch(reset());
    };
  }, []);

  return (
    <div className="quiz-browse">
      <Container fluid>
        {!resourcesLoaded ? (
          <Row>
            <Col className="my-2">
              <LoadingQuizCard loadResources={loadResources} />
            </Col>
          </Row>
        ) : (
          rows.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((quiz, quizIndex) => (
                <Col className="my-2" md={12 / cardsPerRow} key={quizIndex}>
                  <QuizCard quiz={quiz} />
                </Col>
              ))}
            </Row>
          ))
        )}
      </Container>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        pageChangeCallback={(newPage) => {
          query.set("page", newPage);
          history.push(location.pathname + "?" + query.toString());
        }}
      />
    </div>
  );
}
