import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui-library";
import useTodoStore from "@/hooks/useToDoStore";

const PaginationControl = () => {
  const { currentPage, pageSize, totalItems, setPage } = useTodoStore();
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const generatePaginationLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setPage(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={handlePreviousPage}
            aria-disabled={currentPage === 1}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />

          {generatePaginationLinks()}

          <PaginationNext
            onClick={handleNextPage}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationControl;
