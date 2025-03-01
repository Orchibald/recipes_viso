import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "../../hooks/useDebounceValue";
import { useRecipes } from "../../hooks/useRecipes";
import { useFavoritesStore } from "../../store/favorites";
import { Recipe } from "../../types/Recipe";
import Pagination from "../../components/Pagination/Pagination";
import { FavBtn } from "../../components/FavBtn/FavBtn";
import './RecipesPage.css';
import Loader from "../../components/Loader/Loader";

const ITEMS_PER_PAGE = 4;

const RecipesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [renderedRecipes, setRenderedRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const debouncedSearch = useDebouncedValue(search, 500);
  const { data: recipes, isLoading } = useRecipes(debouncedSearch);

  const { favorites, toggleFavorite } = useFavoritesStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (recipes) {
      const uniqueCategories = Array.from(
        new Set(recipes.map((recipe) => recipe.strCategory))
      ).sort();
      setCategories(uniqueCategories);
    }
  }, [recipes, currentPage]);

  useEffect(() => {
    if (recipes) {
      let filteredRecipes = recipes;

      if (selectedCategory) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.strCategory === selectedCategory
        );
      }

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedRecipes = filteredRecipes.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
      setRenderedRecipes(paginatedRecipes);
    }
  }, [recipes, selectedCategory, currentPage]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSearch("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(search || selectedCategory) && (
            <button
              onClick={handleResetFilters}
              className="reset-filters-btn"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {renderedRecipes && renderedRecipes.length > 0 ? (
        <div className="recipe-list">
          {renderedRecipes.map((meal) => {
            const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

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
      ) : (
        <p className="no-results">Recipes not found</p>
      )}

      <Pagination
        totalItems={(recipes && selectedCategory)
          ? recipes.filter(r => r.strCategory === selectedCategory).length
          : recipes?.length ?? 0}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RecipesPage;
