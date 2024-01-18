import { Alert, Typography, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from 'react';
import ReviewItem from '../review-item/ReviewItem';
import { getReviews } from '../../context/reviewsData';
import PaginationControlled from '../pagination/PaginationControlled';

interface ReviewData {
	id: string;
	reviewerId: string;
	companyId: string;
	reviewText: string;
	rating: number;
	createdOn: string;
	user: {
	  id: string;
	  firstName: string;
	  lastName: string;
	  email: string;
	};
	company: {
	  id: string;
	  name: string;
	};
  }

const styles = {
	title: {
		fontSize: '25pt',
		marginBottom: '10px',
		paddingTop: '10px',
	},
	searchInput: {
		marginBottom: '10px',
	},
	noMatchingReviews: {
		fontSize: '14pt',
	},
};

export function ReviewsList() {

	const [reviews, setReviews] = useState<ReviewData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const reviewsPerPage = 10;


	useEffect(() => {
		// Fetch reviews and update the state
		const fetchReviews = async () => {
		  try {
			const response = await getReviews();
			setReviews(response.reviews);
			console.log(response.reviews);
		  } catch (error) {
			console.error('Error fetching reviews', error);
			setError('Error retrieving review data. Reload the page to try again.');
		  }
		  setIsLoading(false);
		};
	
		fetchReviews();
	  }, []);

	  const filterReviews = () => {
		return reviews.filter(
		  (review) =>
			review.user.firstName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
			review.user.lastName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
			review.company.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
			review.reviewText?.toLowerCase().includes(searchKeyword.toLowerCase())
		);
	  };

	  const paginatedReviews = searchKeyword ? filterReviews() : reviews;
	  const indexOfLastReview = currentPage * reviewsPerPage;
	  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
	  const currentReviews = paginatedReviews.slice(indexOfFirstReview, indexOfLastReview);
	
	  const handlePageChange = (page: number) => {
		setCurrentPage(page);
	  };

	return (
		<>
			<Typography style={styles.title} variant="h1">
			Reviews:
			</Typography>
			<TextField
				sx={{ width: '90%' }}
				style={styles.searchInput}
				placeholder='Search reviews...'
				variant="outlined"
				value={searchKeyword}
				onChange={(e) => {
					setCurrentPage(1);
					setSearchKeyword(e.target.value);
				}}
			/>
			<SearchIcon style={{ fill: '#e11979', marginLeft: '15px', fontSize: '30pt' }} />
			<hr></hr>
	
			{isLoading ? (
			<Typography sx={{ fontSize: '14pt' }} data-testid="loading-msg">
				Loading review data...
			</Typography>
			) : error ? (
			<Alert severity="error" sx={{ width: '100%' }}>
				{error}
			</Alert>
			) : (
				<>
					<ReviewItem reviews={currentReviews} />
					<br/>
					<PaginationControlled
					totalItems={paginatedReviews.length}
					itemsPerPage={reviewsPerPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					/>
			  </>
			)}
	  </>
	);
}

export default ReviewsList;
