import axios from "axios";

export const fetchRecipe = async (id: string) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return data.meals[0];
};