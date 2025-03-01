import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "../hooks/useDebounceValue";
import { useRecipes } from "../hooks/useRecipes";
import { useFavoritesStore } from "../store/favorites";
import { Recipe } from "../types/Recipe";

const ITEMS_PER_PAGE = 4;

const RecipesPage = () => {
  const [search, setSearch] = useState("");
  const [renderedRecipes, setRenderedRecipes] = useState<Recipe[]>([]);
  const debouncedSearch = useDebouncedValue(search, 500);
  const { data: recipes, isLoading } = useRecipes(debouncedSearch);

  const { favorites, toggleFavorite } = useFavoritesStore();


  const [currentPage, setCurrentPage] = useState(1);

  console.log(currentPage);
  

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    if (recipes) {
      const paginatedRecipes = recipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setRenderedRecipes(paginatedRecipes);
    }
  }, [recipes, currentPage])

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Пошук рецепту..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="recipe-list">
        {renderedRecipes && renderedRecipes.map((meal) => {
          const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

          return (
            <div key={meal.idMeal} className="recipe-card">
              <button
                className={`favorite-btn ${isFavorite ? "active" : ""}`}
                onClick={() =>
                  toggleFavorite({
                    idMeal: meal.idMeal,
                    strMeal: meal.strMeal,
                    strMealThumb: meal.strMealThumb,
                    strCategory: meal.strCategory,
                    strArea: meal.strArea,
                    strInstructions: "",
                    ingredients: [],
                  })
                }
              >
                ❤️
              </button>
              <Link to={`/recipe/${meal.idMeal}`} className="recipe-link">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />
                <h3 className="recipe-title">{meal.strMeal}</h3>
                <p className="recipe-info">{meal.strCategory} - {meal.strArea}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <Pagination
        totalItems={recipes?.length ?? 0}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RecipesPage;
