import { useFavoritesStore } from "../store/favorites";

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  const allIngredients = favorites.reduce((acc, recipe) => {
    return [...acc, ...recipe.ingredients];
  }, [] as string[]);

  if (favorites.length === 0) return <p className="empty-msg">Немає вибраних рецептів 😢</p>;

  return (
    <div className="container">
      <h1>Вибрані рецепти</h1>
      <div className="recipe-list">
        {favorites.map((meal) => (
          <div key={meal.idMeal} className="recipe-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />
            <h3 className="recipe-title">{meal.strMeal}</h3>
            <p className="recipe-info">{meal.strCategory} - {meal.strArea}</p>
          </div>
        ))}
      </div>

      <h2>Список інгредієнтів</h2>
      <ul className="ingredients-list">
        {Array.from(new Set(allIngredients)).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
