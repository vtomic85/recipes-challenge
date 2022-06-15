import { useEffect, useState } from "react";
import Pagination from "./components/pagination/Pagination";
import RecipesList from "./components/recipes-list/RecipesList";
import "./App.css";
import RecipeFilter from "./components/recipe-filter/RecipeFilter";

function App() {
  // Default page will be 1 whenever something changes (e.g. filter value)
  const [activePage, setActivePage] = useState(0);
  // Total number of pages (for the Pagination widget)
  const [totalPages, setTotalPages] = useState(0);
  // List of recipes to show
  const [recipes, setRecipes] = useState([]);

  // A function which will fetch recipes from the API, with or without search query (filter) or page number
  const fetchRecipes = (search, page) => {
    // Form the URL first, based on the presence of the two parameters
    let URL = `${process.env.REACT_APP_BACKEND_URL}${
      search !== null ? "?search=" + search : ""
    }${page !== null ? "?page=" + page : ""}`;

    // Call the API and set the recipes list, the active page number and the total number of pages
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setActivePage(data.currentPage);
        setTotalPages(data.totalPages);
      });
  };

  // Do the real call when the page loads
  useEffect(() => {
    fetchRecipes(null, null);
  }, []);

  // A function which will call the API when a user deletes a recipe
  const onRecipeDeleted = (recipe) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${recipe.id}`, {
      method: "DELETE",
    })
      .then((res) => fetchRecipes(null, null))
      .catch((err) => console.log("Handle the exception if needed"));
  };

  // When a user clicks a new page, call the API with the "page" parameter
  const onPageChange = (page) => {
    fetchRecipes(null, page);
  };

  // When the filter value changes, call the API with the "search" parameter
  const onFilterChanged = (search) => {
    fetchRecipes(search, null);
  };

  return (
    <div className="container">
      <h1 data-testid="h1">Recipes Overview</h1>
      <RecipeFilter onFilterChanged={onFilterChanged} />
      <RecipesList recipes={recipes} onRecipeDeleted={onRecipeDeleted} />
      <Pagination
        activePage={activePage}
        totalPages={totalPages}
        siblings={1}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default App;
