import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Paginator from "../../components/Paginator";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import QuizCard from "./components/QuizCard";
import LoadingQuizCard from "./components/LoadingQuizCard";
import { getTotalPages, getRowsFromQuizzes } from "./services/grid.js";
import {
  sGetQuizCountRequestStatus,
  sGetQuizCount,
  sGetSimplifiedQuizzesRequestStatus,
  sGetSimplifiedQuizzes,
} from "./services/quizzesSimplifiedSlice/selectors.js";
import {
  getQuizCount,
  getSimplifiedQuizzes,
} from "./services/quizzesSimplifiedSlice";

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

  const quizCountRequestStatus = useSelector(sGetQuizCountRequestStatus);
  const quizCount = useSelector(sGetQuizCount);
  const simplifiedQuizzesRequestStatus = useSelector(
    sGetSimplifiedQuizzesRequestStatus
  );
  const simplifiedQuizzes = useSelector(sGetSimplifiedQuizzes);
  const resourcesLoaded =
    quizCountRequestStatus == "fulfilled" &&
    simplifiedQuizzesRequestStatus == "fulfilled";

  const totalPages =
    quizCountRequestStatus == "fulfilled"
      ? getTotalPages(cardsPerRow, totalRows, quizCount)
      : 1;
  const queriedPage = query.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(queriedPage) || 1);

  const rows =
    simplifiedQuizzesRequestStatus == "fulfilled"
      ? getRowsFromQuizzes(
          cardsPerRow,
          totalRows,
          simplifiedQuizzes,
          currentPage
        )
      : [];

  const loadResources = () => {
    dispatch(getQuizCount());
    dispatch(
      getSimplifiedQuizzes({
        pageIndex: currentPage - 1,
        pageSize: cardsPerRow * totalRows,
      })
    );
  };

  useEffect(() => {
    if (!resourcesLoaded) loadResources();
  }, [currentPage]);

  return (
    <div className="browse">
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
          setCurrentPage(newPage);
        }}
      />
    </div>
  );
}
