import { useState } from "react";
import Choice from "../Choice";

export default function (props) {
  const {
    question,
    selectedChoice,
    selectedCorrect,
    setSelectCallback,
  } = props;

  return (
    <div>
      <h5>{question.prompt}</h5>
      <hr />
      {question.choices.map((choice, choiceIndex) => (
        <Choice
          key={choiceIndex}
          choice={choice}
          choiceIndex={choiceIndex}
          selectedChoice={selectedChoice}
          selectedCorrect={selectedCorrect}
          setSelectCallback={setSelectCallback}
        />
      ))}
    </div>
  );
}
