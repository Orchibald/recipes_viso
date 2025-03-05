import axios from "axios";
import { RecipeData } from "../types/Recipe";

export const fetchRecipes = async (search: string) => {
  const { data } = await axios.get<RecipeData>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  return data.meals || [];
};