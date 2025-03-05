import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/fetchRecipes";

export const useRecipes = (search: string) => {
  return useQuery({
    queryKey: ["recipes", search],
    queryFn: () => fetchRecipes(search)
  });
};
