import './Pagination.css'

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = totalPages > 3 ? [...Array(3)].map((_, i) => i + 1) : [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="pagination">
      <button 
        className="prev-button" 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀
      </button>
      
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

      {totalPages > 3 && <span className="dots">...</span>}
      
      {totalPages > 3 && (
        <button 
          className={`page-button ${currentPage === totalPages ? 'active' : ''}`} 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
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
