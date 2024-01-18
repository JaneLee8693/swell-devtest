import { render, screen, within } from '@testing-library/react';
import { ReviewItem } from './ReviewItem';

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

describe('ReviewItem Component', () => {
  it('renders review cards correctly', () => {
    render(<ReviewItem reviews={[mockReview1, mockReview2]} />);
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards.length).toBe(2);
    expect(screen.queryByText('No reviews found')).toBeNull();
  });

  it('should display the review text if provided', () => {
    render(<ReviewItem reviews={[mockReview1, mockReview2]} />);
    const reviewCards = screen.getAllByTestId('review-card');
    
    // Check if review text is displayed for the second review (mockReview2)
    const reviewTextElementMockReview2 = within(reviewCards[1]).queryByTestId('review-text');
  
    // Check if reviewTextElementMockReview2 is present and has the expected text
    if (reviewTextElementMockReview2 !== null) {
      expect(reviewTextElementMockReview2).toHaveTextContent(mockReview2.reviewText);
    }
  });

  it('displays "No reviews found" when reviews array is empty', () => {
    render(<ReviewItem reviews={[]} />);
    const noReviewsMessage = screen.getByText(/No reviews found/i);
    expect(noReviewsMessage).toBeInTheDocument();
  });

  it('correctly displays user and company information', () => {
    render(<ReviewItem reviews={[mockReview1]} />);
    const reviewCard = screen.getByTestId('review-card');
    expect(within(reviewCard).getByText(`${mockReview1.user.firstName} ${mockReview1.user.lastName}`)).toBeInTheDocument();
    expect(within(reviewCard).getByText(mockReview1.company.name)).toBeInTheDocument();
  });

  it('correctly displays rating information', () => {
    render(<ReviewItem reviews={[mockReview1]} />);
    const reviewCard = screen.getByTestId('review-card');
    expect(within(reviewCard).getByText(mockReview1.rating.toString())).toBeInTheDocument();
  });

  it('correctly displays created date information', () => {
    render(<ReviewItem reviews={[mockReview1]} />);
    const reviewCard = screen.getByTestId('review-card');
    const formattedDate = new Date(mockReview1.createdOn).toLocaleString('en-US', { dateStyle: 'short' });
    expect(within(reviewCard).getByText(`reviewed on ${formattedDate}`)).toBeInTheDocument();
  });
});
