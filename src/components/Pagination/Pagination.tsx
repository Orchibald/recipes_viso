import './Pagination.css';
import usePagination from '../../hooks/usePagination';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  currentPage: number
}

const Pagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }: PaginationProps) => {
  const { totalPages, visiblePages } = usePagination(totalItems, itemsPerPage, currentPage);

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
          <button className="page-button" onClick={() => onPageChange(1)}>
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
          <button className="page-button" onClick={() => onPageChange(totalPages)}>
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
