import { create } from "zustand";
import { Recipe } from "../types/Recipe";

interface FavoritesState {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  toggleFavorite: (recipe) => {
    const { favorites } = get();
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    set({
      favorites: isFavorite
        ? favorites.filter((fav) => fav.idMeal !== recipe.idMeal)
        : [
            ...favorites,
            {
              ...recipe,
            },
          ],
    });
  },
  
}));
