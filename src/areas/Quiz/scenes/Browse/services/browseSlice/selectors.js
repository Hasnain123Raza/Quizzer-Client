import { getTotalPages, getRowsFromQuizzes } from "../grid.js";

export const sGetQuizCount = (state) => state.quiz.browse.quizCount;

export const sGetQuizCountRequestStatus = (state) =>
  state.quiz.browse.quizCountRequestStatus;

export const sGetSimplifiedQuizzes = (state) =>
  state.quiz.browse.simplifiedQuizzes;

export const sGetSimplifiedQuizzesRequestStatus = (state) =>
  state.quiz.browse.simplifiedQuizzesRequestStatus;

export const sGetCurrentPage = (state) => state.quiz.browse.currentPage;

export const sGetTotalPages = (cardsPerRow, totalRows) => (state) =>
  getTotalPages(cardsPerRow, totalRows, sGetQuizCount(state));

export const sGetRows = (cardsPerRow, totalRows) => (state) =>
  getRowsFromQuizzes(
    cardsPerRow,
    totalRows,
    sGetSimplifiedQuizzes(state),
    sGetCurrentPage(state)
  );
