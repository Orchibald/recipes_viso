import './Pagination.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
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
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="pagination">
      <button 
        className="prev-button" 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀
      </button>

      {totalPages > 3 && currentPage > 2 && (
        <>
          <button 
            className="page-button" 
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {currentPage > 3 && <span className="dots">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button 
          key={page} 
          className={`page-button ${currentPage === page ? 'active' : ''}`} 
          disabled={currentPage === page} 
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {totalPages > 3 && currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span className="dots">...</span>}
          <button 
            className="page-button" 
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button 
        className="next-button" 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
