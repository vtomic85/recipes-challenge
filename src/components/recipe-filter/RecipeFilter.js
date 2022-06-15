import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import "./RecipeFilter.css";

const RecipeFilter = ({ onFilterChanged }) => {
  // Just to prevent anything from happening in case a user presses Enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Event handler for the input field
  const handleFilterChange = (e) => onFilterChanged(e.target.value);

  // Debouncing API requests while the user is typing something
  const debouncedResults = useMemo((e) => {
    return debounce(handleFilterChange, 500);
  }, []);

  // Debounce clean-up
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className="filterContainer" data-testid="filterContainer">
      <form onSubmit={handleSubmit} data-testid="filterForm">
        {/* The type of the input field will be "search" in order to automatically provide an "X" icon to clear the input */}
        <input
          type="search"
          placeholder="Search term"
          onChange={debouncedResults}
          data-testid="filterInputField"
        />
      </form>
    </div>
  );
};

export default RecipeFilter;
