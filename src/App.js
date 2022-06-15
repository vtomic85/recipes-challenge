import { useEffect, useState } from "react";
import Pagination from "./components/pagination/Pagination";
import RecipesList from "./components/recipes-list/RecipesList";
import "./App.css";
import RecipeFilter from "./components/recipe-filter/RecipeFilter";

function App() {
  // Default page will be 1 whenever something changes (e.g. filter)
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Initial list of recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch all recipes from the API
  const fetchRecipes = () =>
    fetch(process.env.REACT_APP_BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setActivePage(data.currentPage);
        setTotalPages(data.totalPages);
      });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRecipeDeleted = (recipe) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${recipe.id}`, {
      method: "DELETE",
    })
      .then((res) => fetchRecipes())
      .catch((err) => console.log("Handle the exception if needed"));
  };

  const onPageChange = (page) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setActivePage(data.currentPage);
        setTotalPages(data.totalPages);
      });
  };

  const onFilterChanged = (filterValue) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}?search=${filterValue}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setActivePage(data.currentPage);
        setTotalPages(data.totalPages);
      });
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
