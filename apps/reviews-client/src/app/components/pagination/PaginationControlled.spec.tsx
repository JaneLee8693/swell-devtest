import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControlled from './PaginationControlled';

describe('PaginationControlled', () => {
  const totalItems = 30;
  const itemsPerPage = 10;
  const currentPage = 2;
  const onPageChange = jest.fn();

  it('renders PaginationControlled component correctly', () => {
    render(
      <PaginationControlled
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    // Check if the component renders without crashing
    expect(screen.getByTestId('pagination-controlled')).toBeInTheDocument();

    // check if the component renders total pages plus previous/next pages
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onPageChange when a page is clicked', () => {
    render(
      <PaginationControlled
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[2]);

    // Check if onPageChange is called with the correct page number (index starts from 0)
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
