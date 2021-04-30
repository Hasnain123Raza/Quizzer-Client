import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getQuizzes } from "./services/quizzes/selectors.js";
import Paginator from "../../components/Paginator";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import QuizCard from "./components/QuizCard";
import { getTotalPages, getRowsFromQuizzes } from "./services/grid.js";
import { getPage } from "../../services/quiz.js";
import { addQuiz, clearQuizzes } from "./services/quizzes/actions.js";

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

  const queriedPage = query.get("page");
  const quizzes = useSelector(getQuizzes);
  const totalPages = getTotalPages(cardsPerRow, totalRows, quizzes.length);
  const [currentPage, setCurrentPage] = useState(parseInt(queriedPage) || 1);

  const rows = getRowsFromQuizzes(cardsPerRow, totalRows, quizzes, currentPage);

  useEffect(() => {
    async function fetchAPI() {
      const response = await getPage(currentPage - 1, cardsPerRow * totalRows);
      const quizzes = await response.json();

      dispatch(clearQuizzes());
      quizzes.forEach((quiz) => {
        dispatch(addQuiz(quiz));
      });
    }

    fetchAPI();
  }, currentPage);

  return (
    <div className="browse">
      <Container fluid>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((quiz, quizIndex) => (
              <Col className="my-2" md={12 / cardsPerRow} key={quizIndex}>
                <QuizCard quiz={quiz} />
              </Col>
            ))}
          </Row>
        ))}
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
