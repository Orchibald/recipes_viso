import { create } from "zustand";

interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  ingredients: string[];
}

interface FavoritesState {
  favorites: FavoriteRecipe[];
  toggleFavorite: (recipe: FavoriteRecipe) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  toggleFavorite: (recipe) => {
    const { favorites } = get();
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    set({
      favorites: isFavorite
        ? favorites.filter((fav) => fav.idMeal !== recipe.idMeal)
        : [...favorites, recipe],
    });
  },
}));
