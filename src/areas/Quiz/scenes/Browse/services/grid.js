export function getTotalPages(cardsPerRow, totalRows, totalQuizzes) {
  let quizzesPerPage = cardsPerRow * totalRows;
  return Math.ceil(totalQuizzes / quizzesPerPage);
}

export function getRowsFromQuizzes(cardsPerRow, totalRows, quizzes) {
  let rowsData = [];
  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    rowsData[rowIndex] = [];
    let rowStartingCardIndex = rowIndex * cardsPerRow;
    let startingCardIndex = rowStartingCardIndex;
    for (
      let cardIndex = startingCardIndex;
      cardIndex < startingCardIndex + cardsPerRow;
      cardIndex++
    ) {
      let cardData = quizzes[cardIndex];
      if (cardData) rowsData[rowIndex].push(cardData);
    }
  }
  return rowsData;
}
