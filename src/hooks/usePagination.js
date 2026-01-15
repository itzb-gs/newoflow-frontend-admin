import { useState } from 'react';

/**
 * Pagination hook
 * @param {number} initialPage - Initial page number
 * @param {number} initialPerPage - Initial items per page
 * @returns {Object} Pagination state and functions
 */
export const usePagination = (initialPage = 1, initialPerPage = 10) => {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (pageNum) => setPage(Math.max(1, pageNum));
  const reset = () => setPage(initialPage);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
};
