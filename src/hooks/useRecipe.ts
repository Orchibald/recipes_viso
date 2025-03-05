import { useQuery } from "@tanstack/react-query";
import { fetchRecipe } from "../api/fetchRecipe";

export const useRecipe = (id: string | undefined) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipe(id!),
    enabled: !!id,
  });
};
