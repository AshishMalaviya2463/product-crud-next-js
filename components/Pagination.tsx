import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  if (startPage > totalPages - maxVisiblePages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }
  endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) pageNumbers.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageNumbers.push("...");
    if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
      pageNumbers.push(totalPages);
    }
  }

  const renderButton = (
    content: number | string,
    key: string | number,
    disabled: boolean = false
  ) => {
    const isPageNumber = typeof content === "number";
    const isActive = isPageNumber && content === currentPage;

    const baseClasses =
      "min-w-[40px] h-10 px-3 flex items-center justify-center border text-sm font-medium transition-colors duration-150";
    const activeClasses = "bg-teal-600 text-white! border-teal-600 shadow-md";
    const defaultClasses =
      "bg-white text-gray-700! border-gray-300 hover:bg-gray-100";
    const disabledClasses =
      "bg-gray-100 text-gray-400! cursor-not-allowed border-gray-300";

    const classes = disabled
      ? disabledClasses
      : isActive
      ? activeClasses
      : defaultClasses;

    return (
      <button
        key={key}
        className={`${baseClasses} ${classes} ${
          isPageNumber ? "rounded-md" : "rounded-none"
        } cursor-pointer`}
        onClick={() => {
          if (isPageNumber && !disabled) {
            onPageChange(content as number);
          }
        }}
        disabled={disabled || !isPageNumber}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      className="flex items-center justify-center py-6 space-x-2"
      aria-label="Pagination"
    >
      {pageNumbers.map((page, index) => {
        if (typeof page === "number") {
          return renderButton(page, page);
        }
        return renderButton("...", `ellipsis-${index}`, true);
      })}
    </nav>
  );
};

export default Pagination;
