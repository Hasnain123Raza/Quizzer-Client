import { getPagesToGenerate, generatePages } from "../pages.js";
import { Pagination } from "react-bootstrap";

function shouldGenerateLeftEllipsis(totalPages, currentPage) {
  return currentPage > 3;
}

function shouldGenerateRightEllipsis(totalPages, currentPage) {
  return currentPage < totalPages - 2;
}

function getLeftEllipsisPageValue(totalPages, currentPage) {
  let pageValue = currentPage - 4;
  if (pageValue <= 1) {
    return 1;
  } else {
    return pageValue;
  }
}

function getRightEllipsisPageValue(totalPages, currentPage) {
  let pageValue = currentPage + 4;
  if (pageValue >= totalPages) {
    return totalPages;
  } else {
    return pageValue;
  }
}

function generateFirstPagination(props) {
  let { pageChangeCallback } = props;

  return <Pagination.First onClick={() => pageChangeCallback(1)} />;
}

function generatePrevPagination(props) {
  let { currentPage, pageChangeCallback } = props;

  let newPageValue = currentPage - 1;
  if (newPageValue <= 1) {
    newPageValue = 1;
  }
  return <Pagination.Prev onClick={() => pageChangeCallback(newPageValue)} />;
}

function generateLeftEllipse(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;

  return (
    shouldGenerateLeftEllipsis(totalPages, currentPage) && (
      <Pagination.Ellipsis
        onClick={() =>
          pageChangeCallback(getLeftEllipsisPageValue(totalPages, currentPage))
        }
      />
    )
  );
}

function generateExpandedPages(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;
  let pagesToGenerate = getPagesToGenerate(totalPages, currentPage);
  pagesToGenerate.shift();
  pagesToGenerate.pop();
  return generatePages(
    totalPages,
    currentPage,
    pageChangeCallback,
    pagesToGenerate
  );
}

function generateRightEllipse(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;

  return (
    shouldGenerateRightEllipsis(totalPages, currentPage) && (
      <Pagination.Ellipsis
        onClick={() =>
          pageChangeCallback(getRightEllipsisPageValue(totalPages, currentPage))
        }
      />
    )
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

function generateLastPagination(props) {
  let { totalPages, pageChangeCallback } = props;

  return <Pagination.Last onClick={() => pageChangeCallback(totalPages)} />;
}

export default function ExpandedPagination(props) {
  let { totalPages, currentPage, pageChangeCallback } = props;

  return (
    <Pagination>
      {generateFirstPagination(props)}
      {generatePrevPagination(props)}
      <Pagination.Item
        active={1 === currentPage}
        onClick={() => pageChangeCallback(1)}
      >
        1
      </Pagination.Item>
      {generateLeftEllipse(props)}
      {generateExpandedPages(props)}
      {generateRightEllipse(props)}
      <Pagination.Item
        active={totalPages === currentPage}
        onClick={() => pageChangeCallback(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
      {generateNextPagination(props)}
      {generateLastPagination(props)}
    </Pagination>
  );
}
