import { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({ activePage, totalPages, siblings, onPageChange }) => {
  const leftSibling = Math.max(activePage - siblings, 1);
  const rightSibling = Math.min(activePage + siblings, totalPages);
  const shouldShowLeftDots = activePage > siblings + 2;
  const shouldShowRightDots = activePage < totalPages - siblings - 1;

  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Reset
    setButtons([]);

    // Push the button for the first page
    if (activePage > 1 + siblings) {
      setButtons((prevState) => [
        ...prevState,
        <button
          key="button1"
          className={`paginationButton ${
            activePage === 1 ? "highlighted" : ""
          }`}
          onClick={() => onPageChange(1)}
          data-testid="paginationButton1"
          disabled={activePage === 1}
        >
          1
        </button>,
      ]);
    }

    // Push "..." if needed
    if (shouldShowLeftDots)
      setButtons((prevState) => [
        ...prevState,
        <span key="leftDots" className="dots">
          &#8943;
        </span>,
      ]);

    // Push the current page and its siblings
    for (let i = leftSibling; i <= rightSibling; i++) {
      setButtons((prevState) => [
        ...prevState,
        <button
          key={`button${i}`}
          className={`paginationButton ${
            activePage === i ? "highlighted" : ""
          }`}
          onClick={() => onPageChange(i)}
          data-testid={`paginationButton${i}`}
          disabled={activePage === i}
        >
          {i}
        </button>,
      ]);
    }

    // Push "..." if needed (again)
    if (shouldShowRightDots)
      setButtons((prevState) => [
        ...prevState,
        <span key="rightDots" className="dots">
          &#8943;
        </span>,
      ]);

    // Push the last page
    if (totalPages > 1 && activePage < totalPages - siblings) {
      setButtons((prevState) => [
        ...prevState,
        <button
          key={`button${totalPages}`}
          className={`paginationButton ${
            activePage === totalPages ? "highlighted" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
          data-testid={`paginationButton${totalPages}`}
          disabled={activePage === totalPages}
        >
          {totalPages}
        </button>,
      ]);
    }
  }, [
    activePage,
    totalPages,
    siblings,
    onPageChange,
    shouldShowLeftDots,
    shouldShowRightDots,
    leftSibling,
    rightSibling,
  ]);

  return <div className="paginationContainer">{buttons}</div>;
};
export default Pagination;
