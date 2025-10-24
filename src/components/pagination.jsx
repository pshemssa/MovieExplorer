// src/components/Pagination.jsx
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const delta = 2;

  pageNumbers.push(1);
  if (currentPage > delta + 2) pageNumbers.push('...');
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    pageNumbers.push(i);
  }
  if (currentPage < totalPages - delta - 1) pageNumbers.push('...');
  if (totalPages > 1) pageNumbers.push(totalPages);

  const prevBtnClasses =
    'px-3 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ' +
    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600';

  const pageBtnClasses = (page) =>
    'px-3 py-2 rounded-md transition-colors ' +
    (page === currentPage
      ? 'bg-blue-600 text-white font-medium'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600');

  return (
    <nav className="flex justify-center items-center space-x-1 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={prevBtnClasses}
        aria-label="Previous page"
      >
        Previous
      </button>

      {pageNumbers.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={pageBtnClasses(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={prevBtnClasses}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;