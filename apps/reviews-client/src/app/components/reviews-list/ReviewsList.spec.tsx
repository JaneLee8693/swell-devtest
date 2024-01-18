import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ReviewsList } from './ReviewsList';
import * as reviewsData from '../../context/reviewsData';

// Mock data for testing
const mockReview1 = {
  id: '122',
  reviewerId: 'user-2',
  companyId: 'company-2',
  reviewText: 'Great product!',
  rating: 5,
  createdOn: '2024-09-01T00:00:00.000Z',
  user: {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
  },
  company: {
    id: 'company-2',
    name: 'Swell company',
  },
};

const mockReview2 = {
  id: '222',
  reviewerId: 'user-1',
  companyId: 'company-1',
  rating: 1,
  reviewText: '',
  createdOn: '2024-01-01T00:00:00.000Z',
  user: {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  },
  company: {
    id: 'company-1',
    name: 'Test company',
  },
};

// Mock the fetchReviews function from your context file
jest.mock('../../context/reviewsData', () => ({
  getReviews: jest.fn(() => Promise.resolve({ reviews: [mockReview1, mockReview2], error: null })),
}));

describe('ReviewsList', () => {
  it('should render successfully', async () => {
    render(<ReviewsList />);
    await waitFor(() => screen.getByTestId('loading-msg')); // Wait for loading message to appear and then disappear
    expect(screen.queryByTestId('loading-msg')).toBeNull();
    expect(screen.getByText('Reviews:')).toBeInTheDocument();
  });

  it('should display loading message while fetching reviews', async () => {
    render(<ReviewsList />);
        expect(screen.getByTestId('loading-msg')).toBeInTheDocument();
  
    // Use act to wait for the asynchronous code to complete
    await act(async () => {
      // Simulate the delay for fetching reviews (adjust the delay based on your asynchronous code)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  
    // Check if the loading message is removed after the delay
    expect(screen.queryByTestId('loading-msg')).not.toBeInTheDocument();
  });

  it('should display message if no reviews are found', async () => {
    // Mock the fetchReviews function to return an empty array
    jest.spyOn(reviewsData, 'getReviews').mockResolvedValueOnce({ reviews: [], error: null });
    render(<ReviewsList />);
    await waitFor(() => screen.getByTestId('loading-msg'));
    expect(screen.getByText('No reviews found.')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-msg')).not.toBeInTheDocument();
    expect(screen.queryByText('Error retrieving review data. Reload the page to try again.')).not.toBeInTheDocument();
  });

  it('should handle errors and display the error message', async () => {
    // Mock the fetchReviews function to throw an error
    jest.spyOn(reviewsData, 'getReviews').mockRejectedValueOnce(new Error('Mock fetch error'));
    render(<ReviewsList />);
    await waitFor(() => screen.getByText('Error retrieving review data. Reload the page to try again.'));
    expect(screen.getByText('Error retrieving review data. Reload the page to try again.')).toBeInTheDocument();
  });

  it('should filter reviews based on search keyword', async () => {
    // Mock the fetchReviews function to return a list of reviews
    jest.spyOn(reviewsData, 'getReviews').mockResolvedValueOnce({ reviews: [mockReview1, mockReview2], error: null });
    render(<ReviewsList />);
    await waitFor(() => screen.getByTestId('loading-msg'));

    expect(screen.getAllByTestId('review-card')).toHaveLength(2);

    const searchInput = screen.getByPlaceholderText('Search reviews...');
    fireEvent.change(searchInput, { target: { value: 'Great' } });

    await waitFor(() => screen.getAllByTestId('review-card'));
    expect(screen.getAllByTestId('review-card')).toHaveLength(1);
  });

  it('should display message if no matching reviews are found', async () => {
    jest.spyOn(reviewsData, 'getReviews').mockResolvedValueOnce({ reviews: [mockReview1, mockReview2], error: null });
    render(<ReviewsList />);
    
    // Wait for the loading message to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('loading-msg')).not.toBeInTheDocument();
    });
  
    const searchInput = screen.getByPlaceholderText('Search reviews...');
  
    // Set the search input value to a non-existent name
    fireEvent.change(searchInput, { target: { value: 'NonExistentName' } });
  
    // Wait for the component to update based on the search input
    await waitFor(() => {
      const noReviewsFoundElement = screen.queryByText('No reviews found');
      
      expect(noReviewsFoundElement).toBeNull();
    });
  });
});
