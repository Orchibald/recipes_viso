import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { receiptData } from "../types/Recipe";

export const useRecipes = (search: string) => {
  return useQuery({
    queryKey: ["recipes", search],
    queryFn: async () => {
      const { data } = await axios.get<receiptData>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      return data.meals || [];
    },
  });
};
