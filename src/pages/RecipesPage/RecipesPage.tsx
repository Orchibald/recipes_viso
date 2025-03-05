import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedValue } from "../../hooks/useDebounceValue";
import { useRecipes } from "../../hooks/useRecipes";
import { useFavoritesStore } from "../../store/favorites";
import Pagination from "../../components/Pagination/Pagination";
import { FavBtn } from "../../components/FavBtn/FavBtn";
import Loader from "../../components/Loader/Loader";
import "./RecipesPage.css";

const ITEMS_PER_PAGE = 4;

const RecipesPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate(); // useNavigate замість useHistory

  // Витягування параметрів з URL
  const urlParams = new URLSearchParams(search);
  const initialSearch = urlParams.get("search") || "";
  const initialCategory = urlParams.get("category") || "";
  const initialPage = Number(urlParams.get("page")) || 1;

  const [searchValue, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [categories, setCategories] = useState<string[]>([]);

  const debouncedSearch = useDebouncedValue(searchValue, 500);
  const { data: recipes, isLoading } = useRecipes(debouncedSearch);
  const { favorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    if (recipes) {
      const uniqueCategories = Array.from(new Set(recipes.map((recipe) => recipe.strCategory))).sort();
      setCategories(uniqueCategories);
    }
  }, [recipes]);

  // Оновлення URL при зміні параметрів
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    if (selectedCategory) params.set("category", selectedCategory);
    if (currentPage > 1) params.set("page", currentPage.toString());

    navigate({ search: params.toString() }); // використовуємо navigate для оновлення URL
  }, [searchValue, selectedCategory, currentPage, navigate]);

  const filteredRecipes = selectedCategory
    ? recipes?.filter((recipe) => recipe.strCategory === selectedCategory) ?? []
    : recipes ?? [];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const renderedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          value={searchValue}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="category-filter">
          <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(searchValue || selectedCategory) && (
            <button onClick={handleResetFilters} className="reset-filters-btn">
              Reset filters
            </button>
          )}
        </div>
      </div>

      {renderedRecipes.length > 0 ? (
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
        totalItems={filteredRecipes.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default RecipesPage;
