import { useFavoritesStore } from "../../store/favorites";
import { Link } from "react-router-dom";
import { FavBtn } from "../../components/FavBtn/FavBtn";
import './FavoritesPage.css'

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const getIngredients = (recipe: any) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const allIngredients = favorites.reduce((acc, recipe) => {
    const ingredients = getIngredients(recipe);
    if (ingredients.length > 0) {
      return [...acc, ...ingredients];
    }
    return acc;
  }, [] as string[]);

  const uniqueIngredients = [...new Set(allIngredients)];

  if (favorites.length === 0) return <p className="empty-msg">Favorites list is empty 😢</p>;

  return (
    <div className="container">
      <h1>Selected recipes</h1>
      <div className="recipe-list">
        {favorites.map((meal) => {
          const isFavorite = true;
          
          return (
            <div key={meal.idMeal} className="recipe-card">
              <FavBtn onClick={toggleFavorite} meal={meal} isFavorite={isFavorite} />
              <Link to={`/recipe/${meal.idMeal}`} className="recipe-link">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />
                <h3 className="recipe-title">{meal.strMeal}</h3>
                <p className="recipe-info">{meal.strCategory} - {meal.strArea}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <h2>List of ingredients</h2>
      {uniqueIngredients.length > 0 ? (
        <ul className="ingredients-list">
          {uniqueIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>Ingradients aren`t available</p>
      )}
    </div>
  );
};

export default FavoritesPage;
