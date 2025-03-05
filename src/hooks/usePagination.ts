import { useMemo } from "react";

const usePagination = (totalItems: number, itemsPerPage: number, currentPage: number) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  return {
    totalPages,
    visiblePages,
  };
};

export default usePagination;
