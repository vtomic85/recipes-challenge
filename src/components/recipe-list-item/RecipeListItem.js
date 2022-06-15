import "./RecipeListItem.css";

const RecipeListItem = ({ recipe, onRecipeDeleted }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onRecipeDeleted(recipe);
  };

  return (
    <div className="recipeListItem" data-testid={`recipeListItem${recipe.id}`}>
      <div className="title">
        <h2>{recipe.title}</h2>
      </div>
      <div className="deleteButtonContainer">
        <button
          className="deleteButton"
          onClick={handleDelete}
          data-testid={`deleteButton${recipe.id}`}
        >
          Delete
        </button>
      </div>
      <div className="description">
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};
export default RecipeListItem;
