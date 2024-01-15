import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReviewsList } from './reviews-list';
import * as reviewsData from '../../context/reviewsData'

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
}

// Mock the fetchReviews function from your context file
jest.mock('../../context/reviewsData', () => ({
	getReviews: jest.fn(() => Promise.resolve({ reviews: [mockReview1, mockReview2] })),
  }));

describe('ReviewsList', () => {
  it('should render successfully', async () => {
    render(<ReviewsList />);
    await waitFor(() => screen.getByTestId('loading-msg')); // Wait for loading message to disappear
    expect(screen.getByText('Reviews:')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-msg')).not.toBeInTheDocument();
    expect(screen.queryByText('No reviews found.')).not.toBeInTheDocument();
    expect(screen.queryByText('Error retrieving review data. Reload the page to try again.')).not.toBeInTheDocument();
  });

  it('should display loading message while fetching reviews', async () => {
    // Mock the fetchReviews function to simulate loading
    const getReviewsMock = jest.spyOn(reviewsData, 'getReviews');
    getReviewsMock.mockImplementationOnce(() => new Promise(() => {})); // Simulate loading promise

    render(<ReviewsList />);
    expect(screen.getByTestId('loading-msg')).toBeInTheDocument(); // Loading message should be present initially
    await waitFor(() => screen.getByText('Reviews:'));
    expect(screen.getByTestId('loading-msg')).not.toBeInTheDocument(); // Loading message should disappear
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
    await waitFor(() => screen.getByTestId('loading-msg'));
    const searchInput = screen.getByPlaceholderText('Search reviews...');

    fireEvent.change(searchInput, { target: { value: 'NonExistentName' } });
    await waitFor(() => screen.getByText('No matching reviews'));
    expect(screen.getByText('No matching reviews')).toBeInTheDocument();
  });
});
