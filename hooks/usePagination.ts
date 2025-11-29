import React from "react";

export const usePagination = (data: any[], itemsPerPage: number) => {
  const [page, setPage] = React.useState(1);

  const start = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);

  return { page, setPage, paginatedData };
};
