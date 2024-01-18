import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationControlledProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControlled: React.FC<PaginationControlledProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        data-testid="pagination-controlled"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        sx={{display: 'flex', mt: '20px', justifyContent: 'center', gap: '10px'}}
      />
    </Stack>
  );
};

export default PaginationControlled;
