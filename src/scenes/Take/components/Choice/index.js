import "./styles.css";

export default function (props) {
  const {
    choice,
    choiceIndex,
    selectedChoice,
    selectedCorrect,
    setSelectCallback,
  } = props;
  const { prompt } = choice;

  return (
    <div
      className={
        "choice p-2 m-2 " +
        (selectedChoice == choiceIndex &&
          (selectedCorrect ? "choice-correct" : "choice-incorrect"))
      }
      onClick={() => {
        if (selectedChoice == -1) {
          setSelectCallback(choiceIndex);
        }
      }}
    >
      {prompt}
    </div>
  );
}
