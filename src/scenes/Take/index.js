import { Card, Button, ProgressBar } from "react-bootstrap";
import { getQuizById } from "../Browse/services/quizzes/selectors.js";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import Question from "./components/Question";

export default function () {
  const params = useParams();
  const quizId = params.id;
  const quiz = useSelector(getQuizById(quizId));

  const questions = quiz.questions;
  const totalQuestions = questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  const [selectedChoice, setSelectedChoice] = useState(-1);
  const [selectedCorrect, setSelectedCorrect] = useState(false);
  const setSelectCallback = (choiceIndex) => {
    if (selectedChoice == -1) {
      setSelectedChoice(choiceIndex);
      const correct = currentQuestion.choices[choiceIndex].correct;
      setSelectedCorrect(correct);
      if (correct) {
        setCorrectQuestions((value) => value + 1);
      } else {
        setWrongQuestions((value) => value + 1);
      }
    }
  };

  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);

  const title = `${quiz.title}: ${questionIndex + 1}/${totalQuestions}`;

  return (
    <div className="take">
      <Card className="m-4">
        <Card.Header>
          <h3>{title}</h3>
        </Card.Header>
        <Card.Body>
          <Question
            question={currentQuestion}
            selectedChoice={selectedChoice}
            selectedCorrect={selectedCorrect}
            setSelectCallback={setSelectCallback}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex align-items-baseline">
            <ProgressBar style={{ flex: 1 }}>
              <ProgressBar
                variant="success"
                now={(100 * correctQuestions) / totalQuestions}
                key={1}
              />
              <ProgressBar
                variant="danger"
                now={(100 * wrongQuestions) / totalQuestions}
                key={2}
              />
            </ProgressBar>
            <LinkContainer exact to={"/open/" + quizId}>
              <Button className="ml-3" variant="danger">
                Quit
              </Button>
            </LinkContainer>
            {questionIndex + 1 < totalQuestions ? (
              <Button
                variant="success"
                onClick={() => {
                  if (selectedChoice == -1) {
                    if (selectedCorrect) {
                      setCorrectQuestions((value) => value + 1);
                    } else {
                      setWrongQuestions((value) => value + 1);
                    }
                  }
                  setQuestionIndex((value) => value + 1);
                  setSelectedChoice(-1);
                  setSelectedCorrect(false);
                }}
              >
                Next
              </Button>
            ) : (
              <Button variant="success">Results</Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
