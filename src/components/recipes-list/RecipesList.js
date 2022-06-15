import RecipeListItem from "../recipe-list-item/RecipeListItem";
import "./RecipesList.css";

const RecipesList = ({ recipes, onRecipeDeleted }) => {
  return (
    <div className="listContainer" data-testid="listContainer">
      <ul data-testid="listOfRecipes">
        {recipes.map((recipe) => (
          <li key={`recipe${recipe.id}`}>
            <RecipeListItem recipe={recipe} onRecipeDeleted={onRecipeDeleted} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecipesList;
