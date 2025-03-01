import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipePage.css";

const fetchRecipe = async (id: string) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return data.meals[0];
};

const RecipePage = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery({ 
    queryKey: ["recipe", id], 
    queryFn: () => fetchRecipe(id!) 
  });

  if (isLoading) return <div className="container loading">Loading recipe...</div>;
  if (error) return <div className="container error">Error loading recipe.</div>;
  if (!recipe) return <div className="container not-found">Recipe not found.</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure: measure || ""
      });
    }
  }

  return (
    <div className="container recipe-details">
      <header className="recipe-header">
        <h1 className="recipe-title">{recipe.strMeal}</h1>
        <div className="recipe-meta">
          {recipe.strCategory && <span className="badge">Category: {recipe.strCategory}</span>}
          {recipe.strArea && <span className="badge">Cuisine: {recipe.strArea}</span>}
          {recipe.strTags && <span className="badge">Tags: {recipe.strTags}</span>}
        </div>
      </header>

      <div className="recipe-content">
        <div className="recipe-image-container">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="recipe-image"
          />
          {recipe.strYoutube && (
            <div className="video-link">
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="youtube-button"
              >
                Watch Video Tutorial
              </a>
            </div>
          )}
        </div>

        <div className="recipe-ingredients-container">
          <h2 className="section-title">Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index} className="ingredient-item">
                <span className="measure">{item.measure}</span>
                <span className="ingredient">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recipe-instructions-container">
        <h2 className="section-title">Instructions</h2>
        <div className="instructions">
          {recipe.strInstructions.split('\r\n\r\n').map((paragraph: string, index: number) => (
            <p key={index} className="instruction-paragraph">{paragraph}</p>
          ))}
        </div>
      </div>

      {recipe.strSource && (
        <div className="recipe-source">
          <h3 className="source-title">Source</h3>
          <a 
            href={recipe.strSource} 
            target="_blank" 
            rel="noopener noreferrer"
            className="source-link"
          >
            {recipe.strSource}
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipePage;