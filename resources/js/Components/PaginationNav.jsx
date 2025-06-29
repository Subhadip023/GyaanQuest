// components/PaginationNav.jsx
import React from "react";

const PaginationNav = ({ currentPage, totalItems, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-transparent hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-blue-500 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationNav;
