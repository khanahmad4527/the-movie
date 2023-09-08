import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { Button, Flex, Square } from "@chakra-ui/react";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Flex
      gap="10px"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      margin={"20px auto"}
    >
      <Button
        color="white"
        bg="#032541"
        isDisabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <Square key={`${pageNumber}${Math.random()}${Date.now()}`}>
              &#8230;
            </Square>
          );
        }

        return (
          <Square
            key={`${pageNumber}${Math.random()}${Date.now()}`}
            padding="5px 15px"
            cursor="pointer"
            bgColor={currentPage === pageNumber ? "#032541" : "white"}
            color={currentPage === pageNumber ? "white" : "#032541"}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </Square>
        );
      })}
      <Button
        color="white"
        bg="#032541"
        isDisabled={currentPage === lastPage}
        onClick={onNext}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
