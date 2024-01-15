import { render, screen, within } from '@testing-library/react';
import { ReviewItem } from './review-item';

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


describe('ReviewItem Component', () => {
  it('renders component correctly', () => {
    const { baseElement } = render(<ReviewItem reviews={[]} />);
    expect(baseElement).toBeTruthy();

  });

  it('renders review cards correctly', () => {
    render(<ReviewItem reviews={[mockReview1, mockReview2]} />);
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards).toBeInTheDocument();
    expect(reviewCards.length).toBe(2);
    expect(screen.queryByText('No reviews found')).toBeNull();

  });

  it('should display the review text if provided', () => {
    render(<ReviewItem reviews={[mockReview1, mockReview2]} />);
    const reviewCards = screen.getAllByTestId('review-card');
    expect(within(reviewCards[0]).queryByTestId('review-text')).toBeNull();
    expect(within(reviewCards[1]).getByTestId('review-text')).toBeInTheDocument();
    expect(within(reviewCards[1]).getByText(mockReview2.reviewText)).toBeInTheDocument();
  });

  it('displays "No reviews found" when reviews array is empty', () => {
    const { getByText } = render(<ReviewItem reviews={[]} />);
    const noReviewsMessage = getByText(/No reviews found/i);
    expect(noReviewsMessage).toBeInTheDocument();
  });
});

