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
    const visiblePages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage <= 2) {
      visiblePages.push(1, 2, 3);
    } else if (currentPage >= totalPages - 1) {
      visiblePages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      visiblePages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    return visiblePages;
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

      {currentPage > 2 && (
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

      {currentPage < totalPages - 1 && (
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
