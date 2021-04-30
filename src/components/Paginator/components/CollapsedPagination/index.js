import { getPagesToGenerate, generatePages } from "../pages.js";
import { Pagination } from "react-bootstrap";

function generatePrevPagination(props) {
  let { currentPage, pageChangeCallback } = props;

  let newPageValue = currentPage - 1;
  if (newPageValue <= 1) {
    newPageValue = 1;
  }
  return <Pagination.Prev onClick={() => pageChangeCallback(newPageValue)} />;
}

function generateCollapsedPages(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;

  return generatePages(
    totalPages,
    currentPage,
    pageChangeCallback,
    getPagesToGenerate(totalPages, currentPage, pageChangeCallback)
  );
}

function generateNextPagination(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;

  let newPageValue = currentPage + 1;
  if (newPageValue >= totalPages) {
    newPageValue = totalPages;
  }
  return <Pagination.Next onClick={() => pageChangeCallback(newPageValue)} />;
}

export default function CollapsedPagination(props) {
  return (
    <Pagination>
      {generatePrevPagination(props)}
      {generateCollapsedPages(props)}
      {generateNextPagination(props)}
    </Pagination>
  );
}
