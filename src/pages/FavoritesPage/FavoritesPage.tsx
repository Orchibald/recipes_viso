import { useMemo } from "react";
import { useFavoritesStore } from "../../store/favorites";
import { Link } from "react-router-dom";
import { FavBtn } from "../../components/FavBtn/FavBtn";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const getIngredients = (recipe: any) => {
    const ingredients: string[] = [];

    Object.keys(recipe).forEach((key) => {
      if (key.startsWith("strIngredient") && recipe[key]?.trim()) {
        const index = key.replace("strIngredient", "");
        const measure = recipe[`strMeasure${index}`] || "";
        ingredients.push(`${measure} ${recipe[key]}`.trim());
      }
    });

    return ingredients;
  };

  const uniqueIngredients = useMemo(() => {
    const ingredientCounts = favorites.reduce((acc, recipe) => {
      const ingredients = getIngredients(recipe);
      ingredients.forEach((ingredient) => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(ingredientCounts).map(
      ([ingredient, count]) => `${ingredient} x${count}`
    );
  }, [favorites]);

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
        <p>Ingredients aren’t available</p>
      )}
    </div>
  );
};

export default FavoritesPage;
